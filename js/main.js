(function($){
  var t, s, i, el;

  var G = {
    data : {
      career : {
        values : []
      },
      family : { 
        values :[]
      },
      health : { 
        values :[]
      },
      love : { 
        values :[]
      },
      social: { 
        values :[]
      }
    }
  };

  var utils = {
    leading_zeroes : function(num, l) {
      var str = '' + num;
      while (str.length < l) {
        str = '0' + str;
      }
   
      return str;
    }
  };

  var App = {
    init : function() {
      t = App.timeouts;
      s = App.settings;
      i = App.intervals;
      el = App.elements;

      G.today = Clock.get_date();

      // Start up the clock
      Clock.init();
      App.checks();
      App.events();
    },
    timeouts : {},
    settings : {
      is_touch : 'ontouchstart' in document.documentElement
    },
    intervals : {
      idle : 0
    },
    elements : {
      no_storage : document.getElementById('no-storage'),
      done : document.getElementById('done'),
      update : $('#update')
    },
    checks : function() {
      if (typeof(localStorage) === 'undefined') {
        //console.log('Browser not supported');
        s.storage = false;
        el.no_storage.style.display = 'block';

        // Set a cookie saying that they've been here before.
      } else {
        s.storage = true;
        var scales = DB.read('scales');

        // There is saved data
        if (scales) {
          G.data = scales;
          $.each(G.data, function(k,l){
            var sel = $('#update__' + k);
            var value = l.values;
            sel.val(value[value.length-1]);
          });
          App.render(G.data);
          App.close_init();
        } else {
          // There isn't any saved data.
          el.update.addClass('init');
        }
      }
    },
    events : function() {

      // Menu buttons
      $('nav ul li').click(function() {
        var id = $(this).html();
        var key = id.toLowerCase();
        $('.panel').addClass('transparent');
        $('#' + key).removeClass('transparent');
        $('#info-settings').addClass('active');
      });

      // Close buttons
      $('.close').click(function(){
        var panel = $(this).parent();
        panel.removeClass('active');
      });

      // When any of the scales are clicked.
      $('.scale').click(function(e){
        var id = e.currentTarget.id;
        var scale = id.replace('vis__', '');
        el.update.addClass('active');
        App.start_idle();
        $('#update__' + scale).focus();
      });

      // When the 'How are you' button is clicked.
      $('#how-are-you').click(function() {
        el.update.addClass('active');
        App.start_idle();
      });

      // Reset the idle setting on mousemove and keydown.
      $(document).bind('mousemove', function() {
        s.idle = 0;
      });
      el.update.find('select').focus(function(){
        s.idle = 0;
      });
      $(document).keydown(function() {
        s.idle = 0;
      });

      $('#update__form select').change(function() {
        var info = {};
        var key = this.id.replace('update__', '');
        info[key] = $(this).val();
        //info[key].date = G.today;

        App.collect(info);
        DB.write(G.data);
        App.render(G.data);
      });

      
      // Submit the data in the update fields.
      document.getElementById('update__form').onsubmit = function(){
        // If any of the scales don't have values set them to 5.
        
        $.each(G.data, function(k,l) {

          if (l.values.length < 1) {
            G.data[k].values = [5];
            G.data[k].date = G.today;
            console.log(info);
            App.render(G.data);
          }

        });
        DB.write(G.data);

        if ( el.update.attr('class') === 'init' ) {
          App.close_init();
        }

        return false;
      };
    },
    close_init : function() {
      el.update.fadeOut(500, function() {

        $(this).removeClass('init')
          .find('p').hide();

        $(this).delay(500).show()
          .find('.close')
            .show();
      });
    },
    start_idle : function() {
      i.idle = setInterval(function() {
        s.idle++;
        if (s.idle > 30) {
          el.update.removeClass('active');
          s.idle = 0;
          clearInterval(i.idle);
        }
      }, 1000);
    },
    collect : function(info) {
      
      $.each(info, function(k, l){

        if (G.today === G.data[k].date) {
          // If it is the same day.
          //console.log('Same Day.');
          G.data[k].values.pop();
          G.data[k].values.push(l);
          G.data[k].date = G.today;
        } else {
          //console.log('Different Day.');
          G.data[k].values.push(l);

          // FIXME: Individual dates need to be set.
          G.data[k].date = G.today;
        }
      });
      
    },
    render : function(info) {
      // Helper to get percentage.
      function pc(num, den) {
        return (num / den) * 100;
      }

      // Helper to get average.
      function av(arr) {
        var n = 0;
        $.each(arr, function(i, l) {
          n = n + parseInt(l, 10);
        });
        var avr = n / arr.length;
        return avr;
      }

      // Helper to get the proper visualization integer.

      function vis(num) {
        return (100 - num) / 2;
      }

      $.each(info, function(k, v) {
        //if (k !== 'date') {
          var id = 'vis__' + k;

          var latest = v.values[v.values.length-1];
          var now = pc(latest, 5);
          var avg = pc(av(v.values), 5);

          var scale = $('#'+id);

          scale.css({
            'top': vis(now) + '%',
            'bottom': vis(avg) + '%'
          });

          scale.find('.now span').html( ( Math.round(now*10)/10 ) + '%');
          scale.find('.average span').html( ( Math.round(avg*10) / 10 ) + '%');

          // TODO: Check the hight and remove icon if too short.
        //}
      });
    }
  };

  var DB = {
    read : function(handle) {
      var db_obj = JSON.parse(localStorage.getItem(handle));
      return db_obj;
    },
    write : function(item, handle) {
      var h = handle || 'scales';
      localStorage.setItem(h, JSON.stringify(item));
    }
  };

  var Clock = {
    init : function() {
      Clock.update();
      setInterval(function() {
        Clock.update();
      }, 60000);
    },
    get_date : function() {
      var cur = new Date();
      var y = cur.getFullYear();
      var m = utils.leading_zeroes(cur.getMonth() + 1, 2);
      var d = utils.leading_zeroes(cur.getDate(), 2);

      return y + m + d;
    },
    get_time_string : function() {
      var cur = new Date();
      var h = cur.getHours();
      var m = cur.getMinutes();
      var s = cur.getSeconds();

      m = ( m < 10 ? '0' : '' ) + m;
      s = ( s < 10 ? '0' : '' ) + s;

      var tod = ( h < 12 ) ? 'am' : 'pm';
      h = ( h > 12 ) ? h - 12 : h;
      h = ( h === 0 ) ? 12 : h;

      var full = h + ":" + m + tod;
      return full;
    },
    update : function() {
      $('#time').html(Clock.get_time_string());
    }
  };

  var Cookie = {
    get: function() {

    },
    set: function() {

    },
    remove: function() {

    }
  };

  App.init();

  $(window).load(function() {
    $('#loading').delay(1000).fadeOut(200);
    /*var loader = document.getElementById('loading');
    loader.className = 'vc-wrap transparent';
    setTimeout(function(){
      loader.style.display = 'none';
    },500);*/
  });

})(jQuery);

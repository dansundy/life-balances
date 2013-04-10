<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Life Balances</title>
    <link rel="author" href="humans.txt" />
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- TODO: Add in App Cache 
    -->


    <meta name="apple-mobile-web-app-capable" content="yes" /> <!-- Enable removal of Address bar when opened form bookmark -->
    <meta name="apple-mobile-web-app-status-bar-style" content="black" /> <!-- App bar style -->
    <meta name="apple-mobile-web-app-title" content="D.Sundy" /> <!-- Apple touch icon text -->

    
    <link rel="stylesheet" href="css/style.css" />
    <!--[if (lt IE 9)&(!IEMobile)]>
      <link rel="stylesheet" href="css/oldie.css" media="all">
    <![endif]-->

    <!--[if lt IE 9]>
      <script src="js/lib/html5.js"></script>
    <![endif]-->

    <!-- TODO: Add in Favicon and Apple Touch icons. -->
    <!-- Apple Touch Icons -->
		<link rel="apple-touch-icon-precomposed" sizes="144x144" href="img/touch/apple-touch-icon-144x144-precomposed.png" />
		<link rel="apple-touch-icon-precomposed" sizes="114x114" href="img/touch/apple-touch-icon-114x114-precomposed.png" />
		<link rel="apple-touch-icon-precomposed" sizes="72x72" href="img/touch/apple-touch-icon-72x72-precomposed.png" />
		<link rel="apple-touch-icon-precomposed" href="img/touch/apple-touch-icon-57x57-precomposed.png" />
		<link rel="shortcut icon" href="img/touch/apple-touch-icon.png" />

    <!-- Favicons -->
    <link href="favicon.ico" type="image/x-icon" rel="icon" />
    <link href="favicon.ico" type="image/x-icon" rel="shortcut icon" />
  </head>
  <body>
    <nav>
      <ul>
        <li class="nav-about">About</li>
      </ul>
    </nav>

    <div class="wrapper cf">
      <section id="vis">
        <section id="vis__family" class="scale">
          <div class="now data">Now <span></span></div>
          <div class="icn data"><span>Family / Home</span></div>
          <div class="average data">Avg <span></span></div>
        </section>
        <section id="vis__career" class="scale">
          <div class="now data">Now <span></span></div>
          <div class="icn data"><span>Work / School</span></div>
          <div class="average data">Avg <span></span></div>
        </section>
        <section id="vis__love" class="scale">
          <div class="now data">Now <span></span></div>
          <div class="icn data"><span>Love Life</span></div>
          <div class="average data">Avg <span></span></div>
        </section>
        <section id="vis__health" class="scale">
          <div class="now data">Now <span></span></div>
          <div class="icn data"><span>Health &amp; Fitness</span></div>
          <div class="average data">Avg <span></span></div>
        </section>
        <section id="vis__social" class="scale">
          <div class="now data">Now <span></span></div>
          <div class="icn data"><span>Social Life</span></div>
          <div class="average data">Avg <span></span></div>
        </section>
      </section><!-- /.vis -->
      <p id="info">It is <span id="date"><?php echo date('l, F jS') ?></span> at <span id="time"><?php echo date('g:i a') ?></span>.</p>
      <a id="how-are-you">How are you today?</a>
    </div><!-- /.wrapper -->

    <section id="update" class="init">
      <p id="welcome"><strong>Nice to meet you!</strong></p>
      <p id="no-storage">Hmmm... you either have <strong>local storage</strong> turned off or you are using an <strong>outdated browser</strong>. Unfortunately, you won&rsquo;t get the full experience.</p>
      <p id="intro"><strong>How are you today?</strong> Rate from 0-5.</p>
      <form id="update__form">
        <ul>
          <li>
            <select id="update__family">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5" selected>5</option>
            </select>
            <label for="update__family">Family / Home</label>
          </li>
          <li>
            <select id="update__career">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5" selected>5</option>
            </select>
            <label for="update__career">Work / School</label>
          </li>
          <li>
            <select id="update__love">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5" selected>5</option>
            </select>
            <label for="update__love">Love Life</label>
          </li>
          <li>
            <select id="update__health">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5" selected>5</option>
            </select>
            <label for="update__health">Fitness / Health</label>
          </li>
          <li>
            <select id="update__social">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5" selected>5</option>
            </select>
            <label for="update__social">Social Life</label>
          </li>
        </ul>
        <p><input type="submit" value="Done" id="done"/></p>
      </form>

      <a class="close">Close</a>
    </section>

    <div id="info-settings" class="vc-wrap">
      <a class="close">Close</a>
      <article id="about" class="panel vc transparent">
        <header>
          <h1>About Life Balances</h1>
        </header>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae vel dolore autem hic iusto fugit nostrum qui. Quaerat inventore non. Deserunt odio quos minima doloremque optio excepturi quaerat harum in.</p>
      </article>
    </div>

    <div id="loading" class="vc-wrap">
      <p class="vc">
        <span class="loader-icon">!</span>
        <span class="loading-text">Loading<span>
      </p>
    </div>

  	<!-- JavaScripts -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/lib/jquery-1.9.1.min.js"><\/script>')</script>
	  <script src="js/main.js"></script>
  </body>
</html>

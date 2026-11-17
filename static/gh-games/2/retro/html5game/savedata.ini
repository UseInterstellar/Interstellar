<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Kongregate: Page Not Found</title>
    <!--[if lte IE 7]>
      <link rel="shortcut icon" type="image/x-icon" href="https://cdn2.kongcdn.com/favicon.ico" />
    <![endif]-->
    <link rel="shortcut icon" type="image/png" href="https://cdn1.kongcdn.com/favicon.png" />
    <link href='//fonts.googleapis.com/css?family=Merriweather:400,700' rel='stylesheet' type='text/css'>
    <style>
      * { margin:0;padding:0;box-sizing:border-box;-webkit-box-sizing:border-box;-moz-box-sizing:border-box; }
      body, html { height:100%; }
      body { background-color: #d5d5d5; font: 200 normal 19px/28px 'Helvetica Neue',Arial,sans-seriff; text-rendering: optimizelegibility; }
      a { color: #900; text-decoration: none; }
      h1 { background: #900 url('https://cdn2.kongcdn.com/assets/files/0000/5133/kongregate-error-page-logo.png') no-repeat 0 0;font:0/0 a; height: 41px; width: 335px; }
      h1 a { display: block; height: 41px; }
      h2 { font-size:23px; margin: 110px 0 0 320px; }
      h2 + p { margin: 15px 0 0 320px; }
      ul { overflow: auto; margin: 50px 0 0 400px; width: 530px; }
      li { float: left; font-size: 15px; font-weight: bold; line-height: 14px; width: 50%; list-style: none; }
      li a { background: #fff; border: 1px solid #c0c0c0; display: block; margin: 3px; padding: 12px 14px; text-transform: uppercase; }
      li a:hover { border: 1px solid #909090; box-shadow: 0 0 3px rgba(0,0,0,0.4); }
      li a:active { background-color: #f9f9f9; box-shadow: inset 0 0 2px rgba(0,0,0,0.2); }
      #outer-container { background: transparent url('https://cdn1.kongcdn.com/assets/files/0000/5144/kongbot-404-w-mountains.png?2') no-repeat center 155px; border-bottom: 10px solid #900; border-top: 10px solid #900; height: 100%; }
      #inner-container { height: 100%; margin: 0 auto; width: 940px; }
    </style>
  </head>
  <body>
    <div id="outer-container">
      <div id="inner-container">
        <h1><a href="https://www.kongregate.com/">Kongregate</a></h1>
        <h2>KongBot can&rsquo;t find the page you are looking for.</h2>
        <p>But his robot scan did return some pages you might enjoy:</p>
        <ul>
          <li><a href="/">&rsaquo; Home</a></li>
          <li><a href="/robot-games">&rsaquo; Robot Games</a></li>
          <li><a href="/hidden-object-games">&rsaquo; Hidden Object Games</a></li>
          <li><a href="/top-rated-games">&rsaquo; Top Rated Games</a></li>
        </ul>
      </div>
    </div>
    <script type="text/javascript">
      function fromMobileApp() {
        return navigator.userAgent.match(/KongregateMobileApi/i) != null ||
               navigator.userAgent.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i);
      }
      if(!!window.kongMobileApp){
        window.kongMobileApp.dispatchEvent("http_error", "{\"status\":404}");
      } else if (fromMobileApp()) {
        document.cookie = "kongregateMobilePanelError=not_found;path='/'"
        window.location = '/mobile_api';
      } else {
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', "UA-211785-2"]);
        _gaq.push(['_trackPageview']);

        (function() {
          var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
          ga.src = 'https://ssl.google-analytics.com/ga.js';
          var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
      }
    </script>
  </body>
</html>

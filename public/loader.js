(function() {

    function getParams() {
        var scripts, scriptURI, url;
        scripts = document.getElementsByTagName("script");
        scriptURI = scripts[scripts.length-1].src;
        url = scriptURI.split('?');
        return (url[1]) ? '?' + url[1]: '';
    }

    function loadCSS(link) {
        var css = document.createElement('link');
        css.setAttribute('rel', 'stylesheet');
        css.setAttribute('type', 'text/css');
        css.setAttribute('href', link);
        document.getElementsByTagName('head')[0].appendChild(css);
    }

    function loadJS(link) {
        var js = document.createElement('script');
        js.setAttribute('type', 'text/javascript');
        js.setAttribute('src', link);
        document.getElementsByTagName('head')[0].appendChild(js);

        js.onload = function() {
            jsLoad();
        }
    }

    var jsLoad = function() {};
    var params = getParams();

    loadCSS('/style.css' + params);
    loadJS('/js' + params);

    window.L = {} || window.L;
    window.L.onLoad = function(callback) {
        jsLoad = callback;
    }


})();
/**
 * Build config
 */
var fs = require('fs');
var extend = require('extend');
var basePath = __dirname + '/..'; // Set root application path

var config = {

    mainAppConfig: basePath + '/config.main.json',
    localAppConfig: basePath + '/config.local.json',

    packages: require(basePath + '/build/packs.js'),

    source: {
        deps: require(basePath + '/build/deps.js'),
        path: basePath + '/src/'
    },

    js: {
        public: {
            dir: basePath + '/public/js/',
            src: basePath + '/public/js/dg-map-src.js',
            min: basePath + '/public/js/dg-map.js'
        },

        copyrights: [basePath + '/vendors/leaflet/src/copyright.js'],

        intro: '(function (window, document, undefined) {\n',
        dustdebug: 'dust.debugLevel = \'ERROR\';\n',
        outro: '}(this, document));\n'
    },

    css: {
        public: {
            dir: basePath + '/public/css/',
            clean: basePath + '/public/css/dg-map-src.css',
            full: basePath + '/public/css/dg-map-src-full.css',
            ie: basePath + '/public/css/dg-map-src-ie.css',
            clean_min: basePath + '/public/css/dg-map.css',
            full_min: basePath + '/public/css/dg-map-full.css',
            ie_min: basePath + '/public/css/dg-map-ie.css'
        }
    },

    tmpl: {
        dir: 'templates',
        pattern: '*.dust',
        ext: '.dust',
        varPostfix: '_TMPL'
    },

    img: {
        pattern: 'src/**/img/*',
        dest: 'public/img/',
        patternLeaflet: 'vendors/leaflet/dist/images/*',
        destLeaflet: 'public/img/vendors/leaflet'
    },

    font: {
        pattern: 'src/**/fonts/**',
        dest: 'public/fonts'
    },

    svg: {
        pattern: 'src/**/svg/*',
        dest: 'public/svg'
    },

    skin: {
        dir: 'skin',
        var: '{skin}'
    },

    loader: {
        dir: basePath + '/private',
        name: 'loader.js'
    },

    hint: [
        'src/*/src/**/*.js'
    ],

    doc: {
        menu: './src/menu.json',
        input: './src/',
        output: './public/doc'
    }
};

config.appConfig = getAppConfig();
config.cfgParams = cgfToFrep(config.appConfig);
config.updateLoaderVersion = updateLoaderVersion;

// Reeturn actual configuration for replace
function getAppConfig() { // ()->Object
    var mainConfigPath = config.mainAppConfig,
        localConfigPath = config.localAppConfig,
        mainConfig,
        localConfig;

    if (!fs.existsSync(mainConfigPath)) {
        throw new Error('File \'config.main.json\' was not found in ' + mainConfigPath);
    }

    mainConfig = JSON.parse(fs.readFileSync(mainConfigPath));
    if (fs.existsSync(localConfigPath)) {
        localConfig = JSON.parse(fs.readFileSync(localConfigPath));
        extend(mainConfig, localConfig);
    }
    return mainConfig;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
}

function cgfToFrep(config) {
    return Object.keys(config).map(function (key) {
        return {
            pattern: new RegExp('__' + key + '__', 'g'),
            replacement: config[key]
        };
    });
}

function updateLoaderVersion(done) {
    var loaderPath = config.loader.dir,
        loaderFileName = config.loader.name,
        version = require('../package.json').version;

    fs.readFile(loaderPath + '/' + loaderFileName, {encoding: 'utf8'}, function (err, loaderContent) {
        if (err) { throw err; }

        console.log('Set version of stat files: ' + version);

        loaderContent = loaderContent.replace(/(version\s*=\s*['"]{1})()*.*(['"]{1})/g, '$1$2' + 'v' + version + '$3');
        fs.writeFile(loaderPath + '/' + loaderFileName, loaderContent, function () {
            done();
        });
    });
}

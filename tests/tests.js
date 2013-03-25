var karma = require('karma');

var server = require('./server.js'),
    testConfig = {configFile : __dirname + '/karma.conf.js'};

exports.run = function () {
    server.init();
    karma.server.start(testConfig);
    //server.stop();
};

exports.server = function () {
    server.init();
};
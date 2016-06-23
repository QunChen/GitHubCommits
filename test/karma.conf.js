module.exports = function(config){
    config.set({
        basePath: '../',
        frameworks:['jasmine'],
        files:[
           'node_modules/vue/dist/vue.min.js',
            'node_modules/vue-resource/dist/vue-resource.min.js',
            'app/scripts/*.js',
            'test/unit/*.js'
        ],

        prepeocessors:{

        },

        reporters:['progress'],

        port:9876,

        colors:true,

        logLevel: config.LOG_INFO,

        autoWatch:true,

        browsers:['Chrome'],

        singleRun: false,

        concurrency: Infinity
    })
}
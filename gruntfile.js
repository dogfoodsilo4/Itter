module.exports = function(grunt) {
    grunt.initConfig({
        ts: {
            default: {
                src: ["**/*.ts", "!node_modules/**/*.ts"],
                options: {
                    additionalFlags: '--module "commonjs"'
                }
            }
        },
        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'results.txt', // Optionally capture the reporter output to a file
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
                },
                src: ['test/**/*.js']
            }
        },
        env:
        {
            coverage:
            {
                APP_DIR_FOR_CODE_COVERAGE: 'test/coverage/instrument/app'
            }
        },
        clean: ['test/coverage'],
        reloadTasks:
        {
            rootPath: 'test/coverage/instrument'
        },
        instrument:
        {
            files: 'Itter.js',
            options:
            {
                lazy: true,
                basePath: 'test/coverage/instrument/'
            }
        },
        // mochaTest:
        // {
        //     options:
        //     {
        //         reporter: 'spec'
        //     },
        //     src: ['test/*.js']
        // },
        storeCoverage:
        {
            options:
            {
                dir: 'test/coverage/reports'
            }
        },
        makeReport:
        {
            src: 'test/coverage/reports/**/*.json',
            options:
            {
                type: 'lcov',
                dir: 'test/coverage/reports',
                print: 'detail'
            }
        }
    });

   grunt.loadNpmTasks("grunt-ts");
   grunt.loadNpmTasks('grunt-mocha-test');
   grunt.loadNpmTasks('grunt-env');
   grunt.loadNpmTasks('grunt-istanbul');
   grunt.loadNpmTasks('grunt-contrib-clean');

    // require('matchdep').filterDev('grunt-*')
    // .forEach(grunt.loadNpmTasks);

    grunt.registerTask('coverage', ['env:coverage', 'clean', 'instrument', 'reloadTasks', 'mochaTest',
    'storeCoverage', 'makeReport'
]);

    grunt.registerTask("default", ["ts", "mochaTest"]);
};

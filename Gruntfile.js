module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        concat: {
            final: {
                src: ['src/minesweeper.js', 'src/**/*.js'],
                dest: 'web/js/minesweeper.js'
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'tests/**/*.js', 'web/js/minesweeper.js']
        },
        jasmine: {
            all: {
                src: 'web/js/minesweeper.js',
                options: {
                    specs: 'tests/**/*.spec.js',
                    helpers: [
                        'bower_components/angular/angular.js',
                        'bower_components/angular-mocks/angular-mocks.js'
                    ],
                    outfile: '_SpecRunner.html',
                    keepRunner: true
                }
            }
        },
        watch: {
            source: {
                files: ['src/**/*.js'],
                tasks: ['concat', 'jshint', 'jasmine']
            },
            tests: {
                files: ['tests/**/*.spec.js'],
                tasks: ['jshint', 'jasmine']
            }
        },
        copy: {
            signalRServer: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['web/js/minesweeper.js'],
                        dest: 'server/MinesweeperServer/MinesweeperServer/Scripts'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['concat', 'jshint', 'jasmine', 'copy']);
    grunt.registerTask('dev', ['default', 'watch']);
};

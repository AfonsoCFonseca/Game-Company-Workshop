module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        concat: {
            "options": { "separator": ";" },
            "build": {
                "src": "src/js/**/*.js",
                "dest": "js/app.jsx"
            }
        },
        watch: {
          src: {
            files: ['src/js/**/*.js', 'src/scss/*.scss'],
            tasks: ['concat', 'react', 'sass']
          },
        },
        react: {
          dynamic_mappings: {
            files: [
              {
                expand: true,
                src: 'js/*.jsx',
                dest: 'dist',
                ext: '.js'
              }
            ]
          }
        },
        sass: {
          dist: {
            files: [{
              expand: true,
              cwd: 'src/scss',
              src: ['*.scss'],
              dest: 'dist/css',
              ext: 'styles.css'
            }]
          }
        }
    });

    // Load required modules
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');


    // Task definitions
    grunt.registerTask('default', [ 'concat', 'react', 'sass']);
};

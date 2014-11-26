/*
 * grunt-gcloud
 * https://github.com/ubilabs/grunt-gcloud
 *
 * Copyright (c) 2014 Frank Mecklenburg Ubilabs
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var fs = require('fs'),
    async = require('async'),
    storage, bucket, asyncTasks = [];

  grunt.registerMultiTask('gcloud', 'Grunt wrapper for google-gcloud.', function() {
    var done = this.async(),
      options = this.options({
        keyFilename: '.gcloud.json',
        metadata: null
      }),
      storage = require('gcloud')({
        projectId: options.projectId,
        keyFilename: options.keyFilename
      }).storage(),
      file;

    // Reference an existing bucket.
    var bucket = storage.bucket(options.bucket);

    this.files.forEach(function(filePair) {
      filePair.src.forEach(function(src) {
        var srcFile = filePair.cwd + '/' + src,
          destFile = filePair.dest + '/' + src;

        if (!grunt.file.isDir(srcFile)) {
          asyncTasks.push(
            function(callback) {
              bucket.upload(srcFile, destFile, options.metadata, function(err, file) {
                if (err) {
                  grunt.log.error(err);
                  grunt.fail.warn(err);
                }

                callback();
              });
            });
        }
      });
    });

    async.parallel(asyncTasks, function() {
      done();
    });
  });
};

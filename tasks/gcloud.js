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
        metadata: {}
      }),
      gcloud = require('gcloud'),
      storage = gcloud({
        projectId: options.projectId,
        keyFilename: options.keyFilename
      }).storage(),
      bucket = storage.bucket(options.bucket);

    this.files.forEach(function(filePair) {
      filePair.src.forEach(function(src) {
        var srcFile = filePair.cwd + '/' + src,
          destFile = filePair.dest + '/' + src;

        if (!grunt.file.isDir(srcFile)) {
          asyncTasks.push(
            function(callback) {
              var metadata = JSON.parse(JSON.stringify(options.metadata));

              bucket.upload(srcFile, destFile, metadata, function(err, file) {
                if (err) {
                  grunt.fail.warn(err);
                }
                
                grunt.log.ok('Uploading [' + file.metadata.name + ']');

                callback();
              });
            });
        }
      });
    });

    async.parallelLimit(asyncTasks, options.asyncLimit || 100, function() {
      done();
    });
  });
};

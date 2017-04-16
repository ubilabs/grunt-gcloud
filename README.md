# THIS MODULE IS NOT IIN ACTIVE DEVELOPMENT ANYMORE.

## You are free to fork of course.


# grunt-gcloud [![Build Status](https://travis-ci.org/ubilabs/grunt-gcloud.svg?branch=master)](https://travis-ci.org/ubilabs/grunt-gcloud)

> A wrapper for the google-gcloud node module.

*Currently only for the google cloud storage.*

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-gcloud --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-gcloud');
```

## The "gcloud" task

### Overview
In your project's Gruntfile, add a section named `gcloud` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gcloud: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.projectId
Type: `String`
Default value: `null`

The google cloud project id.

#### options.bucket
Type: `String`
Default value: `null`

The Bucket name.

#### options.keyFilename
Type: `String`
Default value: `'.gcloud.json'`

#### options.metadata
Type: `Object`
Default value: `null`

A object with metadata.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  gcloud: {
    project: {
        options: {
          projectId: 'MyAwesomeProject',
          bucket: 'bucket',
          keyFilename: '.gcloud.json'
        },
        files: [{
          src: [
            'dist/**/*'
          ]
        }]
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

const gulp = require('gulp');

function test(cb) {
  console.log('Hello gulp');
  cb();
}

exports.test = test;

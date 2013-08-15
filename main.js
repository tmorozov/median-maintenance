#!/usr/bin/env node

var program = require('commander');
var farr = require('./load_array');
var INPUT_FILE_DEFAULT = "./sample/Median.txt";

function clone(fn) {
    // Workaround for commander.js issue.
    // http://stackoverflow.com/a/6772648
    return fn.bind({});
};

function findIndex(arr, val) {
  if(! arr.length) {
    return -1;
  }

  var start = 0;
  var end = arr.length - 1;

  if(val >= arr[end]) {
    return end;
  }
  if(val <= arr[start]) {
    return start;
  }

  while (start != end ) {
    var mid = ~~((start + end) / 2);
    if(arr[mid] > val) {
      end = mid;
      if( end > start ) {
        end--;
      }
    } else if (arr[mid] < val) {
      start = mid;
      if( end > start) {
        start++;
      }
    } else {
      return mid;
    }
  }

  return start;
}


function getMedian(arr) {
  var len = arr.length;

  if(! len) {
    console.log('empty arr');
    exit(0);
  }

  var mI = (len % 2 === 0) ? len/2 -1  : (len+1)/2 -1;

  arr.sort(function(a,b){
    return a-b;
  });

  var median = arr[mI];

// console.log(median);
  return median;
}

function onArrayLoaded (arr) {
  console.log('loaded');

  var tmpArr = [];
  var tmpSum = 0;

  arr.forEach(function(item, i) {
    tmpArr.push(item);
    var median = getMedian(tmpArr);
    tmpSum += median;
  });


  console.log('result:', tmpSum % 10000);
}

if(require.main == module) {
  program
    .option('-f, --file <file>', 'Path to file with data', clone(farr.assertFileExists), INPUT_FILE_DEFAULT)
    .parse(process.argv);

  console.log(program.file);
  farr.loadArray(program.file, onArrayLoaded);
} else {
//  exports.checkHtmlFile = countInversions;
}

'use strict';

var sqlite3 = require('sqlite3').verbose();
var fs = require("fs");
var file = "log.db";
var db;
var moment = require('moment');
var utils = require('./utils.js');

function init(){
  if(!fs.existsSync(file))
  {
    db = new sqlite3.Database(file);
    db.serialize(function() {
      db.run('CREATE TABLE tGravity (session TEXT, timestamp INTEGER, originalgravity REAL, finalgravity REAL)');
      db.run('CREATE TABLE tSense (session TEXT, timestamp INTEGER, celsius REAL)');
    });
  } else{
    db = new sqlite3.Database(file);
  }
}

function addGravity(data){
  var stmt = db.prepare('INSERT INTO tGravity VALUES (?, ?, ?, ?)');
  stmt.run( data.timestamp, data.originalGravity, data.finalGravity);
  stmt.finalize();
}

function addSense(data){
  var stmt = db.prepare('INSERT INTO tSense VALUES (?, ?, ?)');
  stmt.run(data.session, data.timestamp, data.celsius);
  stmt.finalize();
}

function noop(){}

exports.init = init;
exports.close = db ? db.close() : noop;
exports.gravities = {
  'add': addGravity
  //,'get': getGravity
};
exports.senses = {
  'add': addSense
  //,'get': getSense
};

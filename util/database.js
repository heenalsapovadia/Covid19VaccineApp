// const mysql = require('mysql2');
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db; // _ signals that the variable will only be used internally in this file

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://heenal:heenal25@cluster0.snlhj.mongodb.net/covid-vaccine-app?retryWrites=true&w=majority"
  )
    .then((client) => {
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

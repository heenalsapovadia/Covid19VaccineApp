const people = [];
// const db = require('../util/database');
const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

module.exports = class Person {
  constructor(id, name, address, sector, vaccine, dose, date, ecn) {
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.name = name;
    this.address = address;
    this.sector = sector;
    this.vaccine = vaccine;
    this.dose = dose;
    this.date = date;
    this.ecn = ecn;
  }

  save() {
    // people.push(this);
    const db = getDb();
    let dbOp;
    if (this._id) {
      // update the product
      dbOp = db
        .collection("people")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      //insert one
      dbOp = db.collection("people").insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log("done");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("people")
      .find() // find() returns a cursor not a promise, can return millions of docs, hence find() gives a handle to each doc
      .toArray() // gets all docs and converts them to js array, returns a promise
      .then((people) => {
        console.log(people);
        return people;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("people")
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then((person) => {
        console.log(person);
        return person;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(id) {
    const db = getDb();
    return db
      .collection("people")
      .deleteOne({ _id: new mongodb.ObjectId(id) })
      .then((result) => {
        console.log("deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

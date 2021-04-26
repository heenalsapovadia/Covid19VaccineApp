const people = [];
const db = require('../util/database');
module.exports = class Person {
    constructor(id, name, address, sector, vaccine, dose, date, ecn){
        this.id = id;
        this.name = name;
        this.address = address;
        this.sector = sector;
        this.vaccine = vaccine;
        this.dose = dose;
        this.date = date;
        this.ecn = ecn;
    }

    save(){
        // people.push(this);
        return db.execute('INSERT INTO people (name, address, sector, vaccine, dose, vaccineDate, ecNo) VALUES (?,?,?,?,?,?,?)',
        [this.name, this.address, this.sector, this.vaccine, this.dose, this.date, this.ecn]);
    }

    static fetchAll(){
        // return people;
        return db.execute('SELECT id, name, address, sector, vaccine, dose, date_format(vaccineDate, "%Y-%m-%d") AS vaccineDate, ecNo FROM people'); //return a promise
    }

    static findById(id){
        return db.execute('SELECT id, name, address, sector, vaccine, dose, date_format(vaccineDate, "%Y-%m-%d") AS vaccineDate, ecNo FROM people where people.id = ?', [id]); //can we send the column name dynamically?
    }

    update(){
        return db.execute('UPDATE people SET name=?, address=?, sector=?, vaccine=?, dose=?, vaccineDate=?, ecNo=? WHERE id=?',
        [this.name, this.address, this.sector, this.vaccine, this.dose, this.date, this.ecn, this.id]);
    }

    static deleteById(id){
        return db.execute('DELETE FROM people WHERE id=?', [id]);
    }
}
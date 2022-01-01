// const people = [];
const Person = require('../models/person');

exports.getPeople = (req, res, next)=>{
    Person.fetchAll()
        .then((rows) => {
            res.render('people', { 
                pageTitle: 'People', 
                path: '/',
                peeps: rows
            });
        })
        .catch(err => {
            console.log('err');
        });
};

exports.getPerson = (req, res, next)=>{
    const id = req.params.personId;
    console.log(id);
    Person.findById(id)
        .then((person) => {
            console.log("finding by id",person);
            console.log(person.vaccineDate);
            console.log(typeof person.vaccineDate);
            res.render('person-detail', { 
                pageTitle: 'Summary', 
                path: '/people',
                person: person
            });
        })
        .catch(err => {
            console.log('err');
        });
};

exports.getSearch = (req, res, next) => {
    res.render('searchBy', {
        pageTitle: 'Search',
        path: 'search'
    });
};
exports.postSearch = (req, res, next) => {
    console.log(req.body.id);
    const id = req.body.id;
    Person.findById(id)
        .then((person) => {
            console.log("finding by id",person);
            console.log(person.vaccineDate);
            console.log(typeof person.vaccineDate);
            res.render('person-detail', { 
                pageTitle: 'Summary', 
                path: '/people',
                person: person
            });
        })
        .catch(err => {
            console.log('err');
        });
};
// const people = [];
const Person = require('../models/person');

exports.getPeople = (req, res, next)=>{
    const people = Person.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('people', { 
                pageTitle: 'People', 
                path: '/',
                peeps: rows,
                isAuthenticated: req.isLoggedIn
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
        .then(([row]) => {
            console.log("finding by id",row);
            console.log(row[0].vaccineDate);
            console.log(typeof row[0].vaccineDate);
            res.render('person-detail', { 
                pageTitle: 'Summary', 
                path: '/people',
                person: row[0],
                isAuthenticated: req.isLoggedIn
            });
        })
        .catch(err => {
            console.log('err');
        });
};

exports.getSearch = (req, res, next) => {
    res.render('searchBy', {
        pageTitle: 'Search',
        path: 'search',
        isAuthenticated: req.isLoggedIn
    });
};
exports.postSearch = (req, res, next) => {
    console.log(req.body.id);
    const id = req.body.id;
    Person.findById(id)
        .then(([row]) => {
            console.log("finding by id",row);
            console.log(row[0].vaccineDate);
            console.log(typeof row[0].vaccineDate);
            res.render('person-detail', { 
                pageTitle: 'Summary', 
                path: '/people',
                person: row[0]
            });
        })
        .catch(err => {
            console.log('err');
        });
};
const Person = require('../models/person');

exports.getAddPerson = (req, res, next)=>{
    res.render('admin/edit-person', { 
        pageTitle: 'Add Person', 
        path: 'admin/add-person',
        editing: false
    });
};

exports.postAddPerson = (req, res, next)=>{
    const name = req.body.Name;
    const address = req.body.Address;
    const sector = req.body.Sector;
    const vaccine = req.body.Vaccine;
    const dose = req.body.Dose;
    const date = req.body.Date;
    const ecn = req.body.ECN;
    const person = new Person(null, name, address, sector, vaccine, dose, date, ecn);
    person.save()
        .then(()=>{
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getEditPerson = (req, res, next)=>{
    const editMode = req.query.edit;
    if(!editMode) return res.redirect('/');
    const personId = req.params.personId;
    Person.findById(personId)
        .then((person) => {
            console.log(person.vaccineDate);
            res.render('admin/edit-person', {
                pageTitle: 'Edit Person',
                path: 'admin/edit-person',
                editing: editMode,
                person: person
            });
        })
        .catch(err => {
            console.log(err);
        });
    
};

exports.postEditPerson = (req, res, next)=>{
    const id = req.body.personId;
    const name = req.body.Name;
    const address = req.body.Address;
    const sector = req.body.Sector;
    const vaccine = req.body.Vaccine;
    const dose = req.body.Dose;
    const date = req.body.Date;
    const ecn = req.body.ECN;
    const person = new Person(id, name, address, sector, vaccine, dose, date, ecn);
    person.save()
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getPeople = (req, res, next)=>{
    Person.fetchAll()
        .then((rows) => {
            res.render('admin/people-list', { 
                pageTitle: 'People', 
                path: 'admin/people',
                peeps: rows
            });
        })
        .catch(err => {
            console.log('err');
        });
};

exports.postDeletePerson = (req, res, next) => {
    const id = req.body.personId;
    Person.deleteById(id)
        .then(() => {
            res.redirect('/admin/people');
        })
        .catch(err => {
            console.log(err);
        });
};
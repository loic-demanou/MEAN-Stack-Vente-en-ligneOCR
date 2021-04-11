const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Thing = require('./models/Thing');

const app = express();

mongoose.connect('mongodb+srv://loic-demanou:demanoul9@fullstackocr.1cjiz.mongodb.net/fullstackOCR?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
//mongodb + srv://loic-demanou:<password>@fullstackocr.1cjiz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Saved done !' }))
        .catch(error => res.status(400).json({ error }));
});

app.get('/api/stuff', (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
});

app.get('/api/stuff/:id', (req, res, next) =>{
    Thing.findOne({_id: req.params.id})
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));

});

app.put('/api/stuff/:id', (req, res, next)=>{
    Thing.updateOne({_id:req.params.id}, {...req.body, _id:req.params.id})
    .then(() => res.status(201).json({ message: 'updated done !' }))
    .catch(error => res.status(400).json({ error }));
});

app.delete('/api/stuff/:id', (req, res, next)=>{
    Thing.deleteOne({_id: req.params.id})
    .then(() => res.status(201).json({ message: 'deleted !' }))
    .catch(error => res.status(400).json({ error }));

});



module.exports = app;
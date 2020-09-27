const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');

//var serviceAccount = require("../../nodejs-firebase-64870-firebase-adminsdk-pqjuz-40d4662b76.json");

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://nodejs-firebase-64870.firebaseio.com/'
});
 
const db = admin.database();



router.get('/', (req,res) => {
    //console.log('Index works');
    //res.send('Recibido');
    //A partir de aqui lo leera el dato q se registro
    db.ref('contactos').once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('index', {contactos: data});
    });

});

router.post('/new-contact', (req,res) => {
    

    console.log(req.body);
    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    };
    db.ref('contactos').push(newContact);
    //res.send('Recibido');
    res.redirect('/');

    //res.redirect('/')
});

//Delete
router.get('/delete-contact/:id',(req, res) =>{
    //console.log(req.params.id);
    db.ref('contactos/' + req.params.id).remove();
    //res.send('Borrado');    
    res.redirect('/');
})



module.exports = router;
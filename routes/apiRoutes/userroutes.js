const router = require('express').Router();
const { User } = require("../../models");
const { get } = require('./summonerRoutes');

router.post('/signup', (req, res) => {
    // Access our User model and run .findAll() method)
    User.create({email: req.body.email,
        password: req.body.password,})
    
    .then(dbUser => res.json(dbUser))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
router.post('/login', (req,res) => {
    User.findOne({
        where: {
            email: req.body.email,
        }
        
    }).then((dbUserData)=>{
        if (dbUserData)
      {  res.status(200).json(dbUserData)
        

        } else {res.status(400).json({Message: "No User Found"})}
    }) 
}
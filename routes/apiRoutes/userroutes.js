const router = require('express').Router();
const { User } = require("../../models");

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] },
    })
    .then(dbUser => res.json(dbUser));
})

router.post('/', (req, res) => {
    User.create({
        email: req.body.email,
        password: req.body.password,
    })
    .then(dbUserData => 
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.email = dbUserData.email;
            req.session.loggedIn = true;
        
            res.json(dbUserData);
        })
    )
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
        }   
    }).then((dbUserData)=>{
        if (dbUserData) {
            const validPassword = dbUserData.checkPassword(req.body.password);
            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password!' });
                return;
            }
            req.session.save(() => {
                // declare session variables
                req.session.user_id = dbUserData.id;
                req.session.email = dbUserData.email;
                req.session.loggedIn = true;
        
                res.json({ user: dbUserData, message: 'You are now logged in!' });
            });
        } else {
            res.status(400).json({Message: "No User Found"})
        }
    }); 
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

module.exports = router;
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const User = require('./models/user');
const sequelize = require('./util/database');

app.use(bodyParser.urlencoded({ extended: false }));

app.post('user/signup',async(req, res, next) =>{
    try{
        if(!req.body.email){
            throw new Error('Email is mandatory');
        }
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;

      const data = await User.create( {name: name, email: email, password: password} )
      res.status(201).json({signupDetails: data});
    } catch(err){
        res.status(500).json({
            error: err
        })
    }
});

sequelize
 .sync()
 .then(result =>{
    app.listen(3000);
 })
 .catch(err => console.log(err));

//app.listen(3000);
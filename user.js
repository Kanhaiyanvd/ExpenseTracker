const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.postSignup = async(req, res, next) =>{
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

};

exports.postLogin = async (req, res, next) =>{
    const email = req.body.email
    const password = req.body.password

    let users = await User.findAll({where:{email: email}})

    if(users.length>0){
        const dbid = users[0].id
        const dbname = users[0].name
        const dbemail = users[0].email
        const dbpass = users[0].password

        const match = await bcrypt.compare(password, dbpass)

        if(match){
            //const token = jwt.sign(dbid, process.env.TOKEN_SECRET)
            res.status(200).json({msg:'Login successful', email: dbemail, name: dbname })
        }else{
            res.status(401).json({msg: 'User not autorized'})
        }
    }else{
        res.status(404).json({msg: 'User not found'})
    }
};


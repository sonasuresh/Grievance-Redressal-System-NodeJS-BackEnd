const express = require('express');
const router = express.Router();
const User = require('../Models/user');
const bcrypt = require('bcryptjs')
var nodemailer = require('nodemailer');

router.get('/getUsers/:role', (req, res) => {
    if (req.params.role != 'all') {
        User.find({ role: req.params.role }, (findError, findDocuments) => {
            if (findError) {
                res.json({
                    success: false,
                    message: 'DB Error'
                })
            } else {
                res.json({
                    success: true,
                    message: findDocuments
                })
            }
        })
    } else {
        User.find({}, (findError, findDocuments) => {
            if (findError) {
                res.json({
                    success: false,
                    message: 'DB Error'
                })
            } else {
                res.json({
                    success: true,
                    message: findDocuments
                })
            }
        })
    }
})

router.post('/registerAdmin', (req, res) => {
    bcrypt.genSalt(10,(saltError, salt)=>{
        bcrypt.hash(req.body.password, salt, (hashError, hash)=>{
            
    let newUser = new User({
        name: req.body.name,
        password: hash,
        email_id: req.body.email_id,
        role: 'Admin'
        
    })

    newUser.save((saveError, saveData) => {
        console.log(saveError)
        if (saveError) {
            res.json({
                success: false,
                message: 'DB Error'
            })
        } else {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'sona.suresh@gmail.com',
                    pass: 'lovewayyoulike'
                }
            });
            var mailOptions = {
                from: 'sona.suresh158@gmail.com',
                to: req.body.email_id,
                subject: 'Thanks for Registering!!',
                text: 'You have successfullly been registered with us. Your username is : '+ req.body.email_id+" || Password : "+ req.body.password
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.json({
                success: true,
                message: 'Admin Registered!'
            })
        }
    })
        })
    })
})

router.post('/registerInCharge', (req, res) => {
    bcrypt.genSalt(10,(saltError, salt)=>{
        bcrypt.hash(req.body.password, salt, (hashError, hash)=>{
            
    let newUser = new User({
        name: req.body.name,
        password: hash,
        email_id: req.body.email_id,
        role: 'InCharge'
        
    })

    newUser.save((saveError, saveData) => {
        console.log(saveError)
        if (saveError) {
            res.json({
                success: false,
                message: 'DB Error'
            })
        } else {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'sona.suresh158@gmail.com',
                    pass: 'lovethewayyoulike'
                }
            });
            var mailOptions = {
                from: 'sona.suresh158@gmail.com',
                to: req.body.email_id,
                subject: 'Thanks for Registering!!',
                text: 'You have successfullly been registered with us. Your username is : '+ req.body.email_id+" || Password : "+ req.body.password
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.json({
                success: true,
                message: 'Incharge Registered!'
            })
        }
    })
        })
    })
})

router.post('/register', (req, res) => {

    bcrypt.genSalt(10,(saltError, salt)=>{
        bcrypt.hash(req.body.password, salt, (hashError, hash)=>{
            
    let newUser = new User({
        name: req.body.name,
        password: hash,
        email_id: req.body.email_id,
        department: req.body.department,
        year: req.body.year,
        reg_no: req.body.reg_no,
        role: 'User'
        
    })

    newUser.save((saveError, saveData) => {
        console.log(saveError)
        if (saveError) {
            res.json({
                success: false,
                message: 'DB Error'
            })
        } else {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'sona.suresh158@gmail.com',
                    pass: 'worldsluckiest'
                }
            });
            var mailOptions = {
                from: 'sona.suresh158@gmail.com',
                to: req.body.email_id,
                subject: 'Thanks for Registering!!',
                text: 'You have successfullly been registered with us. Your username is : '+ req.body.email_id+" || Password : "+ req.body.password
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.json({
                success: true,
                message: 'User Registered!'
            })
        }
    })
        })
    })
})

router.post('/login', (req, res) => {
    User.find({email_id: req.body.email_id}, (findErr, userDocs)=>{
        if(userDocs.length == 0){
            res.json({
                success: false,
                message: 'Cannot Login. Invalid Creds'
            })
        } else {
            bcrypt.compare(req.body.password, userDocs[0].password, (compareError, compareStatus)=>{
                if(compareStatus == true){
                    res.json({
                        success: true,
                        data: userDocs[0],
                        message: 'Login Successfull'
                    })
                } else {
                    res.json({
                        success: false,
                        message: 'Cannot Login. Invalid Creds'
                    })
                }
            })
        }
    })
})


router.post('/resetPassword', (req, res) => {
    User.updateOne({ email_id: req.body.email_id }, { $set: { password: req.body.password } }, (updateError, updateMessage) => {
        if (updateError) {
            res.json({
                success: false,
                message: 'DB Error'
            })
        } else {
            res.json({
                success: true,
                message: 'Password Reset successful!'
            })
        }
    })
})

router.post('/delete', (req, res) => {
    User.remove({ email_id: req.body.email_id }, (removeError, removeDocs) => {
        if (removeError) {
            res.json({
                success: false,
                message: 'DB Error'
            })
        } else {
            res.json({
                success: true,
                message: 'User Deleted!'
            })
        }
    })
})
router.post('/authenticate', (req, res) => {
    User.findOne({
        username: req.body.email_id
    }, (findError, foundUser) => {
        if (findError) {
            res.json({
                success: false,
                msg: {
                    userFound: false,
                    passwordMatch: false,
                    token: null,
                    desc: 'Database Error'
                }
            })
        } else {
            if (foundUser) {
                bcrypt.compare(req.body.password, foundUser.password, (compareError, compareResult) => {
                    if (compareError) {
                        res.json({
                            success: false,
                            msg: {
                                userFound: false,
                                passwordMatch: false,
                                token: null,
                                desc: 'Database Error'
                            }
                        })
                    } else {
                        if (compareResult) {
                            res.json({
                                success: true,
                                user: {
                                    name: foundUser.userProfileName,
                                    email_id: foundUser.username,
                                    id: foundUser._id,
                                    role: foundUser.role
                                },
                                msg: {
                                    userFound: true,
                                    passwordMatch: true,
                                    token: jwt.sign({
                                        data: foundUser
                                    }, config.application.secret, {
                                            expiresIn: 604800 // 1 week
                                        }),
                                    desc: 'You are successfully logged in'
                                }
                            })
                        } else {
                            res.json({
                                success: false,
                                msg: {
                                    userFound: true,
                                    passwordMatch: false,
                                    token: null,
                                    desc: 'Password is incorrect'
                                }
                            })
                        }
                    }
                })
            } else {
                res.json({
                    success: false,
                    msg: {
                        userFound: false,
                        passwordMatch: false,
                        token: null,
                        desc: 'Email ID is not Selected. Please verify'
                    }
                })
            }
        }
    })
})
module.exports = router

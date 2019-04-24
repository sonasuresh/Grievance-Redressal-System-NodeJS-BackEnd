const express = require('express');
const router = express.Router();
const problem = require('../Models/problem')
var moment = require('moment');

router.post('/resolveProblem', (req, res)=>{
    problem.findByIdAndUpdate(req.body.id, {$set:{
        resolved: true
    }}, (updateError, updateDocuments)=>{
        if(updateError){
            res.json({
                success: false,
                message: 'DB Error'
            })
        } else {
            res.json({
                success: true,
                resolved_on:moment().format('YYYY-MM-DD HH:mm:ss Z'),
                message: 'Resolved Successfully'
            })
        }
    } )
})

router.get('/getProblems/:id', (req, res) => {
    problem.find({ posted_by: req.params.id }, (findError, findDocuments) => {
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
})
router.get('/getallProblems', (req, res) => {
    problem.find({}).populate('posted_by').exec((findError, findDocuments) => {
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
})




router.post('/newProblem', (req, res) => {
    let newProblem = new problem({
        posted_by: req.body.posted_by,
        content: req.body.content,
        posted_on:moment().format('YYYY-MM-DD HH:mm:ss Z'),
        resolved: false
    })

    newProblem.save((saveError, saveData) => {
        if (saveError) {
            res.json({
                success: false,
                message: 'DB Error'
            })
        } else {
            res.json({
                success: true,
                message: 'Problem Reported!'
            })
        }
    })
})

router.post('/delete', (req, res) => {
    problem.findByIdAndRemove( req.body.id, (removeError, removeDocs) => {
        if (removeError) {
            res.json({
                success: false,
                message: 'DB Error'
            })
        } else {
            res.json({
                success: true,
                message: 'Problem Deleted!'
            })
        }
    })
})
router.get('/deleteAllProblems', (req, res)=>{
    problem.remove({},(err, docs)=>{
        res.send("Finished")
    })
})

router.get('/deleteAllIncharges', (req, res)=>{
    const incharge = require('../Models/incharge')
    incharge.remove({},(err, docs)=>{
        res.send("Finished")
    })
})

module.exports = router
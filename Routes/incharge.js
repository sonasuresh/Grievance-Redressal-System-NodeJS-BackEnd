const express = require('express');
const router = express.Router();
const incharge = require('../Models/incharge')

router.get('/getProblems/:id', (req, res)=>{
    if(req.params.id != 'all'){
        incharge.find({incharge: req.params.id}).populate('incharge').populate('prob_id').populate({
            path: 'prob_id',
            populate: {
                path: 'posted_by'
            }
        }).exec((findError, findDocuments)=>{
            if(findError){
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
        incharge.find({}, (findError, findDocuments)=>{
            if(findError){
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

router.post('/assignInCharge', (req, res) => {
    let newInCharge = new incharge({
        prob_id: req.body.prob_id,
        incharge : req.body.incharge
    })

    newInCharge.save((saveError, saveData) => {
        if (saveError) {
            res.json({
                success: false,
                message: 'DB Error'
            })
        } else {
            res.json({
                success: true,
                message: 'In Charge Assigned!'
            })
        }
    })
})

router.post('/delete', (req, res) => {
    incharge.findByIdAndRemove( req.body.id, (removeError, removeDocs) => {
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

module.exports = router
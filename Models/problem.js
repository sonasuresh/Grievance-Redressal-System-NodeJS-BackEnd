const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProblemSchema = mongoose.Schema( {
    posted_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content:String,
    resolved: Boolean,posted_on:String,resolved_on:String
})

const problem = module.exports = mongoose.model('Problem', ProblemSchema);
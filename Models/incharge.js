const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const InChargeSchema = mongoose.Schema( {
    prob_id: {
        type: Schema.Types.ObjectId,
        ref: 'Problem'
    },
    incharge:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const inCharge = module.exports = mongoose.model('InCharge', InChargeSchema);
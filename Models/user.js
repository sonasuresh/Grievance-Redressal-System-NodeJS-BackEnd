const mongoose = require('mongoose');

const UserSchema = mongoose.Schema( {
    name: String,
    password: String,
    email_id: String,
    department: String,
    year: String,
    reg_no: Number,
    role: String
})


const User = module.exports = mongoose.model('User', UserSchema);
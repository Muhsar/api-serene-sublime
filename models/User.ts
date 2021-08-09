const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    password:{
        type: String
    },
    image:{
        type: String
    },
    full_name:{
        type: String
    },
    email:{
        type: String
    },
    created:{
        type: Date,
        default: Date.now
    }
})
const User = mongoose.model('User', UserSchema);
export default User;

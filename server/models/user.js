const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let validRoles={
    values:['ADMIN_ROLE', 'USER_ROLE'],
    message :'{VALUE} is not a valid role'
};

let userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:false
    },
    img:{
        type:String,
        required:false
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        enum: validRoles
    },
    status:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
});

userSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

userSchema.plugin(uniqueValidator,{
    message:'Email already in use'
});

module.exports = mongoose.model('User', userSchema);
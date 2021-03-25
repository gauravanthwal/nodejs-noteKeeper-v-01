require('./db');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note',
            required: true
        }
    ]

})

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function(){
    const token = await jwt.sign({_id: this._id}, process.env.SECRET_KEY)
    this.tokens = this.tokens.concat({token})
    
    await this.save()
    return token;
}

const User = mongoose.model('User', userSchema)
module.exports = User;
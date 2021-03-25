const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const auth = require('../middlewares/auth')
const router = express.Router()

router.get('/register', (req,res)=>{
    res.render('register')
})
router.get('/login', (req,res)=>{
    res.render('login')
})
router.post('/register', async(req,res)=>{
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        return res.send('All fields are required!')
    }
    await User.findOne({email: email}, (err, user)=>{
    if(user){
        return res.send('This Email is already Registered!')}
    })
    const newUser = new User({name, email, password})
    const token = await newUser.generateAuthToken()
    res.cookie('jwt',token,{
        httpOnly: true,
        expires: new Date(Date.now() + 1000*3600*24*30 )
    })
    await newUser.save()
    res.redirect('/notes')
})


router.post('/login', async(req,res)=>{
    const { email, password } = req.body;
    if(!email || !password){
        return res.send('All fields are required')
    }
    const user = await User.findOne({email: email})
        if(!user){
            return res.send('There is no user with that Email!')
        }
       if(!await bcrypt.compare(password, user.password)){
           return res.send('Password is not matching!')
       }
            const token = await user.generateAuthToken()
            res.cookie('jwt', token, {
                httpOnly: true,
                expires: new Date(Date.now() + 1000*3600*24*30)
            })
            res.redirect('/notes')
        
})

router.get('/logout', auth, async(req,res)=>{
    req.user.tokens = req.user.tokens.filter((currToken)=>{
        return currToken.token !== req.token
    })

    // req.user.tokens = []
    res.clearCookie('jwt')
    await req.user.save()
    res.redirect('/user/login')
})

module.exports = router;
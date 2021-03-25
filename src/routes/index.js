const router = require('express').Router()
const userRoute = require('./userRoute')
const notesRoute = require('./noteRoute')

router.get('/', (req,res)=>{
    res.render('index')
})

router.use('/user', userRoute)
router.use('/notes', notesRoute)
module.exports = router;
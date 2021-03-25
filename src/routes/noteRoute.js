const express = require("express");
const Note = require('../models/notes')
const auth = require('../middlewares/auth');
const Notes = require("../models/notes");
const router = express.Router();

router.get("/", auth, async(req,res)=>{

    const notes = await Notes.find({author: req.user._id})
    const userName = req.user.name;
    res.render('notes', { notes, sn: 1, userName })
});
router.post('/', auth, async(req,res)=>{
    const note = req.body.note;
    const newNote = new Note({
        note,
        author: req.user._id
    })
    await newNote.save((err, user)=>{
        if(err){
            console.log(err);
        }
        res.redirect('/notes')
    })
})

router.get('/delete/:id', async(req,res,next)=>{
    const id = req.params.id;
    await Note.findByIdAndDelete(id)
    res.redirect('/notes')
})
module.exports = router;

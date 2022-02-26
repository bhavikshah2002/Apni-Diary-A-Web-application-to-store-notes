const express=require('express');
const router = express.Router();
const Notes=require('../modules/Notes');
const fetchUser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//Route 1: Get all notes using : GET "api/auth/fetchallnotes".Login required->
router.get('/fetchallnotes',fetchUser,
 async(req,res)=>{
     try {
         const notes= await Notes.find({user:req.user.id})
         res.json(notes);
         
     } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 2: Add a new note using : POST "api/auth/addnote".Login required->
router.post('/addnote',fetchUser,[
    body('title','Enter valid title').isLength({min:3}),
    body('description','Description must be atleast 5 characters').isLength({min:5})
],async(req,res)=>{
    try {
        // If there are errors then return Bad request and the errors->
        const errors=validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
        const {title,description,tag}=req.body;
        const note=new Notes({
            title,description,tag,user: req.user.id
        })
        const savedNote=await note.save();
        res.json(savedNote);
        
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 3: Updating existing note using : PUT "api/notes/updatenotes".No login required->
router.put('/updatenotes/:id',fetchUser ,async (req,res)=>{
    try {
        const {title,description,tag}=req.body;
        // Create newNote object
        let newNote={};
        if(title){newNote.title=title}
        if(description){newNote.description=description}
        if(tag){newNote.tag=tag}

        //Find note to be updated and update it
        let note=await Notes.findById(req.params.id);
        if (!note) {
            console.log(note);
            return res.status(404).send("Not Found");
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Found");
        }
        note= await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 4: Deleting Note using : DELETE "api/notes/deletenote".No login required->
router.delete('/deletenote/:id',fetchUser ,async (req,res)=>{
    try {
        
        //Find note to be deleted and delete it
        let note=await Notes.findById(req.params.id);
        if (!note) {
            console.log(note);
            return res.status(404).send("Not Found");
        }
        //Allow deletion only if user owns this
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Found");
        }
        note= await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been deleted successfully",note:note});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports=router;
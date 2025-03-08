const express = require("express");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();

//ROUTE 1:Fetch all Notes using: GET "api/notes/fetchallnotes" .  Login required .

router.get(
  "/fetchallnotes",
  fetchuser,
  async (req, res) => {
    try {
      const notes = await Notes.find({ user: req.user.id });
      res.json(notes);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  }
);

//ROUTE 2:Add  Notes using: POST "api/notes/addnote" .  Login required .

router.post(
  "/addnote",
fetchuser,
  [
    body("title", "title must be of atleast 3 characters").isLength({ min: 3 }),
    body("description", "description must be of atleast 5 characters").isLength(
      { min: 5 }
    )
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const { title, description, tag } = req.body;
    try {
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await notes.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  }
);


//ROUTE 3:Update an existing Note using: PUT "api/notes/updatenote" .  Login required .

router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const {id,title,description,tag} = req.body;
    try {
        let newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found")
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
        res.json({note})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error");
    }

})


//ROUTE 4:Delete a Note using: GET "api/notes/deletenote" .  Login required .

router.get('/deletenote/:id',fetchuser,async(req,res)=>{
    try {
        const {id} = req.params;
        let note = await Notes.findById(id);
        if(!note){
            return res.status(404).send("Not Found")
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndDelete(id);
        res.json({"Success":"Note has been deleted",note:note})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error");
    }
})

module.exports = router;
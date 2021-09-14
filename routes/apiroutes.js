const router = require('express').Router();
const notes = require('../db/db.json');
const fs = require('fs');
const uuid = require('../helpers/uuid');
const { json } = require('express');
const { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } = require('constants');


// GET Route for retrieving all the feedback
router.get('/notes', (req, res) => {
  res.json(notes);
});

// POST Route for submitting feedback
router.post('/notes', (req, res) => {
    const id = uuid();
    const newID = {id}
    
    Object.assign(req.body, newID);
    console.log(req.body);

    notes.push(req.body);

    fs.writeFile(`./db/db.json`, JSON.stringify(notes), (err) =>
      err
        ? res.send(err)
        : res.json(notes)
    );  
});

module.exports = router;
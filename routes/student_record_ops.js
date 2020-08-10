const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

const StudentRecord = require('../models/studentrecord');
const db = require('../config/db');

mongoose.connect(db.url);
let con = mongoose.connection;
con.on('error',()=>{
    console.log('Connection error in studentrecord');
});

router.get('/studentRecordManagement',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/student_record_ops.html'));
});

router.get('/get-studentRecord',(req,res)=>{
    StudentRecord.find().then((response)=>{
        res.json(response);
    }).catch((err)=>{
        console.log(err);
    });
});

router.post('/add-studentRecord',(req,res)=>{
    const studentRecord = new StudentRecord({
        name: req.body.name,
        rollNo: req.body.rollNo,
        age: req.body.age
    });
    studentRecord.save().then((result)=>{
        res.json({
            'info':'Record added',
            'obj': result
        });
    });
});

router.post('/update-studentRecord',(req,res)=>{

    StudentRecord.updateOne({_id: req.body._id}, {name: req.body.name,
        rollNo: req.body.rollNo,
        age: req.body.age}, (err,doc)=>{
        if(err){
            console.log(err);
        }else{
            res.json({
                'info' : 'Record Updated',
                'obj' : doc
            });
            console.log(doc);
        }

    })
})


module.exports = router;

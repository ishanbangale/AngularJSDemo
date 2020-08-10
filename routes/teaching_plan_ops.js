const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));


const TeachingPlans = require('../models/teachingplan');
const db = require('../config/db');

mongoose.connect(db.url);
let con = mongoose.connection;
con.on('error', ()=>{
    console.log('Connection Error');
});

router.get('/teachingPlanManagement', (req, res)=>{
    res.sendFile(path.join(__dirname,'../public/teaching_plan_ops.html'))
});

router.get('/get-teachingPlan', (req,res)=>{
    TeachingPlans.find().then((response)=>{
        res.json(response);
    }).catch((err)=>{
        console.log(err);
    })
})

router.post('/add-teachingPlan',(req,res)=>{
    const teachingPlan = new TeachingPlans({
        lectureNumber: req.body.lectureNumber,
        topic: req.body.topic,
        bookRef: req.body.bookRef,
        co: req.body.co,
        methodology: req.body.methodology,
        subject: req.body.subject,
        year: req.body.year
    });
    teachingPlan.save().then((result)=>{
        res.json({
            'info':'Record added',
            'obj': result
        });
    });
});

router.post('/update-teachingPlan',(req,res)=>{

    TeachingPlans.updateOne({_id: req.body._id}, {lectureNumber: req.body.lectureNumber,
        topic: req.body.topic,
        bookRef: req.body.bookRef,
        co: req.body.co,
        methodology: req.body.methodology,
        subject: req.body.subject,
        year: req.body.year}, (err,doc)=>{
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

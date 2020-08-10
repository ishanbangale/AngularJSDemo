const mongoose = require('mongoose');

const StudentRecords = mongoose.Schema({
    name: {type: String, required: true},
    rollNo: {type: String, required: true},
    age: {type: String, required: true},
});

module.exports = mongoose.model('StudentRecords', StudentRecords);

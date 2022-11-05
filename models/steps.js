const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StepsSchema = new Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: String,
        required: true
    },
    totalSteps: {  
        type: Number,
        default: 0
    },
    startDate:  {  
        type: Date,
        default: null        
    },
    endDate:  {  
        type: Date,
        default: null
    }
}, { timestamps: true });

const steps = mongoose.model('step', StepsSchema);

module.exports = steps;

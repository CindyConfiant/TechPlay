const { Schema, model } = require("mongoose");

const questionSchema = new Schema(
  {
    title: {
        type: String, 
        required: true,
        unique : true
    },
    propositions: {
        type: [String], 
        required: true
    },
    solution : { 
        type: Number, //index parmi array de strings de propositions
        required: true
    }, 
    category: {
        type: String,
        enum:['HTML', 'JS', 'CSS', 'React'],
        required: true, 
    }, 
    difficulty : {
        type: Number,
        enum :[1, 2, 3], 
        default: 1,
        required: true
    },
    number: {
        type: String,
        enum: ['Toutes les questions', 'Question unique']
    }
  },
    {
        // `createdAt` et `updatedAt`
        timestamps: true,
    }
);
    
const Question = model("Question", questionSchema);

module.exports = Question;
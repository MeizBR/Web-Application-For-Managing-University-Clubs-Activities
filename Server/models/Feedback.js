// import the mongoose module
const mongoose = require("mongoose")

// define a schema that respresents the feedbacks collection in the PFA database
const FeedbackSchema = new mongoose.Schema({
    formationName : {
        type : String
    },
    formateurFirstName : {
        type : String
    },
    formateurLastName : {
        type : String
    },
    studentFirstName : {
        type : String
    },
    studentLastName : {
        type : String
    },
    studentSection : {
        type : String
    },
    studentEmail : {
        type : String
    },
    studentCode : {
        type : Number
    },
    feedbackContent : {
        type : String
    },
    feedbackRating : {
        type: Number,
        min: 1,
        max: 6,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
})

// put the schema into the model
const FeedbackModel = mongoose.model("Feedbacks", FeedbackSchema)

// export the model
module.exports = FeedbackModel
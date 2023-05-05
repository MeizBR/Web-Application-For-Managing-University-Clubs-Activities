// import the mongoose module
const mongoose = require("mongoose")

// define a schema that respresents the students collection in the PFA database
const StudentSchema = new mongoose.Schema({
    studentFirstName : {
        type : String
    },
    studentLastName : {
        type : String
    },
    studentEmail : {
        type : String
    },
    studentSection : {
        type : String
    },
    studentCode : {
        type : Number,
        required : true,
        unique : true,
    }
})

// put the schema into the model
const StudentModel = mongoose.model("Students", StudentSchema)

// export the model
module.exports = StudentModel
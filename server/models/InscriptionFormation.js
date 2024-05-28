// import the mongoose module
const mongoose = require("mongoose")

// define a schema that respresents the formations inscriptions collection in the PFA database
const InscriptionFormationSchema = new mongoose.Schema({
    formationName : {
        type : String
    },
    formationId: {
        type: Object,
        required: true
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
    studentEmail : {
        type : String
    },
    studentSection : {
        type : String
    },
    studentCode : {
        type : Number,
        unique: false,
        required : true,
    }
})

// put the schema into the model
const InscriptionFormationModel = mongoose.model("InscriptionFormation", InscriptionFormationSchema)

// export the model
module.exports = InscriptionFormationModel
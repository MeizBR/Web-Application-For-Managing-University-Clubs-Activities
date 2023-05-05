// import the mongoose module
const mongoose = require("mongoose")

// define a schema that respresents the workshops inscriptions collection in the PFA database
const InscriptionWorkshopSchema = new mongoose.Schema({
    workshopName : {
        type : String
    },
    workshopId: {
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
const InscriptionWorkshopModel = mongoose.model("InscriptionWorkshop", InscriptionWorkshopSchema)

// export the model
module.exports = InscriptionWorkshopModel
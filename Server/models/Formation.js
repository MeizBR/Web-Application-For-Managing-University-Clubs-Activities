// import the mongoose module
const mongoose = require("mongoose")

// define a schema that respresents the formations collection in the PFA database
const FormationSchema = new mongoose.Schema({
    formationName : {
        type : String
    },
    startDateFormation : {
        type : String
    },
    sessionsNumber : {
        type : Number
    },
    price : {
        type : Number
    },
    formateurFirstName : {
        type : String
    },
    formateurLastName : {
        type : String
    },
    formationImage : {
        type : String
    },
    formationMoreDetails : {
        type : String
    },
    formationCapacity : {
        type : Number
    },
    inscriptionsCount: {
        type: Number,
        default: 0
    },
})

// put the schema into the model
const FormationModel = mongoose.model("Formations", FormationSchema)

// export the model
module.exports = FormationModel
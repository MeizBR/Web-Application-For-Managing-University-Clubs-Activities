// import the mongoose module
const mongoose = require("mongoose")

// define a schema that respresents the workshops collection in the PFA database
const WorkshopSchema = new mongoose.Schema({
    workshopName : {
        type : String
    },
    workshopDate : {
        type : String
    },
    room : {
        type : String
    },
    startHour : {
        type : String
    },
    formateurFirstName : {
        type : String
    },
    formateurLastName : {
        type : String
    },
    workshopImage : {
        type : String
    },
    workshopCapacity : {
        type : Number
    },
    inscriptionsCount: {
        type: Number,
        default: 0
    },
})

// put the schema into the model
const WorkshopModel = mongoose.model("Workshops", WorkshopSchema)

// export the model
module.exports = WorkshopModel
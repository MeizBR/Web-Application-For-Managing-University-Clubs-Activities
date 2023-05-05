// import the mongoose module
const mongoose = require("mongoose")

// define a schema that respresents the sessions collection in the PFA database
const SessionsSchema = new mongoose.Schema({
    EventName : {
        type : String
    },
    EventId : {
        type: Object,
        required: true
    },
    EventRoom : {
        type : String
    },
    EventSession : {
        type : Number
    },
    EventStartHour : {
        type : String
    },
    EventEndHour : {
        type : String
    },
    EventNature : {
        type : String
    },
    formateurFirstName : {
        type : String
    },
    formateurLastName : {
        type : String
    },
})

// put the schema into the model
const SessionModel = mongoose.model("Session", SessionsSchema)

// export the model
module.exports = SessionModel
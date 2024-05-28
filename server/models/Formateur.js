// import the mongoose module
const mongoose = require("mongoose")

// define a schema that respresents the formateurs collection in the PFA database
const FormateurSchema = new mongoose.Schema({
    formateurfirstName : {
        type : String
    },
    formateurLastName : {
        type : String
    }
})

// put the schema into the model
const FormateurModel = mongoose.model("Formateurs", FormateurSchema)

// export the model
module.exports = FormateurModel
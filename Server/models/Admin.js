// import the mongoose module
const mongoose = require("mongoose")

// define a schema that respresents the admin
const AdminSchema = new mongoose.Schema({
    adminName : {
        type : String
    },
    password : {
        type : String
    }
})

// put the schema into the model
const AdminModel = mongoose.model("admin", AdminSchema)

// export the model
module.exports = AdminModel
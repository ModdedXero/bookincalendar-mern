const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clientsDataSchema = new Schema({
    placeholder: {
        type: String
    }
})

const ClientsData = mongoose.model("ClientsData", clientsDataSchema);

module.exports = ClientsData;
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    service: String,
    note: String,
})

const Contact = mongoose.model("contact",contactSchema);

module.exports = Contact;
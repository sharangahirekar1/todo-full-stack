const mongoose = require("mongoose");

const genaiSchema = new mongoose.Schema({
    prompt: {type: String},
    response: {type: String},
    userId: {type: mongoose.Schema.Types.ObjectId},
    created: {
        type: Date,
        default: Date.now,
      },

})

const GenAi = mongoose.model("prompt",genaiSchema);

module.exports = GenAi;
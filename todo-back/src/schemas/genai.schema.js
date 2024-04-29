const mongoose = require("mongoose");

const genaiSchema = new mongoose.Schema({
    prompt: {type: String},
    response: {type: String},
    modelName: {type: String},
    userId: {type: mongoose.Schema.Types.ObjectId},
    files: [],
    created: {
        type: Date,
        default: Date.now,
      },

})

const GenAi = mongoose.model("prompt",genaiSchema);

module.exports = GenAi;
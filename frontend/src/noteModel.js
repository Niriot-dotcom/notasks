const mongoose = require("mongoose");

const notesSchema = {
    title: String,
    contenido: String
}

const Note = mongoose.model("Note", notesSchema);
module.exports = Note;
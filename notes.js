fs_ops = require('./fs_ops')

let notes = new Map();
module.exports = {
    
    save: function (key, value) {
        notes.set(key, value);
        fs_ops.write_notes_to_disk(notes);
    },
    read: function (key) {
        return notes.get(key);
    },
    delete: function (key) {
        notes.delete(key);
    },
    notes: function () {
        notes_ = ""
        for (let [key, value] of notes.entries()) {
            notes_ += `${key} - ${value}`
        }
        return notes_
    },
    keys: function () {
        let keys = Array.from( notes.keys() );
        return `${keys}`
    },
    restore_from_disk() {
        notes = fs_ops.restore_notes_from_disk(notes);
    }

}
fs = require('fs')

module.exports = {
    write_notes_to_disk: function (map) {
        let json = JSON.stringify(Array.from(map.entries()));
        fs.writeFile('notes.json', json, function (err,data) {
            if (err) {
              return console.log(err);
            }
            //console.log(data);
          });
    },
    restore_notes_from_disk: function (map) {
        let json = fs.readFileSync('notes.json').toString();
        map = new Map(JSON.parse(json));
        return map;
    }
}
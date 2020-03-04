const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('22bdf220');
});

app.listen(80, () => console.log('Gator app listening on port 80!'));

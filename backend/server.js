const express = require('express');
const app = express();
const cors = require('cors');

const placeHolderGame = {
    "board":[
        [{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{}]
    ],
    "whitesTurn":true,
    "blackHasCastled":false,
    "whiteHasCastled":false,
}

app.use(cors({
    origin: "*"
}))

app.get('/getPlaceHolderGame', (req, res) => {
    res.header()
    res.status(200).send(placeHolderGame);
});

app.listen(4000);

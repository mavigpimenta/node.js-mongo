const express = require('express');
const router = express.Router();

router // get comum
    .get('/api/person/first', (req, res) => {
        console.log(8+5);
        return
    })

module.exports = router
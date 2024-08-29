const bodyParser = require('body-parser'); 
const cars = require('./desafio1');

module.exports = (app) => {
    app.use(
        bodyParser.json(), // transforma o body em json
        cars
    )
}
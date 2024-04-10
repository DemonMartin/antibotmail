const AntiBotMail = require('./dist/index.js');

(async () => {
    const API_KEY = ''
    const ABM = new AntiBotMail(API_KEY);

    // Get the balance
    console.log((await ABM.getBalance()));
})()
const AntiBotMail = require('./dist/index.js');

(async () => {
    const API_KEY = '1e75b8bf-09e6-4e98-b105-c2983d2a28a3'
    const ABM = new AntiBotMail(API_KEY);

    // Get the balance
    console.log((await ABM.getBalance()));
})()
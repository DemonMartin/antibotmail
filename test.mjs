import AntiBotMail from "./src/index.mjs";

(async() => {
    const API_KEY = ''
    const ABM = new AntiBotMail(API_KEY)

    // Get the balance
    console.log(await ABM.getBalance())

    // Order emails
    console.log(await ABM.orderEmail({
        mailcode: 'HOTMAIL_TEMP',
        quantity: 1
    }))

    // Order emails without additional information
    console.log(await ABM.orderEmailSimple({
        mailcode: 'HOTMAIL_TEMP',
        quantity: 1
    }))

    // Get the balance again
    console.log(await ABM.getBalance())
})();
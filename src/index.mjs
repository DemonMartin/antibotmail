import axios from 'axios';

class AntiBotMail {
    /**
     * @typedef {'HOTMAIL_TEMP'|'OUTLOOK_TEMP'|'OUTLOOK_TRUSTED'} MailCodes
     */

    /**
     * @typedef {'discord'} EmailListenerType - The type of the listener
     */

    constructor(apiKey) {
        this.apiKey = apiKey
        this.apiUrl = 'https://api.antibotmail.com'
        this.axios = axios.create({
            baseURL: this.apiUrl,
            timeout: 5 * 60 * 1000,
            validateStatus: status => true
        })
    }

    async #request(method, endpoint, data = null) {
        const headers = (method === 'get' ? { 'Accept': 'application/json' } : { 'Content-Type': 'application/json' })

        return (await this.axios({
            method,
            url: endpoint,
            data,
            headers
        })).data;
    }

    /**
     * @typedef {Object} BuyOptions - The options of the purchase
     * @property {MailCodes} mailcode - The mailcode of the email
     * @property {number} quantity - The quantity of the email
     */

    /**
     * @typedef {Object} BuyResponse - The response of the purchase
     * @property {boolean} success - Whether the request was successful
     * @property {Object} [data] - The data of the purchase
     * @property {string} [message] - The error message of the purchase
     */

    /**
     * API to purchase the Emails
     * @param {BuyOptions} options 
     * @returns {Promise<BuyResponse>}
     */
    async orderEmail(options) {
        if (!options.mailcode) throw new Error('Mailcode is required')
        if (!options.quantity) throw new Error('Quantity is required')

        return await this.#request('post', '/api/mail/buy', {
            'X-ABM-ApiKey': this.apiKey,
            ...options
        })
    }

    /**
     * @typedef {Object} SimpleBuyResponse - The response of the purchase
     * @property {boolean} success - Whether the request was successful
     * @property {string[]} [emailDetails] - The emails in EMAIL:PASSWORD format
     * @property {string} [message] - The error message of the purchase
     */

    /**
     * API to purchase the Emails without additional information
     * @param {BuyOptions} options 
     * @returns {Promise<SimpleBuyResponse>}
     */
    async orderEmailSimple(options) {
        if (!options.mailcode) throw new Error('Mailcode is required')
        if (!options.quantity) throw new Error('Quantity is required')

        return await this.#request('post', '/api/mail/buy_simple', {
            'X-ABM-ApiKey': this.apiKey,
            ...options
        })
    }

    /**
     * @typedef {Object} BalanceResponse - The response of the balance
     * @property {boolean} success - Whether the request was successful
     * @property {number} [balance] - The balance of the account
     * @property {string} [message] - Error message
     */

    /**
     * API to get the balance of the account
     * @returns {Promise<BalanceResponse>}
     */
    async getBalance() {
        return await this.#request('get', '/api/balance/' + this.apiKey)
    }

    /**
     * @typedef {Object} EmailListenerOptions
     * @property {EmailListenerType} type - The type of the listener
     */

    /**
     * @typedef {Object} EmailListenerResponse
     * @property {boolean} success - Whether the request was successful
     * @property {string} [html] - The HTML content of the email
     * @property {string} [message] - The error message
     */

    /**
     * API to listen to the emails
     * @param {EmailListenerOptions} options
     * @returns {Promise<EmailListenerResponse>}
     * @deprecated This method is unstable and might not work as expected, use IMAP instead
     */
    async listenEmail(options) {
        const listenUrl = new URL('/api/email_listener/' + options.type, true)
        listenUrl.searchParams.append('email', options.email)
        listenUrl.searchParams.append('password', options.password)
        listenUrl.searchParams.append('timeout', options?.timeout ?? 60)

        return await this.#request('get', listenUrl.href)
    }
}

export default AntiBotMail;
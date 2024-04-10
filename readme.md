# AntiBotMail

This project provides an interface to interact with the AntiBotMail API.
Website: https://antibotmail.com/
Docs: https://docs.antibotmail.com/

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [License](#license)
- [Disclaimer](#disclaimer)
- [Contributing](#contributing)

## Installation

To install the project, run the following command:

```sh
npm install antibotmail
```

## Usage

First, import the `AntiBotMail` module

```javascript
import AntiBotMail from 'antibotmail';
// or
const AntiBotMail = require('antibotmail');
```

Then, create an instance of the class, passing your API key as a parameter to the constructor.

```javascript
const antiBotMail = new AntiBotMail('your-api-key');
```

You can now use the instance to interact with the API. For example, to order an email:

```javascript
const options = {
  mailcode: 'HOTMAIL_TEMP',
  quantity: 1
};

antiBotMail.orderEmail(options)
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

## API

The `AntiBotMail` class provides the following methods:

- `orderEmail(options: BuyOptions): Promise<BuyResponse>`: Orders an email. The options object should have `mailcode` and `quantity` properties.

- `orderEmailSimple(options: BuyOptions): Promise<SimpleBuyResponse>`: Orders an email without additional information. The options object should have `mailcode` and `quantity` properties.

- `getBalance(): Promise<BalanceResponse>`: Responds with the balance of the API Key.

- `listenEmail(options: EmailListenerOptions): Promise<EmailListenerResponse>`: API interface to use the `Email Listener` feature. 
**The API is unstable and might not work as expected, use IMAP instead.**

## License

This project is licensed under the MIT License.

## Disclaimer

I have neither created ABM nor am I in anyway associated with them.

## Contributing

If you'd like to contribute, please fork the repository. Pull requests are warmly welcome.
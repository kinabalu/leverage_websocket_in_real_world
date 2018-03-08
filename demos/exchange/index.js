const GDAX = require("gdax");
// const publicClient = new GDAX.PublicClient();

const callback = (error, response, data) => {
    if (error)
        return console.dir(error);

    return console.dir(data);
}

const passPhrase = "";

const apiKey = "";

const base64secret = "";

const apiURI = 'https://api.gdax.com';

const authenticatedClient = new GDAX.AuthenticatedClient(apiKey, base64secret, passPhrase, apiURI);

// authenticatedClient.getAccounts(callback);
// publicClient.getProducts(callback);
// publicClient.getCurrencies(callback);

const ETH_USD = 'ETH-USD';

const websocket = new GDAX.WebsocketClient([ETH_USD]);
const websocketCallback = (data) => console.dir(data);

websocket.on('message', websocketCallback);

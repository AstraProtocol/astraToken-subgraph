/*
 * This truffle script will deploy your smart contracts to your ASTRA Chain.
 *
 *  @param {String} privateKey - Provide your wallet private key.
 *  @param {String} provider - Provide your ASTRA endpoint address.
 */

let HDWalletProvider = require('truffle-hdwallet-provider');
require('dotenv').config();

//https://astra.network/developers/ for ASTRA documentation
//Provide your wallet private key
let privateKey = process.env.PRIVATE_KEY;

//Provide your ASTRA endpoint address
let astra = process.env.ASTRA_CHAIN;

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
    astra: {
      provider: () => new HDWalletProvider(privateKey, astra),
      gasPrice: 0,
      network_id: '*',
    },
  },
  compilers: {
    solc: {},
  },
};

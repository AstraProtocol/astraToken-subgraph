const Web3 = require('web3');
require('dotenv').config();

const HDWalletProvider = require('truffle-hdwallet-provider');

/**
 * TO DO: Add File Storage
 */
// const Filestorage = require('@astranetwork/filestorage.js');
// let filestorage = new Filestorage(astraEndpoint);

const astraEndpoint = process.env.ASTRA_CHAIN;

var web3Provider = new HDWalletProvider(process.env.PRIVATE_KEY, astraEndpoint); //new Web3.providers.HttpProvider('http://127.0.0.1:8545');
var web3Ganache = new Web3(web3Provider);

const provider = new HDWalletProvider(process.env.PRIVATE_KEY, astraEndpoint);
const web3 = new Web3(provider);
console.log('Endpoint:', astraEndpoint);

module.exports = { web3, web3Ganache };

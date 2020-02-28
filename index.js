require('dotenv').config();
const Tezos = require('@taquito/taquito');
const tezos = Tezos.Tezos;
const exampleContract = 'KT1LjpCPTqGajeaXfLM3WV7csatSgyZcTDQ8';

// Set Provider
//tezos.setProvider({ rpc: process.env.MAINNET });
tezos.setProvider({ rpc: process.env.TESTNET });

// Configure a Signer (required for Contract interactions)
// Any wallet private key will do
tezos.importKey(process.env.PRIVATEKEY);

// Check an account balance
const getBalance = async (address) => {
  let worker = await tezos.tz.getBalance(address);
  return worker;
};

const getContractInstance = async (contract) => {
  let contractInstance = await tezos.contract.at(contract);
  return contractInstance;
};

// Test #1: Load account balances
let accounts = [
  'tz1cmWyycuCBdHVHVCnXbRLdKfjNSesRPJyz', // 0 balance
  'tz1NAozDvi5e7frVq9cUaC3uXQQannemB8Jw'  // Has $$$
],
accountBalance;

let t = [getBalance(accounts[1]), getBalance(accounts[0])];

console.log('t =>', t);

t[0].then((balance) => {
  accountBalance = balance.toNumber() / 1000000;
  console.log(`${balance.toNumber() / 1000000} ꜩ`);
}).catch((error) => {
  console.log('ERROR: => ' + JSON.stringify(error));
  accountBalance = 'err';
});

t[1].then((balance) => {
  accountBalance = balance.toNumber() / 1000000;
  console.log(`${balance.toNumber() / 1000000} ꜩ`);
}).catch((error) => {
  console.log('ERROR LOADING ACCOUNT BALANCE: => ' + JSON.stringify(error));
  accountBalance = 'err';
});

// Test #2: Load contract and perform interaction
let g = getContractInstance(exampleContract);
g.then(async (contract) => {
  console.log('contract', contract);
  let i = 7;
  let result = await contract.methods.increment(i).send();
  console.log('Interaction =>', result);
}).catch((error) => {
  console.log('ERROR INCREMENTING STORAGE: =>', error);
});
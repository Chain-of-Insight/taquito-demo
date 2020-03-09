import { TezBridgeSigner } from '@taquito/tezbridge-signer';
import { Tezos } from '@taquito/taquito';

const mountProvider = function () {
  Tezos.setProvider({
    rpc: process.env.TESTNET,
    signer: new TezBridgeSigner()
  });

  console.log('Tezos =>', Tezos);
};

const getBalance = async (address) => {
  let worker = await tezos.tz.getBalance(address);
  return worker;
};

const exampleContract = 'KT1LjpCPTqGajeaXfLM3WV7csatSgyZcTDQ8';

const getContractInstance = async (contract) => {
  let contractInstance = await Tezos.contract.at(contract);
  return contractInstance;
};

const makeExampleTransaction = async function () {
  let g = getContractInstance(exampleContract);

  g.then(async (contract) => {
    console.log('contract', contract);
    let i = 7;
    let result = await contract.methods.increment(i).send();
    console.log('Interaction =>', result);
  }).catch((error) => {
    console.log('ERROR INCREMENTING STORAGE: =>', error);
  });
};

module.exports = {
    Tezos: Tezos,
    mountProvider: mountProvider,
    getBalance: getBalance,
    makeExampleTransaction: makeExampleTransaction
};
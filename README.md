
# XTZ DApp test

### Install dependencies

```
$ npm install
```

### Configure your environemt:

```
$ cp env.example .env
```

(Now edit the .env file and add a valid private key)

### Get some testnet XTZ for your wallet:
https://t.me/tezos_faucet_bot

### Run unit tests:

```
$ npm start

```

### Example output:

```

// TEST #1: Getting account balances
1 ꜩ    // Testnet balance of address #1
100 ꜩ  // Testnet balance of address #2

// TEST #2: Incrementing a storage variable in a Tezos Smart Contract
TransactionOperation {
  hash: 'ooajo2ZAQMtpUf5W91krhEK63XeH3JPvZZ7Z5qCPEwmU1ssdhez',
  raw:
   { opbytes: '11819b59df9cfb0ae7d6aa2016e3b6ce045bdf3f36fe7f3f926609b6845bac596b00bbe4aa78aa3c92543de622739ca7cb44451c52ff8c0bd9a520e85200009e294ddc08
4cc9bc75c225b537f36e0d89fd42cde19daedeca6eaa07b19b98916c00bbe4aa78aa3c92543de622739ca7cb44451c52ffe20edaa520ed760000018557731d40545f2ad816f5613415655c4
d1e1b3e00ffff09696e6372656d656e74000000020007269fa693010bba397a0eaf18b980d8667586c6b7f19737237dc58f99ab6830f98b1f73210654230915c803577401c3d0faecf12d1a
37a6afc4feed7fa5b05e06',
     opOb:
      { branch: 'BKqzWXjE1LABXq2NKaNcFjcKudXPvK5BWMDd1EYrPm1XeRbhvCB',
        contents: [Array],
        protocol: 'PsBabyM1eUXZseaJdmXFApDSBqj8YBfwELoxZHHW77EMcAbbwAS',
        signature: 'edsigtcrqi9jN4vmUZNxGztgtb3XkVcbA3pzmTvkkr86s27uQZY7ZyCzhroJWa1oUiruqhVvfkmPs2VAEosqEod6AJoWjfZRC7x' },
     counter: 529112 },
  results:
   [ { kind: 'reveal',
       source: 'tz1cmWyycuCBdHVHVCnXbRLdKfjNSesRPJyz',
       fee: '1420',
       counter: '529113',
       gas_limit: '10600',
       storage_limit: '0',
       public_key: 'edpkuqsxQkdB4xUt9fPorHYmp6oTTx5NW6zBTd79kRc6wys1UEFuan',
       metadata: [Object] },
     { kind: 'transaction',
       source: 'tz1cmWyycuCBdHVHVCnXbRLdKfjNSesRPJyz',
       fee: '1890',
       counter: '529114',
       gas_limit: '15213',
       storage_limit: '0',
       amount: '0',
       destination: 'KT1LjpCPTqGajeaXfLM3WV7csatSgyZcTDQ8',
       parameters: [Object],
       metadata: [Object] } ],
  context:
   Context {
     _rpcClient:
      RpcClient {
        url: 'https://api.tez.ie/rpc/babylonnet',
        chain: 'main',
        httpBackend: HttpBackend {} },
     _signer: InMemorySigner { _key: [Object] },
     _proto: undefined,
     _config:
      { confirmationPollingIntervalSecond: 10,
        defaultConfirmationCount: 1,
        confirmationPollingTimeoutSecond: 180 },
     _forger: RpcForger { context: [Object] },
     _injector: RpcInjector { context: [Object] } },
  '_pollingConfig$':
   ReplaySubject {
     _isScalar: false,
     observers: [ [Object] ],
     closed: false,
     isStopped: false,
     hasError: false,
     thrownError: null,
     scheduler: undefined,
     _events: [],
     _infiniteTimeWindow: true,
     _bufferSize: 1,
     _windowTime: Infinity,
     next: [Function] },
  _currentHeadPromise: undefined,
  'currentHead$': Observable { _isScalar: false, _subscribe: [Function] },
  'polling$': Observable { _isScalar: false, _subscribe: [Function] },
  'confirmed$':
   Observable {
     _isScalar: false,
     source: Observable { _isScalar: false, source: [Object], operator: [Object] },
     operator: [Function: shareReplayOperation] },
  _foundAt: Infinity,
  params:
   { kind: 'transaction',
     fee: 1890,
     gas_limit: 15213,
     storage_limit: 0,
     amount: '0',
     destination: 'KT1LjpCPTqGajeaXfLM3WV7csatSgyZcTDQ8',
     parameters: { entrypoint: 'increment', value: [Object] } },
  source: 'tz1cmWyycuCBdHVHVCnXbRLdKfjNSesRPJyz' }
```


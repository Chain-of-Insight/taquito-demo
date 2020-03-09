<template>
  <div>
    <p v-if="address">
      <strong>Your address: </strong>
      <span>{{ address }} </span>
      <span class="balance-status" v-if="currentBalance">({{ currentBalance }} ꜩ)</span>
    </p>
    <p v-if="network">
      <strong>Current network: </strong>
      <span>{{ network }}</span>
    </p>
    <div class="container">
    <h1>{{ message }}</h1>
      <div class="action-wrapper">
        <!-- CONNECT A WALLET -->
        <div v-if="currentState == UNCONNECTED_STATE">
          <ul>
            <li @click="connectUser()">
              <span class="balance-action action get">Connect</span>
            </li>
          </ul>
        </div>
        <!-- HOME OPTIONS -->
        <div v-if="currentState == HOME_STATE">
          <ul>
            <li @click="setState(GET_TEZBRIDGE_BALANCE_STATE)">
              <span class="balance-action action get">Get XTZ Balance</span>
            </li>
            <li @click="setState(DO_TEZBRIDGE_TX_STATE)">
              <span class="tx-action action do">Do Contract Transaction</span>
            </li>
          </ul>
        </div>
        <!-- GET BALANCE OPTIONS -->
        <div v-if="currentState == GET_TEZBRIDGE_BALANCE_STATE">
          <ul>
            <li @click="setState(HOME_STATE)">
              <a class="tx-action action do">Back</a>
            </li>
          </ul>
          <button class="balance-action action get" @click="doAction(ACTION_GET_BALANCE)">Get XTZ Balance</button>
          <div v-if="currentBalance">
            <p>
              <strong>Your XTZ Balance: </strong>
              <span class="balance-status">({{ currentBalance }} ꜩ)</span>
            </p>
          </div>
        </div>
        <!-- DO CONTRACT INTERACTION OPTIONS -->
        <div v-if="currentState == DO_TEZBRIDGE_TX_STATE">
          <ul>
            <li @click="setState(HOME_STATE)">
              <a class="tx-action action do">Back</a>
            </li>
          </ul>
          <button class="tx-action action do" @click="doAction(ACTION_DO_TX)">Do Contract Transaction</button>
          <div class="loading" v-if="loading">
            <img class="loading" src="./assets/img/loading.gif">
          </div>
          <pre class="data" v-if="transactionData">{{ transactionData }}</pre>
          <pre class="error" v-if="errorMessage">{{ errorMessage }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  Tezos,
  mountProvider,
  getBalance,
  exampleContract,
  getContractInstance
} from './tezProvider';

export default {
  data: () => ({
    UNCONNECTED_STATE: -1,
    HOME_STATE: 0,
    GET_TEZBRIDGE_BALANCE_STATE: 1,
    DO_TEZBRIDGE_TX_STATE: 2,
    ACTION_GET_BALANCE: 0,
    ACTION_DO_TX: 1,
    states: [-1,0,1,2],
    currentState: -1,
    actions: [0,1],
    Tezos: Tezos,
    mountProvider: mountProvider,
    getBalance: getBalance,
    exampleContract: exampleContract,
    getContractInstance: getContractInstance,
    network: null,
    address: null,
    currentBalance: null,
    transactionData: null,
    loading: false,
    errorMessage: null
  }),
  mounted: async function () {
    await this.mountProvider();
    this.network = "Babylonnet";
  },
  methods: {
    setState: function (newState) {
      if (this.states.indexOf(newState) > -1) {
        this.currentState = newState;
      } else {
        console.log('indexOf(states) =>', [newState, this.states, this.states.indexOf(newState)]);
      }
    },
    connectUser: async function () {
      this.address = await tezbridge.request({method: 'get_source'});
      if (typeof this.address == 'string') {
          if (this.address.length === 36) {
            console.log('User XTZ Address =>', this.address);
            this.setState(this.HOME_STATE);
          }
      }
    },
    doAction: async function (action) {
      console.log('Action =>', action);
      if (this.actions.indexOf(action) > -1) {
        switch (action) {
          // GET BALANCE
          case this.ACTION_GET_BALANCE:
            let balance = await this.getBalance(this.address);
            this.currentBalance = Number(balance) / 1000000;
            break;
          // DO DEMO TX
          case this.ACTION_DO_TX:
            this.loading = true;
            this.transactionData = null;
            this.errorMessage = null;
            await this.getContractInstance(exampleContract);
            let g = getContractInstance(exampleContract);
            g.then(async (contract) => {
                console.log('contract', contract);
                let i = 7;
                let result = await contract.methods.increment(i).send();
                console.log('Interaction =>', result);
                this.loading = false;
                this.transactionData = String(result);
            }).catch((error) => {
                console.log('ERROR INCREMENTING STORAGE: =>', error);
                this.loading = false;
                this.errorMessage = 'ERROR INCREMENTING STORAGE: ' + String(error);
            });
            break;
          default:
            return;
        }
      } else {
        console.log('indexOf(actions) =>', [action, this.actions, this.actions.indexOf(action)]);
      }
    }
  },
  computed: {
    message: function () {
      if (isNaN(this.currentState)) {
          return "Choose an action";
      } else {
          switch (this.currentState) {
            // UNCONNECTED_STATE
            case this.UNCONNECTED_STATE:
              return "Connect your wallet to the DApp using TezBridge"
            // HOME_STATE
            case this.HOME_STATE:
              return "Choose an action";
            // GET BALANCE STATE
            case this.GET_TEZBRIDGE_BALANCE_STATE:
              return "Get your Babylonnet XTZ balance using TezBridge";
            // DO DEMO TX STATE
            case this.DO_TEZBRIDGE_TX_STATE:
              return "Do a contract transaction on Babylonnet using TezBridge";
            // DEFAULT HOME
            default:
              return "Choose an action";
          }
      }
    },
  }
};
</script>

<style scoped>
  .container {
    width: 600px;
    margin: 50px auto;
    text-align: center;
  }
  ul {
      list-style: none;
      display: inline-block;
  }
  li, button {
    padding: 1rem;
    margin: 1rem;
    background: aliceblue;
    cursor: pointer;
  }
  pre {
    padding: 2rem;
    border-radius: 4px;
    white-space: pre-line;
  }
  pre.data {
    background: #dcdcdc;
    color: #333333;
  }
  pre.error {
    background: #f44336;
    color: white;
  }
</style>
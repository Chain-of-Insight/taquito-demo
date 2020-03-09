<template>
  <div class="container">
    <h1>{{ message }}</h1>
    <p v-if="address">
      <strong>Your address: </strong>
      <span>{{ address }}</span>
    </p>
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
        <button class="balance-action action get">Get XTZ Balance</button>
      </div>
      <!-- DO CONTRACT INTERACTION OPTIONS -->
      <div v-if="currentState == DO_TEZBRIDGE_TX_STATE">
        <ul>
          <li @click="setState(HOME_STATE)">
            <a class="tx-action action do">Back</a>
          </li>
        </ul>
        <button class="tx-action action do">Do Contract Transaction</button>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  Tezos, 
  mountProvider, 
  getBalance, 
  makeExampleTransaction 
} from './tezProvider';

export default {
  data: () => ({
    UNCONNECTED_STATE: -1,
    HOME_STATE: 0,
    GET_TEZBRIDGE_BALANCE_STATE: 1,
    DO_TEZBRIDGE_TX_STATE: 2,
    states: [-1,0,1,2],
    currentState: -1,
    actions: [0,1],
    Tezos: Tezos,
    mountProvider: mountProvider,
    getBalance: getBalance,
    makeExampleTransaction: makeExampleTransaction,
    address: null
  }),
  mounted: async function () {
    await this.mountProvider();
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
      if (this.actions.indexOf(action) > -1) {
        switch (action) {
          // GET BALANCE
          case 0:
            //let balance = await 
            break;
          // DO DEMO TX
          case 1:
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
            case -1:
              return "Connect your wallet to the DApp using TezBridge"
            // HOME_STATE
            case 0:
              return "Choose an action";
            // GET BALANCE STATE
            case 1:
              return "Get your Babylonnet XTZ balance using TezBridge";
            // DO DEMO TX STATE
            case 2:
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
</style>
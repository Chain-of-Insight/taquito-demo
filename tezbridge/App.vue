<template>
  <div class="container">
    <h1>{{ message }}</h1>
    <div class="action-wrapper">
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
          <li>
            <a class="tx-action action do" @click="setState(HOME_STATE)">Back</a>
          </li>
        </ul>
        <button class="balance-action action get">Get XTZ Balance</button>
      </div>
      <!-- DO CONTRACT INTERACTION OPTIONS -->
      <div v-if="currentState == DO_TEZBRIDGE_TX_STATE">
        <ul>
          <li>
            <a class="tx-action action do" @click="setState(HOME_STATE)">Back</a>
          </li>
        </ul>
        <button class="tx-action action do">Do Contract Transaction</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHome',
  data: () => ({
    HOME_STATE: 0,
    GET_TEZBRIDGE_BALANCE_STATE: 1,
    DO_TEZBRIDGE_TX_STATE: 2,
    states: [0,1,2],
    currentState: 0,
    actions: null
  }),
  mounted: async function () {},
  methods: {
    setState: function (newState) {
      if (this.states.indexOf(newState) > -1) {
        this.currentState = newState;
      } else {
        console.log('indexOf =>', [newState, this.states, this.states.indexOf(newState)]);
      }
    }
  },
  computed: {
    message: function () {
      if (isNaN(this.currentState)) {
          return "Choose an action";
      } else {
          switch (this.currentState) {
            case 0:
              return "Choose an action";
            case 1:
              return "Get your Babylonnet XTZ balance using TezBridge";
            case 2:
              return "Do a contract transaction on Babylonnet using TezBridge";
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
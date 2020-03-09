import Vue from 'vue';
import App from './App';

new Vue({
  el: '#app',
  render: h => h(App),
  mounted: async function () {
    console.log('App mounted');
  }
});
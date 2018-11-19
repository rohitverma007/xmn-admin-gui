<template>
  <div v-if="showBalanceToken">
    <h3>Balance {{tokenData["availableBalance"]}} {{tokenData["symbol"]}}</h3>
  </div>
</template>

<script>
import { rpc } from "../mixins/rpc"

export default {
  props: ['showBalanceToken'],
	mixins: [rpc],
  data: function(){
    return {
      tokenData: {},
      allBalances: []
    }
  },
  methods: {
    handleRpcError: function(error){
      console.log(error.message)
    },
    getBalance: function(symbol){
      return this.allBalances.filter(balance => balance.symbol == "XMN")[0];
    }
  },
  created: function(){
    this.getUserBalance().then((result) => {
      this.allBalances = result;
      this.$emit("get-all-balances", this.allBalances);
      this.tokenData = this.getBalance(this.showBalance);
    }, this.handleRpcError)
  }
}
</script>

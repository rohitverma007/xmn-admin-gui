<template>
  <div>
    <h5>{{filterByToken}} Withdrawal History</h5>
    <b-table bordered hover :items="withdrawalHistory"></b-table>
  </div>
</template>

<script>
import { rpc } from "../mixins/rpc"

export default {
  props: ['filterByToken'],
  mixins: [rpc],
  data: function(){
    return {
      withdrawalHistory: []
    }
  },
  methods: {
    handleRpcError: function(error){
      console.log(error.message)
    },
  },
  created: function(){
    this.getWithdrawalHistory().then((result) => {
      this.withdrawalHistory = result;
      if(this.filterByToken){
        this.withdrawalHistory = this.withdrawalHistory.filter(
          withdrawalData => withdrawalData.symbol == this.filterByToken
          )
      }
    }, this.handleRpcError)
  }
}
</script>

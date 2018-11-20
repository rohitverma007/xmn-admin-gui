<template>
  <div class="container">
    <h5>XMN Generation History</h5>
    <b-table bordered hover :items="generationHistory"></b-table>
  </div>
</template>

<script>
import { rpc } from "../mixins/rpc"

export default {
  mixins: [rpc],
  data: function(){
    return {
      generationHistory: []
    }
  },
  methods: {
    handleRpcError: function(error){
      console.log(error.message)
    },
  },
  created: function(){
    this.getGenerationHistory().then((result) => {
      this.generationHistory = result;
    }, this.handleRpcError)
  }
}
</script>

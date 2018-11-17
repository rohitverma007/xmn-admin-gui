<template>
  <div>
    <h3>Balance {{xmnBalance}} XMN</h3>
  </div>
</template>

<script>
import { rpc } from "../mixins/rpc"

export default {
	mixins: [rpc],
  data: function(){
    return {
    	xmnBalance: 0
    }
  },
  created: function(){
    this.getUserBalance().then((result) => {
      this.xmnBalance = result;
    }, this.handleRpcError)
  }
}
</script>

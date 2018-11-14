<template>
  <div>
    <h2>Generate Token</h2>
    <h3>Balance: {{xmnBalance}} XMN</h3>
  </div>
</template>

<script>
export default {
  data () {
    return {
      xmnBalance: 0
    }
  },
  created: function(){
  	this.xmnBalance = 100;
  }
}
</script>

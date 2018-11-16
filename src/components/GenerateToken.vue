<template>
  <div>
    <h3>Balance: {{xmnBalance}} XMN</h3>
    <p>Exchange XMN Token:</p>
    <div class="row">
      <div class="row col-6 mx-auto">
        <div class="col-4">
          Token Amount:
        </div>
        <div class="col-4">
          Rep:
        </div>
        <div class="col-4">
          You Get:
        </div>
      </div>
    </div>
    <div class="row">
      <div class="row col-6 mx-auto">
        <div class="col-4">
          <b-form-input v-model="xmnAmount"
                        v-on:input="updateRepAmount"
                        type="text"
                        placeholder="Amount">
          </b-form-input>
        </div>
        <div class="col-4">
          <b-form-select
                        v-model="selectedToken"
                        v-on:input="updateRepAmount"
                        :options="tokenRepOptions"
                        id="inlineFormCustomSelectPref">
            <option slot="first" :value="null">Choose Rep</option>
          </b-form-select>
        </div>
        <div class="col-4 text-center mt-2">
          {{repAmount}} {{selectedToken}}
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-6 mx-auto">
        <b-button variant="primary">Convert</b-button>
      </div>
    </div>  
  </div>
</template>

<script>
import { rpc } from "./mixins/rpc"

export default {
  mixins: [rpc],
  data () {
    return {
      xmnAmount: 0,
      repAmount: 0,
      xmnBalance: 0,
      selectedToken: null,
      tokenReps: [],
      tokenRepOptions: []
    }
  },
  methods: {
    updateRepAmount: function(){
      this.repAmount = this.xmnAmount*this.selectedTokenRate();
    },
    selectedTokenDetails: function(){
      return this.tokenReps.filter(function(tokenRep){
        return tokenRep.symbol == this.selectedToken;
      }.bind(this))[0]
    },
    selectedTokenRate: function(){
      return this.selectedTokenDetails()["exchangeRate"]
    },
    generateTokenRepOptions: function(){
      for(let tokenRep of this.tokenReps){
        this.tokenRepOptions.push({
          "value": tokenRep.symbol,
          "text": tokenRep.name
        })
      }
    }
  },
  created: function(){
    this.xmnBalance = this.getUserBalance();
    this.tokenReps = this.getRepresentations();
    this.generateTokenRepOptions()
  }
}
</script>

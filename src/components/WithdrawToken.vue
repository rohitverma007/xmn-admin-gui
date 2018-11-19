<template>
  <div>
    <h2 class="mb-3">Wallet</h2>
    <balance v-on:get-all-balances="updateBalances"></balance>
    <b-table hover :items="balances" :fields="fields">
      <template slot="action" slot-scope="row">
        <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
        <b-button class="mr-2" variant="outline-primary" size="sm" @click.stop="toggleDetails(row)">
         Withdraw
       </b-button>
        <b-button class="mr-2" variant="outline-primary" size="sm" to="trade">
         Trade
       </b-button>
     </template>
     <template slot="row-details" slot-scope="row">
      <b-card>
        <b-row>
          <b-col>
            <h5 class="text-left pl-3">Withdraw {{row.item.symbol}}</h5>
            <b-row class="mb-2 mt-4">
              <b-col sm="3" class="text-sm-right">Token Amount:</b-col>
              <b-col cols="6">
                <b-form-input v-model="tokenAmount"
                v-on:input="updateTokenBalance(row.item)"
                type="text"
                placeholder="Amount">
              </b-form-input>
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">Withdrawal Fee:</b-col>
            <b-col cols="6">{{ row.item.withdrawalFee }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">You Get:</b-col>
            <b-col cols="6">{{ tokenActualAmount }}</b-col>
          </b-row>
          <b-row>
            <b-col class="mt-3" cols="6">
              <b-button size="sm" variant="primary" @click="toggleDetails(row)" >Submit</b-button>
              <b-button size="sm" variant="outline-secondary" @click="toggleDetails(row)">Cancel</b-button>
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <withdrawal-history :filterByToken="row.item.symbol"></withdrawal-history>
        </b-col>
      </b-row>
    </b-card>
  </template>
</b-table>
</div>
</template>

<script>
import { rpc } from "./mixins/rpc"
import Balance from './shared/Balance'
import WithdrawalHistory from './shared/WithdrawalHistory'
export default {
  mixins: [rpc],
  components: {
    Balance,
    WithdrawalHistory
  },
  data () {
    return {
      balances: [],
      fields: ["symbol", "availableBalance", "pendingBalance", "action"],
      tokenActualAmount: 0,
      tokenAmount: 0,
      previousRow: null
    }
  },
  methods: {

    // click on button -> turn off previous row. turn on current row. set previous row to current row.
    toggleDetails: function(row){
      if(this.previousRow && this.previousRow.item.symbol != row.item.symbol){
        this.balances.filter(balance => balance.symbol == this.previousRow.item.symbol)[0]["_showDetails"] = false;
      }
      row.toggleDetails();
      this.previousRow = row;
      this.resetTokenValues();
    },
    resetTokenValues: function(){
      this.tokenAmount = 0;
      this.tokenActualAmount = 0;
    },
    updateTokenBalance: function(token){
      this.tokenActualAmount = parseFloat((this.tokenAmount - token.withdrawalFee).toFixed(8));
    },
    updateBalances: function(balances){
      this.balances = balances;
    },
    handleRpcError: function(error){
      console.log(error.message)
    }
  }
}
</script>

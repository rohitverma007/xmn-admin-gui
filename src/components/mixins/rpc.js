import simple_jsonrpc from "simple-jsonrpc-js"

export const rpc = {
  data() {
    return {
      jrpc: null
    }
  },
  created: function(){
    this.jrpc = new simple_jsonrpc();
    this.jrpc.toStream = (_msg) => {
      var xhr = new XMLHttpRequest();
      var self = this;
      var server_url = "http://localhost:8888";
      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        try {
          JSON.parse(this.responseText);
          self.jrpc.messageHandler(this.responseText);
        }
        catch (e){
          console.error(e);
        }
      }
      xhr.open("POST", server_url+'/rpc', true);
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.send(_msg);
    };
  },
  methods: {
    getUserBalance: function(){
      return this.jrpc.call('getUserBalance');
    },
    getRepresentations: function(){
      return this.jrpc.call('getRepresentations');
    },
    verifyApp: function(){

    },
    exchangeToken: function(tokenAmount, tokenRepresentation){

    },
    withdrawToken: function(amount){

    }
  }
}
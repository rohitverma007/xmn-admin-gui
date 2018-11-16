import simple_jsonrpc from "simple-jsonrpc-js"

export const rpc = {
	created: function(){
		var jrpc = new simple_jsonrpc();
	},
	methods: {
		getUserBalance: function(){
			return 100;
		},
		getRepresentations: function(){
			return [
				{
					"symbol": "GOLD",
					"name": "Gold",
					"exchangeRate": 0.4
				},
				{
					"symbol": "DMND",
					"name": "Diamond",
					"exchangeRate": 0.1
				},
				{
					"symbol": "HAY",
					"name": "Cheap Hay",					
					"exchangeRate": 50
				}
			]
		},
		verifyApp: function(){

		},
		exchangeToken: function(tokenAmount, tokenRepresentation){

		},
		withdrawToken: function(amount){

		}
	}
}
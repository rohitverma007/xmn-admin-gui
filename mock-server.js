#!/usr/bin/env node
'use strict';

function getUserBalance(){
    return [
        {
            "symbol": "GOLD",
            "availableBalance": 5,
            "pendingBalance": 0,
            "withdrawalFee": 0.1
        },
        {
            "symbol": "DMND",
            "availableBalance": 0.5,
            "pendingBalance": 0.1,
            "withdrawalFee": 0.5
        },
        {
            "symbol": "XMN",
            "availableBalance": 100,
            "pendingBalance": 10,
            "withdrawalFee": 1
        }
    ];
}

function getRepresentations(){
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
}

function getWithdrawalHistory(){
    return [
        {
            "symbol": "XMN",
            "total_amount": 100,
            "created_at": new Date("March 22, 2018"),
            "symbolTo": "GOLD",
            "symbolToAmount": 0.1,
            "status": "Completed"
        },
        {
            "symbol": "GOLD",
            "created_at": new Date(),
            "total_amount": 0.4,
            "status": "Pending"
        },
        {
            "symbol": "GOLD",
            "created_at": new Date("Nov 17, 2018"),
            "total_amount": 0.1,
            "status": "Completed"
        },
        {
            "symbol": "DMND",
            "created_at": new Date("March 17, 2018"),
            "total_amount": 0.4,
            "status": "Completed"
        }
    ]
}

//over http
var http = require('http');
var url = require('url');
var JsonRPC = require('simple-jsonrpc-js');

http.createServer(function(request, response){
    var buffer = '';

    // CORS
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Request-Method', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    response.setHeader('Access-Control-Allow-Headers', '*');
    if ( request.method === 'OPTIONS' ) {
        response.writeHead(200);
        response.end();
        return;
    }

    if (request.method === 'POST') {
        var jrpc = new JsonRPC();

        jrpc.dispatch('getUserBalance', getUserBalance);
        jrpc.dispatch('getRepresentations', getRepresentations);
        jrpc.dispatch('getWithdrawalHistory', getWithdrawalHistory);

        jrpc.toStream = function(_msg){
            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(_msg);
        };

        request.on('data', function (data) {
            buffer += data;
        });

        request.on('end', function () {
            jrpc.messageHandler(buffer);
        });
    }
    
}).listen(8888);

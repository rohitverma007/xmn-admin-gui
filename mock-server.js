#!/usr/bin/env node
'use strict';

function getUserBalance(){
    return 100;
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

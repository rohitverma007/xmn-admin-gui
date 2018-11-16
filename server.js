function add(x, y){
    return x + y;
}

//over ws
var WebSocketServer = new require('ws');
var JsonRPC = require('simple-jsonrpc-js');

var webSocketServer = new WebSocketServer.Server({
    host: '0.0.0.0',
    port: 8090
}).on('connection', function(ws) {
    var jrpc = new JsonRPC();
    ws.jrpc = jrpc;

    ws.jrpc.toStream = function(message){
        ws.send(message);
    };

    ws.on('message', function(message) {
        jrpc.messageHandler(message);
    });

    jrpc.on('add', ['x', 'y'], add);

    jrpc.on('mul', ['x', 'y'], function(x, y){
        return x*y;
    });

    var item_id = 120;

    jrpc.on('create', ['item', 'rewrite'], function(item, rewrite){
        item_id ++;
        item.id = item_id;
        return item;
    });

    jrpc.call('view.setTitle', ["JSONRPC over ws"]);

});

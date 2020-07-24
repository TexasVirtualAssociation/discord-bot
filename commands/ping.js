module.exports = {
    name       : 'ping',
    description: 'ping',
    execute (message, args) {
        const m = message.channel.send("Pong.");
        //m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`)
    }
}
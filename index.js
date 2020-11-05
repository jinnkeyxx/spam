var request = require("request");
var login = require("facebook-chat-api");
const fs = require('fs');

login({ appState: JSON.parse(fs.readFileSync('fbstate.json', 'utf8')) }, (err, api) => {
    if (err) return console.error(err);

    api.setOptions({ forceLogin: true, listenEvents: true, selfListen: true, logLevel: "silent" });
    console.log('connected');
    api.listenMqtt((err, message) => {
        if (err) return console.error(err);
        if (typeof message.body === "string") {
            console.log(message.body);
            api.sendMessage(message.body, message.threadID);
        }
    })

});
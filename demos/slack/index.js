const { RtmClient, CLIENT_EVENTS, RTM_EVENTS, WebClient } = require('@slack/client');

const botId = process.env.BOT_ID;
const token = process.env.SLACK_TOKEN;

const rtm = new RtmClient(token, {
  dataStore: false,
  useRtmConnect: true,
});

const web = new WebClient(token);

let channelListPromise = web.channels.list();

rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
  console.log('Ready');

  channelListPromise.then((res) => {

    // Take any channel for which the bot is a member
    const channel = res.channels.find(c => c.is_member);

    if (channel) {
      // We now have a channel ID to post a message in!
      // use the `sendMessage()` method to send a simple string to a channel using the channel ID
      rtm.sendMessage('Hello, ConFoo 2018!', channel.id)
        // Returns a promise that resolves when the message is sent
        .then(() => console.log(`Message sent to channel ${channel.name}`))
        .catch(console.error);
    } else {
      console.log('This bot does not belong to any channels, invite it to at least one and try again');
    }
  });
});

rtm.on(RTM_EVENTS.MESSAGE, (message) => {
  // For structure of `message`, see https://api.slack.com/events/message

  // Skip messages that are from a bot or my own user ID
  if ( (message.subtype && message.subtype === 'bot_message') ||
       (!message.subtype && message.user === botId) ) {
    return;
  }

  // Log the message
  console.log('New message: ', message);
});

// Start the connecting process
rtm.start();

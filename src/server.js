const mqtt = require('mqtt');
import moment from 'moment';
import feedsDB from './db/feeds';
import {sendAlerts} from './Notifications';
import {logger} from './logger';
const feeds = feedsDB();
import _ from 'lodash';
moment().format();
const log = logger();

const connectionObject = {
    username: '<<user-name>>',
    password: '<<you api key secret>>',
    port: 8883,
    reconnectPeriod: 5000
};

const mqttServer = 'mqtts://io.adafruit.com';

const client  = mqtt.connect(mqttServer, connectionObject);

const enabledFeeds = _.filter(feeds, (aFeed) => {
    return aFeed.enable === true;
});
const enabledFeedsName = _.map(enabledFeeds, (feed) => {
    return feed.feed;
});
log.debug(`enabled feeds: ${JSON.stringify(enabledFeedsName)}`);
    
client.on('connect', () => {
    log.info(`connecting to MQTT server:${mqttServer}`);
    client.subscribe(enabledFeedsName, (err) => {
        if (err) {
            // client.publish('presence', 'Hello mqtt')
            console.log(`${err}`);
        }
    });
});
  

client.on('message', (topic, message, packet) => {
    // message is Buffer
    log.info(`new message arrived  - topic: ${topic} feedValue: ${message.toString()}`);
    const feed = _.find(enabledFeeds, (enableFeed) => {
       return enableFeed.feed === topic;
    });
    if (_.isUndefined(feed)){
        log.error(`Could not find the feed: ${feed.displayName} in database`);
        return;
    }
    _.each(feed.notification, (aNotification) => {
        if (aNotification.eq && aNotification.eq.toLowerCase() === message.toString().toLowerCase()) {
            sendAlerts(aNotification.types, aNotification.routine, message.toString(),
                feed.displayName, topic)
        }
        if (aNotification.min && _.ceil(message) <= aNotification.min ) {
            sendAlerts(aNotification.types, aNotification.routine, message.toString(),
                feed.displayName, topic)
        }
        if (aNotification.max && _.ceil(message) >= aNotification.max ) {
            sendAlerts(aNotification.types, aNotification.routine, message.toString(),
                feed.displayName, topic)
        }
    });
});

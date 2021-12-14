import _ from 'lodash';
import dotenv from 'dotenv-safe';
import path from 'path';
import mqtt, { IClientOptions } from 'mqtt';
import moment from 'moment';
import { createConnection } from 'typeorm';
import 'colors';

import { getFeeds as feedsDB, Notification } from './db/feeds-notifications';
import { sendAlerts } from './services/notificationService';
import  { logger as log } from './logger';
import { Feed } from './entities/feed';

dotenv.config({
    path: `${process.cwd()}/.env`
})

const feeds = feedsDB();
moment().format();
const enabledFeedNames = _.map(_.filter(feeds, (aFeed) => aFeed.enable), (feed) => feed.feed);

const connectionObject: IClientOptions = {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    port: +process.env.MQTT_PORT || 1883,
    reconnectPeriod: +process.env.MQTT_RECONNECT_PERIOD || 5000
};

const mqttServer = process.env.MQTT_URI;
const client  = mqtt.connect(mqttServer, connectionObject);

const main = async () => {
    console.log('connecting to Feed Database:'.cyan);
    const conn = await createConnection({
        type: 'mongodb',
        url: process.env.MONGO_URI,
        useUnifiedTopology: true,
        migrations: [path.join(__dirname, './migrations/*')],
        entities: [Feed],
        database: 'IoT',
        loggerLevel: 'debug',
        synchronize: true
    });
    console.info('connected'.cyan);
    console.info(conn);
}

main().catch((err) => {
   console.error(err);
});

client.on('connect', async () => {
    log.info(`connected to MQTT server:${mqttServer}`);
    log.debug(`setting up subscriptions for feeds: ${JSON.stringify(enabledFeedNames)}`);
    client.subscribe(enabledFeedNames, (err) => {
        if (err) {
            // client.publish('presence', 'Hello mqtt')
            console.log(`${err}`);
        }
    });
});
  

client.on('message', (topic, message) => {
    // message is Buffer
    log.info(`new message arrived  - topic: ${topic} feedValue: ${message.toString()}`);
    const enabledFeeds = _.filter(feeds, (aFeed) => aFeed.enable)
    const feed = _.find(enabledFeeds, (enableFeed) => {
       return enableFeed.feed === topic;
    });
    if (_.isUndefined(feed)){
        log.error(`Could not find the feed: ${topic}`);
        return;
    }
    _.map(feed.notification, async (aNotification) => {
        // We dont necessarily send notification unless match certain criteria in feeds
        if (shouldSendAnAlert(aNotification, message.toString())) {
            await sendAlerts(aNotification.types, aNotification.routine, message.toString(), topic)
        }
    });
    saveFeed(topic, message.toString()).then(() => {
        log.info(`Feed saved :${topic}`)
    }, (err) => console.error(`error saving: ${err}`))
});

const shouldSendAnAlert = (notification: Notification, message: string) => {
   if (notification.eq && notification.eq.toLowerCase() === message) {
       return true;
   } else if (notification.min && _.ceil(parseFloat(message)) <= notification.min) {
       return true;
   } else if (notification.max && _.ceil(parseFloat(message)) > notification.max) {
       return true;
   } else {
       return false;
   }
}

const saveFeed = async (topic: string, sensorValue: string): Promise<Feed> => {
    return Feed.create({
        feedName: topic,
        feedValue: sensorValue
    }).save();
}
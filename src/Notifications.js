import moment from "moment";
import https from "https";
import {logger} from './logger';
import {FeedService} from './command';
import sgMail from "@sendgrid/mail";
import _ from 'lodash';
import shell from 'shelljs';


sgMail.setApiKey('<<sendgrid api key>>');
const notifyMeKey = '<<NotifyMe skill api key>>';

const log = logger();

export function sendAlerts (actions, routine, feedValue, feedDisplayName, feedName) {
    _.each(actions, (notifySystem) => {
        switch (notifySystem) {
            case 'email': {
                FeedService(notifySystem, feedName, routine, feedValue, emailAlert);
                break;
            }
            case 'alexa': {
                FeedService(notifySystem, feedName, routine, feedValue, invokeAlexa);
                break;
            }
            case 'google': {
                log.info(`sending Google notification!`);
                //TODO Need to implement Google broadcast/notification alerts!!
                break;
            }
        }
    })
}


function invokeAlexa(notification, object, feedValue) {
    if (notification) {
        sendNotifyMe(object, feedValue)
    }else {
        invokeAlexaRoutine(object)
    }
}


/**
 * invoke the routine using alexa.sh script
 */
function invokeAlexaRoutine(command) {
    log.debug(`Invoking alexa routine:${command}`);
    shell.exec(command);
}

/**
 Used mostly for door open notifications
 */
function sendNotifyMe(message, feedValue) {
    const dateFormat = moment(new Date()).format('"MMM Do h:mm A"');
    const formattedMessage = `${message} on ${dateFormat}`;
    const body = JSON.stringify({
        "notification": formattedMessage,
        "accessCode": notifyMeKey
    });
    log.debug(`Alexa - formattedMessage: ${formattedMessage} feedValue: ${feedValue} ${Buffer.byteLength(body)}`);
    https.request({
        hostname: "api.notifymyecho.com",
        path: "/v1/NotifyMe",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(body)
        }
    }).end(body);
}

function emailAlert(object, feedValue) {
    const msg = {
        to: `${object.to}`,
        from: `${object.from}`,
        subject: `${object.subject}`,
        text: `${object.body} ${feedValue}`
    };
    log.debug(`sending email: ${JSON.stringify(msg)}`);
     sgMail.send(msg);
}

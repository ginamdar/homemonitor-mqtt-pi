import {logger} from "./logger";
import actions from './db/feeds-action';
const feedsAction = actions();
const log = logger();
export function FeedService(notificationSystem, feedName, routine, feedValue, callBack){
    if (notificationSystem && feedName) {
        const feedAction = feedsAction[notificationSystem][feedName][routine];
        log.debug(`feedAction:${JSON.stringify(feedAction)} - 
                    NotificationSystem: ${notificationSystem} - 
                    feedName: ${feedName} - 
                    routine:${routine} - 
                    feedValue: ${feedValue}`);
        if (notificationSystem === 'email') {
            // We need to send email return the object
            callBack(feedAction, feedValue);
            return;
        }
        else if (notificationSystem === 'alexa') {
            if (feedAction.script) {
                // we are running routine here create a command using shell.js
                const commandLine = `${feedAction.script} "${feedAction.args}"`;
                callBack(false, commandLine);
                return;
            }
            if (feedAction.notification) {
                callBack(true, feedAction.notification)
                return;
            }
        }
    }
}
import _ from 'lodash';

import { getFeedsActions, RoutineAction } from '../db/feeds-actions'
import { NotificationType, RoutineType } from '../db/feeds-notifications';

const feedsActions = getFeedsActions();
export const feedService = (notificationSystem: NotificationType, feedName: string, type: RoutineType )
    : RoutineAction | undefined => {
    const feeds = feedsActions.data[notificationSystem] || [];
    const feed = _.find((feeds), (feed) => feed.feedName === feedName);
    const routineAction = feed?.feedActions.map((feedAction) => feedAction[type]) || [];
    return routineAction[0];
    // log.debug(`feedAction:${JSON.stringify(feed)} -
    //         NotificationSystem: ${notificationSystem} -
    //         feedName: ${feedName} -
    //         routine:${routine} -
    //         feedValue: ${feedValue}`);
    // if (notificationSystem === 'email') {
    //     // We need to send email return the object
    //     return callBack(feed, feedValue);
    // }
    // else if (notificationSystem === 'alexa') {
    //     if (feed.feedAction) {
    //         // we are running routine here create a command using shell.js
    //         const commandLine = `bash ${feedAction.script} "${feedAction.args}"`;
    //         return callBack(false, commandLine);
    //     }
    //     if (feedAction.notification) {
    //         return callBack(true, feedAction.notification);
    //     }
    // } else if (notificationSystem === 'google') {
    //     if (feedAction.broadcast.enabled) {
    //         // NOTE: All Google devices has to be on the same network/subnet
    //         // Also need to disable the ipv6 protocol on your home router
    //         const broadCastText = `Broadcast ${feedAction.voiceTemplate}`;
    //         return callBack(true, broadCastText);
    //     }else if (feedAction.voiceCast.enabled) {
    //         //implement AWS polly?
    //         console.log(`here POLLY`);
    //         return callBack(true, `feedAction.voiceTemplate`);
    //     }
    //     log.warn(`no notification type set for Google
    //         in feedAction for ${feedName}`)
    // }
}

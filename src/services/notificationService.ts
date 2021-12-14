import sgMail from "@sendgrid/mail";
import _ from 'lodash';
import shell from 'shelljs';
import GoogleAssistant from 'google-assistant';
import path from 'path';

import { NotificationType, RoutineType} from '../db/feeds-notifications';
import { feedService as FeedService } from './feedService';
import { logger as log } from '../logger';
import { AlexaRoutineAction, EmailRoutineAction, GoogleRoutineAction } from '../db/feeds-actions';
// import { sendEmail } from './services/sendEmail';

sgMail.setApiKey(process.env.SG_API_KEY || '');

export const sendAlerts = async (actions: NotificationType[], routine: RoutineType,
                           sensorValue: string, feedName: string) => {
    const routineActions = _.map(actions, (notifySystem) => FeedService(notifySystem, feedName, routine));
    routineActions && routineActions.forEach((routineAction) => {
       if (routineAction) {
           if ((<EmailRoutineAction>routineAction).from){
               const emailRoutine = <EmailRoutineAction>routineAction;
               emailAlert(emailRoutine, sensorValue);
           }
           else if ((<AlexaRoutineAction>routineAction).script) {
               const alexRoutine = <AlexaRoutineAction>routineAction;
               invokeAlexaRoutine(alexRoutine.script, alexRoutine.args);
           } else if ((<GoogleRoutineAction>routineAction).voiceTemplate) {
               const googleRoutine = <GoogleRoutineAction>routineAction;
               googleAnnouncement(googleRoutine.broadcast.enabled, googleRoutine.voiceTemplate)
           } else {
               log.error(`Could not find any Routine System for ${JSON.stringify(routineAction)}`.bgRed);
           }
       }
    });
}

/**
 * invoke the routine using alexa.sh script
 */
const invokeAlexaRoutine = (command: string, args: string) => {
    log.debug(`Invoking alexa routine:${command}: \"${args}\"`);
    shell.exec(`${command} "${args}"`);
};

const emailAlert = async (emailRoutine: EmailRoutineAction, feedValue: string) => {
    if( _.isArray(emailRoutine.to)) {
        log.info(`array ${JSON.stringify(emailRoutine.to)}`);
    }
    const msg = {
        to: emailRoutine.to,
        from: `${emailRoutine.from}`,
        subject: `${emailRoutine.subject}`,
        text: `${emailRoutine.body} to ${feedValue}`
    };
    await sgMail.sendMultiple(msg);
    // await sendEmail(emailRoutine.to, emailRoutine.from, emailRoutine.subject, `${emailRoutine.body} to = ${feedValue}`);
    log.debug(`sending email: ${JSON.stringify(msg)}`);
};

const googleAnnouncement = (useBroadCast: boolean, voiceMessage: string) => {
    if (useBroadCast) {
        let config = {
            auth: {
                keyFilePath: path.resolve(__dirname, 'client_secret.json'),
                // where you want the tokens to be saved
                // will create the directory if not already there
                savedTokensPath: path.resolve(__dirname, 'tokens.json'),
            },
            configuration: {
                lang: 'en-CA',
                deviceModelId: 'home-monitoring-1d2f8-piassistant-ipqmmb',
            },
            conversation: {
                textQuery: voiceMessage,
                isNew: true, //new conversation and ignore the old state
                screen: {
                    isOn: true
                }
            }
        };
        log.debug(`Broadcast using assistant-${JSON.stringify(config)}`);
        const assistant = new GoogleAssistant(config.auth);
        assistant.on('ready', () => assistant.start(config.conversation));
    }else {
        // TODO: Use AWS Polly to create Mp3 and cast to Google Home
        // npm i google-home-notifier
    }
};

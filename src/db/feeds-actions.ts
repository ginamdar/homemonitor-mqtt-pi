import { NotificationType, RoutineType } from './feeds-notifications';

const ALEXA_SCRIPT = '/home/pi/alexa-voice-activation/alexa.sh';

export type AlexaRoutineAction = {
    script: string;
    args: string;
}

export type EmailRoutineAction = {
    from: string;
    to: string[];
    subject: string;
    body: string;
}

export type GoogleRoutineAction = {
    broadcast: isEnabled;
    voiceCast: isEnabled;
    voiceTemplate: string;
}
type isEnabled = {
    enabled: boolean
};

// type FeedActionType = {
//     [R in RoutineType]?: AlexaRoutineAction|EmailRoutineAction|GoogleRoutine;
// }

export type RoutineAction = AlexaRoutineAction | EmailRoutineAction | GoogleRoutineAction ;
export type FeedActionType = {
    [R in RoutineType]? : RoutineAction
}

export interface FeedActionInterface {
    feedName: string;
    feedActions: FeedActionType[];
}

type ActionType = {
    [key in NotificationType]? : FeedActionInterface[];
}

export interface FeedsActionResponse {
    data: ActionType;
}

export const getFeedsActions = (): FeedsActionResponse => {
    return {
        'data':{
            'alexa':[
                {
                    'feedName':'mqtt/subscriptions/doors/front',
                    'feedActions':[
                        {
                            'default':{
                                'script': ALEXA_SCRIPT,
                                'args':'someone at the door'
                            }
                        }
                    ]
                },
                {
                    'feedName':'mqtt/subscriptions/test/mqtt',
                    'feedActions':[
                        {
                            'default':{
                                'script': ALEXA_SCRIPT,
                                'args' : 'Tell me about Halloween'
                            }
                        }
                    ]
                },
                {
                    'feedName':'mqtt/subscriptions/basement/salt-level/status',
                    'feedActions':[
                        {
                            'low':{
                                'script': ALEXA_SCRIPT,
                                'args':'water softener '
                            }
                        }
                    ]
                },
                {
                    'feedName':'mqtt/subscriptions/backyard/hottub/temperature',
                    'feedActions':[
                        {
                            'high':{
                                'script': ALEXA_SCRIPT,
                                'args':'Jacuzzi plus'
                            }
                        },
                        {
                            'low':{
                                'script': ALEXA_SCRIPT,
                                'args':'Jacuzzi went down'
                            }
                        }
                    ]
                },
                {
                    'feedName':'mqtt/subscriptions/basement/temperature',
                    'feedActions':[
                        {
                            'high':{
                                'script': ALEXA_SCRIPT,
                                'args':'basement temperature high'
                            }
                        },
                        {
                            'low':{
                                'script': ALEXA_SCRIPT,
                                'args':'Basement temperature low'
                            }
                        }
                    ]
                },
                {
                    'feedName':'mqtt/subscriptions/basement/humidity',
                    'feedActions':[
                        {
                            'high':{
                                'script': ALEXA_SCRIPT,
                                'args':'Basement humidity plus'
                            }
                        },
                        {
                            'low':{
                                'script': ALEXA_SCRIPT,
                                'args':'basement is less decreased'
                            }
                        }
                    ]
                },
            ],
            'email':[
                {
                    'feedName':'mqtt/subscriptions/doors/front',
                    'feedActions':[
                        {
                            'default':{
                                'from':'jon.doe@acme.com',
                                'to':[
                                    'jane.doe@acme.com',
                                    'john.doe@acme.com'
                                ],
                                'subject':'ALERT!, front door just opened',
                                'body':'Front door opened few seconds ago:'
                            }
                        }
                    ]
                },
                {
                    'feedName':'mqtt/subscriptions/doors/front/battery',
                    'feedActions':[
                        {
                            'low':{
                                'from':'jon.doe@acme.com',
                                'to':[
                                    'jane.doe@acme.com',
                                    'john.doe@acme.com'
                                ],
                                'subject':'Battery ALERT!, front door battery is too low',
                                'body':'Front door battery is at level %:'
                            }
                        }
                    ]
                },
                {
                    'feedName':'mqtt/subscriptions/test-mqtt',
                    'feedActions':[
                        {
                            'default':{
                                'from':'jon.doe@acme.com',
                                'to':[
                                    'jane.doe@acme.com',
                                    'john.doe@acme.com'
                                ],
                                'subject':'Recent activity on test-mqtt feed',
                                'body':'Activity recorded on tes-mqtt with value:'
                            }
                        }
                    ]
                },
                {
                    'feedName':'mqtt/subscriptions/basement/humidity',
                    'feedActions':[
                        {
                            'low':{
                                'from':'jon.doe@acme.com',
                                'to':[
                                    'john.doe@acme.com',
                                    'jane.doe@acme.com'
                                ],
                                'subject':'Basement Humidity is Low!!',
                                'body':'Basement Humidity dropped less than 30%'
                            }
                        },
                        {
                            'high':{
                                'from':'jon.doe@acme.com',
                                'to':[
                                    'john.doe@acme.com',
                                    'jane.doe@acme.com'
                                ],
                                'subject':'Basement Humidity is High!!',
                                'body':'Basement Humidity reached more than 60%'
                            }
                        }
                    ]
                },
            ],
            'google':[
                {
                    'feedName':'mqtt/subscriptions/doors/front',
                    'feedActions':[
                        {
                            'default':{
                                'broadcast':{
                                    'enabled':true
                                },
                                'voiceCast':{
                                    'enabled':false
                                },
                                'voiceTemplate':'Front door just opened!'
                            }
                        }
                    ]
                },
            ]
        }
    }
}

export type NotificationType  = 'alexa' | 'email' | 'google';
export type RoutineType = 'default' | 'low' | 'high';

export interface Notification {
    eq?: string;
    types: NotificationType[];
    routine: RoutineType;
    min?: number;
    max?: number
}

export interface FeedNotification {
    feed: string;
    displayName: string;
    enable: boolean;
    notification: Notification[];
}

export const getFeeds = () => {
    const feedDB: FeedNotification[] = [
        {
            feed: 'mqtt/subscriptions/doors/front',
            displayName: 'Front door',
            notification: [{
                eq: 'open',
                types: ['alexa', 'email'],
                routine: 'default'
            }],
            enable: true
        },
        {
            feed: 'mqtt/subscriptions/doors/front/battery',
            displayName: 'Front door battery',
            notification: [{
                min: 40,
                types: ['email'],
                routine: 'low'
            }],
            enable: true
        },
        {
            feed: 'mqtt/subscriptions/garage/honda',
            displayName: 'Honda garage door',
            notification: [
                {
                    eq: 'open',
                    types: ['alexa', 'email'],
                    routine: 'default'
                }
            ],
            enable: true
        },
        {
            feed: 'mqtt/subscriptions/garage/benz',
            displayName: 'Mercedes garage door',
            notification: [
                {
                    eq: 'open',
                    types: ['alexa', 'email'],
                    routine: 'default'
                }
            ],
            enable: true
        },
        {
            feed: 'mqtt/subscriptions/test/mqtt',
            displayName: 'MQTT Test',
            notification: [
                {
                    min: 10,
                    types: ['email'],
                    routine: 'default'
                },
                {
                    max: 40,
                    types: ['email'],
                    routine: 'default'
                },
                {
                    eq: 'Halloween',
                    types: ['alexa'],
                    routine: 'default'
                }
            ],
            enable: true
        },
        {
            feed: 'mqtt/subscriptions/basement/humidity',
            displayName: 'Basement humidity',
            notification: [
                {
                    max: 60,
                    types: ['alexa'],
                    routine: 'high'
                },
                {
                    min: 30,
                    types: ['alexa'],
                    routine: 'low'
                }
            ],
            enable: true
        },
        {
            feed: 'mqtt/subscriptions/basement/temperature',
            displayName: 'Basement temperature',
            notification: [
                {
                    max: 28,
                    types: ['alexa'],
                    routine: 'high'
                },
                {
                    min: 10,
                    types: ['alexa', 'email'],
                    routine: 'low'
                }
            ],
            enable: true
        },
        {
            feed: 'mqtt/subscriptions/basement/battery',
            displayName: 'Basement battery',
            notification: [{
                min: 40,
                types: ['email'],
                routine: 'low'
            }],
            enable: true
        },
        {
            feed: 'mqtt/subscriptions/second-floor/humidity',
            displayName: 'Second Floor humidity',
            notification: [
                {
                    max: 55,
                    types: ['alexa'],
                    routine: 'high'
                },
                {
                    min: 25,
                    types: ['alexa'],
                    routine: 'low'
                }
            ],
            enable: true
        },
        {
            feed: 'mqtt/subscriptions/second-floor/temperature',
            displayName: 'Second Floor temperature',
            notification: [
                {
                    max: 25,
                    types: ['alexa'],
                    routine: 'high'
                },
                {
                    min: 10,
                    types: ['alexa', 'email'],
                    routine: 'low'
                }
            ],
            enable: true
        },
        {
            feed: 'mqtt/subscriptions/second-floor/battery',
            displayName: 'Second Floor battery',
            notification: [{
                min: 40,
                types: ['email'],
                routine: 'low'
            }],
            enable: true
        },
        {
            feed: 'mqtt/subscriptions/attic/temperature',
            displayName: 'Attic Temperature',
            enable: true,
            notification: [
                {
                    max: 40,
                    types: ['alexa', 'email'],
                    routine: 'high'
                }, {
                    min: -4,
                    types: ['alexa', 'email'],
                    routine: 'low'
                }
            ]
        },
        {
            feed: 'mqtt/subscriptions/attic/humidity',
            displayName: 'Attic Humidity',
            enable: true,
            notification: [
                {
                    max: 70,
                    types: ['alexa', 'email'],
                    routine: 'high'
                }, {
                    min: 25,
                    types: ['alexa', 'email'],
                    routine: 'low'
                }
            ]
        },
        {
            feed: 'mqtt/subscriptions/attic/battery',
            displayName: 'Attic battery',
            notification: [{
                min: 40,
                types: ['email'],
                routine: 'low'
            }],
            enable: true
        },
        {
            feed: 'mqtt/subscriptions/livingroom/temperature',
            displayName: 'Living Room Temperature',
            notification: [
                {
                    max: 28,
                    types: ['alexa', 'email'],
                    routine: 'high'
                }, {
                    min: 8,
                    types: ['alexa', 'email'],
                    routine: 'low'
                }
            ],
            enable: true
        },
        {
            feed: 'mqtt/subscriptions/livingroom/humidity',
            displayName: 'Living Room Humidity',
            notification: [
                {
                    max: 60,
                    types: ['alexa', 'email'],
                    routine: 'high'
                }, {
                    min: 30,
                    types: ['alexa', 'email'],
                    routine: 'low'
                }
            ],
            enable: true
        },
        {
            feed: 'mqtt/subscriptions/livingroom/battery',
            displayName: 'Living Room Battery',
            notification: [
                {
                    min: 40,
                    types: ['email'],
                    routine: 'low'
                }
            ],
            enable: true
        },
        {
            feed: 'mqtt/subscriptions/basement/salt-level/status',
            displayName: 'Water Softener Salt level',
            notification: [
                {
                    max: 24,
                    types: ['alexa', 'email'],
                    routine: 'low'
                }
            ],
            enable: true
        },
        {
            feed: 'mqtt/subscriptions/backyard/hottub/temperature',
            displayName: 'HotTub temperature',
            notification: [
                {
                    max: 55,
                    types: ['alexa'],
                    routine: 'high'
                },
                {
                    min: 24,
                    types: ['alexa', 'email'],
                    routine: 'low'
                }
            ],
            enable: false
        }];
    return feedDB;
};

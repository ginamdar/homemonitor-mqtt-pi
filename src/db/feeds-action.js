const getFeedsAction = () => {
    const ALEX_SCRIPT = "/home/pi/Documents/alexa-voice-activation";
    const feedsActions = {
        "alexa": {
            "doors.front-door": {
                "default": {
                    "script": ALEX_SCRIPT + "/alexa.sh",
                    "args": "someone at the door"
                }
            },
            "garage.honda": {
                "default": {
                    "script": ALEX_SCRIPT + "/alexa.sh",
                    "args": "someone at the left garage"
                }
            },
            "test-mqtt": {
                "default": {
                    "notification": "Halloween is on 31st October, and we love trick or treat!",
                }
            },
            "basement.humidity": {
                "high": {
                    "script":ALEX_SCRIPT + "/alexa.sh",
                    "args": "Basement is very humid"
                },
                "low": {
                    "script": ALEX_SCRIPT + "/alexa.sh",
                    "args": "basement is less humid"
                }
            },
            "basement.salt-level-status": {
                "low": {
                    "script": ALEX_SCRIPT + "/alexa.sh",
                    "args": 'water softener '
                }
            },
            "backyard.hottubtemprature": {
                "high": {
                    "script": ALEX_SCRIPT + "/alexa.sh",
                    "args": "Jacuzzi plus"
                },
                "low": {
                    "script": ALEX_SCRIPT + "/alexa.sh",
                    "args": "Jacuzzi went down"
                }
            },
            "second-floor.temperature": {
                "high": {
                    "script": ALEX_SCRIPT + "/alexa.sh",
                    "args": "second temperature plus"
                },
                "low": {
                        "script": ALEX_SCRIPT + "/alexa.sh",
                        "args": "second temperature low"
                }
            },
            "second-floor.humidity": {
                "high": {
                    "script": ALEX_SCRIPT + "/alexa.sh",
                    "args": "second humidity high"
                },
                "low": {
                    "script": ALEX_SCRIPT + "/alexa.sh",
                    "args": "second humidity low"
                }
            },
            "basement.temperature": {
                "high": {
                    "script": ALEX_SCRIPT + "/alexa.sh",
                    "args": "basement temperature high"
                },
                "low": {
                    "script": ALEX_SCRIPT + "/alexa.sh",
                    "args": "Basement temperature low"
                }
            }
        },
        "email": {
            'test-mqtt': {
                "default": {
                    'to': 'to-email@acme.com',
                    'from': 'from-email@acme.com',
                    'subject': 'Recent activity on test-mqtt feed',
                    'body': 'Activity recorded on tes-mqtt with value:'
                }
            },
            'basement.temperature': {
                "low": {
                    'to': 'to-email@acme.com',
                    'from': 'from-email@acme.com',
                    'subject': 'Basement temperature drop alert!',
                    'body': 'Basement temperature dropped below 10 degree celsius'
                }
            },
            'second-floor.temperature': {
                'low': {
                    'to': 'to-email@acme.com',
                    'trom': 'from-email@acme.com',
                    'subject': 'Second Floor temperature drop alert!',
                    'body': '2nd Floor temperature dropped to:'
                }
            },
            'basement.salt-level-status': {
                'low': {
                    'to': 'to-email@acme.com',
                    'from': 'from-email@acme.com',
                    'subject': 'Water softener salt level drop alert!',
                    'body': 'Water softener salt level dropped to 20% or less, please' +
                    ' add more salt, Current value recorded is:'
                }
            },
            'backyard.hottubtemprature': {
                'low': {
                    'to': 'to-email@acme.com',
                    'from': 'from-email@acme.com',
                    'subject': 'ALERT! Hot tub temperature dropping',
                    'body': 'Hot tub water temperature dropped to : '
                }
            },
            'garage.honda': {
                "default": {
                    'to': 'to-email@acme.com',
                    'from': 'from-email@acme.com',
                    'subject': 'ALERT! Honda Garage Door Opened',
                    'body': 'Honda side garage door opened at:'
                }
            }
        },
        "google": {}
    };
    return feedsActions;
};

module.exports = getFeedsAction;

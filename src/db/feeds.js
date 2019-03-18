const getFeeds = () => {
    const feedDB = [
        {
            feed: 'doors.front-door',
            displayName: "Front door",
            notification: [{
                eq: 'open',
                types:['alexa'],
                routine: 'default'
            }],
            enable: true
        },
        {
            feed: 'garage.honda',
            displayName: "Honda garage door",
            notification: [
                {
                    eq: 'open',
                    types:['alexa', 'email'],
                    routine: 'default'
                }
            ],
            enable: true
        },
        {
            feed: 'test-mqtt',
            displayName: "MQTT Test",
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
            feed: 'basement.humidity',
            displayName: "Basement humidity",
            notification: [
                {
                    max: 55,
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
            feed: 'basement.temperature',
            displayName: "Basement temperature",
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
            feed: 'second-floor.humidity',
            displayName: "Second Floor humidity",
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
            feed: 'second-floor.temperature',
            displayName: "Second Floor temperature",
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
            feed: 'basement.salt-level-status',
            displayName: "Water Softener Salt level",
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
            feed: 'backyard.hottubtemprature',
            displayName: "HotTub temperature",
            notification: [
                {
                    max: 40,
                    types: ['alexa'],
                    routine: 'high'
                },
                {
                    min: 24,
                    types: ['alexa', 'email'],
                    routine: 'low'
                }
            ],
            enable: true
        }];
    return feedDB;
};

module.exports = getFeeds;

# homemonitor-mqtt-pi
Home monitor service which listens on MQTT feeds and provides rules to set thresholds which can further used to take actions such as email, Alexa voice support, 
Alexa notifications also be extended to support Google Api to make an annoucements. This is designed specifically to run as service on 
Raspberry Pi (but you can run on your laptop/Mac as well) with minimum or zero interaction once running. 

Project is completely in TypeScript now with Feeds are now being saved in MongoDB. Need to setup Mongo URI inside you ```.env```  file

## Setup
### Custom rules setup
Use feeds.js and feeds-actions.js where most of the configurations are. Since I am using Adafruit IO, I can provide all the feeds or topics that I 
need to monitor. In notification section for each field you can customize to do certain things, e.g. if its door monitor you can use that 
``` 
notification: [{
                eq: 'open',
                types:['alexa', 'email', 'google-home'],
                routine: 'default'
            }],
``` 
Or if you are monitoring temperature / humidity you can set min and max values. You can also set different actions (types) that you need to do if the rule triggers, e.g. 
if temeprature is too low you can ask Alexa to make announcement as well as send email to you or invoke Alexa routine which can be used to send 
notification to your mobile devices.  

```
notification: [
                {
                    max: 27,
                    types: ['alexa'],
                    routine: 'high'
                },
                {
                    min: 10,
                    types: ['alexa'],
                    routine: 'low'
                }
            ],
``` 
so in feeds-action under "alexa", you can set individual actions 

``` 
const feedsActions = {
        "alexa": {
            "doors.front-door": {
                "default": {
                    "script": ALEX_SCRIPT + "/alexa.sh",
                    "args": "someone at the door" // this is my Alexa routine that will be invoked
                }
            },
....
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
```

### compile
``` 
npm install; npm run gen-env; npm run-script build; npm run dev
``` 

the build will be created in dist/ folder. Then you can use forever-install (see below) to install this as service on your Pi Device. After that every time you make changes and compile, use below commands to start/stop or to check the status of your service.
``` 
sudo service status {{your-service-name}}

sudo service stop {{your-serice-name}}
sudo service start {{your-service-name}}

``` 

### Invoking Alexa Routines
You can use below scripts (3rd party support) to invoke alexa routies for making custom Alexa announcements and Mobile notifications. Since Alexa Notifications are somewhat different in nature, [see here](https://developer.amazon.com/docs/alexa-voice-service/notifications-overview.html), routine is quickest way to trigger different actions.
For e.g. if your Temperature Monitor sensor detects drop below 10 degree Celsius, you can invoke alexa routine to automatically start your Nest heating. All you need to do is create a routine like below and provide the routine name in feeds-action.js
![Basement Temperature Low](https://github.com/ginamdar/homemonitor-mqtt-pi/blob/master/Alexa-Routine.png)

## 3rd party support
* For email I am using [sendgrid](https://www.npmjs.com/package/sendgrid) service. I had to unspam emails that I was receiving from sendGrid,
in my gmail account to make Gmail to realize this is legitimate email!.

* Alexa notifications - Im using [NotifyMe](http://www.thomptronics.com/notify-me) to send notifications to Alexa device.

* For directictly invoking Alexa routines using shell script - see this awesome script by [@gravesjohnr](https://github.com/gravesjohnr/AlexaNotificationCurl) and 
[this](https://miguelmota.com/blog/alexa-voice-service-authentication/)

* To install this as a service on your Pi I am using this [forever-service](https://github.com/zapty/forever-service) 

## Hardware
* You can design your own temperature / humidity logger, I made my own using ESP8266 and DHT22. The logger is highly efficient on single Li-Ion battery. I have two of them running for past ~6 months without battery replacement and recording data for every 1:30-1:40 minutes. Since I am not too concern of temperature fluctuations inside the house every 1:30 min or 2 is fine. 

![dht-logger](https://github.com/ginamdar/homemonitor-mqtt-pi/blob/master/dht-esp8266-sensor.svg)

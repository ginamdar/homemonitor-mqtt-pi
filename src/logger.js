import winston from 'winston';
import {format} from 'winston';
import DailyRotate from 'winston-daily-rotate-file';

const  {printf, label, timestamp, combine} = format;
const myFormat = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});
const container = new winston.Container();
createLogger();

export function logger() {
    return container.get('log');
}

function createLogger() {
    console.log(`createLogger called`);
    container.add('log', {
        level: 'debug',
        format: combine(
            label({ label: 'HomeMonitor'}),
            timestamp(),
            myFormat,
        ),
        transports: [
            new DailyRotate({
                filename: './log/combined-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: '10m',
                maxFiles: '7d'
            })
        ]
    });

}

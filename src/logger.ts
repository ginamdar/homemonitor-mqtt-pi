import winston, { format } from 'winston';
import DailyRotate from 'winston-daily-rotate-file';

const  { printf, label, timestamp, combine } = format;

const homeMonitorFormatLogging = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const winstonLogger = () => {
    console.log(`createLogger called`);
    return winston.createLogger({
        level: 'debug',
        format: combine(
            label({ label: 'HomeMonitor'}),
            timestamp(),
            homeMonitorFormatLogging,
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

export const logger = winstonLogger();
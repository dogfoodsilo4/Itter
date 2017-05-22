/// <reference path="typings/node/node.d.ts" />

import fs = require('fs');

/**
 * A performance logging tool that provides file logging with timestamp and memory usage statics.
 * On calling End(), will generate csv file of logged items.
 *
 * Usage:
 * var plog = new PerfLogger("C:\mylog.csv");
 * plog.Start();
 * plog.Log("Starting Log");
 * plog.Log("Logging additional data", ["Hello", "World"]);
 * plog.End();
 *
 * Output:
 * index,description,timeStamp,rss,heapTotal,heapUsed,item1, item2
 * 0,Starting Log,84624946,541478912,412057088,403542056,,
 * 1,Logging additional data,84625017,544735232,414104320,405716616,Hello,World
 */
class PerfLogger {

    private _logFile: string;

    private _logArray: any[];

    GetLogArray(): any[] {
        return this._logArray;
    }

    /**
    * Create a new PerfLogger.
    * @param {string} logFile, The combined path and filename of the log file to create.
    */
    constructor(logFile: string) {
        this._logFile = logFile;
    }

    /**
    * Start logging.
    */
    Start(): void {
        // Clear the current log array
        this._logArray = [];

        this.Log("Start Logging", null);
    }

    /**
    * Log a single entry
    * @param {string} description, Log item description.
    * @param {any[]} [items], Array of additional data to log.
    */
    Log(description: string, items?: any[]): void {
        var logItem = [];
        logItem.push(description);
        logItem.push(new Date().getTime()); // Return the number of milliseconds since 1970/01/01
        logItem.push(process.memoryUsage().rss);
        logItem.push(process.memoryUsage().heapTotal);
        logItem.push(process.memoryUsage().heapUsed);
        if (items) {
            for (var i = 0; i < items.length; i++) {
                logItem.push(items[i].toString());
            }
        }
        this._logArray.push(logItem);
    }

    /**
    * End Logging and write the output file
    */
    End(): void {

        this.Log("End Logging");

        // Output the headers?
        // this.WriteToFile("Index,Description,TimeStamp,RSetSize,HeapTotal,HeapUsed\n");

        // Write all logItems
        this.WriteLogToFile();
    }

    private WriteLogToFile() {
        var file = fs.createWriteStream(this._logFile);

        file.on('error', function (err) {
            /* log and continue on error */
            console.log("ERROR, Unable to write to log file: " + this._logFile);
            console.log(err.toString());
        });

        // Write each log item to file
        Object.keys(this._logArray).forEach((index) => {
            file.write(index + "," + this._logArray[index] + "\n");
        });

        file.end();
    }
}
export = PerfLogger;

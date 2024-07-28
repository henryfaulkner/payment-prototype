import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  async info(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, 'info', optionalParams);
  }

  async warn(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, 'warn', optionalParams);
  }

  async error(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, 'error', optionalParams);
  }

  async fatal(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, 'fatal', optionalParams);
  }

  async log(msg: string, ...optionalParams: any[]) {
    this.info(msg, optionalParams);
  }

  private async writeToLog(
    msg: string,
    logType: 'error' | 'info' | 'warn' | 'fatal',
    params: any[]
  ) {
    this.publish(new LogEntry(msg, logType, params));
  }

  private async publish(entry: LogEntry) {
    console.log(entry.message);
  }
}

class LogEntry {
  // Public Properties
  entryDate: string;
  logType: 'info' | 'warn' | 'error' | 'fatal';
  processName: string;
  sourceType: string;
  message;
  extraInfo: any[];

  constructor(
    message: string,
    logType: 'info' | 'warn' | 'error' | 'fatal',
    extraInfo: any[]
  ) {
    this.message = message;
    this.logType = logType;
    this.extraInfo = extraInfo;
    this.processName = 'ngUI';
    this.sourceType = 'Now.NowAccount.Ng.UI';
    this.entryDate = new Date()
      .toISOString()
      .replace('T', ' ')
      .replace('Z', '');
  }
}

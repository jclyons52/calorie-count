import { Service } from "typedi";

@Service()
export class Logger {
  public log(..._: Array<unknown>) {
    // tslint:disable-next-line: no-console
    console.log(arguments);
  }
}

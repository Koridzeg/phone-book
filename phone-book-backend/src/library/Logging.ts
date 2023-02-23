export default class Logging {
  public static info = <T>(args: T) =>
    console.log(
      "\x1b[36m%s\x1b[0m",
      `${new Date().toLocaleString()} [INFO]`,
      typeof args === "string" ? args : args
    );

  public static warn = <T>(args: T) =>
    console.log(
      "\x1b[33m%s\x1b[0m",
      `${new Date().toLocaleString()} [INFO]`,
      typeof args === "string" ? args : args
    );

  public static error = <T>(args: T) =>
    console.log(
      "\x1b[31m",
      `${new Date().toLocaleString()} [INFO]`,
      typeof args === "string" ? args : args
    );
}

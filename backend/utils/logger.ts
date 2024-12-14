import 'colors'

export enum LogType {
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO'
}

const dateFormat = (date: Date) => {
  return `${date.getMonth()}/${date.getDay()}/${date.getDate()} - ${date.getHours()}:${date.getMinutes()}`
}

export const logger = (type: LogType, message: string) => {
  const originalPrepareStackTrace = Error.prepareStackTrace

  try {
    const err = new Error()
    Error.prepareStackTrace = (_, stack) => stack
    const stack = err.stack
    const callerFile = (stack as any)[1].getFileName()

    let typeString = type.toString()
    switch (type) {
      case LogType.ERROR:
        typeString = typeString.red
        break
      case LogType.WARNING:
        typeString = typeString.yellow

        break
      case LogType.INFO:
        typeString = typeString.blue

        break
    }
    console.log(
      `[${typeString}] [${dateFormat(new Date())}] [${callerFile}] ${message}`
    )


  } catch (err) {
    return undefined
  } finally {
    Error.prepareStackTrace = originalPrepareStackTrace
  }
}

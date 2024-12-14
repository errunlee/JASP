import "colors"
export enum LogType {
    ERROR,
    WARNING,
    INFO
}

const dateFormat = (date : Date)=>{
    return `${date.getMonth()/date.getDay()/date.getDate()} - ${date.getHours()}:${date.getMinutes()}`
}

export const logger = (type:LogType, message:string)=> {
    let typeString = type.toString();
    switch(type) {
        case LogType.ERROR:
            typeString =typeString.red;
            break;
        case LogType.WARNING:
            typeString =typeString.yellow;
            
            break;
        case LogType.INFO:
            typeString =typeString.blue;
            
            break;
    } 
    console.log(`[${type.toString()}] [${dateFormat(new Date())}] ${message}`)
}
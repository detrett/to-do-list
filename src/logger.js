export class Logger {
    constructor(){

    }
    logInfo(string, color = "black") {
        console.log(`%c ${string}`, `font-weight: 600; color: ${color};`)
    }
}
var moment = require('moment')
var args = require('minimist')(process.argv.slice(2))["_"]
var env = require('./env.js')
var string_constants = require('./string_constants.js')
var nowDateTime = moment()
var oneYearOldDateTime = moment().subtract(1, 'years')

processParams()











function processParams() {
    console.log(randomIntensity())

    if (args.length > 1) {
        error("too_many_arguments")
    }
    
    if (args.length == 0) {
        help()
    }

    switch (args[0]) {
        case "lastYear":
            break
        case "everyday":
            break
        default:
            help()
            break
    }
}

// Convinience Methods :

function randomIntensity() {
    return Math.floor(Math.random() * (env.maxIntensity - env.minIntensity) + env.minIntensity)
}

function error(key) {
    console.error(string_constants.error[key])
    exit()
}

function help() {
    printInfo("help")
}

function printInfo(key) {
    console.log(string_constants.general[key])
    exit()
}

function exit() {
    process.exit()
}


console.log("Implement test cases")
console.log("Implement Readme")
var moment = require('moment')
var args = require('minimist')(process.argv.slice(2))["_"]
var env = require('./env.js')
var string_constants = require('./string_constants.js')
var nowDateTime = moment()
var oneYearOldDateTime = moment().subtract(1, 'years')
const exec = require('child_process').exec;
var sleep = require('sleep')

processParams()

function fillLastYearCommits() {

    var enumerateDaysBetweenDates = function(startDate, endDate) {
        var now = startDate, dates = [];
        
       while (now.isSameOrBefore(endDate)) {
              dates.push(now.format("ddd MMM DD YYYY HH:mm:ss"));
            var intensity = randomIntensity()
            for (var i =0;i<intensity;i++) {
                dates.push(now.add(15,'seconds').format("ddd MMM DD YYYY HH:mm:ss"))
            }

            now.add(1, 'days')
          }
        return dates;
    };

    var totalDates = enumerateDaysBetweenDates(oneYearOldDateTime, nowDateTime);
    var totalCount = totalDates.length
    makeFakeGraph()

    function makeFakeGraph() {
        if (totalDates.length == 0) {
            console.log(' *** PUSHING ***')
            setTimeout(push, 3000);
        } else {
                console.log('*****************************Committing '+totalDates.length+"/"+totalCount+"******************************")
                commit(totalDates[totalDates.length - 1])
            totalDates.pop()
        }
    }

    function commit(commitDate) {
        var commitScript = exec('sh git_commit.sh '+'"cd '+env.repoLocalSrc+'" "'+commitDate+'"',
        (error, stdout, stderr) => {
            console.log(`${stdout}`);
            console.log(`${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
            makeFakeGraph()
        })
    }

    function push() {
        var pushScript = exec('sh git_push.sh "cd '+env.repoLocalSrc+'"',
        (error, stdout, stderr) => {
            console.log(`${stdout}`);
            console.log(`${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        })
    }
}

function processParams() {

    if (args.length > 1) {
        error("too_many_arguments")
    }
    
    if (args.length == 0) {
        help()
    }

    switch (args[0]) {
        case "lastYear":
            fillLastYearCommits()
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

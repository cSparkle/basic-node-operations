const fs = require('fs');
const path = require('path');

function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
};

function evaluateCmd(userInput) {
    const userInputArray = userInput.split(' ');
    const command = userInputArray[0];

    switch(command) {
        case 'echo':
            commandLibrary.echo(userInputArray.slice(1).join(' '));
            break;
        case 'cat':
            commandLibrary.cat(userInputArray.slice(1));
            break;
        case 'head':
            commandLibrary.head(userInputArray.slice(1));
            break;
        case 'tail':
            commandLibrary.tail(userInputArray.slice(1));
            break;
        default:
            commandLibrary.errorHandler();
    }
};

const commandLibrary = {
    'echo': function(userInput) {
        done(userInput);
    },
    'cat': function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            done(data);
        });
    },
    'head': function(fullPath) {
        const fileName = fullPath[0];
        var data = fs.readFileSync(fileName, 'utf8');
        const lines = data.split('\n');
        var i = 0;
        var result = [];
            while (i < 10) {
                result.push(lines[i]);
                i++;
            }
        result = result.join('\n');
        done(result);
    },
    'tail': function(fullPath) {
        const fileName = fullPath[0];
        var data = fs.readFileSync(fileName, 'utf8');
        var lines = data.split('\n');
        lines.reverse();
        var i = 0;
        var result = [];
            while (i < 10) {
                result.push(lines[i]);
                i++;
            }
        result = result.join('\n');
        done(result);
    },
    'errorHandler': function() {
        done('No command found. Try again.');
    }
}


module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
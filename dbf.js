var Parser = require('node-dbf'),
    sprintf = require("sprintf"),
    fs = require("fs");

var parser = new Parser('dbf/PE_1.dbf');

var records = 0,
    data = {};

parser.on('record', function(record) {
    //console.log(record.VOL_SEZNAM, record.PL_HL_CELK, record.HLASY_06);
    var electors =  record.VOL_SEZNAM;
    var votes =  record.PL_HL_CELK;
    var winerVotes = record.HLASY_06;
    if (votes === 0) return;
    var winnerPercents = Math.round(parseFloat(winerVotes) / votes * 100);
    var voterTurnout = Math.round(parseFloat(votes) / electors * 100);
    //console.log( + ' ' + voterTurnout + '% -> ' + winnerPercents + '%');
    var key = sprintf("%02d,%02d", winnerPercents, voterTurnout);
    if (key in data) {
        data[key] += 1;
    } else {
        data[key] = 1;
    }
    records++;
});

parser.on('end', function(p) {
    console.log(records);
    fs.writeFileSync('data/p2013_2.json', JSON.stringify(data));
});

parser.parse();
var fs = require('fs');

var infile = 'data/p2013_2.json',
    outfile = 'charts/p2013r2.html';

var data = JSON.parse(fs.readFileSync(infile));

var keys = Object.keys(data);
    districtCount = 0;

var out = ['<html><head><head><body>'];

out.push('<div style="width: 303px; height: 303px; background-color: #2b2d80; position: relative">');

keys.sort();
for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (key.indexOf('NaN') !== -1) continue;
    //console.log(key, data[key]);
    districtCount += data[key];
    var t = key.split(',');
    var winnerPercents = parseInt(t[0]);
    var voterTurnout = parseInt(t[1]);
    //console.log(winnerPercents, voterTurnout);
    color = '#3651a6';
    if (data[key] >= 3) color = '#61c4db';
    if (data[key] >= 7) color = '#9fd475';
    if (data[key] >= 12) color = '#fee51c';
    if (data[key] >= 18) color = '#fee51c';
    if (data[key] >= 26) color = '#ff9339';
    if (data[key] >= 35) color = '#d95843';
    if (data[key] >= 45) color = '#9b1011';

    out.push('<div style="width: 3px; height: 3px; position: absolute; bottom: '+(winnerPercents*3)+
        'px; left: '+(voterTurnout*3)+'px; background-color: '+color+'"></div>');
}

out.push('</div></body></html>');

fs.writeFileSync(outfile, out.join('\n'));

console.log('Total districs ' + districtCount);
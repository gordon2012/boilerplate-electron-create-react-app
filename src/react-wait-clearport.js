const find = require('find-process');
const ps = require('ps-node');

find('port', 3000).then(list => {
    if(list.length === 0) {
        console.log('starting react');
        const exec = require('child_process').exec;
        exec('npm run react-start');
    } else {
        list.forEach(e => {
            ps.kill(e.pid, 'SIGKILL', err => {
                if(err) {
                    throw new Error(err);
                } else {
                    console.log(`Killed [name=${e.name}][pid=${e.pid}][cmd=${e.cmd}]`);
                    console.log('starting react');
                    const exec = require('child_process').exec;
                    exec('npm run react-start');
                }
            });
        });
    }
}, function (err) {
    console.log(err.stack || err);
});

var util = require("util");
var request = require("request")
var spawn = require("child_process").spawn;
var check;
function update(IP) {
    request('https://www.duckdns.org/update?domains=minhdz117.duckdns.org&token=35f710a0-37ac-4979-9c2b-60fa9e86304e&ip=' + IP,
        function (error, response, body) {
            console.error('error:', error);
            console.log('body:', body);
        });
    request({
        method: 'PUT',
        url: 'https://api.cloudflare.com/client/v4/zones/ed309d3fd69d57696f8b7a4fefacb6a3/dns_records/c085588cb943500974dc8e42716a5a2a',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Email': 'minhdz117@gmail.com',
            'X-Auth-Key': '00926373a4dd1031a7eccaa86209ee3554cd8'
        },
        body: '{"type":"A","name":"minhvuongmaket.com","content":"120.120.120.120","ttl":120,"proxied":false}'
    }, function (error, response, body) {
        console.error('error:', error);
        console.log('body:', body);
    })
}
function autoUpdate() {
    var process = spawn('python', ["selen.py"]);
    process.stdout.on('data', function (chunk) {
        var IP = chunk.toString('utf8');
        if (check != IP) {
            update(IP);
            console.log('Da cap nhat ip moi ' + IP)
            check = IP;
        }
    });
}
async function automatic() {
    setInterval(() => {
        autoUpdate()
    }, 360000)
}
automatic()
const request = require("request")

var IP=""

function autoUpdateIP() {
    request("http://www.geoplugin.net/json.gp",
    (error, response, body)=>{
        if (IP != JSON.parse(body).geoplugin_request){
            IP =JSON.parse(body).geoplugin_request
            updateCloudflare(IP)
            //updateDNS(IP)
            console.log("update")
        }
    })
}

function updateDNS(IP) {
    request('https://www.duckdns.org/update?domains=minhdz117.duckdns.org&token=35f710a0-37ac-4979-9c2b-60fa9e86304e&ip=' + IP,
        function (error, response, body) {
            console.error('error:', error);
            console.log('body:', body);
        });
}

function updateCloudflare(IP) {
    console.log(IP)
    request({
        method: 'PUT',
        url: 'https://api.cloudflare.com/client/v4/zones/966ee69a16ab379b53efa3900f790788/dns_records/234e363fd0987bd6c8174cff780b2d02',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Email': 'minhdz117@gmail.com',
            'X-Auth-Key': '00926373a4dd1031a7eccaa86209ee3554cd8'
        },
        body: `{"type":"A","name":"botentori.com","content":"${IP}","ttl":1,"proxied":true}`
    }, function (error, response, body) {
        console.error('error:', error);
        console.log('body:', body);
    })
}

autoUpdateIP()
setInterval(() => {
    autoUpdateIP()
}, 60*1000);
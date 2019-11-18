var rp = require('request-promise');
var cheerio = require('cheerio'); // Basically jQuery for node.js


exports.test = async (req, res) => {
   
    rp('http://213.176.224.228:888/test2/hs/PS/?code=000000073')
    .then(function (htmlString) {
        console.log(htmlString.body)
    })
    .catch(function (err) {
        console.log(err)
    });
}



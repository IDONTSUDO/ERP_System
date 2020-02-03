
var parser = require('fast-xml-parser');
let http = require('http')
let request = require('request');
var convert = require('xml-js');
var he = require('he');

require("dotenv").config()


let port = `${process.env.PORT}` || 2020

var options = {
    attributeNamePrefix : "",
    attrNodeName: "", //default is 'false'
    textNodeName : "#text",
    ignoreAttributes : false,
    ignoreNameSpace : false,
    allowBooleanAttributes : false,
    parseNodeValue : true,
    parseAttributeValue : false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: true, //"strict"
    attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
    tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
    stopNodes: ["parse-me-as-string"]
};

request(`${process.env.SERVER_1C}`, function (err, res, body) {
    if (err) throw err;
    // let ConrAgent = JSON.parse(body)
    console.log(typeof body)
    if (console.log(body == String)) {
        console.log(200)
        return console.log("Косяк")
    } else {
        var tObj = parser.getTraversalObj(body,options);
       
        var jsonObj = parser.convertToJson(tObj,options);
        let atr = jsonObj.UIDs[0]
        
        for(let i in atr.Элемент){
            // console.log(atr.Элемент[i].attr.adresy)
            let data = atr.Элемент[i].adresy
          
            if(data[0] === "{"){
                JSON.parse(data)
                let JSON_Data = data
                console.log("EBANY 1-C")
                console.log(JSON_Data)
                console.log("EBANY 1-C")
            }
            
            // let adresy_parse с
            // var xml_adresy = parser.getTraversalObj(data,options);
            
            
            // adresy_parse = parser.convertToJson(xml_adresy,options);
            
            // let XML_Data = adresy_parse.КонтактнаяИнформация
            // for(let k  in XML_Data){
            //     console.log(XML_Data[k].Представление)
            //     // 
            // }
        }
        //     let ContrAgent = JSON.parse(body)

        //    let ContrAgentObject = ContrAgent.UIDs
        //    console.log(typeof ContrAgentObject)
        //    for(let agent of ContrAgentObject){
        //        console.log(agent)

        //        var result1 = convert.xml2json(agent.adresy, {compact: true, spaces: 4});
        //        console.log(result1);

        //    }
        //   sole.log(body.UIDs)
        // console.log(typeof body)
        // console.log("its length",body.length)
        // for(let i = 0; i < ContrAgent.UIDs.length;i++){
        //     console.log(i)
        //     console.log(ContrAgent[i].UIDs.adresy)
        // } 
        // console.log(res.statusCode);
    }
});

// const requestHandler = (request, response) => {

// }
// requestHandler()
// const server = http.createServer(requestHandler)
// server.listen(port, (err) => {
//     if (err) {
//         return console.log('something bad happened', err)
//     }
//     console.log(`server is listening on ${port}`)
// })
//TODO request-promise

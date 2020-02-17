
let parser = require('fast-xml-parser');
let Integration = require('../database/Integration.js')
let AgentStatistic = require('../database/AgentStatistic.js')
let ContrAgent = require('../database/ContrAgent.js')
let request = require('request');
let rp = require('request-promise');

let he = require('he');

require("dotenv").config()


let options = {
    attributeNamePrefix: "",
    attrNodeName: "", //default is 'false'
    textNodeName: "#text",
    ignoreAttributes: false,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: true, //"strict"
    attrValueProcessor: (val, attrName) => he.decode(val, { isAttributeValue: true }),//default is a=>a
    tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
    stopNodes: ["parse-me-as-string"]
};



exports.integrationList = async (req, res) =>{
    const currentPage = req.query.page || 1
    const perPage = 50
    var totalItems

    const integrations = await Integration.find()

        .countDocuments()
        .then(count => {
            totalItems = count;
            return Integration.find()
                .skip((currentPage - 1) * perPage)
                
                .limit(perPage)

        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => console.log(err))
}

exports.integrationAllAgent = async (req, res,next) => {
    let report 
    // Integration.save()
   
    let intg = new Integration(req.body)
    // let user = {
    //     user:req.body
    // }
    intg.date = Date.now()
    intg.userBy = req.body
    await intg.save((err, result) => {

 
        report = result._id


    // алгоритм сложностью o(n / ебаный в рот этого enterpise). 
    rp(`${process.env.SERVER_1C}`)
        .then(function (xmlData) {
            async function Adding(xmlData) {
                var tObj = parser.getTraversalObj(xmlData, options);

                var jsonObj = parser.convertToJson(tObj, options);
                let atr = jsonObj.UIDs[0].Элемент



                function sort_unique(atr) {
                    const result = [];
                    const map = new Map();
                    for (const item of atr) {
                        if(!map.has(item.uid)){
                            map.set(item.uid, true);    // set any value to Map
                            result.push({
                                UUID: item.uid,
                                full_name: item.naimf,
                                name:item.naim,
                                INN: item.inn,
                                email:item.Email,
                                payment_account:item.rs,
                            });
                        }
                    }
                    return result
                }
                let result_sort_unique = sort_unique(atr)





        
                for await (let i of result_sort_unique ){
              
                    ContrAgent.findOne({UUID:i.UUID}).then(results =>{
                        if(results === null){
                            let save_contr_agent =  new ContrAgent(i)
                            save_contr_agent.save().then(result => {
                                let saveData = new AgentStatistic()
                                saveData.agentBy = `${result._id}`
                                saveData.save().then( data =>{
                                    console.log(data)
                                })
                             })
                        }else{
                            console.log("работай пужалуста")
                        }
                    })
                }   
              
            }
        
            Adding(xmlData)

            return res.status(200).json({ "OK": "OK" })
        })
        .catch(function (err) {
            return res.status(200).json({ "ebany": "1-c" })
        });



    })
}
exports.agentStaricTabel = (req,next) =>{
   let agentId =  req.agentId 
    let saveData = new AgentStatistic()
    saveData.agentBy = `${agentId}`
    saveData.save().exec((result,err) => {
        console.log(result)
    })
}
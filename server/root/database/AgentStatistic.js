const mongoose = require('mongoose')
const AgentStatistic = new mongoose.Schema({
    year:{
        type:String
    },
    01:{
        type:Number,
        default:0
    },
    02:{
        type:Number,
        default:0
    },
    03:{
        type:Number,
        default:0
    },
    04:{
        type:Number,
        default:0
    },
    05:{
        type:Number,
        default:0
    },
    06:{
        type:Number,
        default:0
    },
    07:{
        type:Number,
        default:0
    },
    08:{
        type:Number,
        default:0
    },
    09:{
        type:Number,
        default:0
    },
    10:{
        type:Number,
        default:0
    },
    11:{
        type:Number,
        default:0
    },
    12:{
        type:Number,
        default:0
    },

    // dateArray:{
    //     type:Object,
    //     default:
    //     {
    //         "01":0,
    //         "02":0,
    //         "03":0,
    //         "04":0,
    //         "05":0,
    //         "06":0,
    //         "07":0,
    //         "08":0,
    //         "09":0,
    //         "10":0,
    //         "11":0,
    //         "12":0
    //     }
    // },
    agentBy:{
        type:String
    }
})
module.exports = mongoose.model("AgentStatistic", AgentStatistic)
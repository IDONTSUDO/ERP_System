const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const UserStatisticMounthSchema = new mongoose.Schema({
    year:{
        type:String
    },
    01:{
        type:Object,
        default:0
    },
    02:{
        type:Object,
        default:0
    },
    03:{
        type:Object,
        default:0
    },
    04:{
        type:Object,
        default:0
    },
    05:{
        type:Object,
        default:0
    },
    06:{
        type:Object,
        default:0
    },
    07:{
        type:Object,
        default:0
    },
    08:{
        type:Object,
        default:0
    },
    09:{
        type:Object,
        default:0
    },
    10:{
        type:Object,
        default:0
    },
    11:{
        type:Object,
        default:0
    },
    12:{
        type:Object,
        default:0
    },
    userId:{
        type:ObjectId
    }
})
module.exports = mongoose.model("UserActiveMounth", UserStatisticMounthSchema)
import {GetWeekObjectId} from "../Api/Http"
import { isAuthenticated } from "../Api/Auth"
import moment from "moment"




export function weekStatic() {
    let WeekNum = moment().isoWeek();
    let year = moment()
    .locale("ru")
    .format("YY");
    let userId = isAuthenticated().direct._id;

    let body = {
        WeekNum,
        year,
        userId
    }
    GetWeekObjectId(body).then(data =>{
        if (typeof window !== "undefined") {
            localStorage.setItem("week", JSON.stringify(data))
        }
    })
}
export function weekEvery(){
    if(WeekAnalyzed()){
        return true
    }else{
        weekStatic()
    }

}
function WeekAnalyzed(){
    if (typeof window == "undefined") {
        return false
    }
    if (localStorage.getItem("week")) {
        let weekLocalStor = JSON.parse(localStorage.getItem("week"))
        let WeekNum = moment().isoWeek();
      
        if(WeekNum  == weekLocalStor.week){
            return true
        }else{
            return false
        }
    } else {
        weekStatic()
    }
}
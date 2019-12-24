import { NewSubscribeEveryDay } from '../Api/Http.js'

export const IsEveryDaySub = () =>{
    if (typeof window == "undefined") {
        return false
    }
    if (localStorage.getItem("everydaySubscribe")) {
        return JSON.parse(localStorage.getItem("everydaySubscribe"))
    } else {
        return false
    }
}



export const everyday = () => {
    let d = new Date();
    let curr_date = d.getDate()
    let curr_month = d.getMonth() + 1
    let curr_year = d.getFullYear()
    let Localtime = `${curr_year}-${curr_month}-${curr_date}`
    let sub = IsEveryDaySub()

    if (sub === null) { 
        NewSubscribeEveryDay().then(data => {            
            const {_id,day } = data
            let everydaySubscribe = {_id,day}
            localStorage.setItem("everydaySubscribe", JSON.stringify(everydaySubscribe))
        })
    }
    if (Localtime == sub.day) {
        console.log(202)

        return true
    } else {
        console.log(20)
        NewSubscribeEveryDay().then(data => {            
            const {_id,day } = data
            let everydaySubscribe = {_id,day}
            localStorage.setItem("everydaySubscribe", JSON.stringify(everydaySubscribe))
        })
    }
}
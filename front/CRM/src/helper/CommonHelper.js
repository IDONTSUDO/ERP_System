import moment from "moment";
import { isAuthenticated } from "../Api/Auth";

export default function todoSort(todo) {
  return todo.map((todos, k) =>
    todos.JobArray.length === 0
      ? ""
      : todos.JobArray.map(
          (tod, i) =>
            // tod.user === `${isAuthenticated().direct._id}IAMWORKED`
            console.log(moment().diff(moment(todos.diff[i]), "days"<= 0))
            //   ? moment().diff(moment(todos.diff[i]), "days") 
            //   >=
            //     -9 ? ({resolve:"GREN",todos}):(moment().diff(moment(todos.diff[i]), "days") >=
            //     -3 ? ({resolve:"YELLOW",todos}):(null) )
            //   : null
       
        )
  );

  //  for(let tod of todo){
  //     if(tod.JobArray.length === 0){

  //     }else{
  // tod.JobArray.map((todos,i) =>{
  //    if(todos.user === `${isAuthenticated().direct._id}IAMWORKED`){
  //        let dateDiff = moment().diff(moment(tod.diff[i]), "days")
  //        if(dateDiff >= -9){
  //            return tod.green = true
  //        }
  //        if(dateDiff >= -3){
  //         return tod.yellow = true
  //        }
  //        if(dateDiff <= 0){
  //         return tod.red = true
  //        }
  //     }
  // })
  //     }
  // }
}

import { GetWeekObjectId } from "../Api/Http";
import { isAuthenticated } from "../Api/Auth";
import moment from "moment";

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
  };

  GetWeekObjectId(body).then(data => {
    if (typeof window !== "undefined") {
      localStorage.setItem("week", JSON.stringify(data));
    }
  });
}
export function weekEvery() {
  if (WeekAnalyzed()) {
  } else {
    weekStatic();
  }
}
function WeekAnalyzed() {
  if (localStorage.getItem("week") == undefined) {
    weekStatic();
  } else {
    let item = JSON.parse(localStorage.getItem("week"));
    let WeekNum = moment().isoWeek();
    if (WeekNum != item.week) {
      weekStatic();
    }
  }
}

export function calendarRegim() {}

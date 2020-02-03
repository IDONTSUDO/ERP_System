import { ajax } from "rxjs/ajax"
import { isAuthenticated } from './Auth.js'
import { map, switchMap } from "rxjs/operators";
import { FETCH_DATA, fetchFulfilled, setStatus } from "../reducers/beersActions";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";


const token = isAuthenticated().token
const userId = isAuthenticated().direct._id;


export function fetchBeersEpic(action$) {
    return action$.pipe(
        ofType(FETCH_DATA),
        switchMap(() => {
            return concat(
                of(setStatus("pending")),
                ajax.post({
                    url:`${process.env.REACT_APP_API_URL}/chanel/list`, 
                    method: 'POST',
                    headers: {
                        "Accept": "application/json", "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: {
                      userId: `${userId}`
                    }
                })
            )
        })
    );
}
ajax.getJSON(API).pipe(
    map(resp => fetchFulfilled(resp))
)

ajax.post('url', { param: 42 }, { 'Content-Type': 'application/json' });

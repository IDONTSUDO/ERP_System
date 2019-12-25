import { isAuthenticated} from "../Api/Auth"


const jwt = isAuthenticated().token
const JSONjwt = JSON.stringify(jwt)

export const testSoket = () => {
  let wsOnline = new WebSocket('ws:localhost:4041/online', `${jwt}`)

  wsOnline.onmessage = function(e){ console.log(e.data); };
  wsOnline.onopen = () => wsOnline.send("1");
  wsOnline.close = () => wsOnline.send("2");
}

export const isOnline = (user) =>{
  let wsUser = new WebSocket('ws:localhost:4041/user', `${jwt}`)
  wsUser.onmessage = function(e){ console.log(e.data); };
  wsUser.onopen = () => wsUser.send(JSON.stringify(user));
}
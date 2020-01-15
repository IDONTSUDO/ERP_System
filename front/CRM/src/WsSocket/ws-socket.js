import { isAuthenticated} from "../Api/Auth"


const jwt = isAuthenticated().token
const JSONjwt = JSON.stringify(jwt)
 
// let wsUser = new   WebSocket(`ws:localhost:4041/online/${jwt}`)

export let wsUser = new   WebSocket(`ws:localhost:4041/online/${jwt}`)


export const isOnline = (user) =>{
  
  wsUser.subscribe = function(e){ console.log(e.data); };
  wsUser.subscribe = () =>  wsUser.send(JSON.stringify(user));
}
export const TestSocket = () =>{
  // console.log(200)
   wsUser.message = function(e){ console.log(e)   };
}
// return e.data 



class Socket {
  constructor(url = "ws:localhost:4041/user") {
    this.url = url;
    this.state = {
      connected: false,
      messages: {
        received: 0,
        sent: 0,
        lastIn: "",
        lastOut: ""
      },
      lastError: ""
    };
  }

  setUrl(url) {
    this.url = url || "ws:localhost:4041/user";
  }

  init() {
    const websocket = new WebSocket(this.url);
    websocket.onopen = event => {
      this.onOpen(event);
    };
    websocket.onclose = event => {
      this.onClose(event);
    };
    websocket.onmessage = event => {
      this.onMessage(event);
    };
    websocket.onerror = event => {
      this.onError(event);
    };
    this.websocket = websocket;
  }

  onClose(event) {
    this.state.connected = false;
    document.dispatchEvent(
      new CustomEvent("socket-closed", { detail: "Socket Disconnected." })
    );
  }

  onMessage(event) {
    this.state.messages.received++;
    this.state.messages.lastIn = event.data;
    document.dispatchEvent(
      new CustomEvent("socket-receive", { detail: event.data })
    );
  }

  onError(event) {
    this.state.lastError = event.data;
    document.dispatchEvent(
      new CustomEvent("socket-error", { detail: event.data })
    );
  }
  onOpen(event) {
    this.state.connected = true;
    document.dispatchEvent(
      new CustomEvent("socket-open", { detail: "Socket Connected." })
    );
    this.send("helo");
  }

  send(message) {
    this.state.messages.sent++;
    this.state.messages.lastOut = message;
    document.dispatchEvent(new CustomEvent("socket-send", { detail: message }));
    this.websocket.send(message);
  }
  close() {
    this.websocket.close();
  }
}

export default new Socket();

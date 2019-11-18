import * as serviceWorker from '../Push/serviceWorker';

export const signin = user => {
    return fetch(`${process.env.REACT_APP_API_URL}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}
export const authencate = (jwt, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(jwt))
        next()
    }
}

export const signout = (next) => {

    if (typeof window !== "undefined") localStorage.removeItem("jwt")
    window.location.reload()
    deleteDevice()
    serviceWorker.unregister(); 
    next()
    return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
        method: "GET"
    })
        .then(response => {
            console.log('signout', response)
            return response.json()
        })
        .catch(err => console.log(err))
        
}

export const isDevice = () =>{
    if (typeof window == "undefined") {
        return false
    }
    if (localStorage.getItem("device")) {
        return JSON.parse(localStorage.getItem("device"))
    } else {
        return false
    }
}
export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false
    }
}
function deleteDevice(next){
    if (typeof window !== "undefined"){
        let key =  isDevice()

        console.log(key)
        next()
    }
      
 
}
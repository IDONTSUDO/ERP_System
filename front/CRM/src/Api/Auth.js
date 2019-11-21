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
export const signout = (next) => {
    let token =  isAuthenticated().token
    return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json", "Content-Type": "application/json",
        },
        method: "GET"

    })
        .then(response => {
            serviceWorker.unregister(); 
            if (typeof window !== "undefined") localStorage.removeItem("subscribe")
            if (typeof window !== "undefined") localStorage.removeItem("jwt")
            window.location.reload()
        })
        .catch(err => console.log(err))
        
}

export const Subscribe = (subscribe, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("subscribe", JSON.stringify(subscribe))
    }
}
export const authencate = (jwt, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(jwt))
        next()
    }
}

export const IsSubscriber = () =>{
    if (typeof window == "undefined") {
        return false
    }
    if (localStorage.getItem("subscribe")) {
        return JSON.parse(localStorage.getItem("subscribe"))
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
export const deleteDevice = () =>{
    console.log(200)
    let id =  isAuthenticated().direct._id
    let token =  isAuthenticated().token
    return fetch(`${process.env.REACT_APP_API_URL}/get/ip/data`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id })

    })
        .then(responce => {
            return console.log(responce.json())
        })
        .catch(err => console.log(err))
}
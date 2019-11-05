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

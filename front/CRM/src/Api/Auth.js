/*
для авторизации
*/
export const signin = user => {
    return fetch(`http://localhost:8080/signin`, {
       method: "POST",
       headers: {
           Accept: "application/json", "Content-Type": "application/json"
       },
       body: JSON.stringify(user)
   })
   .then(responce =>{
       return responce.json()
   })
   .catch(err =>console.log(err))
}
/*
authencate - обновляет данные о пользователе
*/
export const authencate = (jwt, next ) => {
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt" , JSON.stringify(jwt))
        next()
    }
}
/*
signout - уничтожает JWT  из локлал строджа
и дает REQ серверу о том что надо выйти
*/
export const signout = (next) =>{
    if(typeof window !== "undefined") localStorage.removeItem("jwt")
    window.location.reload()
    next()
    return fetch(`http://localhost:8080/signout`,{
        method: "GET"
    })
    .then(response =>{
        console.log('signout',response)
        return response.json()
    })
    .catch(err => console.log(err))
}

/*
isAuthenticated - парсит информацию из локлал строджа
где находит описание его свойств
*/
export const  isAuthenticated = () =>{
    if(typeof window == "undefined"){
        return false
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }else{
        return false
    }
}

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
export const signout = () => {
    let token =  isAuthenticated().token
    return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json", "Content-Type": "application/json",
        },
        method: "GET"

    })
    // сначала идем на бэк, и оповещаем его о том что пользователь вышел
    // бэк при этом идет в бд, и на основани Юзер Агента и юзер айди которое он берет из токена
    // удаляет данные о подписке пользователя
        .then(response => {
            // убираем сервис воркера
            serviceWorker.unregister(); 
            if (typeof window !== "undefined") localStorage.removeItem("subscribe")
            if (typeof window !== "undefined") localStorage.removeItem("jwt")
            // поскольку меню у нас  классовый компонент, то оно имеет своё состояние
            // поэтому что бы вызвать хук жизненого цикла
            // мы перезагружаем страницу, это конечно костыль. 
            // но мне так лень переписывать
            window.location.reload()
        })
        .catch(err => console.log(err))
        
}
// добавляет в локальную сторю, информацию о том что подписка есть
export const Subscribe = (subscribe, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("subscribe", JSON.stringify(subscribe))
    }
}
// добавляет информацию о токене пользователя
export const authencate = (jwt, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(jwt))
        next()
    }
}
// ну тут все просто, эта функция  смотрит есть ли подписка в локальной сторе
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
// проверяет авторизован ли пользователь
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
// удаляет данные пользователя о подписке
export const deleteDevice = () =>{

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

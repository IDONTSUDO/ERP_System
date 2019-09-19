export const list = () =>{
    return fetch(`http://localhost:8080/all/worker/list`,{
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    })
.then(response =>{
    return response.json()
})
.catch(error =>{
    console.log(error)
})
}
export const DeleteUser = (userId,token) =>{
    return fetch(`http://localhost:8080/delete/worker/${userId}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
.then(response =>{
    return response.json()
})
.catch(error =>{
    console.log(error)
})
}
export const NewPeopel = user =>{
    return fetch(`http://localhost:8080/new/worker/`, {
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
export const NewTodo = (todo,user) =>{
    return fetch(`http://localhost:8080/new/todo/awesome/${user._id}`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
        
    })
    .then(responce =>{
        return responce.json()
    })
    .catch(err =>console.log(err))

//     for (let tag of tags) {
//         fetch(`http://localhost:8080/new/todo/awesome/${tag._id}`, {
//             method: "POST",
//             headers: {
//             Accept: "application/json", "Content-Type": "application/json"
//         },
//         body: JSON.stringify(todo)
//    })
//    .catch(err =>console.log(err))
//    }
    
}
export const read = (userId,token) =>{
    console.log(userId, token)
    return fetch(`http://localhost:8080/worker/get/${userId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
.then(response =>{
    return response.json()
})
.catch(err =>{
    console.log(err)
})
}
export const update = (userId,token,user ) =>{
    console.log(userId, token, user)
    return fetch(`http://localhost:8080/edit/worker/${userId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: user
    })
.then(response =>{
    return response.json()
})
.catch(err =>{
    console.log(err)
})
}
export const updateUser = (user, next) =>{
    console.log(user)
    if(typeof window !== "undefined"){
        if(localStorage.getItem("jwt")){
            let auth = JSON.parse(localStorage.getItem("jwt"))
            auth.user = user
            localStorage.setItem("jwt", JSON.stringify(auth))
            next()
            return console.log("NNO      ERRORs")
        }
        return console.log("ERRORs")
    }
}
export const readMyTodo = (userId,token) =>{
        return fetch(`http://localhost:8080/my/todo/soso/${userId}`,{
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        })
    .then(response =>{
        return response.json()
    })
    .catch(error =>{
        console.log(error)
    })
}

export const soloJob = (todoId,token) =>{
    console.log(todoId, token)
    return fetch(`http://localhost:8080/todo/${todoId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
        })
.then(response =>{
    return response.json()
})
.catch(err =>{
    console.log(err)
})
}
export const readComentList = (todoId,token) =>{
    
    return fetch(`http://localhost:8080/get/todo/coments/`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body:JSON.stringify({todoId})
    })
.then(response =>{

    return response.json()
})
.catch(error =>{
    console.log(error)
})
}

export const NewComent = (comment,token) =>{

    return fetch(`http://localhost:8080/comment/todo/`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body:comment
    })
.then(response =>{

    return response.json()
})
.catch(error =>{
    console.log(error)
})
}

export const DeleteComment = (comment) =>{
    return fetch(`http://localhost:8080/delete/comment/${comment}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        
    })
.then(response =>{

    return response.json()
})
.catch(error =>{
    console.log(error)
})
}

export const NewNews = (payload) =>{
    return fetch(`http://localhost:8080/new/news`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body:JSON.stringify(payload)
        
    })
.then(response =>{

    return response.json()
})
.catch(error =>{
    console.log(error)
})
}

export const listNews = (id) =>{
    console.log(JSON.stringify({id}))
    return fetch(`http://localhost:8080/worker/news`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body:JSON.stringify({id})
        
    })
.then(response =>{

    return response.json()
})
.catch(error =>{
    console.log(error)
})
}
export const SetStatusJob = (status,todoId) =>{
    
    console.log(JSON.stringify({status:status}))
    console.log(todoId)
    return fetch(`http://localhost:8080/todo/change/${todoId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body:JSON.stringify({status:status})
    })
.then(response =>{

    return response.json()
})
.catch(error =>{
    console.log(error)
})
}
export const TodayWorkHTTP = (userId) =>{
    console.log(userId)
    return fetch(`http://localhost:8080/today/todo/${userId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
        })
.then(response =>{
    return response.json()
})
.catch(err =>{
    console.log(err)
})
}

export const TodoChangeExperienseAtHTTP = (expireAt,todoId) =>{
    console.log(JSON.stringify({expireAt:expireAt}))
    return fetch(`http://localhost:8080/todo/change/${todoId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({expireAt:expireAt})
        })
.then(response =>{
    return response.json()
})
.catch(err =>{
    console.log(err)
})
}


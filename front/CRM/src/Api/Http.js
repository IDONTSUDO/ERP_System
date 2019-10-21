export const list = page =>{

    return fetch(`http://localhost:8080/all/worker/list/?page=${page}`,{
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
export const NewContrAgent = (NewAgent,user) =>{
   
    return fetch(`http://localhost:8080/new/agent/${user}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(NewAgent)
        })
.then(response =>{
    return response.json()
})
.catch(err =>{
    console.log(err)
})
}
export const ContrAgentList = page =>{
   
    return fetch(`http://localhost:8080/agent/list/?page=${page}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        })
.then(response =>{
    return response.json()
})
.catch(err =>{
    console.log(err)
})
}
export const GetAgentProfile = (agentId) =>{
   
    return fetch(`http://localhost:8080/agent/${agentId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        })
.then(response =>{
    return response.json()
})
.catch(err =>{
    console.log(err)
})
}


export const AddManageForAgent = (tags,agentId) =>{
    return fetch(`http://localhost:8080/new/manage/agent/${agentId}`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json"
        },
        body: JSON.stringify({tags})
        
    })
    .then(responce =>{
        return responce.json()
    })
    .catch(err =>console.log(err))
}

export const MyAgentList = (workerId) =>{
    return fetch(`http://localhost:8080/agent/manage/`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json"
        },
        body: JSON.stringify({workerId})
    })
    .then(responce =>{
        return responce.json()
    })
    .catch(err =>console.log(err))
}
export const MyHistoryActive = (userId) =>{
    return fetch(`http://localhost:8080/my/history/active/`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json"
        },
        body: JSON.stringify({userId})
    })
    .then(responce =>{
        return responce.json()
    })
    .catch(err =>console.log(err))
}
export const MyHistoryBeginer = (userId) =>{
    return fetch(`http://localhost:8080/my/history/beginer/`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json"
        },
        body: JSON.stringify({userId})
    })
    .then(responce =>{
        return responce.json()
    })
    .catch(err =>console.log(err))
}

export const MyHistoryComplete = (userId) =>{
    return fetch(`http://localhost:8080/my/history/complete/`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json"
        },
        body: JSON.stringify({userId})
    })
    .then(responce =>{
        return responce.json()
    })
    .catch(err =>console.log(err))
}
export const OneHistoryGet = (HistoryById) =>{
    return fetch(`http://localhost:8080/history/${HistoryById}`, {
        method: "GET",
        headers: {
            Accept: "application/json", "Content-Type": "application/json"
        }
    })
    .then(responce =>{
        return responce.json()
    })
    .catch(err =>console.log(err))
}

export const ChangeHistory = (DealId,status) =>{
    return fetch(`http://localhost:8080/change/history/${DealId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json", "Content-Type": "application/json"
        },
        body: JSON.stringify({status})
    })
    .then(responce =>{
        return responce.json()
    })
    .catch(err =>console.log(err))
}
export const ChangeHistoryItem = (DealId,payload) =>{
    return fetch(`http://localhost:8080/change/history/${DealId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json", "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(responce =>{
        return responce.json()
    })
    .catch(err =>console.log(err))
}
export const SearchContrAgent = (item) =>{
    return fetch(`http://localhost:8080/agent/search`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json"
        },
        body: JSON.stringify({item})
    })
    .then(responce =>{
        return responce.json()
    })
    .catch(err =>console.log(err))
}
export const listStatisticCompany = () =>{
    return fetch(`http://localhost:8080/get/qauality/user/statistic`, {
        method: "GET",
        headers: {
            Accept: "application/json", "Content-Type": "application/json"
        }
    })
    .then(responce =>{
        return responce.json()
    })
    .catch(err =>console.log(err))
}
export const NewDealHistory = (payload) =>{
    return fetch(`http://localhost:8080/new/history/`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(responce =>{
        return responce.json()
    })
    .catch(err =>console.log(err))
}
export const AllAgentHistory = (agentId) =>{
   
    return fetch(`http://localhost:8080/all/agent/history/`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json"
        },
        body: JSON.stringify({agentId:agentId})
    })
    .then(responce =>{
        return responce.json()
    })
    .catch(err =>console.log(err))
}
export const UpdateNews = (NewsArray)=>{
    console.log(NewsArray)
    for (let news  of NewsArray) {
        console.log(news)
        fetch(`http://localhost:8080/worker/read/${news}`, {
            method: "POST",
            headers: {
            Accept: "application/json", "Content-Type": "application/json"
        }
   })
   .catch(err =>console.log(err))
   }
}
export const TodoUpTime = (ID,UpTime) =>{
 
    return fetch(`http://localhost:8080/todo/change/${ID}`, {
        method: "POST", 
        headers: {
            Accept: "application/json", "Content-Type": "application/json"
        },
        body: JSON.stringify({time:UpTime})
    })
    .then(responce =>{
        return responce.json()
    })
    .catch(err =>console.log(err))
}
export const ChangeAgent = (AgentId,status) =>{
    return fetch(`http://localhost:8080/change/agent/${AgentId}`, {
        method: "PUT", 
        headers: {
            Accept: "application/json", "Content-Type": "application/json"
        },
        body: JSON.stringify({status:status})
    })
    .then(responce =>{
        return responce.json()
    })
    .catch(err =>console.log(err))
}
export const MyTodoGetComandWorked = (userId) =>{
    return fetch(`http://localhost:8080/get/comand/todo/`, {
        method: "POST", 
        headers: {
            Accept: "application/json", "Content-Type": "application/json"
        },
        body: JSON.stringify({userId})
    })
    .then(responce =>{
        return responce.json()
    })
    .catch(err =>console.log(err))
}
// export const WorkerList = (users) =>{
//     for (let user of users) {
//                 return fetch(`http://localhost:8080/worker/get/${user}`, {
//                     method: "GET",
//                     headers: {
//                     Accept: "application/json", "Content-Type": "application/json"
//                 }
//            })
//            .then(responce =>{
//             return responce.json()
//             })
//            .catch(err =>console.log(err))
//     }
// }
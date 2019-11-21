import { isAuthenticated } from './Auth.js'
const token = isAuthenticated().token

export const list = page => {

    return fetch(`${process.env.REACT_APP_API_URL}/all/worker/list/?page=${page}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}
export const DeleteUser = (userId) => {

    return fetch(`${process.env.REACT_APP_API_URL}/delete/worker/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}
export const NewPeopel = user => {

    return fetch(`${process.env.REACT_APP_API_URL}/new/worker/`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}

export const NewTodo = (todo, user) => {
    return fetch(`${process.env.REACT_APP_API_URL}/new/todo/awesome/${user._id}`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(todo)

    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}
export const read = (userId) => {

    return fetch(`${process.env.REACT_APP_API_URL}/worker/get/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}
export const update = (userId, user) => {

    return fetch(`${process.env.REACT_APP_API_URL}/edit/worker/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: user
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}
export const updateUser = (user, next) => {

    if (typeof window !== "undefined") {
        if (localStorage.getItem("jwt")) {
            let auth = JSON.parse(localStorage.getItem("jwt"))
            auth.user = user
            localStorage.setItem("jwt", JSON.stringify(auth))
            next()
            return console.log("NNO      ERRORs")
        }
        return console.log("ERRORs")
    }
}
export const readMyTodo = (userId) => {

    return fetch(`${process.env.REACT_APP_API_URL}/my/todo/soso/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}

export const soloJob = (todoId) => {

    return fetch(`${process.env.REACT_APP_API_URL}/todo/${todoId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}
export const readComentList = (todoId) => {

    return fetch(`${process.env.REACT_APP_API_URL}/get/todo/coments/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ todoId })
    })
        .then(response => {

            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}

export const NewComent = (comment) => {

    return fetch(`${process.env.REACT_APP_API_URL}/comment/todo/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: comment
    })
        .then(response => {

            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}

export const DeleteComment = (comment) => {

    return fetch(`${process.env.REACT_APP_API_URL}/delete/comment/${comment}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

    })
        .then(response => {

            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}
export const OneNewsDelete = (newsId) => {
    // /new/delete/:newsId

}
export const NewNews = (payload) => {
    console.log(payload)
    return fetch(`${process.env.REACT_APP_API_URL}/new/news`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)

    })
        .then(response => {

            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}

export const listNews = (id) => {

    return fetch(`${process.env.REACT_APP_API_URL}/worker/news`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id })

    })
        .then(response => {

            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}
export const SetStatusJob = (payload, todoId) => {
    console.log(payload)
    return fetch(`${process.env.REACT_APP_API_URL}/todo/change/${todoId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ payload })
    })
        .then(response => {

            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}
export const TodayWorkHTTP = (userId) => {

    return fetch(`${process.env.REACT_APP_API_URL}/today/todo/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const TodoChangeExperienseAtHTTP = (expireAt, todoId) => {

    return fetch(`${process.env.REACT_APP_API_URL}/todo/change/${todoId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ expireAt: expireAt })
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}
export const NewContrAgent = (NewAgent, user) => {

    return fetch(`${process.env.REACT_APP_API_URL}/new/agent/${user}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(NewAgent)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}
export const ContrAgentList = page => {

    return fetch(`${process.env.REACT_APP_API_URL}/agent/list/?page=${page}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}
export const GetAgentProfile = (agentId) => {

    return fetch(`${process.env.REACT_APP_API_URL}/agent/${agentId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}


export const AddManageForAgent = (tags, agentId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/new/manage/agent/${agentId}`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ tags })

    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}

export const MyAgentList = (workerId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/agent/manage/`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ workerId })
    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}
export const MyHistoryActive = (userId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/my/history/active/`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId })
    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}
export const MyHistoryBeginer = (userId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/my/history/beginer/`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId })
    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}

export const MyHistoryComplete = (userId, page) => {
    return fetch(`${process.env.REACT_APP_API_URL}/my/history/complete/?page=${page}`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId })
    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}
export const OneHistoryGet = (HistoryById) => {
    return fetch(`${process.env.REACT_APP_API_URL}/history/${HistoryById}`, {
        method: "GET",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}

export const ChangeHistory = (DealId, status) => {
    return fetch(`${process.env.REACT_APP_API_URL}/change/history/${DealId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}
export const ChangeHistoryItem = (DealId, payload) => {
    console.log(JSON.stringify(payload))
    return fetch(`${process.env.REACT_APP_API_URL}/change/history/${DealId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}
export const SearchContrAgent = (item) => {
    return fetch(`${process.env.REACT_APP_API_URL}/agent/search`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ item })
    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}
export const listStatisticCompany = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/get/qauality/user/statistic`, {
        method: "GET",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}
export const NewDealHistory = (payload) => {
    return fetch(`${process.env.REACT_APP_API_URL}/new/history/`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}
export const AllAgentHistory = (agentId) => {

    return fetch(`${process.env.REACT_APP_API_URL}/all/agent/history/`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ agentId: agentId })
    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}
export const UpdateNews = (NewsArray) => {
    console.log(NewsArray)
    for (let news of NewsArray) {
        console.log(news)
        fetch(`${process.env.REACT_APP_API_URL}/worker/read/${news}`, {
            method: "POST",
            headers: {
                Accept: "application/json", "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .catch(err => console.log(err))
    }
}
export const TodoUpTime = (ID, UpTime) => {

    return fetch(`${process.env.REACT_APP_API_URL}/todo/change/${ID}`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ time: UpTime })
    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}
export const TodoChangeComandList = (todoId, payload) => {

    return fetch(`${process.env.REACT_APP_API_URL}/todo/change/${todoId}`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ payload })
    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}
export const ChangeAgent = (AgentId, status) => {
    return fetch(`${process.env.REACT_APP_API_URL}/change/agent/${AgentId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: status })
    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}
export const MyTodoGetComandWorked = (userId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/get/comand/todo/`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId })
    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}
export const MytodoComandItsDay = (userId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/get/comand/todo/time/`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId })
    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}
export const MyTodoComandQuality = (userId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/get/comand/todo/time/quality/`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId })
    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}
export const MyTodoTodyQuality = (userId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/today/todo/qulity/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }

    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}
export const MyNewsQuality = (userId) => {

    return fetch(`${process.env.REACT_APP_API_URL}/news/quality/`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId })

    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}
// /today/todo/qulity/


export const NewNewsJob = (payload) => {
    console.log(payload)
    return fetch(`${process.env.REACT_APP_API_URL}/new/news/job`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)


    })
        .then(response => {

            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}
export const UserSecurityList = (userId) => {

    return fetch(`${process.env.REACT_APP_API_URL}/user/security`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId })

    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}
export const PricedAtManage = (AgentId) => {

    return fetch(`${process.env.REACT_APP_API_URL}/agent/user/price`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ AgentId })

    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}
export const NewPricedAtAgent = (userBy, agentId, percent) => {

    return fetch(`${process.env.REACT_APP_API_URL}/new/agent/price/at/manage`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userBy, agentId, percent })

    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}
export const DeleteManageAtAgent = (payload) => {

    return fetch(`${process.env.REACT_APP_API_URL}/manage/delete/price/at/manage`, {
        method: "DELETE",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ payload })

    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}

export const MyDevice = (userBy) => {
    return fetch(`${process.env.REACT_APP_API_URL}/my/device/`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userBy })

    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}
export const GetIpData = (ip) => {
    return fetch(`${process.env.REACT_APP_API_URL}/get/ip/data`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ip })

    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}
export const DeleteDevice = (device) => {
    return fetch(`${process.env.REACT_APP_API_URL}/delete/device/`, {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({_id: device })

    })
        .then(responce => {
            return responce.json()
        })
        .catch(err => console.log(err))
}


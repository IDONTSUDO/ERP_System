export const list = () =>{
    return fetch(`http://localhost:8080/all/worker/`,{
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
    return fetch(`http://localhost:8080/user/${userId}`,{
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

export const signup = user => {
    return fetch(`http://localhost:5000/user/new/`, {
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

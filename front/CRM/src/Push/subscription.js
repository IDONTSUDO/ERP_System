import { isAuthenticated } from "../Api/Auth";
import { SetUserData,updateUser } from "../Api/Http"
const convertedVapidKey = urlBase64ToUint8Array("BOsln7UjMYWw-aKVTZ-Y7ytReTUJ7prHf7ABdn3brCg2VCtWJZKESwUa1pE0aLUAI8bYJMv_Hvlwyn4yA133U00")
// `${process.env.REACT_APP_PUBLIC_VAPID_KEY}`
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4)
  // eslint-disable-next-line
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray

}

function sendSubscription(subscription) {


  let userId = isAuthenticated().direct._id;
  let payload = { userId, subscription}
  return fetch(`${process.env.REACT_APP_API_URL}/push/user/`, {
    method: 'POST',
    headers: {
      Accept: "application/json", "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then(responce => {
    return responce.json()
})
.catch(err => console.log(err))
}
export function subscribeUser() {
  if(isAuthenticated()){
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(function (registration) {
  
        if (!registration.pushManager) {
          console.log('Push manager unavailable.')
          return
        }
  
        registration.pushManager.getSubscription().then(function (existedSubscription) {
          if (existedSubscription === null) {
            console.log('No subscription detected, make a request.')
            registration.pushManager.subscribe({
              applicationServerKey: convertedVapidKey,
              userVisibleOnly: true,
            }).then(function (newSubscription) {
              console.log(newSubscription)
  
              sendSubscription(newSubscription)
            }).catch(function (e) {
              if (Notification.permission !== 'granted') {
                console.log('Permission was not granted.')
              } else {
                console.error('An error ocurred during the subscription process.', e)
              }
            })
          } else {
            console.log('Existed subscription detected.')
            sendSubscription(existedSubscription)
          }
        })
      })
        .catch(function (e) {
          console.error('An error ocurred during Service Worker registration.', e)
        })
    } 
  }
}

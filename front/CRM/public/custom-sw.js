let notificationUrl = '';
//notification registered feature for getting update automatically from server api
self.addEventListener('push', function (event) {

    let _data = event.data ? JSON.parse(event.data.text()) : {};
    notificationUrl = _data.url;
  
    event.waitUntil(
      
        self.registration.showNotification(_data.title, {
            body: _data.message,
            icon: _data.icon,
            tag: _data.tag,
            image: _data.icon,
            requireInteraction:true
        }),
        console.log(_data.icon)
    );
});

//notification url redirect event click
self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    event.waitUntil(
        clients.matchAll({
            type: "window"
        })
        .then(function (clientList) {
            if (clients.openWindow) {
                return clients.openWindow(notificationUrl);
            }
        })
    );
});
// message param
// {
//   "title": "",
//   "message": "",
//   "url": "",
//   "ttl": 36000,
//   "icon": "",
//   "badge": "",
//   "data":"",
//   "tag": ""
// }
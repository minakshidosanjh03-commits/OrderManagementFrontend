import Echo from "laravel-echo";
import Pusher from "pusher-js";

export const connectSocket = (token, userId, callback) => {
  window.Pusher = Pusher;

  const echo = new Echo({
    broadcaster: "pusher",
    key: process.env.REACT_APP_PUSHER_KEY,
    cluster: process.env.REACT_APP_PUSHER_CLUSTER,
    forceTLS: true,
    authEndpoint: process.env.REACT_APP_BACKEND_URL+"/broadcasting/auth",
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  echo.private(`order.${userId}`)
      .listen('.orderUpdated', (e) => {
          console.log("Realtime order update received:", e.order);
          callback(e.order);
      });

  return echo;
};

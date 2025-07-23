import Echo from "laravel-echo";
import Pusher from "pusher-js";

// Gắn Pusher vào cửa sổ toàn cục để Echo có thể sử dụng
declare global {
    interface Window {
        Pusher: typeof Pusher;
    }
}

window.Pusher = Pusher;

let echo: Echo<any> | null = null
// Khởi tạo Echo với cấu hình Pusher
export const initEcho = (token: string) => {
    if (echo) return  // nếu đã khởi tạo rồi thì không làm lại

    console.log('token', token)
    echo = new Echo({
        broadcaster: 'pusher',
        key: import.meta.env.VITE_PUSHER_APP_KEY,            // Pusher Key từ cấu hình backend
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,    // Pusher cluster (ví dụ "ap1")
        forceTLS: true,                                      // dùng TLS (SSL) cho kết nối wss
        authEndpoint: import.meta.env.VITE_BROADCAST_AUTH_URL,  // endpoint Laravel để auth (mặc định)
        bearerToken: token,                                  // token xác thực người dùng
        auth: {
            headers: {
                Authorization: `Bearer ${token}`  // gửi kèm token để server xác thực user
            }
        }
    })

    console.log(echo)
    // Lấy socket_id sau khi kết nối thành công:
    if (echo) {
        echo.connector.pusher.connection.bind('connected', () => {
            console.log('Socket ID:', echo!.socketId())
        })
    }

}

export const getEcho = (): Echo<any> | null => echo

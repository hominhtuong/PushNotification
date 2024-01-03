# Sending notification requests to APNs


## How To Use

### Có 2 cách push notification đến device trong sources:

``` Dùng FCM (Dùng 1 trong 2 file FCM.py) ```
- Yêu cầu cần có file firebase json, device token nhận từ
  `UNUserNotificationCenterDelegate: didRegisterForRemoteNotificationsWithDeviceToken`
```swift
func application(_: UIApplication,
                     didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        
        // Ban token len server
        Messaging.messaging().setAPNSToken(deviceToken, type: .unknown)
        let deviceTokenString = deviceToken.reduce("") {
            $0 + String(format: "%02x", $1)
        }

        print("FCM device Token: \(deviceTokenString)")
    }
 ```

``` Bắn trực tiếp đến APNs(dùng file APNS_LiveActivity.js) ```
- Sau khi khởi tạo Live Activity, lấy push token bằng cách:
 ```swift
    Task {
        for await pushToken in deliveryActivity.pushTokenUpdates {
            let pushTokenString = pushToken.reduce("") { $0 + String(format: "%02x", $1) }
            print(pushTokenString)
        }     
    }
 ```

## Requirements
- Đối với FCM, chạy
```angular2html
pip install firebase-admin
```

- Đối với APNs, chạy
```angular2html
npm install jsonwebtoken
```

## Author

hominhtuong, minhtuong2502@gmail.com

## License

Notifications is available under the MIT license. See the LICENSE file for more info.

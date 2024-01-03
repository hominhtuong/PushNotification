# Setup:
# pip install firebase-admin

import firebase_admin
from firebase_admin import credentials, messaging

cred = credentials.Certificate('firebase.json')
firebase_admin.initialize_app(cred)

#Device token: Get from UNUserNotificationCenterDelegate: didRegisterForRemoteNotificationsWithDeviceToken
#let deviceToken = deviceToken.reduce("") { $0 + String(format: "%02x", $1) }
deviceToken = 'XXXCjxciWIfuR-G9NpNrquYFZeoQGUV3dCoJFJmSY0-1E3CWEoWCbPRuYYwNpnZoBV-yHYRzpujGNsrd8j6rwNHXQT2S-PQaxTD4ffd'

message = messaging.Message (
    notification = messaging.Notification(
            title='Test notification',
            body='Update live notification',
        ),
        token= deviceToken,
        apns= messaging.APNSConfig (
            headers= {
                'apns-topic': 'com.dt.mitu',
                'apns-push-type': 'alert',
            },
            payload= messaging.APNSPayload (
                aps= messaging.Aps(
                    badge= 1
                )
            )
        )
    )

response = messaging.send(message)

print(str(response))

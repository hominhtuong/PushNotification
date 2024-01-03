# Setup:
# pip install firebase-admin

import firebase_admin
from firebase_admin import credentials, messaging

cred = credentials.Certificate('firebase.json')
firebase_admin.initialize_app(cred)

deviceToken = 'XXXCjxciWIfuR-G9NpNrquYFZeoQGUV3dCoJFJmSY0-1E3CWEoWCbPRuYYwNpnZoBV-yHYRzpujGNsrd8j6rwNHXQT2S-PQaxTD4ffd'

message = messaging.MulticastMessage (
        notification = messaging.Notification(
            title='Test notification',
            body='Update live notification',
        ),
        apns={
            'headers': {
                'apns-topic': 'com.dt.mitu',
                'apns-push-type': 'alert'},
            'payload': {
                'aps': {
                    'badge': 1,
                    'sound': 'default',
                },
            },
        },
        tokens= [deviceToken],
    )

response = messaging.send_each_for_multicast(message)

print('Failed to send notification: ' + str(response.failure_count) + ' tokens failed')
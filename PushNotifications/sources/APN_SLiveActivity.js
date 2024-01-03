/// Setup:
/// npm install jsonwebtoken

const fs = require('fs');
const jwt = require('jsonwebtoken');
const http2 = require('http2');

    ///Device token from activity
    var pushToken = 'XXXCjxciWIfuR-G9NpNrquYFZeoQGUV3dCoJFJmSY0-1E3CWEoWCbPRuYYwNpnZoBV-yHYRzpujGNsrd8j6rwNHXQT2S-PQaxTD4ffd'

    ///Path file .p8
    var privateKey = fs.readFileSync('AuthKey.p8');

    //Enter your KeyID
    let keyid = 'KeyID';

    //Enter your TeamID
    let teamID = 'TeamID';

    //Enter your Bundle ID
    let bundleID = 'com.dt.mitu';

    // liveactivity / alert
    let pushType = "liveactivity";

    //if push for liveactivity: Bundle + .push-type.liveactivity
    //if push for alert: Bundle ID
    let apnsTopic = bundleID + '.push-type.liveactivity';

    const secondsSinceEpoch = Math.round(Date.now() / 1000)

    var payload = {
        iss: teamID,
        iat: secondsSinceEpoch
    }

    ///keyid: AuthKey ID
    const finalEncryptToken = jwt.sign(payload, privateKey, {algorithm: 'ES256', keyid: keyid});

    ///Development server: api.sandbox.push.apple.com:443
    ///Production server: api.push.apple.com:443
    const session = http2.connect('https://api.sandbox.push.apple.com:443/3/device/' + pushToken);
    const body = {
            "aps": {
            "timestamp": secondsSinceEpoch,
            "event": "update",
            "content-state": { ///Model of ActivityAttributes.ContentState
                "value" : 20
              }
        }
    };

    var buffer = new Buffer.from(JSON.stringify(body));

    const req = session.request({
        ":method": "POST",
        ":path": "/3/device/" + pushToken,
        "authorization": "bearer " + finalEncryptToken,
        "apns-push-type": pushType,
        "apns-topic": apnsTopic,
        "Content-Type": 'application/json',
        "Content-Length": buffer.length
    });

    req.on('response', (headers) => {
      console.log(headers[http2.constants.HTTP2_HEADER_STATUS]);
    });
    let data = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => data += chunk);
    req.on('end', () => {
      console.log(`The server says: ${data}`);
    });
    req.end(JSON.stringify(body));
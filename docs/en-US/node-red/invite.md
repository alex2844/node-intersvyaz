# Incoming Call

[![version](https://img.shields.io/npm/v/node-red-contrib-intersvyaz.svg)](https://www.npmjs.org/package/node-red-contrib-intersvyaz)
[![commit](https://img.shields.io/github/last-commit/alex2844/node-intersvyaz.svg)](https://github.com/alex2844/node-intersvyaz)
[![engine](https://img.shields.io/badge/Node-intersvyaz-red.svg)](../README.md)
[![ru](https://img.shields.io/badge/lang-ru-white)](../../ru/node-red/README.md)
[![en](https://img.shields.io/badge/lang-en-white)](README.md)

Incoming call event


### Output

| msg       | type
| ---       | ---
| `payload` | object


| payload   | Description
| ---       | ---
| `method`  | SIP request method
| `uri`     | URI of the called party
| `version` | Protocol version
| `headers` | SIP request headers
| `content` | SDP session description containing information about media streams (audio and video), used codecs, IP addresses, and ports for media transmission


| headers                       | Description
| ---                           | ---
| `record-route`                | List of URIs through which the request has passed or should pass
| `via`                         | List of URIs through which the request has passed, with transport information
| `from`                        | Information about the calling party
| `to`                          | Information about the called party
| `contact`                     | List of contact URIs
| `uuid`                        | Event ID generated by the server
| `entranceuid`                 | Intercom camera ID
| `snapshoturl`                 | URL of the camera snapshot associated with the call
| `x-rtpengine-received-from`   | IP address from which the RTP engine received the request

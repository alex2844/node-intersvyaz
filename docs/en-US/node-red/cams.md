# Cameras

[![version](https://img.shields.io/npm/v/node-red-contrib-intersvyaz.svg)](https://www.npmjs.org/package/node-red-contrib-intersvyaz)
[![commit](https://img.shields.io/github/last-commit/alex2844/node-intersvyaz.svg)](https://github.com/alex2844/node-intersvyaz)
[![engine](https://img.shields.io/badge/Node-intersvyaz-red.svg)](../README.md)
[![ru](https://img.shields.io/badge/lang-ru-white)](../../ru/node-red/README.md)
[![en](https://img.shields.io/badge/lang-en-white)](README.md)

Get a list of intercom cameras


### Input

| msg               | type      | Description
| ---               | ---       | ---
| `entranceUids`    | string    | Camera ID
| *`topic`*         | string    | Title


### Output

| msg       | type
| ---       | ---
| `payload` | array


| payload       | Description
| ---           | ---
| `ADDRESS`     | Intercom address
| `COORDINATES` | Coordinates
| `ARCHIVE`     | Archive
| `MEDIA`       | Video streams


| ARCHIVE       |
| ---           |
| `START_TIME`  |
| `STOP_TIME`   |


| MEDIA                 |
| ---                   |
| `HLS.LIVE.MAIN`       |
| `HLS.LIVE.LOW_LATENCY`|
| `HLS.ARCHIVE`         |


### Details
`MEDIA.HLS.ARCHIVE` contains start and end dates. To play the stream, you need to reduce the interval. The maximum interval is 24 hours.

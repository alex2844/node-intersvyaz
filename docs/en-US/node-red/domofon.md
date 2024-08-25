# Intercom

[![version](https://img.shields.io/npm/v/node-red-contrib-intersvyaz.svg)](https://www.npmjs.org/package/node-red-contrib-intersvyaz)
[![commit](https://img.shields.io/github/last-commit/alex2844/node-intersvyaz.svg)](https://github.com/alex2844/node-intersvyaz)
[![engine](https://img.shields.io/badge/Node-intersvyaz-red.svg)](../README.md)
[![ru](https://img.shields.io/badge/lang-ru-white)](../../ru/node-red/README.md)
[![en](https://img.shields.io/badge/lang-en-white)](README.md)

Get a list of intercoms, and open an intercom


### Input

| msg           | type      | Description
| ---           | ---       | ---
| *`relayId`*   | string    | Device ID
| *`open`*      | boolean   | Whether to open the intercom
| *`topic`*     | string    | Title


| topic     | Description
| ---       | ---
| *list*    | List of intercoms
| *open*    | Open the intercom


### Output

| msg       | type
| ---       | ---
| `payload` | (array \| json)


| payload           | Description
| ---               | ---
| `ADDRESS`         | Intercom address
| `RELAY_ID`        | Device ID
| `ENTRANCE_UID`    | Camera ID
| `PORCH_NUM`       | Entrance number
| `NUM_BUILDING`    | Apartment number
| `IMAGE_URL`       | Current frame

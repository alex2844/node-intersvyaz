# History

[![version](https://img.shields.io/npm/v/node-red-contrib-intersvyaz.svg)](https://www.npmjs.org/package/node-red-contrib-intersvyaz)
[![commit](https://img.shields.io/github/last-commit/alex2844/node-intersvyaz.svg)](https://github.com/alex2844/node-intersvyaz)
[![engine](https://img.shields.io/badge/Node-intersvyaz-red.svg)](../README.md)
[![ru](https://img.shields.io/badge/lang-ru-white)](../../ru/node-red/README.md)
[![en](https://img.shields.io/badge/lang-en-white)](README.md)

Retrieve history


### Input

| msg           | type      | Description
| ---           | ---       | ---
| *`filter`*    | json      | Filters
| *`topic`*     | string    | Title


| filter        |
| ---           |
| *`from`*      |
| *`to`*        |
| *`page`*      |
| *`perPage`*   |


### Output

| msg       | type
| ---       | ---
| `payload` | array


| payload           | Description
| ---               | ---
| `create_date`     | Date
| `type`            | Event type
| `params.address`  | Intercom address
| `params.rfid`     | Key


| type              | Description
| ---               | ---
| `OPEN_API`        | Opened: application
| `OPEN_INTERNAL`   | Opened: key
| `HANDSET_CALL`    | Call from intercom


### Details
The key is displayed in the application in the following format
```javascript
String(parseInt('${rfid}', 16)).replace(/^.*(.{4})$/, "****$1")
```

# IPTV

[![version](https://img.shields.io/npm/v/node-red-contrib-intersvyaz.svg)](https://www.npmjs.org/package/node-red-contrib-intersvyaz)
[![commit](https://img.shields.io/github/last-commit/alex2844/node-intersvyaz.svg)](https://github.com/alex2844/node-intersvyaz)
[![engine](https://img.shields.io/badge/Node-intersvyaz-red.svg)](../README.md)
[![ru](https://img.shields.io/badge/lang-ru-white)](../../ru/node-red/README.md)
[![en](https://img.shields.io/badge/lang-en-white)](README.md)

Get list IPTV


### Input

| msg           | type      | Description
| ---           | ---       | ---
| *`filter`*    | json      | Filters
| *`format`*    | string    | Format
| *`topic`*     | string    | Title


| filter        |
| ---           |
| *`channelId`* |
| *`topicId`*   |


| topic     |
| ---       |
| *`json`*  |
| *`text`*  |


### Output

| msg       | type
| ---       | ---
| `payload` | array


| payload       | Description
| ---           | ---
| `ID`          | Id
| `DESCRIPTION` | Description
| `NAME`        | Name
| `TOPIC_ID`    | Id category
| `topic`       | Category
| `hls`         | Video stream

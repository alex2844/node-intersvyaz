# IPTV

[![version](https://img.shields.io/npm/v/node-red-contrib-intersvyaz.svg)](https://www.npmjs.org/package/node-red-contrib-intersvyaz)
[![commit](https://img.shields.io/github/last-commit/alex2844/node-intersvyaz.svg)](https://github.com/alex2844/node-intersvyaz)
[![engine](https://img.shields.io/badge/Node-intersvyaz-red.svg)](../README.md)
[![ru](https://img.shields.io/badge/lang-ru-white)](README.md)
[![en](https://img.shields.io/badge/lang-en-white)](../../en-US/node-red/README.md)

Получить список IPTV


### Принимает

| msg           | type      | Описание
| ---           | ---       | ---
| *`filter`*    | json      | Фильтры
| *`format`*    | string    | Формат
| *`topic`*     | string    | Заголовок


| filter        |
| ---           |
| *`channelId`* |
| *`topicId`*   |


| topic     |
| ---       |
| *`json`*  |
| *`text`*  |


### Выводит

| msg       | type
| ---       | ---
| `payload` | array


| payload       | Описание
| ---           | ---
| `ID`          | Id
| `DESCRIPTION` | Описание
| `NAME`        | Название
| `TOPIC_ID`    | Id категории
| `topic`       | Категория
| `hls`         | Видеопоток

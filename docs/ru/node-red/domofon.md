# Домофон

[![version](https://img.shields.io/npm/v/node-red-contrib-intersvyaz.svg)](https://www.npmjs.org/package/node-red-contrib-intersvyaz)
[![commit](https://img.shields.io/github/last-commit/alex2844/node-intersvyaz.svg)](https://github.com/alex2844/node-intersvyaz)
[![engine](https://img.shields.io/badge/Node-intersvyaz-red.svg)](../README.md)
[![ru](https://img.shields.io/badge/lang-ru-white)](README.md)
[![en](https://img.shields.io/badge/lang-en-white)](../../en-US/node-red/README.md)

Получить список домофонов, а так же открытие домофона


### Принимает

| msg           | type      | Описание
| ---           | ---       | ---
| *`relayId`*   | string    | Id устройства
| *`open`*      | boolean   | Открыть ли домофон
| *`topic`*     | string    | Заголовок


| topic     | Описание
| ---       | ---
| *list*    | Список домофонов
| *open*    | Открыть домофон


### Выводит

| msg       | type
| ---       | ---
| `payload` | (array \| json)


| payload           | Описание
| ---               | ---
| `ADDRESS`         | Адрес домофона
| `RELAY_ID`        | Id устройства
| `ENTRANCE_UID`    | Id камеры
| `PORCH_NUM`       | Номер подъезда
| `NUM_BUILDING`    | Номер квартиры
| `IMAGE_URL`       | Текущий кадр

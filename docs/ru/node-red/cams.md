# Камеры

[![version](https://img.shields.io/npm/v/node-red-contrib-intersvyaz.svg)](https://www.npmjs.org/package/node-red-contrib-intersvyaz)
[![commit](https://img.shields.io/github/last-commit/alex2844/node-intersvyaz.svg)](https://github.com/alex2844/node-intersvyaz)
[![engine](https://img.shields.io/badge/Node-intersvyaz-red.svg)](../README.md)
[![ru](https://img.shields.io/badge/lang-ru-white)](README.md)
[![en](https://img.shields.io/badge/lang-en-white)](../../en-US/node-red/README.md)

Получить список камер домофона


### Принимает

| msg               | type      | Описание
| ---               | ---       | ---
| `entranceUids`    | string    | Id камеры
| *`topic`*         | string    | Заголовок


### Выводит

| msg       | type
| ---       | ---
| `payload` | array


| payload       | Описание
| ---           | ---
| `ADDRESS`     | Адрес домофона
| `COORDINATES` | Координаты
| `ARCHIVE`     | Архив
| `MEDIA`       | Видеопотоки


| ARCHIVE       |
| ---           |
| `START_TIME`  |
| `STOP_TIME`   |


| MEDIA                 |
| ---                   |
| `HLS.LIVE.MAIN`       |
| `HLS.LIVE.LOW_LATENCY`|
| `HLS.ARCHIVE`         |


### Подробности
В `MEDIA.HLS.ARCHIVE` хранятся даты от начальной до конечной, для того чтоб поток начал воспроизводиться - надо уменьшить интервал, максимальный - 24 часа

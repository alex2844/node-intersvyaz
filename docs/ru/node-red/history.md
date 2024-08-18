# История

[![version](https://img.shields.io/npm/v/node-red-contrib-intersvyaz.svg)](https://www.npmjs.org/package/node-red-contrib-intersvyaz)
[![commit](https://img.shields.io/github/last-commit/alex2844/node-intersvyaz.svg)](https://github.com/alex2844/node-intersvyaz)
[![engine](https://img.shields.io/badge/Node-intersvyaz-red.svg)](../README.md)
[![ru](https://img.shields.io/badge/lang-ru-white)](README.md)
[![en](https://img.shields.io/badge/lang-en-white)](../../en-US/node-red/README.md)

Получить историю


### Принимает

| msg           | type      | Описание
| ---           | ---       | ---
| *`filter`*    | json      | Фильтры
| *`topic`*     | string    | Заголовок


| filter        |
| ---           |
| *`from`*      |
| *`to`*        |
| *`page`*      |
| *`perPage`*   |


### Выводит

| msg       | type
| ---       | ---
| `payload` | array


| payload           | Описание
| ---               | ---
| `create_date`     | Дата
| `type`            | Тип события
| `params.address`  | Адрес домофона
| `params.rfid`     | Ключ


| type              | Описание
| ---               | ---
| `OPEN_API`        | Открытие: приложение
| `OPEN_INTERNAL`   | Открытие: ключ
| `HANDSET_CALL`    | Звонок с домофона


### Подробности
В приложении ключ отображается в таком формате
```javascript
String(parseInt('${rfid}', 16)).replace(/^.*(.{4})$/, "****$1")
```

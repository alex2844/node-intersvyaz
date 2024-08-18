# Входящий звонок

[![version](https://img.shields.io/npm/v/node-red-contrib-intersvyaz.svg)](https://www.npmjs.org/package/node-red-contrib-intersvyaz)
[![commit](https://img.shields.io/github/last-commit/alex2844/node-intersvyaz.svg)](https://github.com/alex2844/node-intersvyaz)
[![engine](https://img.shields.io/badge/Node-intersvyaz-red.svg)](../README.md)
[![ru](https://img.shields.io/badge/lang-ru-white)](README.md)
[![en](https://img.shields.io/badge/lang-en-white)](../../en-US/node-red/README.md)

Событие входящего звонка


### Выводит

| msg       | type
| ---       | ---
| `payload` | object


| payload   | Описание
| ---       | ---
| `method`  | Метод SIP запроса
| `uri`     | URI вызываемого абонента
| `version` | Версия протокола
| `headers` | Заголовки SIP запроса
| `content` | SDP-описание сеанса, содержащее информацию о медиапотоках (аудио и видео), используемых кодеках, IP-адресах и портах для передачи медиаданных


| headers                       | Описание
| ---                           | ---
| `record-route`                | Список URI, через которые запрос прошел или должен пройти
| `via`                         | Список URI, через которые прошел запрос, с информацией о транспорте
| `from`                        | Информация о вызывающем абоненте
| `to`                          | Информация о вызываемом абоненте
| `contact`                     | Список контактных URI
| `uuid`                        | ID события сгенерированный сервером
| `entranceuid`                 | ID камеры домофона
| `snapshoturl`                 | URL-адрес снимка камеры, связанного с вызовом
| `x-rtpengine-received-from`   | IP-адрес, с которого RTP-движок получил запрос

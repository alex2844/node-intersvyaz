# intersvyaz

[![version](https://img.shields.io/npm/v/intersvyaz.svg)](https://www.npmjs.org/package/intersvyaz)
[![commit](https://img.shields.io/github/last-commit/alex2844/node-intersvyaz.svg)](https://github.com/alex2844/node-intersvyaz)
[![engine](https://img.shields.io/badge/Node--RED-contrib--intersvyaz-red.svg)](node-red/README.md)
[![ru](https://img.shields.io/badge/lang-ru-white)](README.md)
[![en](https://img.shields.io/badge/lang-en-white)](../en-US/README.md)

Управление домофоном от интерсвязи


## Установка

``` shell
npm install intersvyaz
```


## Использование

```javascript
import Intersvyaz from 'intersvyaz';
const client = new Intersvyaz({ username, password });
```


## API

### Получить статус работы сети
```javascript
await client.getStatus();
```

### Получить информацию о пользователе
```javascript
await client.getUser();
```

### Получить адрес пользователя
```javascript
await client.getAddress();
```

### Получить текущий баланс
```javascript
await client.getBalance();
```

### Получить список домофонов
```javascript
await client.getDomofon();
await client.getDomofon(relayId);
```

### Открыть домофон
```javascript
await client.openDomofon(relayId);
```

### Получить список камер домофона
```javascript
await client.getCams(entranceUid);
```

### Получить историю
```javascript
await client.getHistory();
await client.getHistory({
    from: '2024-08-01',
    to: '2024-08-08',
    page: 1,
    perPage: 5
});
```

### Получить список IPTV
```javascript
await client.getIPTV();
await client.getIPTV({
    channelId: 1640,
    topicId: '6,17,20,12,16'
});
```

### SIP
```javascript
await client.start();
client.stop();
```


## События

### Авторизация
```javascript
client.on('auth', ({ username, password, sip, accessToken, lkToken, atExpiredTime, ltExpiredTime }) => {});
```

### SIP
```javascript
client.on('sip:register', ({ res, req, error, ok }) => {});
client.on('sip:invite', ({ req }) => {});
```

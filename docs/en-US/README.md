# intersvyaz

[![version](https://img.shields.io/npm/v/intersvyaz.svg)](https://www.npmjs.org/package/intersvyaz)
[![commit](https://img.shields.io/github/last-commit/alex2844/node-intersvyaz.svg)](https://github.com/alex2844/node-intersvyaz)
[![engine](https://img.shields.io/badge/Node--RED-contrib--intersvyaz-red.svg)](node-red/README.md)
[![ru](https://img.shields.io/badge/lang-ru-white)](../ru/README.md)
[![en](https://img.shields.io/badge/lang-en-white)](README.md)

Intercom control from intersvyaz


## Install

``` shell
npm install intersvyaz
```


## Usage

```javascript
import Intersvyaz from 'intersvyaz';
const client = new Intersvyaz({ username, password });
```


## API

### Get network status
```javascript
await client.getStatus();
```

### Get user information
```javascript
await client.getUser();
```

### Get user address
```javascript
await client.getAddress();
```

### Get current balance
```javascript
await client.getBalance();
```

### Get list of intercoms
```javascript
await client.getDomofon();
await client.getDomofon(relayId);
```

### Open intercom
```javascript
await client.openDomofon(relayId);
```

### Get list of intercom cameras
```javascript
await client.getCams(entranceUid);
```

### Get history
```javascript
await client.getHistory();
await client.getHistory({
    from: '2024-08-01',
    to: '2024-08-08',
    page: 1,
    perPage: 5
});
```

### Get list IPTV
```javascript
await client.getIPTV();
await client.getIPTV({
    channelId: 1640,
    topicId: '6,17,20,12,16'
}, 'text');
```

### SIP
```javascript
await client.start();
client.stop();
```


## Events

### Authorization
```javascript
client.on('auth', ({ username, password, sip, accessToken, lkToken, atExpiredTime, ltExpiredTime }) => {});
```

### SIP
```javascript
client.on('sip:register', ({ res, req, error, ok }) => {});
client.on('sip:invite', ({ req }) => {});
```

# medium

## Project setup
```
npm install
```

## Json-server install
```
npm install -g json-server
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Launch json-server
(запускает json-server и json-server-auth с кастомными роутами для запросов)

```
json-server ./json-server/db.json -m ./node_modules/json-server-auth -r ./json-server/routes.json
```

### Если установить json-server-auth глобально, можно запускать командой
```
json-server-auth ./json-server/db.json -r ./json-server/routes.json
```

### Пароли созданных уже пользователей 123456

### Compiles and minifies for production
```
npm run build
```


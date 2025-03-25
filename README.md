# Что это
Простая обертка над localStorage с подпиской на события и сохранением предыдущего стейта.

# Как установить
```bash
npm install https://github.com/Mistrail/localnodes.git#main
```
```js
import {LocalNodes} from "localnodes"
```

# Как юзать

- *Nodename:string*
- *callbackFn:(ev: Event, data: {prev, current}) => {console.log(prev, current, ev)}*

---
- LocalNodes.addNode(nodeName) - добавить узел
- LocalNodes.write(nodeName, {}) -- записать в узел
- LocalNodes.read(nodeName, {}) -- прочитать из узла
- LocalNodes.clear(nodeName) -- снести узел
- LocalNodes.truncate(nodeName) -- очистить весь localStore
- LocalNodes.subscribe(nodeName, callbackFn) -- подписка на изменение узла
- LocalNodes.unsubscribe(nodeName, callbackFn) -- отмена подписки

# @todo
Написать нормальный ридми и сдетаь человеческую дистрибуцию.

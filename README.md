## UNIT
BAIDU UNIT API, see more [UNIT](https://ai.baidu.com/unit)

## INSTALL
```
npm install unit
```

## EXAMPLE
The following example show you the basic function.  See full example [HERE](https://github.com/lijiarui/ai-unit/blob/master/example/test.js)
```js
const { Unit } = require('ai-unit')
async function main() {
  const unitClient = new Unit({
    apikey:    'your key', 
    secretkey: 'yout secret key', 
    sceneid:   'your scene id'
  })
  const sessionId = Date.now()
  let answer

  answer = await unitClient.query('我要买电影票', sessionId.toString())
  console.log('[PERSON]:' + '我要买电影票')
  console.log('[BOT]:' + answer)
}
main()
```

Result as follows:
```
[PERSON]:我要买电影票
[BOT]:看哪部电影？
```

## API
1. Unit.getAccessToken()
2. Unit.query(content: string, sessionId?: string)
3. Unit.setScene(sceneId)
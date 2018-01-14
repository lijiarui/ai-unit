## UNIT
BAIDU UNIT API, see more [UNIT](https://ai.baidu.com/unit)

## INSTALL
```
npm install unit
```

## EASY TO RUN
```ts
const { Unit } = require('ai-unit')
const unitClient = new Unit({ apikey:'your key', secretkey: 'yout secret key', sceneid: 'your scene id'})
const answer = unitClient.query('我要买电影票', sessionId）
console.log(answer)
```

## EXAMPLE

```ts
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

  answer = await unitClient.query('心理罪', sessionId.toString())
  console.log('[PERSON]:' + '心理罪')
  console.log('[BOT]:' + answer)

  answer = await unitClient.query('天幕吧', sessionId.toString())
  console.log('[PERSON]:' + '天幕吧')
  console.log('[BOT]:' + answer)
}
main()
```

Result as follows:
```
[PERSON]:我要买电影票
[BOT]:看哪部电影？
[PERSON]:心理罪
[BOT]:去哪个电影院？
[PERSON]:天幕吧
[BOT]:订哪天的？
```

## API
1. Unit.getAccessToken()
2. Unit.query(content: string, sessionId?: string)
3. Unit.setScene(sceneId)
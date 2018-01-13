## UNIT
BAIDU UNIT API, see more [UNIT](https://ai.baidu.com/unit)

## INSTALL
```
npm install unit
```

## EXAMPLE

```ts
const { Unit } = require('ai-unit')
async function main() {
  try {
    const unitClient = new Unit({
      apikey:    'your key', 
      secretkey: 'yout secret key', 
      sceneid:   '15386'
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
  } catch (error) {
    console.error(error)
  }
}
main()
```

## API
1. Unit.getAccessToken()
2. Unit.query(content: string, sessionId?: string)
3. Unit.setScene(sceneId)
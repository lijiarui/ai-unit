import { Unit } from './src/index'
async function main() {
  try {
    const unitClient = new Unit({
      apikey:    'QMIRPurLCGGk5eIbVlcgy2LU', 
      secretkey: 'aoeA8nVdGQ4ZKc56tHWYVzqDEi5knBGh', 
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
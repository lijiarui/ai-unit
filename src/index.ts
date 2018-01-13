// Get access-token
const qs     = require('querystring')
const bhttp  = require('bhttp')

import { Brolog } from 'brolog'
let log = new Brolog()
log.level('verbose')

const HOSTNAME        = 'https://aip.baidubce.com'
const OAUTH_PATH      = '/oauth/2.0/token'
const UNIT_PATH       = '/rpc/2.0/solution/v1/unit_utterance'
const GRANT_TYPE      = 'client_credentials'
const TEMPSESSIONID   = '123456789' // just for fun
const DEFAULT_TEXT    = '对不起，我好像没听明白你在说什么'
const DEFAULT_ERROR   = '额。。我好像出问题了。。。'

export interface TokenObj {
  apikey:    string
  secretkey: string
  sceneid:   string
}

export class Unit {
  private clientId:     string
  private clientSectet: string
  public  refreshToken: string
  public  accessToken:  string
  public  sceneId:      string

  constructor (token: TokenObj) {
    if (token.apikey && token.secretkey) {
      this.clientId     = token.apikey
      this.clientSectet = token.secretkey
      token.sceneid && (this.sceneId = token.sceneid)
    } else {
      throw Error('No API KEY or Secret Key')
    }
  }

  public async getAccessToken() {
    const param = qs.stringify({
      'grant_type': GRANT_TYPE,
      'client_id':  this.clientId,
      'client_secret': this.clientSectet
    })
    const result = await bhttp.get(HOSTNAME + OAUTH_PATH + '?' + param)
    if (result.body.access_token && result.body.refresh_token) {
      log.silly('UNIT QUERY', 'get accessToken result: %s', JSON.stringify(result.body))
      this.accessToken = result.body.access_token
      this.refreshToken = result.body.refreshToken
      return
    } else {
      throw Error('Cannot get accessToken successfully!' + JSON.stringify(result.body))
    }
  }

  public async query(content: string, sessionId?: string) {
    if (!this.accessToken) {
      log.verbose('UNIT QUERY', 'Cannot get accesstoken, trying to set accesstoken')
      await this.getAccessToken()
      log.verbose('UNIT QUERY', 'AccessToken: %s', this.accessToken)
    }

    if (!this.accessToken) {
      log.error('ERROR', 'Cannot get accesstoken again')
      return DEFAULT_ERROR
    }
  
    log.silly('UNIT QUERY', 'Access Token: %s', this.accessToken)
    // TODO: check accessToken experied

    const param = qs.stringify({'access_token': this.accessToken})
    const options = {
      headers: {'Content-Type': 'application/json; charset=UTF-8'}
    }
    const postData = {
      'scene_id': this.sceneId,
      'query': content,
      'session_id': sessionId || TEMPSESSIONID
    } 
    const data = await bhttp.post(HOSTNAME + UNIT_PATH + '?' + param, JSON.stringify(postData), options)
    const result = data.body.result
    if (result) {
      log.silly('UNIT QUERY', 'result data: %s', JSON.stringify(data.body))
      const action = data.body.result.action_list[0]
      if (action.action_id === 'fail_action') {
        return DEFAULT_TEXT
      } else {
        return action.say
      }
    } else {
      log.error('ERROR','Cannot get correct result from UNIT, error log:%s', JSON.stringify(data.body))
      return DEFAULT_ERROR
    }
  }
  
  public setScene(sceneId) {
    this.sceneId = sceneId
    return
  }
}

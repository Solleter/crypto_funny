const https = require('https')
const log = require('electron-log')

class DataAgent {
  constructor () {
    this.xdag_dealPrice = 0
    this.xdag_buy0 = 0
    this.xdag_sell0 = 0
    this.xdag_requesting = false
    this.xdag_dataTime = 0
  }

  fnRequest () {
    if(this.xdag_requesting){
      return
    }
    log.info('request xdag data')
    this.xdag_requesting = true
    this.__fnXdagRequestData()
  }

  __fnXdagRequestData () {
    let header = {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
      'Content-Type': 'application/json;charset=UTF-8',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
    }

    let option = {
      hostname: 'www.vbitex.com',
      path: '/Usdmark/tickers',
      method: 'GET',
      header: header,
    }

    let bufs = []
    let jsonObj = null
    https.get(option, (res) => {
      log.info('statusCode:', res.statusCode)
      res.on('data', (d) => {
        bufs.push(d)
      })
      res.on('end', () => {
        jsonObj = JSON.parse(Buffer.concat(bufs).toString())
        for (let i in jsonObj) {
          // log.info('item:', jsonObj[i] )
          let item = jsonObj[i]
          if (item.currency == 'XDAG') {
            let dealPrice = item['new_price']
            let buy0 = item['buy0']
            let sell0 = item['sell0']
            this.xdag_dealPrice = Math.floor(dealPrice * 1000) / 1000
            this.xdag_buy0 = Math.floor(buy0 * 1000) / 1000
            this.xdag_sell0 = Math.floor(sell0 * 1000) / 1000
            this.xdag_dataTime = fnGetCurrentTime()
            this.xdag_requesting = false
            log.info('request end')
            break
          }
        }
      })
    }).on('error', (e) => {
      log.error('error: ', e)
      this.xdag_requesting = false
    })
  }
}


function fnGetCurrentTime () {
  let timestamp = Date.now()
  let date = new Date(timestamp)

  let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  let datetime = h + ':' + m + ':' + s
  return datetime
}


function getCurrentTimeStr () {
  let timestamp = Date.now()
  let date = new Date(timestamp)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
  let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  let datetime = Y + M + D + h + ':' + m + ':' + s
  return datetime
}


const dataAgent = new DataAgent()


export default  dataAgent
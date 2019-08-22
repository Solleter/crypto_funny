const log = require('electron-log')
// const https = require('https')
import dataAgent from './DataAgent'

// const URLs = {
// };

const EngineConfig = {
  RequestInterval: 1000,

}

class DataEngine {
  constructor() {
    log.info('Data Engine Initer')
    this.agent = dataAgent
    setInterval(this.fnEngineTicker, EngineConfig.RequestInterval)
  }

  fnEngineTicker() {
    dataAgent.fnRequest()
  }


}

export default DataEngine
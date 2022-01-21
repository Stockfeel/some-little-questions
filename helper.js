// dependencies
const https = require('https')

// container
const helper = {}

// set 台灣股市資訊網 as base url and path for fetch information
helper.baseURL = 'goodinfo.tw'
helper.basePath = '/tw/StockDetail.asp?STOCK_ID='

// headers to prevent acting likes robot, or return will be '請勿透過網站內容下載軟體查詢本網站' 
helper.headers = {
  'Content-Type': 'application/json',
  'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Mobile Safari/537.36'
}

// use https to request raw web information
// require: stockCode (4 digital or 4 number string)
// option: none
// callback: error (boolean), resData (string)
helper.request = function(stockCode, cb) {

  try {
    // sanity check
    stockCode = Number(stockCode) < 10000 ? String(stockCode) : false
    stockCode = typeof(stockCode) === 'string' && stockCode.length === 4 ? stockCode : false  

    if (stockCode) {
      let resData = ''

      const option = {
        hostname: helper.baseURL,
        port: 443,
        path: helper.basePath + stockCode,
        method: 'GET',
        headers: helper.headers
      }

      const req = https.request(option, function onHttpsRequest(res) {

        res.on('data', (data) => {
          resData += data
        })

        res.on('end', function(){
          cb(false, resData)
        })

      })

      req.on('error', function(err) {
        cb(true, err)
      })

      req.end()
        
    } else {
      cb(true, 'In valid stock code')
    }

  } catch (err) {
    cb(true, err)
  }

}

// parse raw html string to object
// require: reqOption (object must contain 'path'), resRaw (html string)
// option: none
// callback: error (boolean), stockData (string if error, object if success)
// callback success object as follow:
// {
//   companyName: '中國鋼鐵股份有限公司',
//   stockCode: '2002',
//   todayPrice: 33.85,
//   todayVolume: '11.55億',
//   companyProfile: {
//     address: '高市小港區中鋼路1號',
//     contributedCapital: '1,577億',
//     chairman: '翁朝棟',
//     president: '王錫欽'
//   }
// }
helper.toCompanyObject = function(reqOption, resRaw, cb) {
  try {
    const stockData = {
      companyName: undefined,
      stockCode: undefined,
      todayPrice: undefined,
      todayVolume: undefined,
      companyProfile: {
        address: undefined,
        contributedCapital: undefined,
        chairman: undefined,
        president: undefined
      }
    }

    resRaw = resRaw.replace(/\s/g,'')

    const companyNameIndex = [
      resRaw.indexOf("'>", resRaw.indexOf('>名稱<')) + 2, 
      resRaw.indexOf('</td>', resRaw.indexOf('>名稱<') + 15 )
    ]
    const stockCode = reqOption.path.slice(reqOption.path.indexOf('=')+1)
    const todayPriceIndex = [
      resRaw.indexOf("'>", resRaw.indexOf("<tdstyle='font-weight:bold;")) + 2, 
      resRaw.indexOf('</td>',resRaw.indexOf("<tdstyle='font-weight:bold;"))
    ]
    const todayVolumeIndex = [
      resRaw.indexOf('<nobr>', resRaw.indexOf('<nobr>PEG</nobr>') + 6) + 6, 
      resRaw.indexOf('</nobr></td>', resRaw.indexOf('<nobr>PEG</nobr>'))
    ]
    const addressIndex = [
      resRaw.indexOf("'>", resRaw.indexOf('>地址<')) + 2, 
      resRaw.indexOf('</td></tr>', resRaw.indexOf('>地址<'))
    ]
    const contributedCapitalIndex = [
      resRaw.indexOf('<nobr>', resRaw.indexOf('>資本額<')) + 6, 
      resRaw.indexOf('</nobr></td>', resRaw.indexOf('>資本額<') + 16)
    ]
    const chairmanIndex = [
      resRaw.indexOf("'>", resRaw.indexOf('>董事長<')) + 2, 
      resRaw.indexOf('</td></tr>', resRaw.indexOf('>董事長<'))
    ]
    const presidentIndex = [
      resRaw.indexOf("'>", resRaw.indexOf('>總經理<')) + 2, 
      resRaw.indexOf('</td></tr>', resRaw.indexOf('>總經理<'))
    ]

    stockData.companyName = resRaw.slice(companyNameIndex[0],companyNameIndex[1])
    stockData.stockCode = stockCode
    stockData.todayPrice = Number(resRaw.slice(todayPriceIndex[0], todayPriceIndex[1]))
    stockData.todayVolume = resRaw.slice(todayVolumeIndex[0], todayVolumeIndex[1]).replace('&nbsp;','')
    stockData.companyProfile.address = resRaw.slice(addressIndex[0], addressIndex[1])
    stockData.companyProfile.contributedCapital = resRaw.slice(contributedCapitalIndex[0], contributedCapitalIndex[1])
    stockData.companyProfile.chairman = resRaw.slice(chairmanIndex[0],chairmanIndex[1])
    stockData.companyProfile.president = resRaw.slice(presidentIndex[0], presidentIndex[1])

    cb(false, stockData)
  } catch (err) {
    cb(true, err)
  }
}

// use helper.request and helper.toCompanyObject to return stock price
// require: stockCode (string)
// option: exclude dividend (positive number, but smaller than price), exclude right (positive number) 
// return: price (string if error, number if success)
helper.getStockPrice = function(stockCode, cb) {
  try {
    stockCode = typeof(stockCode) === 'string' ? stockCode : false

    if (stockCode) {

      helper.request(stockCode, function(err, resRaw){

        if (!err && resRaw) {
          helper.toCompanyObject({ path: `=${stockCode}`}, resRaw, function(err, resData){

            if (!err && resData) {
              cb(false, resData.todayPrice)

            } else {
              cb(true, resData)
            }

          })

        } else {
          cb(true, resRaw)
        }

      })

    } else {
      return 'Invalid input type (expect a string)'
    }

  } catch (err) {
    return err
  }
}

// use helper.request and helper.toCompanyObject to return company object
// require: stockCode (string)
// option: exclude dividend (positive number, but smaller than price), exclude right (positive number) 
// return: price (string if error, number if success)
helper.getCompanyObject = function(stockCode, cb) {
  try {
    stockCode = typeof(stockCode) === 'string' ? stockCode : false

    if (stockCode) {

      helper.request(stockCode, function(err, resRaw){

        if (!err && resRaw) {
          helper.toCompanyObject({ path: `=${stockCode}`}, resRaw, function(err, resData){

            if (!err && resData) {
              cb(false, resData)

            } else {
              cb(true, resData)
            }

          })

        } else {
          cb(true, resRaw)
        }

      })

    } else {
      return 'Invalid input type (expect a string)'
    }

  } catch (err) {
    return err
  }
}

module.exports = helper
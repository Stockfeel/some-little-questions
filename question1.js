/*
你有幾檔尚未除權息的股票資料，包含公司名稱、股票代碼、今日股價、今日成交量與公司基本資料（公司地址、實收資本、董事長與總經理），以及本年度預計發放的現金與股票股利，每間公司的現金或股票股利並不相同，使用者希望能輸入現金與股票股利後就能事先知道除權息後的股價，請用 (PHP 或 JavaScript) 將這些資訊包裝成方便使用的資料結構與函式。
*/

class StockData {
  constructor(companyName, stockCode, priceOfToday, volumeOfToday) {
    this.companyName = companyName
    this.stockCode = stockCode
    this.priceOfToday = priceOfToday
    this.volumeOfToday = volumeOfToday
    this.companyInfo = {}
  }
  setCompanyInfo(address, paidInCapital, chairman, president) {
    let info = this.companyInfo
    info.address = address || info.address
    info.paidInCapital = paidInCapital || info.paidInCapital
    info.chairman = chairman || info.chairman
    info.president = president || info.president
  }
  estimatePriceAfterDividends(cashDividend, stockDividend) {
    let estimatePrice = (this.priceOfToday - cashDividend) / (1 + stockDividend / 10)
    return estimatePrice.toFixed(2)
  }
}

// test
let originalData = {
  companyName: '台灣積體電路製造股份有限公司',
  stockCode: 2330,
  priceOfToday: 600,
  volumeOfToday: 23000,
  companyInfo: {
    address: '新竹市東區力行六路8號',
    paidInCapital: 260000000000,
    chairman: '劉德音',
    president: '魏哲家',
  },
}

let newStockData = new StockData(originalData.companyName, originalData.stockCode, originalData.priceOfToday, originalData.volumeOfToday)
newStockData.setCompanyInfo(...Object.values(originalData.companyInfo))

console.log(newStockData)
console.log(newStockData.estimatePriceAfterDividends(3, 1))

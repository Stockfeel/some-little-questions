// 1. 你有幾檔尚未除權息的股票資料，包含公司名稱、股票代碼、今日股價、今日成交量與公司基本資料（公司地址、實收資本、董事長與總經理），以及本年度預計發放的現金與股票股利，每間公司的現金或股票股利並不相同，使用者希望能輸入現金與股票股利後就能事先知道除權息後的股價，請用(PHP 或 JavaScript) 將這些資訊包裝成方便使用的資料結構與函式。

const rawData = [
  {
    name: "A",
    stockPrice: 70,
    cashDividend: 10,
    stockDividend: 5
  },
  {
    name: "B",
    stockPrice: 20,
    cashDividend: 1.2,
    stockDividend: 0.3
  },
  {
    name: "C",
    stockPrice: 9.45,
    cashDividend: 0.61,
    stockDividend: 0.61
  },
  {
    name: "D",
    stockPrice: 1300,
    cashDividend: 0.61,
    stockDividend: 0.61
  },
]

function exDividendPrice(stockPrice, cashDividend, stockDividend) {
  //設定配息率
  const dividendRate = 10
  //除權息計算
  const exDividendPrice = (stockPrice - cashDividend) / (1 + stockDividend / dividendRate)
  //依照股價區間進行計算後的進位
  return priceInterval(exDividendPrice)
}

//依照股價區間進行計算後的升降調整
function priceInterval(price) {
  if (price <= 0) return "Error:請檢查輸入資料"
  if (price < 10) {
    return price.toFixed(2)
  } else if (10 <= price && price < 50) {
    return (Math.ceil(price * 20) / 20).toFixed(2)
  } else if (50 <= price && price < 100) {
    return price.toFixed(1)
  } else if (100 <= price && price < 500) {
    return (Math.ceil(price * 2) / 2).toFixed(1)
  } else if (500 <= price && price < 1000) {
    return price.toFixed(0)
  } else {
    return (Math.ceil(price * 5) / 5).toFixed(0)
  }
}

rawData.forEach(data => {
  console.log(`${data.name} ex-dividend price:`, exDividendPrice(data.stockPrice, data.cashDividend, data.stockDividend))
})

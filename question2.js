/*
末日博士整天唱衰股市，他想知道自己放空股市究竟能獲利多少，假如你有一檔股票在某區間的價格資料 (假設為陣列如 [1, 4, 1, 2, 1])，請用 (PHP 或 JavaScript) 撰寫一個函式，幫末日博士計算在只交易一次的狀況下，於該區間放空股票的最大獲利。
(註：放空即是當你認為某檔股票即將下跌，你可以向券商借入股票，並在價格下跌後買回藉此賺取價差，本題只計算價格，不需考慮利息等其他成本)
*/

let stockPrices = [1, 4, 1, 2, 1]

function getHighestFromShorting(stockPrices) {
  // 用for loop跑，同時記錄最大獲利跟前方最高價
  let maxProfit = -Infinity
  let highestPrice = stockPrices[0]
  for (let i = 1; i < stockPrices.length; i++) {
    // 若該價格減前方出現過最高的價格比原獲利高，則更新獲利
    if (stockPrices[i] - highestPrice > maxProfit) {
      maxProfit = stockPrices[i] - highestPrice
    }
    // 若該價格比前方出現過的價格還高，則更新最高價格
    if (stockPrices[i] > highestPrice) {
      highestPrice = stockPrices[i]
    }
  }
  return maxProfit
}

// test
console.log(getHighestFromShorting(stockPrices))

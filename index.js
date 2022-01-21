const helper = require('./helper')

// container
const app = {}

/* 
 * 股票資料，包含公司名稱、股票代碼、今日股價、今日成交量與公司基本資料（公司地址、實收資本、董
 * 事長與總經理），以及本年度預計發放的現金與股票股利，每間公司的現金或股票股利並不相同，使用者
 * 希望能輸入現金與股票股利後就能事先知道除權息後的股價，請用 (PHP 或 JavaScript) 將這些資訊包
 * 裝成方便使用的資料結構與函式
 * 
 */
// 除權息後股價 = ( 股價 - 現金股利 ) / ( 1 + 股票股利 / 10 )
// require: price (positive number)
// option: exclude dividend (positive number, but smaller than price), exclude right (positive number) 
// return: afterPrice (string if error, number if success)
app.xdxr = function(price, dividend = 0, right = 0) {
  try {
    // sanity checks
    price = typeof(price) === 'number' && price >= 0 ? price : false
    dividend = typeof(dividend) === 'number' && dividend >= 0 ? dividend : false
    right = typeof(right) === 'number' && right >= 0 ? right : false

    if (price && typeof(dividend) !== 'boolean' && typeof(right) !== 'boolean') {

      const afterPrice = Math.round(( price - dividend ) / ( 1 + right / 10 ) * 100) / 100

      if (afterPrice >= 0) {
        return afterPrice
      } else {
        return 'Invalid dividend that result a negative price'
      }

    } else {
      return 'Invalid input (expect positive numbers)'
    }

  } catch (err) {
    return err
  }
}

// == 除權息後股價 answer apply start ==

// version of price, dividend, right
// console.log(app.xdxr(600, 3, 3))

// version of stock code
// helper.getStockPrice('3008', (err, result) => {
//   if (!err) {
//     console.log('\033[033m',app.xdxr(result, 89, 50.4),'\033[0m')
//   } else {
//     console.log('\033[031m',result,'\033[0m')
//   }
// })

// version of company object
// helper.getCompanyObject('2498', (err, result) => {
//   if (!err) {
//     console.log('\033[033m',result,'\033[0m')
//   } else {
//     console.log('\033[031m',result,'\033[0m')
//   }
// })

// == 除權息後股價 answer apply end ==


/* 
 * 放空股市究竟能獲利多少，假如你有一檔股票在某區間的價格資料 (假設為陣列如 
 * [1, 4, 1, 2, 1])，請用 (PHP 或 JavaScript) 撰寫一個函式，幫末日博士計
 * 算在只交易一次的狀況下，於該區間放空股票的最大獲利。(註：放空即是當你認
 * 為某檔股票即將下跌，你可以向券商借入股票，並在價格下跌後買回藉此賺取價
 * 差，本題只計算價格，不需考慮利息等其他成本)
 * 
 */
// require: priceList (list of numbers)
// option: none
// return: profit (string if error, number if success)
app.short = function(priceList) {
  try {
    let max = 0
    let profit = 0
    
    for (let i=0; i<priceList.length; i++) {
      // 在遍歷過程中記錄最大值，紀錄 "當下值(含)以前的最高價"
      max = priceList[i] > max ? priceList[i] : max
      // 以 "當下值(含)以前的最高價" 減去目前的值，與已有profit比較大小
      profit = Math.max(max - priceList[i], profit)
    }

    return profit

  } catch (err) {
    return err
  }
}

// == 放空獲利 answer apply start ==

// console.log(app.short([1, 4, 1, 2, 1]))

// == 放空獲利 answer apply end ==


/* 根據內心的想法排序以下任務的優先級，並與我們分享為什麼或你的想法。
 *  1. 團隊專案中已超過預定上線日多時的開發任務
 *  2. 資料庫持續回傳連線逾時
 *  3. 客戶反應系統付款按鈕點擊後沒有回應
 *  4. 感覺再 30 分鐘可以研究出來的技術難題
 *  5. 希望你幫忙處理部門同事休假時的專案問題
 *  6. 已經持續兩週的個人開發任務
 * 
 */
	
// == 任務優先級 answer start ==

// 3 > 2 > 1 > 6 > 4 > 5

// a. 首先以在線產品狀況先行排除，減少與客戶的糾紛，或影響產品與大眾接觸 2 3
// b. 接著是有上線時限的個人有關專案 1 6
// c. 最後是時限較充裕 4 5 

// a
// 因為客戶以提出反映，應優先處裡客戶的問題，所以收以 3 優先
// 再以在線產品雖未有客戶(或大眾)反應，但影響產品運行的 2 資料庫異常第二優先
// b
// 先以超時必須盡速完成的開發任務優先 1
// 再執行個人(可能)有時限壓力的任務 6
// c
// 4 5 相當掙扎，因為在有一項挑戰有可能完成時，我會坐立難安，想趕快嘗試、測試一個結果
// 否則我腦中會無法專心做其他事，因此我以 4 給自己個時限嘗試，時限到之後就換任務 5

// == 任務優先級 answer end ==
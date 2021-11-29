// 2. 末日博士整天唱衰股市，他想知道自己放空股市究竟能獲利多少，假如你有一檔股票在某區間的價格資料 (假設為陣列如 [1, 4, 1, 2, 1])，請用 (PHP 或 JavaScript) 撰寫一個函式，幫末日博士計算在只交易一次的狀況下，於該區間放空股票的最大獲利。
// (註：放空即是當你認為某檔股票即將下跌，你可以向券商借入股票，並在價格下跌後買回藉此賺取價差，本題只計算價格，不需考慮利息等其他成本)

// comprehension : Max_profit = buy from the lowest and sell for the highest
priceRange = [1, 4, 1, 2, 1]

function buy_sell(priceRange){
    let max = Math.max(...priceRange)
    let min = Math.min(...priceRange)
    return (max - min)
}
let max_profit = buy_sell(priceRange)
console.log(max_profit)

// 1. 你有幾檔尚未除權息的股票資料，包含公司名稱、股票代碼、今日股價、今日成交量與公司基本資料（公司地址、實收資本、董事長與總經理），以及本年度預計發放的現金與股票股利，每間公司的現金或股票股利並不相同，使用者希望能輸入現金與股票股利後就能事先知道除權息後的股價，請用 (PHP 或 JavaScript) 將這些資訊包裝成方便使用的資料結構與函式。

// company information
function Company_Info (address, paid_in_capital, president, general_manager){
    this.address = address
    this.paid_in_capital = paid_in_capital
    this.president = president
    this.general_manager = general_manager
}

// stock information
function Stock (company_name, stock_number, price, volume, company_info, cash_dividends,stock_dividends){
    this.company_name = company_name
    this.stock_number = stock_number
    this.price = price
    this.volume = volume
    this.cash_dividends = cash_dividends
    this.stock_dividends = stock_dividends
    this.company_info = company_info
    // 除權息後的股價
    this.ex_dividend =function(cash_dividends, stock_dividends){
        newPrice = (this.price-cash_dividends)/(1+stock_dividends/10)
        return (Math.round(newPrice * 100) / 100)
    }
}

// example
let abc_company = new Company_Info('def street', 100000, 'eric', 'eric2')
let abc_company_stock = new Stock ('abc', 00110, 300, 50, abc_company)
console.log("ABC stock infomation", abc_company_stock)
console.log("ABC Stock price after ex_dividend", abc_company_stock.ex_dividend(0.61, 0.61))
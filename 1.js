// 1. 你有幾檔尚未除權息的股票資料，
// 包含公司名稱、股票代碼、今日股價、今日成交量與公司基本資料（公司地址、實收資本、董事長與總經理），
// 以及本年度預計發放的現金與股票股利，每間公司的現金或股票股利並不相同，
// 使用者希望能輸入現金與股票股利後就能事先知道除權息後的股價，
// 請用 (PHP 或 JavaScript) 將這些資訊包裝成方便使用的資料結構與函式。

///

// 股票資料
// 1. stock_name    公司名稱
// 2. id            股票代碼
// 3. price         今日股價
// 4. volume        今日成交量
// 5. company_info  公司基本資料（公司地址、實收資本、董事長與總經理）

// input
// 1. - 本年度預計發放的現金股利
// 2. - 本年度預計發放的股票股利

class __COMPANY_INFO__ {
  constructor(address, paid_in_capital, president, general_manager) {
    this.address = address;
    this.paid_in_capital = paid_in_capital;
    this.president = president;
    this.general_manager = general_manager;
  }
  print() {
    console.log("addr: ", this.address);
    console.log("paid in capital: ", this.paid_in_capital.toLocaleString());
    console.log("president: ", this.president);
    console.log("general manager: ", this.general_manager);
  }
}

class __STOCK__ {
  constructor(stock_name, id, price, volume, company_info) {
    this.stock_name = stock_name;
    this.id = id;
    this.price = price;
    this.volume = volume;
    this.company_info = company_info;
  }

  // 除權息參考價=﹝除權除息前一日收盤價-現金股利﹞÷﹝1＋（股票股利÷10）﹞
  // ref: https://www.businesstoday.com.tw/article/category/80401/post/201304180039/%E4%B8%8D%E5%8F%AF%E4%B8%8D%E7%9F%A5%E7%9A%84%20%E9%99%A4%E6%AC%8A%E6%81%AF%E9%97%9C%E9%8D%B5%E4%B8%83%E5%95%8F

  ex_dividend(cash_dividend, stock_dividends) {
    return (
      Math.round(
        ((this.price - cash_dividend) / (1 + stock_dividends / 10)) * 1000
      ) / 1000
    );
  }
  print() {
    console.log("stock_name: ", this.stock_name);
    console.log("id: ", this.id);
    console.log("price: ", this.price);
    console.log("volume: ", this.volume);
    this.company_info.print();
  }
}

///

// example

// ref: https://www.cnyes.com/twstock/intro.aspx?code=2637
let TPE_2637_company_info = new __COMPANY_INFO__(
  "106大安區復興南路二段237號",
  7464091990,
  "藍俊昇",
  "鄭俊聲"
);

// 2020/07/06
// 除權息前股價: 25.20
// 現金股利 (元/股): 1.4177
// 現金殖利率: 0.2363
// ref: https://invest.cnyes.com/twstock/TWS/2637/dividend
let TPE_2637_stock = new __STOCK__(
  "慧洋-KY",
  2637,
  25.2,
  4080,
  TPE_2637_company_info
);

// TPE_2637_company_info.print();
// TPE_2637_stock.print();

let TPE_2637_ex_dividend = TPE_2637_stock.ex_dividend(1.4177, 0.2363);
console.log(TPE_2637_ex_dividend);

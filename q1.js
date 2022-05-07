// the operation of each stock won't change
// while user might update different stocks
// so we use OOP to solve this problem

class stock {
  constructor(
    companyName,
    stockSymbol,
    stockPriceToday,
    volumeToday,
    companyInfo
  ) {
    this.companyName = companyName;
    this.stockSymbol = stockSymbol;
    this.stockPriceToday = stockPriceToday;
    this.volumeToday = volumeToday;
    this.companyInfo = {};
  }

  setStockPriceToday(stockPriceToday) {
    this.stockPriceToday = stockPriceToday;
  }

  setVolumeToday(volumeToday) {
    this.volumeToday = volumeToday;
  }

  setCompanyInfo(companyAddress, paidUpCapital, chairman, president) {
    this.companyInfo.companyAddress = companyAddress;
    this.companyInfo.paidUpCapital = paidUpCapital;
    this.companyInfo.chairman = chairman;
    this.companyInfo.president = president;
  }

  getDividendedStockPrice(cash, stockDividend) {
    return ((this.stockPriceToday - cash) / (1 + stockDividend / 10)).toFixed(
      2
    );
  }
}

// test case
let TSMC = new stock("TSMC", 2330, 528, 10000);
TSMC.setCompanyInfo(
  "8, Li-Hsin Rd. 6, Hsinchu Science Park,Hsinchu 300-096, Taiwan, R.O.C.",
  1000000,
  "Marcus",
  "Tony"
);

console.log(TSMC.getDividendedStockPrice(10, 0.1));

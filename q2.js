// 賣高買低
// find x and y in an integer array such that (x - y) is the max number
// x must appear before y

const getMaxProfit = (price) => {
  /* check length of price */
  // if length of price === 1 -> return 0
  // if length of price === 2
  // => if price of stock increased -> return 0
  // => if price of stock decreased as expected -> return profit

  if (price.length < 1) return 0;
  if (price.length === 2) return price[0] > price[1] ? price[0] - price[1] : 0;

  let maxProfit = 0;
  let currentHighestPrice = price[0];

  for (var i = 1; i < price.length; i++) {
    if (price[i] > currentHighestPrice) currentHighestPrice = price[i];
    if (currentHighestPrice - price[i] > maxProfit)
      maxProfit = currentHighestPrice - price[i];
  }

  return maxProfit;
};

const price0 = [1, 4, 1, 2, 1];
const price1 = [5, 1, 10, 9];

console.log("Max profit : " + getMaxProfit(price0));
console.log("Max profit : " + getMaxProfit(price1));

// Time Complexity : O(n)

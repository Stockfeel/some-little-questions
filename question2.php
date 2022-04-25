<?php
// 末日博士整天唱衰股市，他想知道自己放空股市究竟能獲利多少，假如你有一檔股票在某區間的價格資料 (假設為陣列如 [1, 4, 1, 2, 1])，請用 (PHP 或 JavaScript) 撰寫一個函式，幫末日博士計算在只交易一次的狀況下，於該區間放空股票的最大獲利。 (註：放空即是當你認為某檔股票即將下跌，你可以向券商借入股票，並在價格下跌後買回藉此賺取價差，本題只計算價格，不需考慮利息等其他成本)

function calculateProfit($arr)
{
    // 到目前為止訪問的最高價格與日期
    $max_price = $arr[0];
    $buy_day   = 0;
    // 到目前為止發現的最大差額與日期
    $max_profit = $arr[0] - $arr[1];
    $sell_day   = 1;

    for ($i = 1; $i < count($arr); $i++) {
        //若最高價格 < 當天價格且非區間最後一天，則更新最高價格與買入日期
        if ($max_price < $arr[$i] && $i + 1 < count($arr)) {
            $max_price = $arr[$i];
            $buy_day   = $i;
        }

        //若最高價格 - 當天價格 (跌幅) > 最大差額，則更新最大差額與日期
        if ($max_price - $arr[$i] > $max_profit) {
            $max_profit = $max_price - $arr[$i];
            $sell_day   = $i;
        }
    }
    return [$buy_day, $sell_day, $max_profit];
}

$data = [1, 4, 1, 2, 1];
$result = calculateProfit($data);
echo '第' . ($result[0] + 1) . '天($' . $data[$result[0]] . ')放空, 第' . ($result[1] + 1) . '天($' . $data[$result[1]] . ')賣出, 獲利' . $result[2] . '元。';

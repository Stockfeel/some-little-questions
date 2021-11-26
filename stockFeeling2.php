<?php

// 末日博士整天唱衰股市，他想知道自己放空股市究竟能獲利多少，假如你有一檔股票在某區間的價格資料 (假設為陣列如 [1, 4, 1, 2, 1])，請用 (PHP 或 JavaScript) 撰寫一個函式，幫末日博士計算在只交易一次的狀況下，於該區間放空股票的最大獲利。 (註：放空即是當你認為某檔股票即將下跌，你可以向券商借入股票，並在價格下跌後買回藉此賺取價差，本題只計算價格，不需考慮利息等其他成本)

//價格與時間
$arr = [1, 4, 1, 2, 1];

function getProfit(array $arr)
{
    $newarray = [];
    $allInfo = [];
    for ($i = 0; $i < count($arr) - 1; ++$i) {
        $day = 1;
        $tep = 0;
        for ($j = $i; $j < count($arr); ++$j) {
            if ($arr[$i] - $arr[$j] > 0) {
                $newarray[] = [$i + 1, $arr[$i]]; //有機會會賺的天數key， 與價格

                if ($arr[$i] - $arr[$j] > $tep) {
                    $tep = $arr[$i] - $arr[$j]; //找到第a天之後最大的獲利
                    $day = $j + 1;
                }
            }
        }
        if ($tep !== 0) {
            $money[] = [$day, $tep]; //每個會賺天數中賺最多的 [第N天賺,最大賺多少]

            // [第a天開始會賺,第a天價格,第b天會獲利,最大賺多少]
            $allInfo[] = ['startDay' => $i + 1, 'price' => $arr[$i], 'finishDay' => $day, 'maxProfit' => $tep];
        }
    }

    $max = max(array_column($allInfo, 'maxProfit'));
    foreach ($allInfo as $k => $v) {
        if ($allInfo[$k]['maxProfit'] == $max) {
            return '你在'.$allInfo[$k]['startDay'].'天放空，價格是'.$allInfo[$k]['price'].'元，第'.$allInfo[$k]['finishDay'].'天回補，最大獲利'.$max.'元';
        }
    }
}

echo getProfit($arr);

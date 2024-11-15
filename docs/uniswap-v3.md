# Uniswap V3 - Giải thích toán học

## 1. Công thức Tính giá (Price Formula)

Công thức cơ bản của Uniswap V3 dựa trên hàm Constant Product Market Maker (CPMM):

$x * y = k$

Trong đó:
- x: số lượng token X trong pool
- y: số lượng token Y trong pool 
- k: hằng số

## 2. Concentrated Liquidity

Uniswap V3 giới thiệu khái niệm Concentrated Liquidity, cho phép cung cấp thanh khoản trong một khoảng giá cụ thể $[P_a, P_b]$:

$L = \sqrt{x * y}$

Trong đó:
- L: Liquidity được cung cấp
- $P_a$: Giá thấp nhất của khoảng
- $P_b$: Giá cao nhất của khoảng

## 3. Công thức tính số lượng token

Số lượng token trong một khoảng giá:

$\Delta x = L * (1/\sqrt{P_a} - 1/\sqrt{P_b})$
$\Delta y = L * (\sqrt{P_b} - \sqrt{P_a})$

## 4. Phí giao dịch (Fee)

$Phí = volume * fee\_tier$

Trong đó fee_tier có thể là:
- 0.01% (1 bps)
- 0.05% (5 bps)
- 0.3% (30 bps)
- 1% (100 bps)

## 5. Virtual Reserves

Uniswap V3 sử dụng Virtual Reserves để tính toán giá:

$\sqrt{P} = \sqrt{y/x}$

Trong đó P là giá hiện tại của cặp token.

## 6. Slippage

Công thức tính slippage:

$Slippage = |{(P_{execution} - P_{expected})}| / P_{expected} * 100\%$

Trong đó:
- $P_{execution}$: Giá thực tế khi thực hiện giao dịch
- $P_{expected}$: Giá dự kiến ban đầu

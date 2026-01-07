/* asset/pop.js - 處理限時優惠彈窗、倒數計時與購物車提示 */

// 1. 把關閉功能放在最外面，確保 HTML onclick 隨時都能呼叫
window.closePopup = function () {
    const popupElement = document.getElementById('popup');
    if (popupElement) {
        popupElement.style.display = 'none';
    } else {
        console.error("錯誤：找不到 id='popup' 的視窗元素");
    }
};

// 2. 當網頁 HTML 載入完成後，才開始執行抓取元素的動作
document.addEventListener('DOMContentLoaded', function () {
    console.log("pop.js 載入成功");

    /* ==============================
       Part A: 倒數計時（30 分鐘）
       ============================== */
    let remaining = 30 * 60 * 1000;

    const popupCountdownElement = document.getElementById('popupCountdown');
    const btnCountdownElement = document.getElementById('btnCountdown');
    
    // 安全檢查：不直接 return，而是顯示警告並繼續執行後面的程式
    if (!popupCountdownElement) console.warn("找不到 id='popupCountdown'，彈窗倒數無法顯示");
    if (!btnCountdownElement) console.warn("找不到 id='btnCountdown'，按鈕倒數無法顯示");

    if (popupCountdownElement || btnCountdownElement) {
        const countdownTimer = setInterval(() => {
            remaining -= 10;

            if (remaining <= 0) {
                clearInterval(countdownTimer);
                if (popupCountdownElement) popupCountdownElement.textContent = '00:00.00';
                if (btnCountdownElement) btnCountdownElement.textContent = '00:00.00';
                return;
            }

            const minutes = Math.floor((remaining % 3600000) / 60000);
            const seconds = Math.floor((remaining % 60000) / 1000);
            const ms = Math.floor((remaining % 1000) / 10);

            const timeText =
                `${String(minutes).padStart(2, '0')}:` +
                `${String(seconds).padStart(2, '0')}.` +
                `${String(ms).padStart(2, '0')}`;

            if (popupCountdownElement) popupCountdownElement.textContent = timeText;
            if (btnCountdownElement) btnCountdownElement.textContent = timeText;

        }, 10);
    }

    /* ==============================
       Part B: 加入購物車提示 (Toast)
       ============================== */
    // 注意：這裡已經在 DOMContentLoaded 裡面了，所以一定抓得到元素
    const cartToast = document.getElementById('cartToast');
    const buyButtons = document.querySelectorAll('.buy-btn');

    if (buyButtons.length > 0) {
        buyButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                showCartToast();
            });
        });
    } else {
        console.warn("找不到 class='buy-btn' 的按鈕，無法綁定購物車提示");
    }

    // 定義顯示提示的函式
    function showCartToast() {
        if (!cartToast) {
            console.error("找不到 id='cartToast' 元素，無法顯示提示");
            return;
        }

        cartToast.classList.add('show');

        // 2秒後自動消失
        setTimeout(() => {
            cartToast.classList.remove('show');
        }, 2000);
    }

}); // <--- 這才是結尾的大括號
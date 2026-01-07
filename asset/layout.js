/* common.js - 包含 Header, Footer, Modal 及所有頁面共用邏輯 */

document.addEventListener("DOMContentLoaded", function() {
    
    // -----------------------------------------------------------
    // 1. 自動產生 Header (頁首)
    // -----------------------------------------------------------
    const headerHTML = `
        <div class="header-inner">
            <div class="logo">
                <a href="../index.html">
                    <img src="../img/out/Logo.jpg" alt="Dingnow Logo">
                </a>
            </div>
            <div class="search-box">
                <input type="text" placeholder="搜尋商品...">
            </div>
            <nav class="nav-links">
                <a href="../pages/market.html">購物車</a>
                <a onclick="openModal()" style="cursor: pointer;">帳號</a>
            </nav>
        </div>
    `;
    const headerEl = document.querySelector("header");
    if(headerEl) headerEl.innerHTML = headerHTML;


    // -----------------------------------------------------------
    // 2. 自動產生 Footer (頁尾)
    // -----------------------------------------------------------
    const footerHTML = `
        <div class="footer-links">
            <a onclick="showInfoView('brand')">品牌故事</a> <span>|</span>
            <a onclick="showInfoView('guide')">購買須知</a> <span>|</span>
            <a onclick="showInfoView('support')">客服中心</a> <span>|</span>
            <a onclick="showInfoView('jobs')">加入我們</a> <span>|</span>
            <a onclick="showInfoView('privacy')">隱私權條款</a> <span>|</span>
            <a onclick="showSubscribeView()" style="cursor:pointer">訂閱Dingnow電子報</a>
        </div>
        <div class="copyright">© Dingnow Co., Ltd. All Rights Reserved.</div>
    `;
    const footerEl = document.querySelector("footer");
    if(footerEl) footerEl.innerHTML = footerHTML;


    // -----------------------------------------------------------
    // 3. 自動產生 Modal 結構 (彈窗外框)
    // -----------------------------------------------------------
    // 檢查是否已經存在，避免重複加入
    if (!document.getElementById('loginModal')) {
        const modalHTML = `
            <div class="modal-overlay" id="loginModal">
                <div class="modal-content">
                    <span class="close-btn" onclick="closeModal()">&times;</span>
                    <div id="viewContainer"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // 初始化：預設載入登入畫面
    showLoginView();
});


// ==========================================================================
//  以下為功能函式庫 (全部採用置中設計)
// ==========================================================================

// 取得彈窗內容容器
function getViewContainer() {
    return document.getElementById('viewContainer');
}

// --- 顯示登入畫面 ---
function showLoginView() {
    getViewContainer().innerHTML = `
        <img src="../img/out/Logo.jpg" class="modal-logo-img" alt="Logo">
        <div class="modal-welcome">Welcome Back</div>
        <div class="modal-title">會員登入</div>
        
        <form onsubmit="handleAction('登入成功', event)">
            <div style="margin-bottom: 20px; text-align: center;">
                <input type="email" placeholder="請輸入 Email" required 
                       style="width: 80%; padding: 10px; text-align: center; border: none; border-bottom: 1px solid #333; outline: none; font-size: 16px;">
            </div>
            
            <div style="margin-bottom: 20px; text-align: center;">
                <input type="password" id="lp" placeholder="請輸入密碼" required 
                       style="width: 80%; padding: 10px; text-align: center; border: none; border-bottom: 1px solid #333; outline: none; font-size: 16px;">
            </div>

            <div style="width: 80%; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: #666;">
                <label style="cursor:pointer"><input type="checkbox" onclick="document.getElementById('lp').type=this.checked?'text':'password'"> 顯示密碼</label>
                <span onclick="showForgotView()" style="cursor:pointer; text-decoration: underline;">忘記密碼?</span>
            </div>

            <div style="text-align: center; margin-top: 30px;">
                <button type="submit" class="btn-submit" style="width: 80%;">立即登入</button>
            </div>
        </form>

        <div style="margin-top: 20px; text-align: center; font-size: 13px; color: #888;">
            還沒有帳號嗎？ 
            <a onclick="showRegisterView()" style="cursor:pointer; font-weight: bold; text-decoration: underline; color: #222;">註冊會員</a>
        </div>
    `;
}

// --- 顯示註冊畫面 ---
function showRegisterView() {
    getViewContainer().innerHTML = `
        <img src="../img/out/Logo.jpg" class="modal-logo-img" alt="Logo">
        <div class="modal-title">註冊新會員</div>
        
        <form onsubmit="handleAction('註冊成功', event)">
            <div style="margin-bottom: 20px; text-align: center;">
                <input type="email" placeholder="請輸入 Email" required 
                       style="width: 80%; padding: 10px; text-align: center; border: none; border-bottom: 1px solid #333; outline: none; font-size: 16px;">
            </div>
            
            <div style="margin-bottom: 20px; text-align: center;">
                <input type="password" id="rp" placeholder="設定密碼" required 
                       style="width: 80%; padding: 10px; text-align: center; border: none; border-bottom: 1px solid #333; outline: none; font-size: 16px;">
            </div>

            <div style="width: 80%; margin: 0 auto; text-align: left; font-size: 13px; color: #666;">
                <label style="cursor:pointer"><input type="checkbox" onclick="document.getElementById('rp').type=this.checked?'text':'password'"> 顯示密碼</label>
            </div>

            <div style="text-align: center; margin-top: 30px;">
                <button type="submit" class="btn-submit" style="width: 80%;">確認註冊</button>
            </div>
        </form>

        <div style="margin-top: 20px; text-align: center; font-size: 13px; color: #888;">
            已經有帳號了？ 
            <a onclick="showLoginView()" style="cursor:pointer; font-weight: bold; text-decoration: underline; color: #222;">返回登入</a>
        </div>
    `;
}

// --- 顯示忘記密碼畫面 ---
function showForgotView() {
    getViewContainer().innerHTML = `
        <img src="../img/out/Logo.jpg" class="modal-logo-img" alt="Logo">
        <div class="modal-title">找回密碼</div>
        <div style="color: #666; margin-bottom: 20px; font-size: 13px; text-align: center;">請輸入註冊時的 Email，我們將寄送重設連結給您。</div>

        <form onsubmit="handleAction('密碼已發送', event)">
            <div style="margin-bottom: 25px; text-align: center;">
                <input type="email" placeholder="請輸入 Email" required 
                       style="width: 80%; padding: 10px; text-align: center; border: none; border-bottom: 1px solid #333; outline: none; font-size: 16px;">
            </div>

            <div style="text-align: center;">
                <button type="submit" class="btn-submit" style="width: 80%;">發送重設信</button>
            </div>
        </form>
        
        <div style="text-align: center; margin-top: 20px;">
            <a onclick="showLoginView()" style="cursor:pointer; font-size: 13px; color: #666; text-decoration: underline;">想起密碼了？返回登入</a>
        </div>
    `;
}

// --- 顯示訂閱電子報畫面 (置中 + 下次再說按鈕) ---
function showSubscribeView() {
    getViewContainer().innerHTML = `
        <img src="../img/out/Logo.jpg" class="modal-logo-img" alt="Logo">
        <div class="modal-title">訂閱電子報</div>
        
        <div style="color: #666; margin-bottom: 20px; font-size: 14px; text-align: center;">
            訂閱即可獲得最新商品資訊與專屬優惠代碼！
        </div>

        <form onsubmit="handleAction('訂閱成功！感謝您的支持', event)">
            <div style="margin-bottom: 25px; text-align: center;">
                <input type="email" placeholder="請輸入您的 Email" required 
                       style="width: 80%; padding: 10px; text-align: center; border: none; border-bottom: 1px solid #333; outline: none; font-size: 16px;">
            </div>

            <div style="text-align: center;">
                <button type="submit" class="btn-submit" style="width: 80%;">確認訂閱</button>
            </div>
        </form>

        <div style="text-align: center; margin-top: 15px;">
            <button type="button" onclick="closeModal()" 
                    style="width: auto; padding: 8px 30px; background: #f0f0f0; border: none; color: #555; cursor: pointer; border-radius: 4px;">
                下次再說
            </button>
        </div>
    `;
    openModal();
}

// --- 顯示品牌資訊/購買須知 (統一置中風格) ---
function showInfoView(type) {
    let title = "", text = "";
    if (type === 'brand') { 
        title = "品牌故事"; 
        text = "Dingnow 致力於提供給顧客最佳的 3C 周邊及服務。<br>我們相信科技能改變生活，讓每一天都充滿驚喜。"; 
    }
    else if (type === 'guide') { 
        title = "購買須知"; 
        text = "1. 下單後 3 個工作天內出貨。<br>2. 全館享有 7 天鑑賞期。<br>3. 訂單滿 $2,000 免運費。"; 
    }
    else if (type === 'support') { 
        title = "客服中心"; 
        text = "若有任何問題，歡迎隨時聯繫我們。<br><br>信箱：jasontai2017@gmail.com<br>服務時間：週一至週五 09:00 - 18:00"; 
    }
    else if (type === 'jobs') { 
        title = "加入我們"; 
        text = "我們正在尋找熱情的夥伴！<br>目前開放職缺：前端工程師、產品設計師。<br>歡迎投遞履歷至官方信箱。"; 
    }
    else if (type === 'privacy') { 
        title = "隱私權條款"; 
        text = "我們重視您的個資隱私，您的資料僅用於訂單處理與配送，絕不會向第三方透露。"; 
    }
    
    getViewContainer().innerHTML = `
        <img src="../img/out/Logo.jpg" class="modal-logo-img" alt="Logo">
        <div class="modal-title">${title}</div>
        
        <div style="text-align: center; line-height: 1.8; color: #555; font-size: 15px; padding: 0 20px; margin-bottom: 30px;">
            ${text}
        </div>

        <div style="text-align: center;">
            <button type="button" onclick="closeModal()" class="btn-submit" style="width: auto; padding: 10px 50px;">
                我了解了
            </button>
        </div>
    `;
    openModal();
}

// --- 處理表單提交後的動作 (模擬成功) ---
function handleAction(msg, event) {
    if(event) event.preventDefault();
    getViewContainer().innerHTML = `
        <div class="success-message" style="margin-top: 100px; text-align: center; color: #28a745; font-weight: bold; font-size: 22px;">
            ${msg}
        </div>`;
    setTimeout(() => { closeModal(); showLoginView(); }, 1500);
}

// --- 開啟/關閉 Modal ---
function openModal() { document.getElementById('loginModal').style.display = 'flex'; }
function closeModal() { document.getElementById('loginModal').style.display = 'none'; showLoginView(); }

// 點擊黑色背景關閉視窗
window.onclick = (e) => { 
    const modal = document.getElementById('loginModal');
    if(modal && e.target == modal) closeModal(); 
}

// --- 商品篩選功能 (如果頁面上有 filter-btn 才會執行) ---
function filterItems(range, event) {
    const cards = document.querySelectorAll('.product-card');
    if (cards.length === 0) return; // 沒商品就不執行

    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if(event) event.currentTarget.classList.add('active');
    
    cards.forEach(c => {
        const id = parseInt(c.dataset.id);
        if(range === 'all') c.style.display = 'block';
        else if(range === '1-3') c.style.display = (id >= 1 && id <= 3) ? 'block' : 'none';
        else if(range === '4-6') c.style.display = (id >= 4 && id <= 6) ? 'block' : 'none';
    });
}

// ==========================================
//  購物車功能
// ==========================================

//數量增減功能
function changeQty(btn, change) {
    const qtySpan = btn.parentElement.querySelector('.qty-val');
    let currentQty = parseInt(qtySpan.innerText);
    
    currentQty += change;
    if (currentQty < 0) currentQty = 0;
    
    qtySpan.innerText = currentQty;
    updateTotal(); // 數量改變後，重新計算價格
}

//計算總金額
function updateTotal() {
    // 安全檢查：如果現在頁面上找不到「運費選單」，代表不是購物車頁面，直接結束
    const shippingSelect = document.getElementById('shipping-method');
    if (!shippingSelect) return; 

    let totalSubtotal = 0;
    const items = document.querySelectorAll('.item-card');

    items.forEach(item => {
        const price = parseInt(item.getAttribute('data-price'));
        const qty = parseInt(item.querySelector('.qty-val').innerText);
        totalSubtotal += price * qty;
    });

    const shipping = parseInt(shippingSelect.value);
    const finalTotal = totalSubtotal > 0 ? (totalSubtotal + shipping) : 0;

    // 更新介面
    document.getElementById('subtotal').innerText = `$${totalSubtotal.toLocaleString()}`;
    document.getElementById('grand-total').innerText = `$${finalTotal.toLocaleString()}`;
}

// 結帳按鈕
function processCheckout() {
    const currentTotal = document.getElementById('grand-total').innerText;
    // 去掉 $ 符號與逗號來判斷數值
    const numTotal = parseInt(currentTotal.replace(/[$,]/g, ''));

    if (numTotal === 0) {
        alert('購物車目前是空的，請先挑選商品！');
    } else {
        alert('進入支付流程，總金額為：' + currentTotal);
        // 這裡之後可以寫跳轉到結帳頁面的程式碼
        // location.href = 'checkout.html';
    }
}

//初始化：當頁面載入完成後，執行一次計算
document.addEventListener("DOMContentLoaded", function() {
    updateTotal();
});
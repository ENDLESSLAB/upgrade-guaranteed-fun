// --------------------
// 遊戲資料
// --------------------

// 目前的等級
let level = 0;


// --------------------
// 找到 HTML 元素
// --------------------

const levelElement = document.getElementById("level");

const expInput = document.getElementById("expInput");

const levelUpText = document.getElementById("levelUpText");

const shareButton = document.getElementById("shareButton");

const upgradeButton = document.getElementById("upgradeButton");

// --------------------
// 升級
// --------------------

function upgrade() {

    // 取得玩家輸入的數字
    const exp = Number(expInput.value);


    // 檢查輸入是否合法
    if (!Number.isFinite(exp) || exp <= 0) {
        return;
    }


    // 增加經驗
    level = level + exp;


    // 更新畫面上的等級
    levelElement.textContent = level;


    // 清空輸入框
    expInput.value = "";


    // 播放 Level Up 動畫
    playLevelUpAnimation();

}


// --------------------
// 玩家按下鍵盤
// --------------------

expInput.addEventListener("keydown", function(event) {

    // 如果按的是 Enter
    if (event.key === "Enter") {

        upgrade();

    }

});

// --------------------
// 玩家按下升級按鈕
// --------------------

upgradeButton.addEventListener("click", function() {

    upgrade();

});

// --------------------
// Level Up 動畫
// --------------------

function playLevelUpAnimation() {

    // 先移除動畫
    levelUpText.classList.remove("show");

    // 強迫瀏覽器重新計算版面
    void levelUpText.offsetWidth;

    // 再重新加入動畫
    levelUpText.classList.add("show");

}

// --------------------
// 分享按鈕
// --------------------

shareButton.addEventListener("click", async function() {

    // 取得目前網頁網址
    const url = window.location.href;

    // 組合分享文字
    const message =
        `我在升級保證爽XD升到了${level}級，你也一起來吧，無極限，保證爽！${url}`;


    // 嘗試複製
    try {

        await navigator.clipboard.writeText(message);

        // 複製成功
        shareButton.textContent = "已複製！";


        // 2 秒後恢復按鈕文字
        setTimeout(function() {
            shareButton.textContent = "分享";
        }, 2000);

    } catch (error) {

        // 複製失敗
        alert("複製失敗，請手動複製：\n\n" + message);

    }

})
// ✅ 変更点1：ユーザー名ごとの固定IDを保持するマップを追加
const userIdMap = {}; // { "ユーザー名": "comment-1" }
let nextIdNumber = 1;

document.getElementById("comment-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const message = document.getElementById("message").value.trim();

  if (username === "" || message === "") return;

  // ✅ 変更点2：ユーザー名が未登録ならIDを割り振る（固定する）
  if (!userIdMap[username]) {
    const newId = `comment-${nextIdNumber}`;
    userIdMap[username] = newId;
    nextIdNumber++;
  }

  const commentId = userIdMap[username];
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // ✅ 変更点3：コメントブロックを生成（既存のIDを使用）
  const commentDiv = document.createElement("div");
  commentDiv.className = "comment";

  commentDiv.innerHTML = `
    <span class="username">${username}</span>
    <span class="message">${message}</span>
    <span class="timestamp">🕒 ${timestamp}</span>
    <span class="comment-id">💬 固定ID: ${commentId}</span>
  `;


// ✅ 変更点4：追加コード**「固定IDをクリックすると、そのIDに紐づく過去のコメントだけを表示する」**
  document.getElementById("comment-container").appendChild(commentDiv);
  // ✅ 新しいコメントが常に見えるようにスクロール
  document.getElementById("comment-container").scrollTop = document.getElementById("comment-container").scrollHeight;
  document.getElementById("comment-form").reset();
});

document.getElementById("comment-container").addEventListener("click", function (e) {
  const target = e.target;

  // 固定IDの要素がクリックされたかどうかを判定
  if (target.classList.contains("comment-id")) {
    const clickedId = target.textContent.replace("💬 固定ID: ", "").trim();
    const allComments = document.querySelectorAll(".comment");

    // トグル機能：すでにフィルタされている場合は全表示に戻す
    const isFiltered = target.classList.contains("active-filter");

    allComments.forEach(comment => {
      const idSpan = comment.querySelector(".comment-id");
      const commentId = idSpan.textContent.replace("💬 固定ID: ", "").trim();

      if (isFiltered || commentId === clickedId) {
        comment.style.display = "block";
      } else {
        comment.style.display = "none";
      }
    });

    // フィルタ状態の切り替え
    document.querySelectorAll(".comment-id").forEach(span => span.classList.remove("active-filter"));
    if (!isFiltered) {
      target.classList.add("active-filter");
    }
  }
});



// ✅ 変更点5：ドラッグで移動できるようにする
const box = document.getElementById("comment-box");
let isDragging = false;
let offsetX, offsetY;

box.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - box.offsetLeft;
  offsetY = e.clientY - box.offsetTop;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    box.style.left = `${e.clientX - offsetX}px`;
    box.style.top = `${e.clientY - offsetY}px`;
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

// ✅ 変更点 6：コメント削除を追加
const deleteBtn = document.createElement("button");
deleteBtn.textContent = "削除";
deleteBtn.className = "delete-button";
deleteBtn.onclick = () => commentDiv.remove();
commentDiv.appendChild(deleteBtn);
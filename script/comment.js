
const userIdMap = {}; 
let nextIdNumber = 1;

document.getElementById("comment-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const message = document.getElementById("message").value.trim();

  if (username === "" || message === "") return;

  
  if (!userIdMap[username]) {
    const newId = `comment-${nextIdNumber}`;
    userIdMap[username] = newId;
    nextIdNumber++;
  }

  const commentId = userIdMap[username];
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  
  const commentDiv = document.createElement("div");
  commentDiv.className = "comment";

  commentDiv.innerHTML = `
    <span class="username">${username}</span>
    <span class="message">${message}</span>
    <span class="timestamp">🕒 ${timestamp}</span>
    <span class="comment-id">💬 固定ID: ${commentId}</span>
  `;



  document.getElementById("comment-container").appendChild(commentDiv);
 
  document.getElementById("comment-container").scrollTop = document.getElementById("comment-container").scrollHeight;
  document.getElementById("comment-form").reset();
});

document.getElementById("comment-container").addEventListener("click", function (e) {
  const target = e.target;


  if (target.classList.contains("comment-id")) {
    const clickedId = target.textContent.replace("💬 固定ID: ", "").trim();
    const allComments = document.querySelectorAll(".comment");

    
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

    
    document.querySelectorAll(".comment-id").forEach(span => span.classList.remove("active-filter"));
    if (!isFiltered) {
      target.classList.add("active-filter");
    }
  }
});




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


const deleteBtn = document.createElement("button");
deleteBtn.textContent = "削除";
deleteBtn.className = "delete-button";
deleteBtn.onclick = () => commentDiv.remove();

commentDiv.appendChild(deleteBtn);

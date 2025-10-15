const audio = document.getElementById('audio');
const playlist = document.getElementById('playlist');
const playPauseBtn = document.getElementById('playPause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progressBar');
const currentTimeElem = document.getElementById('currentTime');
const durationElem = document.getElementById('duration');
const volumeControl = document.getElementById('volume');

let currentTrackIndex = 0;

// 曲リストの読み込み
const tracks = [...playlist.querySelectorAll('li')];
tracks.forEach((track, index) => {
  track.addEventListener('click', () => {
    loadTrack(index);
    audio.play();
    updatePlayButton();
  });
});

// 曲をロードする関数
function loadTrack(index) {
  currentTrackIndex = index;
  const selectedTrack = tracks[index];
  audio.src = selectedTrack.getAttribute('data-src');
  audio.load();
  updatePlayButton();
}

// 再生/一時停止ボタン
playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
  updatePlayButton();
});

// 再生ボタンの表示切り替え
function updatePlayButton() {
  playPauseBtn.textContent = audio.paused ? '▶️ 再生' : '⏸️ 一時停止';
}

// 前/次ボタン
prevBtn.addEventListener('click', () => {
  const newIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(newIndex);
  audio.play();
});

nextBtn.addEventListener('click', () => {
  const newIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(newIndex);
  audio.play();
});

// 再生時間の更新
audio.addEventListener('timeupdate', () => {
  durationElem.textContent = formatTime(audio.duration);
    // 再生位置バーの更新
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    // 再生済み時間の表示
    currentTimeElem.textContent = formatTime(audio.currentTime);
    // 残り時間の表示（duration 要素に上書き）
    if (!isNaN(audio.duration)) {
      const remaining = audio.duration - audio.currentTime;
      durationElem.textContent = `${formatTime(remaining)}`;//textContent = `-${formatTime(remaining)}`;
    }
});

// 進行バーを操作
progressBar.addEventListener('input', (event) => {
  audio.currentTime = (event.target.value / 100) * audio.duration;
});

// 時間をフォーマット (秒 → 分:秒)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// ボリューム調整
volumeControl.addEventListener('input', (event) => {
  audio.volume = event.target.value;
});


// 初期トラックをロード
loadTrack(0);

const player = document.querySelector('.player');
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

player.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - player.getBoundingClientRect().left;
  offsetY = e.clientY - player.getBoundingClientRect().top;
  player.style.transition = 'none';
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const playerRect = player.getBoundingClientRect();
    const parentRect = document.body.getBoundingClientRect();
    let newLeft = e.clientX - offsetX;
    let newTop = e.clientY - offsetY;

    // 画面外に出ないように制限
    newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - playerRect.width));
    newTop = Math.max(0, Math.min(newTop, window.innerHeight - playerRect.height));

    player.style.left = `${newLeft}px`;
    player.style.top = `${newTop}px`;
    player.style.transform = 'none';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  audio.volume = 0.1;

  volumeControl.addEventListener('input', (event) => {
    audio.volume = event.target.value;
  });
});

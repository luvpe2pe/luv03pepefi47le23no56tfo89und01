  function setLink() {
    const randIndex = Math.floor(Math.random() * urls.length);
    link.dataset.url = urls[randIndex];
  }

  link.addEventListener('click', (e) => {
    e.preventDefault();
    const selectedUrl = link.dataset.url;

    if (selectedUrl === specificUrl && Math.random() > specificClickProbability) {
      alert('このリンクは現在アクセスできません');
      return;
    }

    window.location.href = selectedUrl;

  setLink();
});
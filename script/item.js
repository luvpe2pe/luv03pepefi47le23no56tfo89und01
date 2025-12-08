document.addEventListener('copy', function (event) {
  event.preventDefault();
  alert('コピーは禁止されています。');
});

document.addEventListener('paste', function (event) {
  event.preventDefault();
  alert('貼り付けは禁止されています。');
});

document.addEventListener('contextmenu', function (event) {
  if (event.target.tagName === 'IMG') {
    event.preventDefault();
    alert('この画像のコピーは禁止されています。');
  }
});

document.addEventListener('dragstart', function (event) {
  if (event.target.tagName === 'IMG') {
    event.preventDefault();
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const spaceContainer = document.getElementById("space-container");

  const totalCubes = 5; 

  for (let i = 0; i < totalCubes; i++) {
    createInteractiveCube(i);
  }

  function createInteractiveCube(index) {
    const size = 100 + Math.floor(Math.random() * 50);
    const x = 100 + Math.random() * window.innerWidth - size;
    const y = 100 + Math.random() * window.innerHeight - size;
    const z = -200 + Math.random() * 400;
    const rotationSpeed = 5 + Math.random() * 10;

    const cube = document.createElement("div");
    cube.className = "cube-container";
    cube.style.width = `${size}px`;
    cube.style.height = `${size}px`;
    cube.style.left = `${x}px`;
    cube.style.top = `${y}px`;

    const faceLinks = [
      "https://www.youtube.com/",
      "https://www.youtube.com/",
      "https://www.youtube.com/",
      "https://www.youtube.com/",
      "https://www.youtube.com/",
      "https://www.youtube.com/"
    ];

    const rotations = [
      [0, 0],
      [0, 90],
      [0, -90],
      [90, 0],
      [-90, 0],
      [180, 0]
    ];

    rotations.forEach(([rx, ry], i) => {
      const face = document.createElement("div");
      face.className = "cube-face";
      face.style.transform =
        `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${size / 2}px)`;
      face.style.backgroundImage = `url('https://picsum.photos/id/${index * 10 + i}/200')`;
      face.addEventListener("click", () => {
        window.open(faceLinks[i], "_blank");
      });
      cube.appendChild(face);
    });

    let angleX = 0;
    let angleY = 0;

    const animate = () => {
      angleX += rotationSpeed * 0.01;
      angleY += rotationSpeed * 0.01;
      cube.style.transform =
        `translateZ(${z}px)
         translateX(${x}px)
         translateY(${y}px)
         rotateX(${angleX}deg)
         rotateY(${angleY}deg)`;
      requestAnimationFrame(animate);
    };
    animate();

    spaceContainer.appendChild(cube);
  }

});


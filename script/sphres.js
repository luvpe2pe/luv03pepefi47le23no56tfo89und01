document.addEventListener("DOMContentLoaded", () => {
  const sphere = document.getElementById("full-sphere");
  const countLat = 18; // 緯度方向の分割数
  const countLon = 36; // 経度方向の分割数
  const radius = 130;

  for (let i = 0; i <= countLat; i++) {
    const theta = Math.PI * i / countLat; // 緯度角

    for (let j = 0; j < countLon; j++) {
      const phi = 2 * Math.PI * j / countLon; // 経度角

      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      const face = document.createElement("div");
      face.className = "face";
      face.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
      sphere.appendChild(face);
    }
  }
});
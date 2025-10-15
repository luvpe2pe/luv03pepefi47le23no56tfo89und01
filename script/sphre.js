document.addEventListener("DOMContentLoaded", () => {
  const sphere = document.getElementById("sphere-outline");
  const pointCount = 120;
  const radius = 140;

  for (let i = 0; i < pointCount; i++) {
    const point = document.createElement("div");
    point.className = "point";

    const theta = Math.acos(-1 + (2 * i) / pointCount); // 緯度
    const phi = Math.sqrt(pointCount * Math.PI) * theta; // 経度っぽい分布

    const x = radius * Math.sin(theta) * Math.cos(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(theta);

    point.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
    sphere.appendChild(point);
  }
});
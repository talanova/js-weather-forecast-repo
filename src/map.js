export function drawMap(el) {
  const img = document.createElement("img");
  el.appendChild(img);
}

export function updateMap(el, latitude, longitude) {
  const img = el.querySelector("img");
  img.src = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=600x600&key=AIzaSyAoHdEh_Eb_8xXLNi9802SEyZJj6epr04w`;
}

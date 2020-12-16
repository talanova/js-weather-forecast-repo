export function drawMap(el, latitude, longitude) {
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }

  const img = document.createElement("img");
  img.src = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=600x600&key=AIzaSyAoHdEh_Eb_8xXLNi9802SEyZJj6epr04w`;
  el.appendChild(img);
}

export function drawMap(latitude, longitude) {
  const div = document.getElementById("map-field");
  while (div.hasChildNodes()) {
    div.removeChild(div.lastChild);
  }

  const img = document.createElement("img");
  img.src = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=600x600&key=AIzaSyAoHdEh_Eb_8xXLNi9802SEyZJj6epr04w`;
  div.appendChild(img);
}

export function drawMap(latitude, longitude) {
  const location = { lat: latitude, lng: longitude };

  const map = new window.google.maps.Map(document.getElementById("map-field"), {
    zoom: 5,
    center: location,
  });

  // eslint-disable-next-line no-unused-vars
  const marker = new window.google.maps.Marker({ position: location, map });
}

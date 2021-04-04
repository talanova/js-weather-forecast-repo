export async function getCurrentCity() {
  const url = "https://get.geojs.io/v1/ip/geo.json";
  return global
    .fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.city;
    });
}

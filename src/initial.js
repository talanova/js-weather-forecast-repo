export async function getCurrentCity() {
  const url = "https://get.geojs.io/v1/ip/geo.json";

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.city;
  } catch (error) {
    console.log("Error: ", error.message);
    return "";
  }
}

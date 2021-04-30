export async function getCurrentCity(): Promise<string> {
  const url = "https://get.geojs.io/v1/ip/geo.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`An error has occured: ${response.status}`);
    }
    const data = await response.json();
    return data.city;
  } catch (error) {
    console.log("Error: ", error.message);
    throw error;
  }
}

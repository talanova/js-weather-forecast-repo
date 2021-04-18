export function readList() {
  const json = localStorage.getItem("cities");
  if (json == null) {
    return [];
  }
  return JSON.parse(json);
}

export function saveList(list) {
  while (list.length > 10) {
    list.shift();
  }
  localStorage.setItem("cities", JSON.stringify(list));
}

const KEY = "cities";

export function readList(): string[] {
  const json = localStorage.getItem(KEY);
  if (json == null) {
    return [];
  }
  return JSON.parse(json);
}

export function saveList(list: string[]): void {
  while (list.length > 10) {
    list.shift();
  }
  localStorage.setItem(KEY, JSON.stringify(list));
}

// Set data ke localStorage
export function setLocalStorage(key: string, value: unknown) {
  try {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
  } catch (error) {
    // hit logger
  }
}

// Get data dari localStorage
export function getLocalStorage(key: string) {
  try {
    const jsonValue = localStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (error) {
    // hit logger
    return null;
  }
}

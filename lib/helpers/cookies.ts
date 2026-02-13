export function setCookie(name: string, value: string, days: number = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  // Encode value to handle special characters
  const encodedValue = encodeURIComponent(value);
  document.cookie = `${name}=${encodedValue}; expires=${expires}; path=/; SameSite=Lax`;
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}
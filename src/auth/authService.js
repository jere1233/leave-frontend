export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

export function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}

export function setTokens({ access, refresh }) {
  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);
}

export function removeTokens() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

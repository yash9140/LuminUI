export function getToken() {
  return localStorage.getItem('token')
}

export function setToken(token) {
  localStorage.setItem('token', token)
}

export function logout() {
  localStorage.removeItem('token')
  window.location.href = '/'
}

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'



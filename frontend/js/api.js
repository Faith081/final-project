const BASE_URL = 'http://localhost:9000/api'

const api = {
  getToken() {
    return localStorage.getItem('token')
  },

  getUser() {
    const u = localStorage.getItem('user')
    return u ? JSON.parse(u) : null
  },

  setAuth(token, user) {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  },

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login.html'
  },

  requireAuth() {
    if (!this.getToken()) {
      window.location.href = '/login.html'
      return false
    }
    return true
  },

  requireAdmin() {
    const user = this.getUser()
    if (!this.getToken() || !user || user.role !== 'admin') {
      window.location.href = '/admin-login.html'
      return false
    }
    return true
  },

  async fetch(endpoint, options = {}) {
    const token = this.getToken()
    const headers = { 'Content-Type': 'application/json', ...options.headers }
    if (token) headers['Authorization'] = `Bearer ${token}`

    const res = await fetch(BASE_URL + endpoint, { ...options, headers })
    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || data.error || 'Something went wrong')
    }
    return data
  },

  async upload(endpoint, formData) {
    const token = this.getToken()
    const headers = {}
    if (token) headers['Authorization'] = `Bearer ${token}`

    const res = await fetch(BASE_URL + endpoint, {
      method: 'POST',
      headers,
      body: formData
    })
    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || data.error || 'Upload failed')
    }
    return data
  }
}

function showAlert(el, message, type = 'error') {
  el.className = `alert alert-${type} show`
  el.textContent = message
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
}

function hideAlert(el) {
  el.className = 'alert'
}

function setLoading(btn, loading, text = 'Loading...') {
  btn.disabled = loading
  btn._original = btn._original || btn.textContent
  btn.textContent = loading ? text : btn._original
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-NG', {
    year: 'numeric', month: 'short', day: 'numeric'
  })
}

function formatCurrency(amount) {
  return '₦' + Number(amount).toLocaleString('en-NG')
}

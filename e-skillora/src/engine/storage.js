// ─────────────────────────────────────────────────────────
// STORAGE — persistent key-value store (uses window.storage
// when available, falls back to localStorage for local dev)
// ─────────────────────────────────────────────────────────

const useNativeStorage = () => typeof window !== 'undefined' && window.storage

export const DB = {
  async get(key) {
    try {
      if (useNativeStorage()) {
        const r = await window.storage.get(key)
        return r ? JSON.parse(r.value) : null
      }
      const val = localStorage.getItem(key)
      return val ? JSON.parse(val) : null
    } catch {
      return null
    }
  },

  async set(key, val) {
    try {
      const serialized = JSON.stringify(val)
      if (useNativeStorage()) {
        await window.storage.set(key, serialized)
      } else {
        localStorage.setItem(key, serialized)
      }
    } catch (e) {
      console.warn('Storage write failed:', e)
    }
  },

  async delete(key) {
    try {
      if (useNativeStorage()) {
        await window.storage.delete(key)
      } else {
        localStorage.removeItem(key)
      }
    } catch {}
  },

  async list(prefix) {
    try {
      if (useNativeStorage()) {
        const r = await window.storage.list(prefix)
        return r?.keys || []
      }
      // localStorage fallback
      return Object.keys(localStorage).filter(k => k.startsWith(prefix))
    } catch {
      return []
    }
  }
}

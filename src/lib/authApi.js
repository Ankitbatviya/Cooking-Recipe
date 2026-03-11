// lib/authApi.js  –  all auth calls to your Express backend

const BASE = "http://localhost:5000";

// In-memory token store (never localStorage for security)
let _accessToken = null;

export const tokenStore = {
  get: () => _accessToken,
  set: (t) => { _accessToken = t; },
  clear: () => { _accessToken = null; },
};

/* ── Core fetch wrapper ───────────────────────────────── */
async function apiFetch(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };

  const token = tokenStore.get();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers,
    credentials: "include", // sends httpOnly refresh cookie
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // Token expired → try silent refresh once
    if (res.status === 401 && data.code === "TOKEN_EXPIRED") {
      const refreshed = await silentRefresh();
      if (refreshed) {
        headers["Authorization"] = `Bearer ${tokenStore.get()}`;
        const retry = await fetch(`${BASE}${path}`, { ...options, headers, credentials: "include" });
        return retry.json();
      }
    }
    throw new Error(data.error || `Request failed (${res.status})`);
  }

  return data;
}

/* ── Silent refresh ───────────────────────────────────── */
async function silentRefresh() {
  try {
    const data = await fetch(`${BASE}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    }).then((r) => r.json());

    if (data.accessToken) {
      tokenStore.set(data.accessToken);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

/* ── Auth API calls ───────────────────────────────────── */
export async function register({ name, email, password }) {
  const data = await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  if (data.accessToken) tokenStore.set(data.accessToken);
  return data;
}

export async function login({ email, password }) {
  const data = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (data.accessToken) tokenStore.set(data.accessToken);
  return data;
}

export async function logout() {
  try {
    await apiFetch("/auth/logout", { method: "POST" });
  } finally {
    tokenStore.clear();
  }
}

export async function getMe() {
  return apiFetch("/auth/me");
}

export { silentRefresh };
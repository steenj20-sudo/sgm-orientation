// /api/google-token.js
// Handles Google OAuth token exchange (authorization code -> tokens)
// and token refresh (refresh_token -> new access_token).
// Client secret never leaves the server.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { type, code, refresh_token, redirect_uri } = req.body || {};
  const client_id = process.env.VITE_GOOGLE_CLIENT_ID;
  const client_secret = process.env.GOOGLE_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    return res.status(500).json({ error: "Server not configured — missing client credentials." });
  }

  let params;

  if (type === "exchange") {
    if (!code) return res.status(400).json({ error: "Missing authorization code." });
    params = new URLSearchParams({
      code,
      client_id,
      client_secret,
      redirect_uri: redirect_uri || "",
      grant_type: "authorization_code",
    });
  } else if (type === "refresh") {
    if (!refresh_token) return res.status(400).json({ error: "Missing refresh token." });
    params = new URLSearchParams({
      refresh_token,
      client_id,
      client_secret,
      grant_type: "refresh_token",
    });
  } else {
    return res.status(400).json({ error: "Invalid request type." });
  }

  try {
    const googleRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    const data = await googleRes.json();
    if (!googleRes.ok) {
      return res.status(googleRes.status).json(data);
    }
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: "Token exchange with Google failed." });
  }

}

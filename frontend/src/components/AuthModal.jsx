import { useState } from "react";
import "./AuthModal.css";

export default function AuthModal({ onClose, onAuth, initialTab = "login" }) {
  const [tab, setTab] = useState(initialTab);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }
    if (tab === "signup") {
      if (!form.name) { setError("Name is required."); return; }
      if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
      if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    }
    onAuth({ name: form.name || form.email.split("@")[0], email: form.email });
    onClose();
  }

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${tab === "login" ? "active" : ""}`}
            onClick={() => { setTab("login"); setError(""); }}
          >
            Log In
          </button>
          <button
            className={`auth-tab ${tab === "signup" ? "active" : ""}`}
            onClick={() => { setTab("signup"); setError(""); }}
          >
            Sign Up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {tab === "signup" && (
            <input
              className="auth-input"
              type="text"
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
            />
          )}
          <input
            className="auth-input"
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />
          <input
            className="auth-input"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete={tab === "login" ? "current-password" : "new-password"}
          />
          {tab === "signup" && (
            <input
              className="auth-input"
              type="password"
              name="confirm"
              placeholder="Confirm password"
              value={form.confirm}
              onChange={handleChange}
              autoComplete="new-password"
            />
          )}

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-submit" type="submit">
            {tab === "login" ? "Log In" : "Create Account"}
          </button>
        </form>

        <p className="auth-switch">
          {tab === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            className="auth-switch-btn"
            onClick={() => { setTab(tab === "login" ? "signup" : "login"); setError(""); }}
          >
            {tab === "login" ? "Sign Up" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
}

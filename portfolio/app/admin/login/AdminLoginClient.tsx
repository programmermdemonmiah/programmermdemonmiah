"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, User, ArrowLeft, AlertCircle, Eye, EyeOff, Sparkles } from "lucide-react";

export default function AdminLoginClient() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (res?.error) {
        setError("Invalid username or password. Check your credentials stored in app/data/adminAuth.json");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Authentication failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setUsername("admin");
    setPassword("AdminPassword2026!");
    setError(null);
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-glow-bg" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="admin-login-card"
      >
        {/* Back Link */}
        <Link href="/" className="admin-back-link">
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Back to Portfolio</span>
        </Link>

        {/* Brand & Security Header */}
        <div className="admin-login-header">
          <div className="admin-shield-icon-box">
            <ShieldCheck size={28} className="shield-icon" aria-hidden="true" />
          </div>
          <h1 className="admin-login-title">Portfolio Admin Console</h1>
          <p className="admin-login-subtitle">
            Authenticated via Auth.js with credentials stored in{" "}
            <code>app/data/adminAuth.json</code>
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="admin-alert-error" role="alert">
            <AlertCircle size={16} className="alert-icon" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-form-group">
            <label htmlFor="username">Username or Email</label>
            <div className="admin-input-wrapper">
              <User size={16} className="input-icon" aria-hidden="true" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin or admin@emonmiah.com"
                required
                autoComplete="username"
                className="admin-input"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">Admin Password</label>
            <div className="admin-input-wrapper">
              <Lock size={16} className="input-icon" aria-hidden="true" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                autoComplete="current-password"
                className="admin-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-btn"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="admin-submit-btn"
          >
            {loading ? (
              <span className="btn-loading-spinner" />
            ) : (
              <span>Sign In to Admin Portal</span>
            )}
          </button>
        </form>

        {/* Quick Fill & Credentials Store Notice */}
        {/* <div className="admin-login-helper-box">
          <div className="helper-header">
            <Sparkles size={14} className="sparkle-icon" aria-hidden="true" />
            <span>Local Admin Account (Configured in data folder)</span>
          </div>
          <p className="helper-text">
            Default credentials are initialized in <code>app/data/adminAuth.json</code>. You can change your password at any time inside the Admin Console.
          </p>
          <button
            type="button"
            onClick={handleQuickFill}
            className="quick-fill-btn"
          >
            Auto-Fill: <strong>admin / AdminPassword2026!</strong>
          </button>
        </div> */}
      </motion.div>
    </div>
  );
}

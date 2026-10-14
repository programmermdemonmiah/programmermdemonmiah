"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  RefreshCw,
  Layers,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  LogOut,
  KeyRound,
  FileCode,
  HardDrive,
} from "lucide-react";
import type { VerifiedProject } from "@/app/data/projectRegistry";

interface AdminUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  role?: unknown;
}

interface AdminDashboardClientProps {
  initialProjects: VerifiedProject[];
  user: AdminUser;
}

const CATEGORIES = [
  "All",
  "Mobile App",
  "Enterprise SaaS",
  "E-Commerce",
  "Full Stack Web",
  "Healthcare",
] as const;

interface ProjectFormData {
  id: string;
  name: string;
  tagline: string;
  category: VerifiedProject["category"];
  status: VerifiedProject["status"];
  statusType: VerifiedProject["statusType"];
  description: string;
  architecture: string;
  stack: string;
  role: string;
  liveUrl: string;
  secondaryUrlLabel: string;
  secondaryUrlValue: string;
  githubUrl: string;
  packageId: string;
  bundleId: string;
  highlights: string;
  metrics: Array<{ label: string; value: string }>;
  screenshots: string;
}

const defaultFormData: ProjectFormData = {
  id: "",
  name: "",
  tagline: "",
  category: "Full Stack Web",
  status: "Live Production",
  statusType: "production",
  description: "",
  architecture: "",
  stack: "Next.js, TypeScript, Tailwind CSS, PostgreSQL",
  role: "Lead Full Stack Software Engineer",
  liveUrl: "",
  secondaryUrlLabel: "",
  secondaryUrlValue: "",
  githubUrl: "",
  packageId: "",
  bundleId: "",
  highlights: "Engineered high-performance cloud architecture with sub-second response times\nImplemented secure authentication and state-managed workflows\nDeployed on high-availability production infrastructure",
  metrics: [
    { label: "Deployment", value: "Live Production" },
    { label: "Architecture", value: "Verified Microservices" },
    { label: "Status", value: "Active Online" },
  ],
  screenshots: "",
};

export default function AdminDashboardClient({
  initialProjects,
  user,
}: AdminDashboardClientProps) {
  const [projects, setProjects] = useState<VerifiedProject[]>(initialProjects);
  const [activeTab, setActiveTab] = useState<"projects" | "security">("projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Form modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>(defaultFormData);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fetchingStore, setFetchingStore] = useState(false);

  // Syncing state
  const [syncing, setSyncing] = useState(false);
  const [syncNotification, setSyncNotification] = useState<string | null>(null);

  // Password change state
  const [newPassword, setNewPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Filtering
  const filteredProjects = projects.filter((p) => {
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.stack.some((s) => s.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  // Open Add modal
  const handleOpenAdd = () => {
    setFormData(defaultFormData);
    setIsEditing(false);
    setFormError(null);
    setIsFormOpen(true);
  };

  // Open Edit modal
  const handleOpenEdit = (p: VerifiedProject) => {
    setFormData({
      id: p.id,
      name: p.name,
      tagline: p.tagline || "",
      category: p.category,
      status: p.status,
      statusType: p.statusType || "production",
      description: p.description,
      architecture: p.architecture || "",
      stack: p.stack.join(", "),
      role: p.role || "",
      liveUrl: p.liveUrl || "",
      secondaryUrlLabel: p.secondaryUrl?.label || "",
      secondaryUrlValue: p.secondaryUrl?.url || "",
      githubUrl: p.githubUrl || "",
      packageId: p.packageId || "",
      bundleId: p.bundleId || "",
      highlights: p.highlights.join("\n"),
      metrics: p.metrics.length > 0 ? p.metrics : defaultFormData.metrics,
      screenshots: p.screenshots.join("\n"),
    });
    setIsEditing(true);
    setFormError(null);
    setIsFormOpen(true);
  };

  // Auto-generate ID from Name
  const handleNameChange = (name: string) => {
    if (!isEditing) {
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setFormData((prev) => ({ ...prev, name, id: slug }));
    } else {
      setFormData((prev) => ({ ...prev, name }));
    }
  };

  // Auto-fetch Google Play Store Details
  const handleFetchPlayStore = async () => {
    if (!formData.packageId) {
      setFormError("Enter a Google Play Package ID first (e.g. com.example.app)");
      return;
    }
    setFetchingStore(true);
    setFormError(null);

    try {
      const res = await fetch(`/api/admin/fetch-store-data?packageId=${encodeURIComponent(formData.packageId)}`);
      const data = await res.json();
      if (data.success && data.details?.verified) {
        const d = data.details;
        setFormData((prev) => ({
          ...prev,
          name: prev.name || d.title,
          category: "Mobile App",
          status: "Live Application",
          liveUrl: prev.liveUrl || d.storeUrl,
          screenshots: d.screenshotUrls.length > 0 ? d.screenshotUrls.join("\n") : prev.screenshots,
        }));
        setSyncNotification(`Successfully fetched ${d.screenshotUrls.length} verified Play Store screenshots!`);
        setTimeout(() => setSyncNotification(null), 5000);
      } else {
        setFormError(data.details?.error || "Could not find package on Google Play Store.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to fetch store details";
      setFormError(message);
    } finally {
      setFetchingStore(false);
    }
  };

  // Save Project
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError(null);

    const payload = {
      id: formData.id,
      name: formData.name,
      tagline: formData.tagline,
      category: formData.category,
      status: formData.status,
      statusType: formData.statusType,
      description: formData.description,
      architecture: formData.architecture,
      stack: formData.stack.split(",").map((s) => s.trim()).filter(Boolean),
      role: formData.role,
      liveUrl: formData.liveUrl || undefined,
      secondaryUrl:
        formData.secondaryUrlLabel && formData.secondaryUrlValue
          ? { label: formData.secondaryUrlLabel, url: formData.secondaryUrlValue }
          : undefined,
      githubUrl: formData.githubUrl || undefined,
      packageId: formData.packageId || undefined,
      bundleId: formData.bundleId || undefined,
      highlights: formData.highlights.split("\n").map((h) => h.trim()).filter(Boolean),
      metrics: formData.metrics.filter((m) => m.label.trim() && m.value.trim()),
      screenshots: formData.screenshots.split("\n").map((s) => s.trim()).filter(Boolean),
    };

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save project");
      }

      // Update local state
      const savedProject = data.project as VerifiedProject;
      setProjects((prev) => {
        const idx = prev.findIndex((p) => p.id === savedProject.id);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = savedProject;
          return updated;
        }
        return [savedProject, ...prev];
      });

      setIsFormOpen(false);
      setSyncNotification(`Project "${savedProject.name}" stored to app/data successfully!`);
      setTimeout(() => setSyncNotification(null), 5000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error saving project";
      setFormError(message);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Delete Project
  const handleDeleteProject = async (projectId: string, projectName: string) => {
    if (!confirm(`Are you sure you want to delete "${projectName}" from the portfolio registry?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/projects?id=${encodeURIComponent(projectId)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete project");
      }

      setProjects((prev) => prev.filter((p) => p.id !== projectId));
      setSyncNotification(`Project "${projectName}" removed from app/data.`);
      setTimeout(() => setSyncNotification(null), 4000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Delete failed";
      alert(message);
    }
  };

  // Trigger background sync
  const handleTriggerSync = async () => {
    setSyncing(true);
    setSyncNotification(null);
    try {
      const res = await fetch("/api/sync-projects", { method: "POST" });
      const data = await res.json();
      setSyncNotification(data.message || "Automated sync pipeline triggered in background!");
      setTimeout(() => setSyncNotification(null), 6000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Sync trigger failed";
      setSyncNotification(`Sync Error: ${message}`);
    } finally {
      setSyncing(false);
    }
  };

  // Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);
    setPasswordLoading(true);

    try {
      const res = await fetch("/api/admin/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "admin",
          newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Password update failed");
      }

      setPasswordStatus({
        type: "success",
        msg: "Admin password successfully updated in app/data/adminAuth.json!",
      });
      setNewPassword("");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error updating password";
      setPasswordStatus({ type: "error", msg: message });
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="admin-portal-container">
      {/* Top Notification Toast */}
      <AnimatePresence>
        {syncNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="admin-toast-banner"
          >
            <CheckCircle2 size={16} className="toast-icon" />
            <span>{syncNotification}</span>
            <button
              type="button"
              onClick={() => setSyncNotification(null)}
              className="toast-close-btn"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Header */}
      <header className="admin-portal-header">
        <div className="admin-header-brand">
          <div className="admin-brand-icon">
            <ShieldCheck size={22} className="shield-icon" />
          </div>
          <div>
            <h1 className="admin-brand-title">Portfolio Admin Console</h1>
            <p className="admin-brand-subtitle">
              Verified Production Database &bull; Stored via <code>projectDiscovery.mjs</code> in <code>app/data</code>
            </p>
          </div>
        </div>

        <div className="admin-header-actions">
          <Link href="/" target="_blank" className="admin-view-site-btn">
            <span>View Live Site</span>
            <ExternalLink size={14} />
          </Link>

          <div className="admin-user-badge">
            <span className="user-dot" />
            <span>{user.name || "Admin"}</span>
          </div>

          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="admin-logout-btn"
            title="Sign out of admin session"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Admin Nav Tabs */}
      <div className="admin-tabs-row">
        <button
          type="button"
          onClick={() => setActiveTab("projects")}
          className={`admin-tab-btn ${activeTab === "projects" ? "active" : ""}`}
        >
          <Layers size={16} />
          <span>Projects Directory ({projects.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("security")}
          className={`admin-tab-btn ${activeTab === "security" ? "active" : ""}`}
        >
          <KeyRound size={16} />
          <span>Auth.js & Credentials Store</span>
        </button>
      </div>

      {activeTab === "projects" && (
        <div className="admin-main-content">
          {/* Quick Metrics Bar */}
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <span className="stat-label">Total Projects</span>
              <span className="stat-value">{projects.length}</span>
              <span className="stat-hint">Active in app/data registry</span>
            </div>
            <div className="admin-stat-card">
              <span className="stat-label">Live Systems</span>
              <span className="stat-value">
                {projects.filter((p) => p.verifiedLive).length}
              </span>
              <span className="stat-hint">Verified production endpoints</span>
            </div>
            <div className="admin-stat-card">
              <span className="stat-label">Mobile Apps</span>
              <span className="stat-value">
                {projects.filter((p) => p.category === "Mobile App").length}
              </span>
              <span className="stat-hint">Google Play / iOS apps</span>
            </div>
            <div className="admin-stat-card">
              <span className="stat-label">Stored File</span>
              <span className="stat-value code-snippet">discoveredProjects.json</span>
              <span className="stat-hint">Auto-synced to projectRegistry.ts</span>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="admin-toolbar">
            <div className="admin-search-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by name, category, or stack..."
                className="admin-search-input"
              />
            </div>

            <div className="admin-category-pills">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`admin-cat-pill ${selectedCategory === cat ? "active" : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="admin-toolbar-actions">
              <button
                type="button"
                onClick={handleTriggerSync}
                disabled={syncing}
                className="admin-sync-btn"
                title="Run background scanner script"
              >
                <RefreshCw size={15} className={syncing ? "spin-icon" : ""} />
                <span>{syncing ? "Syncing..." : "Run Background Sync"}</span>
              </button>

              <button
                type="button"
                onClick={handleOpenAdd}
                className="admin-add-project-btn"
              >
                <Plus size={16} />
                <span>Add New Project</span>
              </button>
            </div>
          </div>

          {/* Projects Table / Cards List */}
          <div className="admin-projects-grid">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                className="admin-project-item-card"
              >
                <div className="item-card-media">
                  <Image
                    src={project.image || (project.screenshots && project.screenshots[0]) || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"}
                    alt={project.name}
                    width={400}
                    height={220}
                    className="item-media-img"
                    unoptimized={project.image?.startsWith("http")}
                  />
                  <span className="item-category-tag">{project.category}</span>
                  <span className="item-screenshot-badge">
                    {project.screenshots?.length || 1} screens
                  </span>
                </div>

                <div className="item-card-body">
                  <div className="item-title-row">
                    <h3 className="item-project-name">{project.name}</h3>
                    <span className="item-status-pill">
                      <span className="status-live-dot" />
                      {project.status}
                    </span>
                  </div>

                  <p className="item-tagline">{project.tagline}</p>
                  <p className="item-desc">{project.description}</p>

                  <div className="item-stack-row">
                    {project.stack.slice(0, 5).map((tech) => (
                      <span key={tech} className="item-tech-chip">
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 5 && (
                      <span className="item-tech-chip more">
                        +{project.stack.length - 5}
                      </span>
                    )}
                  </div>

                  <div className="item-card-footer">
                    <div className="item-links">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="item-link-btn"
                        >
                          <span>Live System</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>

                    <div className="item-action-buttons">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(project)}
                        className="item-edit-btn"
                        title="Edit project"
                      >
                        <Edit2 size={14} />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteProject(project.id, project.name)}
                        className="item-delete-btn"
                        title="Delete project"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "security" && (
        <div className="admin-security-content">
          <div className="security-card">
            <div className="security-header">
              <div className="security-icon-box">
                <HardDrive size={24} className="shield-icon" />
              </div>
              <div>
                <h2>Data Folder & Authentication Storage</h2>
                <p>
                  Authentication credentials and project data are securely persisted in the <code>app/data/</code> folder.
                </p>
              </div>
            </div>

            <div className="data-storage-matrix">
              <div className="matrix-item">
                <FileCode size={18} className="matrix-icon" />
                <div>
                  <strong>app/data/discoveredProjects.json</strong>
                  <p>Primary JSON project database managed by <code>lib/projectDiscovery.mjs</code>.</p>
                </div>
              </div>

              <div className="matrix-item">
                <FileCode size={18} className="matrix-icon" />
                <div>
                  <strong>app/data/projectRegistry.ts</strong>
                  <p>Type-safe compiled TypeScript registry automatically regenerated on every project save.</p>
                </div>
              </div>

              <div className="matrix-item">
                <KeyRound size={18} className="matrix-icon" />
                <div>
                  <strong>app/data/adminAuth.json</strong>
                  <p>Admin credentials store with salted password hashes (PBKDF2/Scrypt).</p>
                </div>
              </div>
            </div>

            {/* Change Password Form */}
            <form onSubmit={handleChangePassword} className="change-password-form">
              <h3>Change Administrator Password</h3>
              <p className="form-subtext">
                Update the password for username <code>admin</code> in <code>app/data/adminAuth.json</code>.
              </p>

              {passwordStatus && (
                <div
                  className={`admin-alert-${passwordStatus.type === "success" ? "success" : "error"}`}
                >
                  {passwordStatus.type === "success" ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <AlertCircle size={16} />
                  )}
                  <span>{passwordStatus.msg}</span>
                </div>
              )}

              <div className="admin-form-group">
                <label htmlFor="newPassword">New Admin Password</label>
                <div className="admin-input-wrapper">
                  <KeyRound size={16} className="input-icon" />
                  <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter at least 6 characters"
                    required
                    minLength={6}
                    className="admin-input"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={passwordLoading || !newPassword}
                className="admin-submit-btn w-auto"
              >
                {passwordLoading ? (
                  <span className="btn-loading-spinner" />
                ) : (
                  <span>Update Password in data folder</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Project Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="admin-modal-backdrop" onClick={() => setIsFormOpen(false)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="admin-project-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <h2 className="modal-title">
                    {isEditing ? `Edit Project: ${formData.name}` : "Add New Verified Project"}
                  </h2>
                  <p className="modal-subtitle">
                    Project will be stored via <code>lib/projectDiscovery.mjs</code> into <code>app/data/discoveredProjects.json</code> and compiled into <code>projectRegistry.ts</code>.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="modal-close-btn"
                >
                  <X size={18} />
                </button>
              </div>

              {formError && (
                <div className="admin-alert-error m-4 mb-0">
                  <AlertCircle size={16} />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleSaveProject} className="modal-form-body">
                <div className="form-grid-2">
                  <div className="admin-form-group">
                    <label>Project Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="e.g. Swish Live Streaming Platform"
                      required
                      className="admin-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Project Slug / ID (data key) *</label>
                    <input
                      type="text"
                      value={formData.id}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      placeholder="e.g. swish-live-streaming"
                      required
                      className="admin-input"
                    />
                  </div>
                </div>

                <div className="form-grid-3">
                  <div className="admin-form-group">
                    <label>Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as ProjectFormData["category"],
                        })
                      }
                      className="admin-input admin-select"
                    >
                      <option value="Mobile App">Mobile App</option>
                      <option value="Enterprise SaaS">Enterprise SaaS</option>
                      <option value="E-Commerce">E-Commerce</option>
                      <option value="Full Stack Web">Full Stack Web</option>
                      <option value="Healthcare">Healthcare</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label>Status Badge *</label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as ProjectFormData["status"],
                        })
                      }
                      className="admin-input admin-select"
                    >
                      <option value="Live Production">Live Production</option>
                      <option value="Live Application">Live Application</option>
                      <option value="Live Web System">Live Web System</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label>Your Role *</label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g. Full Stack Engineer (Flutter + Go)"
                      required
                      className="admin-input"
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Tagline / Punchline</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="Brief 1-line summary of what makes this project special"
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Full Description *</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Detailed explanation of the project, features, business domain, and technical complexity..."
                    required
                    className="admin-input admin-textarea"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Architecture & Infrastructure Details</label>
                  <textarea
                    rows={2}
                    value={formData.architecture}
                    onChange={(e) => setFormData({ ...formData, architecture: e.target.value })}
                    placeholder="Details about microservices, Docker proxy, goroutines, websockets, databases, etc."
                    className="admin-input admin-textarea"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Tech Stack (comma separated) *</label>
                  <input
                    type="text"
                    value={formData.stack}
                    onChange={(e) => setFormData({ ...formData, stack: e.target.value })}
                    placeholder="Flutter, Go (Gin), WebSockets, Next.js, Docker, PostgreSQL"
                    required
                    className="admin-input"
                  />
                </div>

                <div className="form-grid-2">
                  <div className="admin-form-group">
                    <label>Live URL (Production Website or Store Link)</label>
                    <input
                      type="url"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                      placeholder="https://example.com or Play Store link"
                      className="admin-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>GitHub Repository URL (Optional)</label>
                    <input
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      placeholder="https://github.com/programmermdemonmiah/..."
                      className="admin-input"
                    />
                  </div>
                </div>

                {/* Mobile Store Resolver Section */}
                <div className="store-resolver-box">
                  <div className="resolver-header">
                    <Smartphone size={16} />
                    <span>Mobile Store Auto-Resolver</span>
                  </div>
                  <div className="form-grid-2">
                    <div className="admin-form-group">
                      <label>Google Play Package ID</label>
                      <div className="admin-input-btn-group">
                        <input
                          type="text"
                          value={formData.packageId}
                          onChange={(e) => setFormData({ ...formData, packageId: e.target.value })}
                          placeholder="e.g. com.swish.app"
                          className="admin-input"
                        />
                        <button
                          type="button"
                          onClick={handleFetchPlayStore}
                          disabled={fetchingStore || !formData.packageId}
                          className="btn-fetch-store"
                        >
                          {fetchingStore ? "Fetching..." : "Fetch Play Store"}
                        </button>
                      </div>
                    </div>

                    <div className="admin-form-group">
                      <label>Apple App Store Bundle ID</label>
                      <input
                        type="text"
                        value={formData.bundleId}
                        onChange={(e) => setFormData({ ...formData, bundleId: e.target.value })}
                        placeholder="e.g. com.swish.ios"
                        className="admin-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Highlights & Key Features (one per line)</label>
                  <textarea
                    rows={3}
                    value={formData.highlights}
                    onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                    placeholder="Real-time WebSocket audio/video broadcasting\nInteractive virtual gifting engine\nGoroutine dispatchers handling high concurrency"
                    className="admin-input admin-textarea"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Screenshots URLs (one per line)</label>
                  <textarea
                    rows={3}
                    value={formData.screenshots}
                    onChange={(e) => setFormData({ ...formData, screenshots: e.target.value })}
                    placeholder="https://play-lh.googleusercontent.com/... or /screenshots/my-project-desktop.png"
                    className="admin-input admin-textarea"
                  />
                  <span className="field-hint">
                    Leave blank when providing a live website or Google Play package ID to auto-capture/fetch authentic store screenshots!
                  </span>
                </div>

                <div className="modal-form-actions">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="btn-cancel"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="admin-submit-btn w-auto"
                  >
                    {formSubmitting ? (
                      <span className="btn-loading-spinner" />
                    ) : (
                      <span>{isEditing ? "Save Changes to data folder" : "Store Project via projectDiscovery.mjs"}</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

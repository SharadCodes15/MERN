import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const initialFormState = {
  name: "",
  description: "",
};

export default function CreateFood() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState(initialFormState);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveVideo = () => {
    setVideoFile(null);
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
      setVideoPreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) {
      alert("Please upload a video of the dish preparation or plating.");
      return;
    }

    setIsSubmitting(true);

    // Multi-part form payload for file upload
    const data = new FormData();
    data.append("name", formData.name.trim());
    data.append("description", formData.description.trim());
    data.append("video", videoFile);

    try {
      const partner = await axios.post("http://localhost:3000/api/food", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`http://localhost:3000/api/foodpartner/${partner.foodpartner}`);
    } catch (err) {
      console.error("Failed to add food item:", err);
    } finally {
      setIsSubmitting(false);
      setFormData(initialFormState);
      handleRemoveVideo();
    }
  };

  return (
    <div className="relative flex h-[100dvh] flex-col overflow-hidden font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-neutral-100 dark:selection:text-black">
      {/* Background Architectural Grid Pattern */}
      <div className="architectural-pattern absolute inset-0 pointer-events-none" />

      {/* Top Bar */}
      <header className="relative z-10 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--partner-primary)]" />
            <span className="font-serif text-lg font-medium tracking-tight text-[var(--text-main)]">
              Kitchen Atelier
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--bg-muted)] text-[var(--partner-primary)] border border-[var(--border-subtle)] ml-2">
              MENU DESK
            </span>
          </div>

          <Link
            to="/"
            className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
          >
            Exit to Home
          </Link>
        </div>
      </header>

      {/* Form Container */}
      <main className="relative z-10 flex min-h-0 w-full max-w-2xl flex-1 items-start overflow-y-auto mx-auto p-3 sm:p-5">
        <div className="auth-surface w-full overflow-hidden rounded-2xl border p-4 sm:p-6 animate-fade-up">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-main)]">
              Publish New Dish
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Add dish details along with a short process or plating video.
            </p>
          </div>

          <form className="space-y-3" onSubmit={handleSubmit}>
            {/* Dish Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
                Dish Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. 72-Hour Fermented Woodfired Sourdough"
                className="auth-input partner-input w-full px-3.5 py-2.5 rounded-lg text-sm"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
                Description & Sourcing Notes
              </label>
              <textarea
                name="description"
                rows={2}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe key ingredients, allergen profile, flavor characteristics, or preparation methods..."
                className="auth-input partner-input w-full px-3.5 py-2.5 rounded-lg text-sm resize-none"
                required
              />
            </div>

            {/* Video File Upload & Live Preview */}
            <div className="space-y-2">
              <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
                Plating / Kitchen Reel (Video)
              </label>

              {!videoPreview ? (
                <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--border-subtle)] p-4 cursor-pointer hover:bg-[var(--bg-canvas)] transition-colors">
                  <div className="flex flex-col items-center justify-center text-center">
                    <svg
                      className="w-8 h-8 mb-2 text-[var(--text-subtle)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-xs font-medium text-[var(--text-main)]">
                      Click to upload kitchen clip
                    </p>
                    <p className="text-[11px] text-[var(--text-subtle)] mt-0.5">
                      MP4, WebM or MOV (max recommended size 50MB)
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative rounded-xl border border-[var(--border-subtle)] overflow-hidden bg-black/5">
                  <video
                    src={videoPreview}
                    controls
                    className="w-full max-h-36 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveVideo}
                    className="absolute top-3 right-3 text-xs bg-black/70 hover:bg-black text-white px-2.5 py-1 rounded-md transition-colors"
                  >
                    Change Video
                  </button>
                </div>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-partner w-full py-2.5 px-4 rounded-lg font-medium text-sm disabled:opacity-60"
              >
                {isSubmitting ? "Uploading & Publishing..." : "Publish Dish to Menu"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
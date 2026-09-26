import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const initialFormState = {
  name: "",
  description: "",
  category: "",
  price: "",
  prepTime: "",
  servings: "1",
};

const categories = [
  "Main Course",
  "Starter",
  "Burger",
  "Pizza",
  "Biryani",
  "Dessert",
  "Beverage",
  "Street Food",
  "Other",
];

const dietaryOptions = [
  "Vegetarian",
  "Vegan",
  "Eggless",
  "Gluten Free",
  "Spicy",
];

export default function CreateFood() {
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const [formData, setFormData] = useState(initialFormState);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const [selectedDietary, setSelectedDietary] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================================================
     INPUT
  ========================================================= */

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  /* =========================================================
     DIETARY OPTIONS
  ========================================================= */

  const toggleDietary = (item) => {
    setSelectedDietary((prev) =>
      prev.includes(item)
        ? prev.filter((value) => value !== item)
        : [...prev, item]
    );
  };

  /* =========================================================
     VIDEO
  ========================================================= */

  const processVideo = (file) => {
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setError("Please select a valid video file.");
      return;
    }

    const maxSize = 50 * 1024 * 1024;

    if (file.size > maxSize) {
      setError("Video must be smaller than 50MB.");
      return;
    }

    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }

    const preview = URL.createObjectURL(file);

    setVideoFile(file);
    setVideoPreview(preview);
    setError("");
    setUploadProgress(0);
  };

  const handleFileChange = (e) => {
    processVideo(e.target.files?.[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      processVideo(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleRemoveVideo = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }

    setVideoFile(null);
    setVideoPreview(null);
    setUploadProgress(0);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* =========================================================
     CLEANUP
  ========================================================= */

  useEffect(() => {
    return () => {
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }
    };
  }, [videoPreview]);

  /* =========================================================
     RESET
  ========================================================= */

  const resetForm = () => {
    setFormData(initialFormState);
    setSelectedDietary([]);
    handleRemoveVideo();
    setError("");
    setSuccess("");
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.name.trim()) {
      setError("Please enter a dish name.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Please add a description for your dish.");
      return;
    }

    if (!videoFile) {
      setError("Please upload a preparation or plating video.");
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    const data = new FormData();

    /*
      These are the fields your current backend already supports.
    */
    data.append("name", formData.name.trim());
    data.append("description", formData.description.trim());
    data.append("video", videoFile);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/food",
        data,
        {
          withCredentials: true,

          // Don't manually set Content-Type.
          // Axios will automatically add the multipart boundary.
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );

              setUploadProgress(percent);
            }
          },
        }
      );

      console.log("Food created:", response.data);

      setSuccess("Your dish has been published successfully.");

      setTimeout(() => {
        resetForm();
      }, 1200);
    } catch (err) {
      console.error("Failed to add food:", err);

      setError(
        err.response?.data?.message ||
          "Unable to publish the dish. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f3f0] text-[#171717]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f5f3f0]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6">

          <div className="flex items-center gap-4">

            <Link
              to="/"
              className="text-2xl font-black tracking-[-0.07em]"
            >
              CRAVE<span className="text-orange-500">.</span>
            </Link>

            <span className="hidden h-5 w-px bg-black/10 sm:block" />

            <div className="hidden sm:block">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-black/35">
                Partner Portal
              </p>

              <p className="text-xs font-semibold text-black/70">
                Menu Desk
              </p>
            </div>
          </div>

          <Link
            to="/"
            className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold text-black/60 transition hover:border-black/20 hover:text-black"
          >
            <ArrowLeftIcon />
            Exit
          </Link>
        </div>
      </header>

      {/* =====================================================
          PAGE
      ===================================================== */}

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:py-14">

        {/* ===================================================
            PAGE HEADER
        =================================================== */}

        <div className="mb-9 max-w-2xl">

          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-[10px] font-black text-white">
              01
            </span>

            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-black/40">
              Menu creation
            </span>
          </div>

          <h1 className="text-4xl font-black tracking-[-0.05em] sm:text-5xl">
            Publish a dish.
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-black/45">
            Give customers a reason to crave it. Add your dish details and a
            short kitchen or plating video.
          </p>
        </div>

        {/* ===================================================
            PROGRESS
        =================================================== */}

        <div className="mb-8 flex max-w-2xl items-center">

          <ProgressStep
            number="01"
            label="Details"
            active
          />

          <div className="h-px flex-1 bg-black/10" />

          <ProgressStep
            number="02"
            label="Media"
            active={!!videoFile}
          />

          <div className="h-px flex-1 bg-black/10" />

          <ProgressStep
            number="03"
            label="Publish"
          />
        </div>

        {/* ===================================================
            CONTENT GRID
        =================================================== */}

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 lg:grid-cols-[1fr_390px]"
        >

          {/* =================================================
              LEFT — DETAILS
          ================================================= */}

          <section className="rounded-[28px] border border-black/10 bg-white p-5 shadow-[0_15px_50px_rgba(0,0,0,0.05)] sm:p-7">

            <SectionHeader
              icon={<InfoIcon />}
              eyebrow="Dish information"
              title="Tell us about the dish"
              description="Keep it clear, appetising and easy to understand."
            />

            <div className="mt-8 space-y-6">

              {/* Dish name */}
              <Field
                label="Dish name"
                required
                hint={`${formData.name.length}/60`}
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  maxLength={60}
                  placeholder="e.g. Smoky Chicken Biryani"
                  className="input"
                  required
                />
              </Field>

              {/* Description */}
              <Field
                label="Description"
                required
                hint={`${formData.description.length}/300`}
              >
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  maxLength={300}
                  rows={5}
                  placeholder="Describe the flavour, key ingredients and what makes this dish special..."
                  className="input resize-none leading-6"
                  required
                />
              </Field>

              {/* Category */}
              <Field
                label="Category"
                hint="Optional"
              >
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="input appearance-none pr-10"
                  >
                    <option value="">Select a category</option>

                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    ))}
                  </select>

                  <ChevronDownIcon />
                </div>
              </Field>

              {/* Pricing */}
              <div className="grid gap-4 sm:grid-cols-3">

                <Field label="Price" hint="Optional">
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-black/35">
                      ₹
                    </span>

                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="249"
                      min="0"
                      className="input pl-9"
                    />
                  </div>
                </Field>

                <Field label="Prep time" hint="Optional">
                  <div className="relative">
                    <input
                      type="number"
                      name="prepTime"
                      value={formData.prepTime}
                      onChange={handleInputChange}
                      placeholder="20"
                      min="0"
                      className="input pr-14"
                    />

                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase text-black/30">
                      min
                    </span>
                  </div>
                </Field>

                <Field label="Serves" hint="Optional">
                  <input
                    type="number"
                    name="servings"
                    value={formData.servings}
                    onChange={handleInputChange}
                    min="1"
                    max="20"
                    className="input"
                  />
                </Field>

              </div>

              {/* Dietary */}
              <Field
                label="Food tags"
                hint="Optional"
              >
                <div className="flex flex-wrap gap-2">

                  {dietaryOptions.map((item) => {
                    const selected = selectedDietary.includes(item);

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleDietary(item)}
                        className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
                          selected
                            ? "border-black bg-black text-white"
                            : "border-black/10 bg-[#f8f7f5] text-black/50 hover:border-black/25 hover:text-black"
                        }`}
                      >
                        {selected && (
                          <span className="mr-1.5">✓</span>
                        )}

                        {item}
                      </button>
                    );
                  })}

                </div>
              </Field>

            </div>
          </section>

          {/* =================================================
              RIGHT — VIDEO
          ================================================= */}

          <section className="h-fit rounded-[28px] border border-black/10 bg-white p-5 shadow-[0_15px_50px_rgba(0,0,0,0.05)] sm:p-7">

            <SectionHeader
              icon={<VideoIcon />}
              eyebrow="Required media"
              title="Show the craving."
              description="A short preparation or plating video helps customers discover your dish."
            />

            <div className="mt-7">

              {!videoPreview ? (
                <label
                  ref={dropZoneRef}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`group flex min-h-[330px] cursor-pointer flex-col items-center justify-center rounded-[22px] border-2 border-dashed px-6 text-center transition ${
                    dragActive
                      ? "border-orange-500 bg-orange-50"
                      : "border-black/10 bg-[#faf9f7] hover:border-black/25 hover:bg-[#f7f5f2]"
                  }`}
                >

                  <div
                    className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl transition ${
                      dragActive
                        ? "bg-orange-500 text-white"
                        : "bg-black text-white group-hover:scale-105"
                    }`}
                  >
                    <UploadIcon />
                  </div>

                  <h3 className="text-sm font-black">
                    {dragActive
                      ? "Drop your video here"
                      : "Upload your kitchen reel"}
                  </h3>

                  <p className="mt-2 max-w-[230px] text-xs leading-5 text-black/40">
                    Drag and drop your video here, or click to browse files.
                  </p>

                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    <UploadBadge>
                      <FileIcon />
                      MP4
                    </UploadBadge>

                    <UploadBadge>
                      <FileIcon />
                      WebM
                    </UploadBadge>

                    <UploadBadge>
                      <FileIcon />
                      MOV
                    </UploadBadge>
                  </div>

                  <p className="mt-5 text-[10px] font-semibold text-black/25">
                    Maximum recommended size · 50MB
                  </p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <VideoPreview
                  videoFile={videoFile}
                  videoPreview={videoPreview}
                  onRemove={handleRemoveVideo}
                  disabled={isSubmitting}
                />
              )}
            </div>

            {/* Requirements */}
            <div className="mt-6 rounded-2xl bg-[#f8f7f5] p-4">

              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.15em] text-black/40">
                Video checklist
              </p>

              <div className="space-y-2">

                <ChecklistItem
                  done={!!videoFile}
                  text="Dish preparation or plating"
                />

                <ChecklistItem
                  done={!!videoFile}
                  text="Clear and well-lit footage"
                />

                <ChecklistItem
                  done={!!videoFile}
                  text="Under 50MB recommended"
                />

              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-5 flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs text-red-600">
                  !
                </div>

                <p className="text-xs font-semibold leading-5 text-red-700">
                  {error}
                </p>
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="mt-5 flex gap-3 rounded-2xl border border-green-200 bg-green-50 p-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs text-green-600">
                  ✓
                </div>

                <p className="text-xs font-semibold leading-5 text-green-700">
                  {success}
                </p>
              </div>
            )}

            {/* Upload progress */}
            {isSubmitting && (
              <div className="mt-5">

                <div className="mb-2 flex justify-between text-[10px] font-bold">
                  <span className="text-black/40">
                    Uploading video
                  </span>

                  <span className="text-black">
                    {uploadProgress}%
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-black/10">
                  <div
                    className="h-full rounded-full bg-orange-500 transition-all duration-300"
                    style={{
                      width: `${uploadProgress}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 space-y-3">

              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-black py-4 text-sm font-black text-white transition hover:bg-orange-500 hover:shadow-xl hover:shadow-orange-500/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Publishing...
                  </>
                ) : (
                  <>
                    Publish Dish
                    <span className="text-lg transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={resetForm}
                disabled={isSubmitting}
                className="w-full rounded-2xl border border-black/10 py-3.5 text-xs font-bold text-black/50 transition hover:border-black/20 hover:text-black disabled:opacity-50"
              >
                Clear form
              </button>

            </div>

          </section>
        </form>

        {/* ===================================================
            BOTTOM NOTE
        =================================================== */}

        <div className="mt-8 flex flex-col gap-3 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-2 text-[10px] font-medium text-black/35">
            <LockIcon />
            Your partner session is protected.
          </div>

          <p className="text-[10px] text-black/30">
            You can add pricing, categories and other menu metadata as your
            partner tools expand.
          </p>
        </div>
      </div>
    </main>
  );
}

/* =============================================================
   COMPONENTS
============================================================= */

function ProgressStep({ number, label, active = false }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-black ${
          active
            ? "bg-black text-white"
            : "border border-black/10 bg-white text-black/30"
        }`}
      >
        {active ? "✓" : number}
      </span>

      <span
        className={`hidden text-[10px] font-black uppercase tracking-[0.12em] sm:block ${
          active ? "text-black/60" : "text-black/25"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function SectionHeader({
  icon,
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="flex gap-4">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-white">
        {icon}
      </div>

      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.17em] text-black/35">
          {eyebrow}
        </p>

        <h2 className="mt-1 text-lg font-black tracking-tight">
          {title}
        </h2>

        <p className="mt-1 max-w-md text-xs leading-5 text-black/40">
          {description}
        </p>
      </div>

    </div>
  );
}

function Field({ label, required, hint, children }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-[10px] font-black uppercase tracking-[0.15em] text-black/50">
          {label}

          {required && (
            <span className="ml-1 text-orange-500">*</span>
          )}
        </label>

        {hint && (
          <span className="text-[9px] font-semibold text-black/25">
            {hint}
          </span>
        )}
      </div>

      {children}
    </div>
  );
}

function UploadBadge({ children }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-[9px] font-bold text-black/45">
      {children}
    </span>
  );
}

function ChecklistItem({ done, text }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] ${
          done
            ? "bg-green-100 text-green-600"
            : "bg-black/5 text-black/20"
        }`}
      >
        {done ? "✓" : "•"}
      </span>

      <span className="text-[11px] font-medium text-black/50">
        {text}
      </span>
    </div>
  );
}

function VideoPreview({
  videoFile,
  videoPreview,
  onRemove,
  disabled,
}) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-black/10 bg-black">

      <div className="relative">

        <video
          src={videoPreview}
          controls
          playsInline
          className="max-h-[330px] w-full object-contain"
        />

        <button
          type="button"
          onClick={onRemove}
          disabled={disabled}
          className="absolute right-3 top-3 flex items-center gap-2 rounded-full bg-black/80 px-3 py-2 text-[10px] font-bold text-white backdrop-blur transition hover:bg-black disabled:opacity-50"
        >
          <XIcon />
          Change
        </button>

      </div>

      <div className="bg-white p-4">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black text-white">
            <VideoIcon />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-black">
              {videoFile?.name}
            </p>

            <p className="mt-1 text-[9px] text-black/35">
              {formatFileSize(videoFile?.size)}
            </p>
          </div>

          <span className="rounded-full bg-green-50 px-2.5 py-1 text-[9px] font-bold text-green-600">
            Ready
          </span>

        </div>

      </div>
    </div>
  );
}

function formatFileSize(bytes = 0) {
  if (!bytes) return "0 MB";

  const mb = bytes / (1024 * 1024);

  if (mb < 1) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${mb.toFixed(1)} MB`;
}

/* =============================================================
   ICONS
============================================================= */

function ArrowLeftIcon() {
  return (
    <svg
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M19 12H5m7 7-7-7 7-7"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="9" strokeWidth="1.6" />
      <path
        d="M12 11v5m0-8v.1"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <rect
        x="3"
        y="5"
        width="13"
        height="14"
        rx="2"
        strokeWidth="1.6"
      />

      <path
        d="m16 10 5-3v10l-5-3"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg
      width="25"
      height="25"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 16V4m0 0L7 9m5-5 5 5"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg
      width="11"
      height="11"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"
        strokeWidth="1.5"
      />

      <path
        d="M14 2v6h6"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/30"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="m6 9 6 6 6-6"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="m6 6 12 12M18 6 6 18"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2"
        strokeWidth="1.6"
      />

      <path
        d="M8 10V7a4 4 0 0 1 8 0v3"
        strokeWidth="1.6"
      />
    </svg>
  );
}
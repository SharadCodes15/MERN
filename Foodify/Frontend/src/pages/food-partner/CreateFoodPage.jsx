import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  RiArrowRightLine,
  RiCheckLine,
  RiCloseLine,
  RiPlayCircleLine,
  RiVideoUploadLine,
} from "@remixicon/react";

const initialFormState = { name: "", description: "" };

export default function CreateFoodPage() {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState(initialFormState);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setError("Choose a video file to continue.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError("This video is larger than 50 MB. Choose a smaller file.");
      return;
    }

    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
    setError("");
    setSuccess("");
  };

  const handleRemoveVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    return () => {
      if (videoPreview) URL.revokeObjectURL(videoPreview);
    };
  }, [videoPreview]);

  const resetForm = () => {
    setFormData(initialFormState);
    handleRemoveVideo();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      setError("Add a name for your dish.");
      return;
    }
    if (!formData.description.trim()) {
      setError("Add a short description of your dish.");
      return;
    }
    if (!videoFile) {
      setError("Add a video of your dish before publishing.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    const data = new FormData();
    data.append("name", formData.name.trim());
    data.append("description", formData.description.trim());
    data.append("video", videoFile);

    try {
      await axios.post("http://localhost:3000/api/food", data, {
        withCredentials: true,
      });
      resetForm();
      setSuccess("Your dish is live. It is ready to be discovered.");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "We could not publish this dish. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f3ee] text-[#291e17]">
      <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center justify-between border-b border-[#e9e0d7] bg-[#fffdf9]/95 px-5 backdrop-blur sm:px-7 lg:px-10">
        <Link to="/home" className="font-serif text-2xl font-black text-[#211914]">
          crave<span className="text-[#e85d26]">.</span>
        </Link>
        <Link
          to="/home"
          className="inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-xs font-black text-[#75675e] transition hover:bg-[#f8f2ec] hover:text-[#211914]"
        >
          View food feed <RiArrowRightLine size={16} />
        </Link>
      </header>

      <main className="mx-auto max-w-295 px-4 pb-12 pt-24 sm:px-7 lg:px-10">
        <section className="relative isolate mb-8 min-h-57.5 overflow-hidden rounded-[26px] bg-[#2f211a] px-6 py-8 text-white shadow-[0_20px_50px_rgba(52,31,18,0.18)] sm:min-h-65 sm:px-9 sm:py-10">
          <img
            src="/Images/TraditionalTable.jpg"
            alt="A table of freshly prepared dishes"
            className="absolute inset-0 h-full w-full object-cover object-right"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#2f211a]/95 via-[#2f211a]/75 to-[#2f211a]/10" />
          <div className="relative z-10 max-w-xl">
            <p className="mb-3 text-[10px] font-black uppercase text-[#f6ad3d]">
              Your kitchen, on the feed
            </p>
            <h1 className="font-serif text-4xl font-black leading-[0.98] sm:text-5xl">
              Make them hungry
              <br />
              <span className="text-[#f6ad3d]">for your story.</span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/80">
              Share the dish, the craft, and the moment that makes it yours.
            </p>
          </div>
        </section>

        <div className="mb-5">
          <p className="text-[10px] font-black uppercase text-[#df571e]">
            Food partner studio
          </p>
          <h2 className="mt-1 font-serif text-3xl font-black sm:text-4xl">
            Publish a dish
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#8b7a6d]">
            Add the details customers need, then bring it to life with a short
            kitchen video.
          </p>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.8fr)]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[22px] border border-[#eadfd5] bg-white p-5 shadow-[0_12px_35px_rgba(81,48,25,0.06)] sm:p-7"
          >
            <div className="mb-6">
              <p className="text-[10px] font-black uppercase text-[#df571e]">
                The essentials
              </p>
              <h3 className="mt-1 font-serif text-2xl font-black">
                Tell us about your dish
              </h3>
            </div>

            {error && (
              <div role="alert" className="mb-5 rounded-xl border border-[#f0c7b6] bg-[#fff4ef] px-4 py-3 text-sm font-semibold text-[#a83d20]">
                {error}
              </div>
            )}
            {success && (
              <div role="status" className="mb-5 flex items-center gap-2 rounded-xl border border-[#d6e8d7] bg-[#f1f8f0] px-4 py-3 text-sm font-semibold text-[#326642]">
                <RiCheckLine size={18} /> {success}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-xs font-black text-[#46352c]">
                  Dish name <span className="text-[#e85d26]">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Slow-cooked chicken biryani"
                  maxLength={80}
                  required
                  className="min-h-12 w-full rounded-xl border border-[#e5d9cf] bg-[#fffdf9] px-4 text-sm text-[#291e17] outline-none transition placeholder:text-[#b2a49a] focus:border-[#e85d26] focus:ring-4 focus:ring-[#e85d26]/10"
                />
                <p className="mt-1.5 text-right text-[10px] text-[#a08d80]">{formData.name.length}/80</p>
              </div>

              <div>
                <label htmlFor="description" className="mb-2 block text-xs font-black text-[#46352c]">
                  Description <span className="text-[#e85d26]">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="What goes into it? What makes the first bite memorable?"
                  rows={5}
                  maxLength={500}
                  required
                  className="w-full resize-y rounded-xl border border-[#e5d9cf] bg-[#fffdf9] px-4 py-3.5 text-sm leading-6 text-[#291e17] outline-none transition placeholder:text-[#b2a49a] focus:border-[#e85d26] focus:ring-4 focus:ring-[#e85d26]/10"
                />
                <p className="mt-1.5 text-right text-[10px] text-[#a08d80]">{formData.description.length}/500</p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label htmlFor="dish-video" className="text-xs font-black text-[#46352c]">
                    Kitchen video <span className="text-[#e85d26]">*</span>
                  </label>
                  <span className="text-[10px] text-[#a08d80]">Up to 50 MB</span>
                </div>
                <input
                  ref={fileInputRef}
                  id="dish-video"
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="sr-only"
                />
                {videoFile ? (
                  <div className="flex min-h-14.5 items-center justify-between gap-3 rounded-xl border border-[#eadfd5] bg-[#fffdf9] px-4 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#fff0df] text-[#df571e]">
                        <RiPlayCircleLine size={20} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-black text-[#46352c]">{videoFile.name}</p>
                        <p className="text-[10px] text-[#a08d80]">{(videoFile.size / (1024 * 1024)).toFixed(1)} MB</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveVideo}
                      disabled={isSubmitting}
                      aria-label="Remove video"
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#8b7a6d] transition hover:bg-[#f8f2ec] hover:text-[#a83d20] disabled:opacity-50"
                    >
                      <RiCloseLine size={19} />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="dish-video"
                    className="flex min-h-31.5 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#d8c8bb] bg-[#fffdf9] px-4 py-5 text-center transition hover:border-[#e85d26] hover:bg-[#fff8f1] focus-within:ring-4 focus-within:ring-[#e85d26]/10"
                  >
                    <span className="mb-2 grid h-10 w-10 place-items-center rounded-full bg-[#fff0df] text-[#df571e]">
                      <RiVideoUploadLine size={21} />
                    </span>
                    <span className="text-xs font-black text-[#46352c]">Choose a video</span>
                    <span className="mt-1 text-[10px] text-[#a08d80]">MP4, MOV, or WebM</span>
                  </label>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#e85d26] px-5 text-sm font-black text-white transition hover:bg-[#c94a1d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e85d26] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Publishing dish
                  </>
                ) : (
                  <>Publish dish <RiArrowRightLine size={18} /></>
                )}
              </button>
            </div>
          </form>

          <aside className="overflow-hidden rounded-[22px] border border-[#eadfd5] bg-white shadow-[0_12px_35px_rgba(81,48,25,0.06)]">
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-[10px] font-black uppercase text-[#df571e]">Reel preview</p>
                <h3 className="mt-1 font-serif text-xl font-black">The first impression</h3>
              </div>
              <span className="rounded-full bg-[#fff0df] px-3 py-1 text-[10px] font-black text-[#df571e]">9:16</span>
            </div>

            <div className="relative mx-4 mb-4 aspect-9/16 overflow-hidden rounded-[18px] bg-[#211914] sm:mx-auto sm:w-full sm:max-w-85">
              {videoPreview ? (
                <video src={videoPreview} controls playsInline className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <>
                  <img
                    src="/Images/foodall.jpg"
                    alt="A spread of colorful dishes"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-black/20" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[9px] font-black uppercase text-[#a64f25]">
                    Your kitchen
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <div className="mb-3 grid h-10 w-10 place-items-center rounded-full border border-white/70 bg-[#f6ad3d] font-serif text-lg font-black">K</div>
                    <p className="line-clamp-1 text-lg font-black">{formData.name || "Your next signature dish"}</p>
                    <p className="mt-1 line-clamp-3 text-xs leading-5 text-white/80">
                      {formData.description || "A little look behind the scenes of something delicious."}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-black uppercase text-[#f6ad3d]">
                      <RiPlayCircleLine size={16} /> Add your kitchen video
                    </span>
                  </div>
                </>
              )}
            </div>
            <p className="px-5 pb-5 text-xs leading-5 text-[#8b7a6d]">
              Your name and description appear with the video in the food feed.
              Keep the clip focused on the dish and how it comes together.
            </p>
          </aside>
        </div>
      </main>
    </div>
  );
}
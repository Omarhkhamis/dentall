"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const isMediaField = (path) =>
  /image|video|background|poster|url/i.test(path);

const isVideo = (url) => url.endsWith(".mp4");

const IconUpload = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 3l4 4h-3v7h-2V7H8l4-4zm-7 14h14v2H5v-2z"
    />
  </svg>
);

const IconLibrary = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 5h16v12H4V5zm2 2v8h12V7H6zm-2 12h16v2H4v-2z"
    />
  </svg>
);

export default function FieldInput({ name, defaultValue, isTextarea, label }) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [isUploading, setIsUploading] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(false);

  useEffect(() => {
    if (!showLibrary) return;
    let active = true;
    const load = async () => {
      setIsLoadingLibrary(true);
      try {
        const response = await fetch("/api/admin/uploads");
        const data = await response.json();
        if (active) setMediaFiles(data.files || []);
      } catch (error) {
        if (active) setMediaFiles([]);
      } finally {
        if (active) setIsLoadingLibrary(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [showLibrary]);

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData
      });
      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();
      if (data?.url) {
        setValue(data.url);
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1600,
          icon: "success",
          title: "Uploaded"
        });
      }
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1600,
        icon: "error",
        title: "Upload failed"
      });
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <label className="flex flex-col gap-2 text-sm text-slate-600">
      <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
        {label}
      </span>
      {isTextarea ? (
        <textarea
          name={name}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          rows={4}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-copper-400 focus:ring-1 focus:ring-copper-400/40"
        />
      ) : (
        <input
          name={name}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-copper-400 focus:ring-1 focus:ring-copper-400/40"
        />
      )}

      {isMediaField(name) ? (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-slate-300">
              <span className="sr-only">Upload</span>
              {isUploading ? (
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                  ...
                </span>
              ) : (
                <IconUpload />
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*,video/mp4"
                onChange={handleUpload}
                disabled={isUploading}
              />
            </label>
            <button
              type="button"
              onClick={() => setShowLibrary(true)}
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-slate-300"
            >
              <span className="sr-only">Open library</span>
              <IconLibrary />
            </button>
            <span className="text-[11px] text-slate-400">
              Paste a URL or upload a file.
            </span>
          </div>

          {showLibrary ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 overflow-y-auto py-6">
              <div className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl max-h-[70vh] overflow-y-auto">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      Library
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Select Media
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowLibrary(false)}
                    className="rounded-lg border border-slate-200 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-600"
                  >
                    Close
                  </button>
                </div>

                <div className="mt-4">
                  {isLoadingLibrary ? (
                    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
                      Loading...
                    </div>
                  ) : mediaFiles.length ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {mediaFiles.map((file) => (
                        <button
                          key={file.url}
                          type="button"
                          onClick={() => {
                            setValue(file.url);
                            setShowLibrary(false);
                          }}
                          className="group overflow-hidden rounded-xl border border-slate-200 bg-slate-50 text-left"
                        >
                          <div className="aspect-video w-full overflow-hidden bg-slate-200">
                            {isVideo(file.url) ? (
                              <video
                                src={file.url}
                                className="h-full w-full object-cover"
                                muted
                              />
                            ) : (
                              <img
                                src={file.url}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            )}
                          </div>
                          <div className="p-3 text-xs text-slate-500">
                            {file.name}
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
                      No uploads yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </label>
  );
}

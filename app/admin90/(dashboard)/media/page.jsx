import { readdir } from "fs/promises";
import path from "path";

import MediaUpload from "../components/MediaUpload";
import MediaGallery from "../components/MediaGallery";

export const dynamic = "force-dynamic";

const collectUploads = async (baseDir, relativeDir = "") => {
  const currentDir = path.join(baseDir, relativeDir);
  const entries = await readdir(currentDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const nextRelative = path.join(relativeDir, entry.name);
    if (entry.isDirectory()) {
      const nested = await collectUploads(baseDir, nextRelative);
      files.push(...nested);
    } else {
      const urlPath = nextRelative.split(path.sep).join("/");
      files.push({
        name: urlPath,
        url: `/uploads/${urlPath}`
      });
    }
  }

  return files;
};

const getUploads = async () => {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  try {
    const files = await collectUploads(uploadsDir);
    return files.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    return [];
  }
};

export default async function MediaPage() {
  const files = await getUploads();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Media</p>
        <h2 className="text-2xl font-semibold text-slate-900">Uploads</h2>
        <p className="mt-2 text-sm text-slate-600">
          Upload images or videos and copy their URLs into section fields.
        </p>
      </div>

      <MediaUpload />
      <MediaGallery files={files} />
    </div>
  );
}

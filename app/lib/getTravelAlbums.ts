import fs from "fs";
import path from "path";
import { getPlaiceholder } from "plaiceholder";

export type TravelImage = {
  src: string;
  blurDataURL: string;
  alt: string;
};

export type TravelAlbum = {
  name: string;
  slug: string;
  description?: string;
  images: TravelImage[];
};

const VALID_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Reads images from public/trips/<AlbumName>/*
 * - Each folder name becomes an album.
 * - Add your own photos by dropping files into these folders.
 */
export async function getTravelAlbums(): Promise<TravelAlbum[]> {
  const tripsDir = path.join(process.cwd(), "public", "trips");

  if (!fs.existsSync(tripsDir)) {
    return [];
  }

  const folders = fs
    .readdirSync(tripsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort((a, b) => a.localeCompare(b, "hu"));

  const albums: TravelAlbum[] = [];

  for (const folderName of folders) {
    const folderPath = path.join(tripsDir, folderName);
    const files = fs
      .readdirSync(folderPath)
      .filter((f) => VALID_EXTENSIONS.has(path.extname(f).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, "hu"));

    const images: TravelImage[] = [];

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const buffer = fs.readFileSync(filePath);
      const { base64 } = await getPlaiceholder(buffer);

      const publicSrc = `/trips/${encodeURIComponent(folderName)}/${encodeURIComponent(file)}`;
      images.push({
        src: publicSrc,
        blurDataURL: base64,
        alt: `${folderName} – ${path.parse(file).name}`,
      });
    }

    // Skip empty folders.
    if (images.length === 0) continue;

    albums.push({
      name: folderName,
      slug: slugify(folderName),
      images,
    });
  }

  return albums;
}

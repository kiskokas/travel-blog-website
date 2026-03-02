import { redirect } from "next/navigation";

export default function GalleryPage() {
  // Legacy route kept to avoid broken links.
  redirect("/");
}

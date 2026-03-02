import TravelGallery from "@/app/components/TravelGallery";
import { getTravelAlbums } from "@/app/lib/getTravelAlbums";
import TravelSectionClient from "./TravelSectionClient";

export default async function TravelSection() {
  const albums = await getTravelAlbums();

  return <TravelSectionClient albums={albums} />;
}
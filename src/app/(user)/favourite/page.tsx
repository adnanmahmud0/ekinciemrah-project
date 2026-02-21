import type { Metadata } from "next";
import FavouritePage from "@/components/user/favourite/FavouritePage";

export const metadata: Metadata = {
  title: "My Favourites",
  description:
    "View and manage your favourite products on Unified Produce for faster reordering.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <FavouritePage />;
}

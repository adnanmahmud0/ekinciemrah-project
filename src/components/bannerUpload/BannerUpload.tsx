"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { IconPhoto, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

interface BannerCardProps {
  label: string;
  helper?: string;
  tall?: boolean;
  dimensions?: string;
}

function BannerCard({ label, helper, tall, dimensions }: BannerCardProps) {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleRemoveFile = (event: React.MouseEvent) => {
    event.stopPropagation();
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-1">
        <span className="text-sm md:text-base font-medium text-gray-900">
          {label}
        </span>
        {helper && (
          <span className="text-xs md:text-sm text-gray-500">{helper}</span>
        )}
      </div>
      <div
        className={`relative flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border text-center transition-colors ${
          tall ? "h-64 md:h-80" : "h-52 md:h-64"
        } ${
          previewUrl
            ? "border-gray-200 bg-gray-50"
            : "border-dashed border-[#1B8057]/40 bg-[#F5FBF7] hover:border-[#1B8057] hover:bg-[#F0FBF4]"
        }`}
        onClick={!previewUrl ? handleUploadClick : undefined}
      >
        {previewUrl ? (
          <>
            <Image
              src={previewUrl}
              alt={label}
              fill
              unoptimized
              className="rounded-xl object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveFile}
              className="absolute right-2 top-2 rounded-full bg-white/80 p-1 text-red-500 shadow-sm transition-colors hover:bg-white"
            >
              <IconX className="h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            <IconPhoto className="mb-2 h-7 w-7 text-[#1B8057]" />
            <span className="text-xs md:text-sm font-medium text-[#1B8057]">
              Click to upload banner
            </span>
            {dimensions && (
              <span className="mt-1 text-[11px] text-gray-400">
                Recommended: {dimensions}
              </span>
            )}
            <span className="mt-1 text-[11px] text-gray-500">
              JPG, PNG up to 5MB
            </span>
          </>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}

export default function BannerUpload() {
  return (
    <section className="w-full rounded-3xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
      <div className="mb-8 flex flex-col gap-2">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#061019]">
          Banner upload
        </h2>
        <p className="text-sm md:text-base text-gray-500">
          Manage homepage and promotional banners.
        </p>
      </div>

      <div className="space-y-10">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm md:text-base text-gray-600">
                Primary banners (4 slots) shown on main promotional areas.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <BannerCard label="Banner 1" helper="Main hero banner" />
            <BannerCard label="Banner 2" helper="Secondary hero banner" />
            <BannerCard label="Banner 3" helper="Sidebar or strip banner" />
            <BannerCard
              label="Banner 4"
              helper="Additional promotional banner"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm md:text-base text-gray-600">
                Secondary banners (2 slots) for offers or seasonal promotions.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <BannerCard
              label="Banner 5"
              helper="Offer or discount banner"
              tall
            />
            <BannerCard
              label="Banner 6"
              helper="Seasonal or campaign banner"
              tall
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-base md:text-lg text-gray-600">
                Mobile banners (4 slots) for app and small-screen views.
              </p>
              <p className="text-sm md:text-base text-gray-400">
                Recommended size: 1080px width × 540px height (2:1 ratio).
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <BannerCard
              label="Mobile banner 1"
              helper="Top mobile hero"
              dimensions="1080 × 540 px"
              tall
            />
            <BannerCard
              label="Mobile banner 2"
              helper="Mid-page promo"
              dimensions="1080 × 540 px"
              tall
            />
            <BannerCard
              label="Mobile banner 3"
              helper="Bottom promo"
              dimensions="1080 × 540 px"
              tall
            />
            <BannerCard
              label="Mobile banner 4"
              helper="Extra mobile creative"
              dimensions="1080 × 540 px"
              tall
            />
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <Button className="rounded-full bg-[#1B8057] px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#146041]">
          Submit banners
        </Button>
      </div>
    </section>
  );
}

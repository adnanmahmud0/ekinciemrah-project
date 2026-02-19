"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { IconPhoto, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useApi } from "@/hooks/use-api-data";
import { BannerResponse } from "@/types/banner";
import { toast } from "sonner";
import { privateApi } from "@/lib/api-client";
import { useQueryClient } from "@tanstack/react-query";

interface BannerCardProps {
  label: string;
  helper?: string;
  tall?: boolean;
  dimensions?: string;
  previewUrl: string;
  onFileChange: (file: File | null) => void;
  onRemove: () => void;
}

function BannerCard({
  label,
  helper,
  tall,
  dimensions,
  previewUrl,
  onFileChange,
  onRemove,
}: BannerCardProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    onFileChange(file);
  };

  const handleRemoveFile = (event: React.MouseEvent) => {
    event.stopPropagation();
    onRemove();
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

interface BannerState {
  file: File | null;
  preview: string;
  originalUrl?: string;
  id?: string;
}

export default function BannerUpload() {
  const {
    data: bannerData,
    isLoading,
    post,
  } = useApi<BannerResponse>("/banner", ["banners"]);
  const [banners, setBanners] = useState<BannerState[]>(
    Array(6).fill({ file: null, preview: "" }),
  );
  const [mobileBanners, setMobileBanners] = useState<BannerState[]>(
    Array(4).fill({ file: null, preview: "" }),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (bannerData?.data) {
      // Handle Web Banners
      const webBannersList = bannerData.data.webBanners;
      if (Array.isArray(webBannersList)) {
        const newBanners: BannerState[] = Array.from({ length: 6 }, () => ({
          file: null,
          preview: "",
        }));
        webBannersList.forEach((banner, index) => {
          if (index < 6 && banner.image) {
            const apiUrl =
              process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
            // Use origin to avoid appending /api/v1 to image paths if they are served from root
            const baseUrl = apiUrl.includes("/api")
              ? new URL(apiUrl).origin
              : apiUrl;

            const imageUrl = banner.image.startsWith("http")
              ? banner.image
              : banner.image.startsWith("/")
                ? `${baseUrl}${banner.image}`
                : `${baseUrl}/${banner.image}`;
            newBanners[index] = {
              file: null,
              preview: imageUrl,
              originalUrl: banner.image,
              id: banner._id,
            } as BannerState;
          }
        });
        setBanners(newBanners);
      }

      // Handle Mobile Banners
      const mobileBannersList = bannerData.data.mobileBanners;
      if (Array.isArray(mobileBannersList)) {
        const newMobileBanners: BannerState[] = Array.from(
          { length: 4 },
          () => ({
            file: null,
            preview: "",
          }),
        );
        mobileBannersList.forEach((banner, index) => {
          if (index < 4 && banner.image) {
            const apiUrl =
              process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
            // Use origin to avoid appending /api/v1 to image paths if they are served from root
            const baseUrl = apiUrl.includes("/api")
              ? new URL(apiUrl).origin
              : apiUrl;

            const imageUrl = banner.image.startsWith("http")
              ? banner.image
              : banner.image.startsWith("/")
                ? `${baseUrl}${banner.image}`
                : `${baseUrl}/${banner.image}`;
            newMobileBanners[index] = {
              file: null,
              preview: imageUrl,
              originalUrl: banner.image,
              id: banner._id,
            } as BannerState;
          }
        });
        setMobileBanners(newMobileBanners);
      }
    }
  }, [bannerData]);

  const handleFileChange = (index: number, file: File | null) => {
    const newBanners = [...banners];
    if (file) {
      newBanners[index] = {
        file,
        preview: URL.createObjectURL(file),
      };
    }
    setBanners(newBanners);
  };

  const handleRemove = (index: number) => {
    const banner = banners[index];
    const newBanners = [...banners];

    if (banner?.id) {
      privateApi
        .delete(`/banner/web/${banner.id}`)
        .then(() => {
          toast.success("Web banner deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["banners"] });
          newBanners[index] = { file: null, preview: "" };
          setBanners(newBanners);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to delete web banner");
        });
    } else {
      newBanners[index] = { file: null, preview: "" };
      setBanners(newBanners);
    }
  };

  const handleMobileFileChange = (index: number, file: File | null) => {
    const newBanners = [...mobileBanners];
    if (file) {
      newBanners[index] = {
        file,
        preview: URL.createObjectURL(file),
      };
    }
    setMobileBanners(newBanners);
  };

  const handleMobileRemove = (index: number) => {
    const banner = mobileBanners[index];
    const newBanners = [...mobileBanners];

    if (banner?.id) {
      privateApi
        .delete(`/banner/mobile/${banner.id}`)
        .then(() => {
          toast.success("Mobile banner deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["banners"] });
          newBanners[index] = { file: null, preview: "" };
          setMobileBanners(newBanners);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to delete mobile banner");
        });
    } else {
      newBanners[index] = { file: null, preview: "" };
      setMobileBanners(newBanners);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Web Banners - only send new files, using backend field name "webBanner"
      banners.forEach((banner) => {
        if (banner.file) {
          formData.append("webBanner", banner.file);
        }
      });

      // Mobile Banners - only send new files, using backend field name "mobileBanner"
      mobileBanners.forEach((banner) => {
        if (banner.file) {
          formData.append("mobileBanner", banner.file);
        }
      });

      await post("/banner", formData, {
        onSuccess: () => {
          toast.success("Banners saved successfully");
          queryClient.invalidateQueries({ queryKey: ["banners"] });
        },
        onError: (err: unknown) => {
          console.error(err);
          toast.error("Failed to save banners");
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading banners...</div>;
  }

  return (
    <section className="w-full rounded-3xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
      <div className="mb-8 flex flex-col gap-2">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#061019]">
          Banner Management
        </h2>
        <p className="text-sm md:text-base text-gray-500">
          Manage homepage and promotional banners.
        </p>
      </div>

      <div className="space-y-10">
        {/* Section 1: Promotional Banners (Slider) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Promotional Slider
              </h3>
              <p className="text-sm text-gray-600">
                First 2 banners shown in the main slider.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <BannerCard
              label="Slider Banner 1"
              helper="First slide"
              previewUrl={banners[0].preview}
              onFileChange={(file) => handleFileChange(0, file)}
              onRemove={() => handleRemove(0)}
            />
            <BannerCard
              label="Slider Banner 2"
              helper="Second slide"
              previewUrl={banners[1].preview}
              onFileChange={(file) => handleFileChange(1, file)}
              onRemove={() => handleRemove(1)}
            />
          </div>
        </div>

        {/* Section 2: Right Side Banners */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Right Side Banners
              </h3>
              <p className="text-sm text-gray-600">
                Vertical banners shown to the right of the slider.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <BannerCard
              label="Right Top"
              helper="Top right banner"
              previewUrl={banners[2].preview}
              onFileChange={(file) => handleFileChange(2, file)}
              onRemove={() => handleRemove(2)}
            />
            <BannerCard
              label="Right Bottom"
              helper="Bottom right banner"
              previewUrl={banners[3].preview}
              onFileChange={(file) => handleFileChange(3, file)}
              onRemove={() => handleRemove(3)}
            />
          </div>
        </div>

        {/* Section 3: Offer Banners */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Offer Banners
              </h3>
              <p className="text-sm text-gray-600">
                Two column banners shown below featured products.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <BannerCard
              label="Offer Left"
              helper="Left offer banner"
              previewUrl={banners[4].preview}
              onFileChange={(file) => handleFileChange(4, file)}
              onRemove={() => handleRemove(4)}
            />
            <BannerCard
              label="Offer Right"
              helper="Right offer banner"
              previewUrl={banners[5].preview}
              onFileChange={(file) => handleFileChange(5, file)}
              onRemove={() => handleRemove(5)}
            />
          </div>
        </div>

        {/* Section 4: Mobile Banners */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Mobile Banners
              </h3>
              <p className="text-sm text-gray-600">
                Banners optimized for mobile devices.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <BannerCard
              label="Mobile Banner 1"
              helper="First mobile banner"
              previewUrl={mobileBanners[0].preview}
              onFileChange={(file) => handleMobileFileChange(0, file)}
              onRemove={() => handleMobileRemove(0)}
            />
            <BannerCard
              label="Mobile Banner 2"
              helper="Second mobile banner"
              previewUrl={mobileBanners[1].preview}
              onFileChange={(file) => handleMobileFileChange(1, file)}
              onRemove={() => handleMobileRemove(1)}
            />
            <BannerCard
              label="Mobile Banner 3"
              helper="Third mobile banner"
              previewUrl={mobileBanners[2].preview}
              onFileChange={(file) => handleMobileFileChange(2, file)}
              onRemove={() => handleMobileRemove(2)}
            />
            <BannerCard
              label="Mobile Banner 4"
              helper="Fourth mobile banner"
              previewUrl={mobileBanners[3].preview}
              onFileChange={(file) => handleMobileFileChange(3, file)}
              onRemove={() => handleMobileRemove(3)}
            />
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="rounded-full bg-[#1B8057] px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#146041]"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </section>
  );
}

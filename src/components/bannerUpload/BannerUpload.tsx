"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { IconPhoto, IconX } from "@tabler/icons-react";
import { AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApi } from "@/hooks/use-api-data";
import { BannerResponse } from "@/types/banner";
import { toast } from "sonner";
import { privateApi } from "@/lib/api-client";
import { useQueryClient } from "@tanstack/react-query";

// ─── Dimension specs ──────────────────────────────────────────────────────────
// Derived from actual CSS:
//   Slider    : container(~1248px) × h-[620px]  → ratio ~2.01:1  → recommend 1248×620
//   Side      : (1248-16)/2=616px × h-[280px]   → ratio ~2.20:1  → recommend 616×280
//   Offer     : (1248-24)/2=612px × h-[300px]   → ratio ~2.04:1  → recommend 612×300
//   Mobile    : any (scales automatically)
// Validation uses aspect-ratio ±5% tolerance because images are object-cover.
const BANNER_SPECS = {
  slider: {
    ratio: 1248 / 620, // ~2.013
    recWidth: 1248,
    recHeight: 620,
    label: "1248 × 620 px",
    instruction:
      "Upload images at exactly 1248 × 620 px. Images with a different aspect ratio will appear cropped.",
  },
  rightSide: {
    ratio: 616 / 280, // ~2.200
    recWidth: 616,
    recHeight: 280,
    label: "616 × 280 px",
    instruction:
      "Upload images at exactly 616 × 280 px. Incorrect aspect ratios will break the side-banner layout.",
  },
  offer: {
    ratio: 612 / 300, // ~2.040
    recWidth: 612,
    recHeight: 300,
    label: "612 × 300 px",
    instruction:
      "Upload images at exactly 612 × 300 px to ensure the offer banners display correctly.",
  },
  mobile: {
    ratio: null, // any ratio accepted for mobile
    recWidth: 800,
    recHeight: 400,
    label: "800 × 400 px (recommended)",
    instruction:
      "Mobile banners scale automatically. We recommend 800 × 400 px for best results.",
  },
} as const;

type SpecKey = keyof typeof BANNER_SPECS;

const ASPECT_TOLERANCE = 0.05; // ±5 %

// ─── Validate aspect ratio via browser Image API ─────────────────────────────
function validateImageDimensions(
  file: File,
  spec: (typeof BANNER_SPECS)[SpecKey],
): Promise<{ valid: boolean; actualW: number; actualH: number }> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const { naturalWidth: w, naturalHeight: h } = img;
      if (spec.ratio === null) {
        // mobile – always accept
        resolve({ valid: true, actualW: w, actualH: h });
        return;
      }
      const uploadedRatio = w / h;
      const diff = Math.abs(uploadedRatio - spec.ratio) / spec.ratio;
      resolve({ valid: diff <= ASPECT_TOLERANCE, actualW: w, actualH: h });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ valid: false, actualW: 0, actualH: 0 });
    };
    img.src = url;
  });
}

// ─── BannerCard component ────────────────────────────────────────────────────
interface BannerCardProps {
  label: string;
  helper?: string;
  tall?: boolean;
  spec: (typeof BANNER_SPECS)[SpecKey];
  previewUrl: string;
  onFileChange: (file: File | null) => void;
  onRemove: () => void;
}

function BannerCard({
  label,
  helper,
  tall,
  spec,
  previewUrl,
  onFileChange,
  onRemove,
}: BannerCardProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [validating, setValidating] = useState(false);

  const handleUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setValidating(true);
    const { valid, actualW, actualH } = await validateImageDimensions(
      file,
      spec,
    );
    setValidating(false);

    if (!valid) {
      toast.error(`Wrong image dimensions`, {
        description: `Your image is ${actualW} × ${actualH} px. This section requires ${spec.label}. Please resize your image and try again.`,
        duration: 6000,
      });
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    onFileChange(file);
  };

  const handleRemoveFile = (event: React.MouseEvent) => {
    event.stopPropagation();
    onRemove();
    if (fileInputRef.current) fileInputRef.current.value = "";
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
            {validating ? (
              <div className="flex flex-col items-center gap-2">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#1B8057] border-t-transparent" />
                <span className="text-xs text-gray-500">Validating…</span>
              </div>
            ) : (
              <>
                <IconPhoto className="mb-2 h-7 w-7 text-[#1B8057]" />
                <span className="text-xs md:text-sm font-medium text-[#1B8057]">
                  Click to upload banner
                </span>
                <span className="mt-1 text-[11px] font-semibold text-emerald-700">
                  Required: {spec.recWidth} × {spec.recHeight} px
                </span>
                <span className="mt-1 text-[11px] text-gray-400">
                  JPG, PNG up to 5MB
                </span>
              </>
            )}
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

// ─── Section instruction banner ───────────────────────────────────────────────
function SizeInstruction({ spec }: { spec: (typeof BANNER_SPECS)[SpecKey] }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-semibold text-amber-800">
          Required size: {spec.label}
        </span>
        <span className="text-xs text-amber-700">{spec.instruction}</span>
      </div>
    </div>
  );
}

// ─── Section header ────────────────────────────────────────────────────────────
function SectionHeader({
  title,
  description,
  spec,
}: {
  title: string;
  description: string;
  spec: (typeof BANNER_SPECS)[SpecKey];
}) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <SizeInstruction spec={spec} />
    </div>
  );
}

// ─── BannerState type ─────────────────────────────────────────────────────────
interface BannerState {
  file: File | null;
  preview: string;
  originalUrl?: string;
  id?: string;
}

// ─── Main component ───────────────────────────────────────────────────────────
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

      const mobileBannersList = bannerData.data.mobileBanners;
      if (Array.isArray(mobileBannersList)) {
        const newMobileBanners: BannerState[] = Array.from(
          { length: 4 },
          () => ({ file: null, preview: "" }),
        );
        mobileBannersList.forEach((banner, index) => {
          if (index < 4 && banner.image) {
            const apiUrl =
              process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
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
      newBanners[index] = { file, preview: URL.createObjectURL(file) };
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
      newBanners[index] = { file, preview: URL.createObjectURL(file) };
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
      banners.forEach((banner) => {
        if (banner.file) formData.append("webBanner", banner.file);
      });
      mobileBanners.forEach((banner) => {
        if (banner.file) formData.append("mobileBanner", banner.file);
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
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1B8057] border-t-transparent" />
      </div>
    );
  }

  return (
    <section className="w-full rounded-3xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-2">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#061019]">
          Banner Management
        </h2>
        <p className="text-sm md:text-base text-gray-500">
          Manage homepage and promotional banners. Each section has strict size
          requirements — only images with the exact required dimensions will be
          accepted.
        </p>

        {/* Global info note */}
        <div className="mt-2 flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
          <p className="text-xs text-blue-700">
            Uploading images with incorrect dimensions will be rejected
            automatically. Please prepare your images at the exact required
            sizes before uploading.
          </p>
        </div>
      </div>

      <div className="space-y-12">
        {/* ── Section 1: Promotional Slider ─────────────────────────────── */}
        <div className="space-y-5">
          <SectionHeader
            title="Promotional Slider"
            description="These 2 images appear in the main full-width homepage slider."
            spec={BANNER_SPECS.slider}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <BannerCard
              label="Slider Banner 1"
              helper="First slide"
              spec={BANNER_SPECS.slider}
              previewUrl={banners[0].preview}
              onFileChange={(file) => handleFileChange(0, file)}
              onRemove={() => handleRemove(0)}
            />
            <BannerCard
              label="Slider Banner 2"
              helper="Second slide"
              spec={BANNER_SPECS.slider}
              previewUrl={banners[1].preview}
              onFileChange={(file) => handleFileChange(1, file)}
              onRemove={() => handleRemove(1)}
            />
          </div>
        </div>

        {/* ── Section 2: Right Side Banners ─────────────────────────────── */}
        <div className="space-y-5">
          <SectionHeader
            title="Right Side Banners"
            description="These 2 images appear beside the slider as vertical side banners."
            spec={BANNER_SPECS.rightSide}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <BannerCard
              label="Right Top"
              helper="Top right banner"
              spec={BANNER_SPECS.rightSide}
              previewUrl={banners[2].preview}
              onFileChange={(file) => handleFileChange(2, file)}
              onRemove={() => handleRemove(2)}
            />
            <BannerCard
              label="Right Bottom"
              helper="Bottom right banner"
              spec={BANNER_SPECS.rightSide}
              previewUrl={banners[3].preview}
              onFileChange={(file) => handleFileChange(3, file)}
              onRemove={() => handleRemove(3)}
            />
          </div>
        </div>

        {/* ── Section 3: Offer Banners ───────────────────────────────────── */}
        <div className="space-y-5">
          <SectionHeader
            title="Offer Banners"
            description="Two wide banners shown below the product sections."
            spec={BANNER_SPECS.offer}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <BannerCard
              label="Offer Left"
              helper="Left offer banner"
              spec={BANNER_SPECS.offer}
              previewUrl={banners[4].preview}
              onFileChange={(file) => handleFileChange(4, file)}
              onRemove={() => handleRemove(4)}
            />
            <BannerCard
              label="Offer Right"
              helper="Right offer banner"
              spec={BANNER_SPECS.offer}
              previewUrl={banners[5].preview}
              onFileChange={(file) => handleFileChange(5, file)}
              onRemove={() => handleRemove(5)}
            />
          </div>
        </div>

        {/* ── Section 4: Mobile Banners ──────────────────────────────────── */}
        <div className="space-y-5">
          <SectionHeader
            title="Mobile Banners"
            description="Banners optimised for mobile device screens."
            spec={BANNER_SPECS.mobile}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <BannerCard
              label="Mobile Banner 1"
              helper="First mobile banner"
              spec={BANNER_SPECS.mobile}
              previewUrl={mobileBanners[0].preview}
              onFileChange={(file) => handleMobileFileChange(0, file)}
              onRemove={() => handleMobileRemove(0)}
            />
            <BannerCard
              label="Mobile Banner 2"
              helper="Second mobile banner"
              spec={BANNER_SPECS.mobile}
              previewUrl={mobileBanners[1].preview}
              onFileChange={(file) => handleMobileFileChange(1, file)}
              onRemove={() => handleMobileRemove(1)}
            />
            <BannerCard
              label="Mobile Banner 3"
              helper="Third mobile banner"
              spec={BANNER_SPECS.mobile}
              previewUrl={mobileBanners[2].preview}
              onFileChange={(file) => handleMobileFileChange(2, file)}
              onRemove={() => handleMobileRemove(2)}
            />
            <BannerCard
              label="Mobile Banner 4"
              helper="Fourth mobile banner"
              spec={BANNER_SPECS.mobile}
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
          {isSubmitting ? "Saving…" : "Save Changes"}
        </Button>
      </div>
    </section>
  );
}

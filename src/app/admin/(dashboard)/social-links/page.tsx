"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useApi } from "@/hooks/use-api-data";
import { toast } from "sonner";

type BackendSocialLink = {
  _id: string;
  name: string;
  socialLink: string;
};

type SocialLinksResponse = {
  success: boolean;
  message: string;
  data?: BackendSocialLink[];
};

export default function SocialLinksPage() {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");

  const { data, isLoading, isError, create, isCreating } =
    useApi<SocialLinksResponse>("/social-links", ["social-links"]);

  useEffect(() => {
    if (!data?.data) return;
    const map = new Map(
      data.data.map((item) => [item.name.toLowerCase(), item.socialLink]),
    );
    setFacebook((map.get("facebook") as string) || "");
    setInstagram((map.get("instagram") as string) || "");
    setLinkedin((map.get("linkedin") as string) || "");
    setTwitter((map.get("twitter") as string) || "");
  }, [data]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await create({
        facebook: facebook.trim() || undefined,
        instagram: instagram.trim() || undefined,
        linkedin: linkedin.trim() || undefined,
        twitter: twitter.trim() || undefined,
      });
      toast.success("Social links saved successfully");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to save social links",
      );
    }
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Social Links"
        description="Manage your social media profile links"
      />
      <div className="max-w-xl">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xl border bg-white p-6"
        >
          {isLoading && !data && (
            <p className="text-sm text-muted-foreground">Loading links...</p>
          )}
          {isError && (
            <p className="text-sm text-red-500">
              Failed to load existing social links.
            </p>
          )}
          <div className="space-y-2">
            <Label htmlFor="facebook">Facebook link</Label>
            <Input
              id="facebook"
              type="url"
              placeholder="https://facebook.com/your-page"
              value={facebook}
              onChange={(event) => setFacebook(event.target.value)}
              disabled={isCreating}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram link</Label>
            <Input
              id="instagram"
              type="url"
              placeholder="https://instagram.com/your-profile"
              value={instagram}
              onChange={(event) => setInstagram(event.target.value)}
              disabled={isCreating}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn link</Label>
            <Input
              id="linkedin"
              type="url"
              placeholder="https://linkedin.com/company/your-company"
              value={linkedin}
              onChange={(event) => setLinkedin(event.target.value)}
              disabled={isCreating}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter link</Label>
            <Input
              id="twitter"
              type="url"
              placeholder="https://twitter.com/your-handle"
              value={twitter}
              onChange={(event) => setTwitter(event.target.value)}
              disabled={isCreating}
            />
          </div>
          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Saving..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

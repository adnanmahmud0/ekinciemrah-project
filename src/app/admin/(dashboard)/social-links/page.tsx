"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SocialLinksPage() {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
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
          <div className="space-y-2">
            <Label htmlFor="facebook">Facebook link</Label>
            <Input
              id="facebook"
              type="url"
              placeholder="https://facebook.com/your-page"
              value={facebook}
              onChange={(event) => setFacebook(event.target.value)}
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
            />
          </div>
          <div className="flex justify-end pt-2">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

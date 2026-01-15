import React from "react";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/login.jpg"
          alt="Premium business dashboard"
          fill
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/40" />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center text-white md:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200 md:text-base">
            Fresh, organic & delivered daily
          </p>
          <h2 className="text-4xl font-bold leading-tight md:text-5xl">
            Farm-fresh vegetables, straight to your kitchen.
          </h2>
          <p className="max-w-md text-sm font-medium text-white/90 md:text-lg">
            Handpicked fresh vegetables at the best prices. Eat healthy, cook
            better, and enjoy fast delivery every day.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start"></div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-3xl">{children}</div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { Heart } from "lucide-react";

interface FlyItem {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface FlyAnimationContextType {
  triggerFlyAnimation: (rect: DOMRect) => void;
}

const FlyAnimationContext = createContext<FlyAnimationContextType | undefined>(
  undefined,
);

export function FlyAnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<FlyItem[]>([]);
  const nextId = useRef(0);

  const triggerFlyAnimation = useCallback((startRect: DOMRect) => {
    const targetEl = document.getElementById("navbar-wishlist-icon");
    if (!targetEl) return;

    const targetRect = targetEl.getBoundingClientRect();
    const id = `fly-${nextId.current++}`;

    // Calculate centers
    const startX = startRect.left + startRect.width / 2;
    const startY = startRect.top + startRect.height / 2;
    const endX = targetRect.left + targetRect.width / 2;
    const endY = targetRect.top + targetRect.height / 2;

    setItems((prev) => [
      ...prev,
      {
        id,
        startX,
        startY,
        endX,
        endY,
      },
    ]);

    // Cleanup after animation
    setTimeout(() => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }, 1000);
  }, []);

  return (
    <FlyAnimationContext.Provider value={{ triggerFlyAnimation }}>
      {children}
      {items.length > 0 && <FlyingOverlay items={items} />}
    </FlyAnimationContext.Provider>
  );
}

function FlyingOverlay({ items }: { items: FlyItem[] }) {
  // Use a portal to ensure it's on top of everything
  // Since this component is conditionally rendered only when items exist (triggered by user interaction),
  // we can safely assume we are on the client.
  if (typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {items.map((item) => (
        <FlyingHeart key={item.id} item={item} />
      ))}
    </div>,
    document.body,
  );
}

function FlyingHeart({ item }: { item: FlyItem }) {
  const [styles, setStyles] = useState<React.CSSProperties>({
    position: "absolute",
    left: item.startX,
    top: item.startY,
    transform: "translate(-50%, -50%) scale(1)",
    opacity: 1,
    transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
  });

  useEffect(() => {
    // Trigger animation in next frame
    requestAnimationFrame(() => {
      setStyles({
        position: "absolute",
        left: item.endX,
        top: item.endY,
        transform: "translate(-50%, -50%) scale(0.5)",
        opacity: 0, // Fade out at the end
        transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
      });
    });
  }, [item.endX, item.endY]);

  return (
    <div style={styles} className="text-red-500">
      <Heart className="w-6 h-6 fill-current" />
    </div>
  );
}

export function useFlyAnimation() {
  const context = useContext(FlyAnimationContext);
  if (context === undefined) {
    throw new Error(
      "useFlyAnimation must be used within a FlyAnimationProvider",
    );
  }
  return context;
}

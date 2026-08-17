"use client";

import { useEffect, useRef, useState } from "react";

type UseActiveSectionOptions = {
  rootSelector?: string;
  topOffset?: number;
};

function resolveActiveId(
  sectionIds: string[],
  root: HTMLElement,
  topOffset: number,
  fallback: string,
) {
  const marker = root.getBoundingClientRect().top + topOffset;
  let current = fallback;

  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= marker) {
      current = id;
    }
  }

  return current;
}

export function useActiveSection(
  sectionIds: string[],
  defaultId = "",
  options: UseActiveSectionOptions = {},
) {
  const { rootSelector, topOffset = 96 } = options;
  const [activeId, setActiveId] = useState<string>(defaultId);
  const isManualClickRef = useRef(false);

  useEffect(() => {
    if (!sectionIds.length) return;

    const root = rootSelector ? document.querySelector<HTMLElement>(rootSelector) : null;

    const applyFromScroll = () => {
      if (isManualClickRef.current) return;

      if (root) {
        setActiveId(resolveActiveId(sectionIds, root, topOffset, defaultId));
        return;
      }

      const marker = topOffset;
      let current = defaultId;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= marker) {
          current = id;
        }
      }
      setActiveId(current);
    };

    const applyHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash && sectionIds.includes(hash)) {
        setActiveId(hash);
      }
    };

    window.addEventListener("hashchange", applyHash);
    queueMicrotask(() => {
      applyHash();
      applyFromScroll();
    });

    const scrollTarget: HTMLElement | Window = root ?? window;
    scrollTarget.addEventListener("scroll", applyFromScroll, { passive: true });
    window.addEventListener("resize", applyFromScroll);

    return () => {
      window.removeEventListener("hashchange", applyHash);
      window.removeEventListener("resize", applyFromScroll);
      scrollTarget.removeEventListener("scroll", applyFromScroll);
    };
  }, [sectionIds, defaultId, rootSelector, topOffset]);

  const handleSelect = (id: string) => {
    setActiveId(id);
    isManualClickRef.current = true;

    const el = document.getElementById(id);
    const root = rootSelector ? document.querySelector<HTMLElement>(rootSelector) : null;

    if (el && root) {
      const rootRect = root.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      root.scrollTo({
        top: root.scrollTop + (elRect.top - rootRect.top) - topOffset + 24,
        behavior: "smooth",
      });
    }

    window.setTimeout(() => {
      isManualClickRef.current = false;
    }, 800);
  };

  return { activeId, handleSelect };
}

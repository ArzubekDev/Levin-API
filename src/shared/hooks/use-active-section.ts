import { useEffect, useRef, useState } from "react";

export function useActiveSection(sectionIds: string[], defaultId = "") {
  const [activeId, setActiveId] = useState<string>(defaultId);
  const isManualClickRef = useRef(false);

  useEffect(() => {
    if (!sectionIds.length) return;

    const applyHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash && sectionIds.includes(hash)) {
        setActiveId(hash);
      }
    };

    window.addEventListener("hashchange", applyHash);
    queueMicrotask(applyHash);

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualClickRef.current) return;

        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry?.target.id) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-100px 0px -60% 0px",
        threshold: 0.1,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("hashchange", applyHash);
      observer.disconnect();
    };
  }, [sectionIds]);

  const handleSelect = (id: string) => {
    setActiveId(id);
    isManualClickRef.current = true;

    setTimeout(() => {
      isManualClickRef.current = false;
    }, 800);
  };

  return { activeId, handleSelect };
}

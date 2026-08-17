interface ResourceTabsProps {
  resources: string[];
  activeResource: string;
  onSelect: (resource: string) => void;
}

export function ResourceTabs({ resources, activeResource, onSelect }: ResourceTabsProps) {
  return (
    <nav aria-label="Ресурсы API" className="mb-4 flex flex-wrap gap-2">
      {resources.map((item) => {
        const isActive = item === activeResource;
        return (
          <button
            key={item}
            type="button"
            onClick={() => onSelect(item)}
            className={
              isActive
                ? "rounded-lg border border-blue-500/40 bg-blue-500/10 px-3 py-1.5 text-sm text-blue-300"
                : "rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-1.5 text-sm text-slate-400 hover:text-slate-200"
            }
          >
            /{item}
          </button>
        );
      })}
    </nav>
  );
}

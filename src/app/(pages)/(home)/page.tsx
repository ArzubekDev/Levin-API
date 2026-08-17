import { LightningBackground } from "@/shared/ui/LightningBackground";
import { CodePreview } from "@/widgets/home/CodePreview";
import FeatureCards from "@/widgets/home/FeatureCards";
import { Home } from "@/widgets/home/Home";
import StatsSection from "@/widgets/stats/ui/StatsSection";

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden">
      <LightningBackground />
      <Home />
      <StatsSection />
      <CodePreview />
      <FeatureCards />
    </div>
  );
}

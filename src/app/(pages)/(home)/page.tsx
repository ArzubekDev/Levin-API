import { LightningBackground } from '@/shared/components/lightning-background';
import { CodePreview } from '@/widgets/home/CodePreview';
import FeatureCards from '@/widgets/home/FeatureCards';
import { Home } from '@/widgets/home/Home';

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden">
      <LightningBackground />
      <Home />
      <CodePreview />
      <FeatureCards />
    </div>
  );
}

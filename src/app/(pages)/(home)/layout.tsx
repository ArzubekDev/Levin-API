import BackgroundGlow from "@/shared/ui/BackgroundGlow";
import { Footer } from "@/widgets/layout/Footer";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <BackgroundGlow />
      {children}
      <Footer />
    </div>
  );
}

export default HomeLayout;

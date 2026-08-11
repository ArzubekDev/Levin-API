import { RouteGuard } from "@/features/auth/ui/route-guard";
import Header from "@/widgets/layout/Header";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <RouteGuard>{children}</RouteGuard>
    </div>
  );
}

export default Layout;

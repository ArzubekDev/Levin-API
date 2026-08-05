import { LightningBackground } from "@/shared/components/lightning-background"
import BackgroundGlow from "@/shared/ui/BackgroundGlow"
import Header from "@/widgets/layout/Header"
import { RouteGuard } from "@/features/auth/ui/route-guard"

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <LightningBackground />
      <BackgroundGlow />
      <Header />
      <RouteGuard>{children}</RouteGuard>
    </div>
  )
}

export default Layout
import BackgroundGlow from "@/shared/ui/BackgroundGlow"
import Header from "@/widgets/layout/Header"
import { RouteGuard } from "@/features/auth/ui/route-guard"
import { Footer } from "@/widgets/layout/Footer"

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <BackgroundGlow />
      <Header />
      <RouteGuard>{children}</RouteGuard>
      <Footer />
    </div>
  )
}

export default Layout

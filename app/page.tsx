import { Hero } from "@/components/hero";
import { Preloader } from "@/components/preloader";
import { SelectedWork } from "@/components/selected-work";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <Preloader />
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <SelectedWork />
      </main>
    </>
  );
}

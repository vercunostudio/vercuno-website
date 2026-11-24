import { About } from "@/components/about";
import { Hero } from "@/components/hero";
import { Preloader } from "@/components/preloader";
import { Process } from "@/components/process";
import { SelectedWork } from "@/components/selected-work";
import { Services } from "@/components/services";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <Preloader />
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <SelectedWork />
        <Services />
        <About />
        <Process />
      </main>
    </>
  );
}

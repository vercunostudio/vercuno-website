import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VERCUNO — Digital, Built Better.",
    template: "%s — VERCUNO",
  },
  description:
    "VERCUNO is an independent software and AI studio designing and engineering websites, custom software, and intelligent workflows for ambitious businesses.",
  applicationName: "VERCUNO",
  keywords: [
    "VERCUNO",
    "software studio",
    "AI studio",
    "web development",
    "custom software",
    "workflow automation",
  ],
  icons: {
    icon: "/assets/brand/logo-icon.png",
    apple: "/assets/brand/logo-icon.png",
  },
  openGraph: {
    title: "VERCUNO — Digital, Built Better.",
    description:
      "An independent software and AI studio designing and engineering websites, custom software, and intelligent workflows for ambitious businesses.",
    type: "website",
    locale: "en_US",
    siteName: "VERCUNO",
  },
  twitter: {
    card: "summary_large_image",
    title: "VERCUNO — Digital, Built Better.",
    description:
      "An independent software and AI studio designing and engineering websites, custom software, and intelligent workflows for ambitious businesses.",
  },
};

export const viewport: Viewport = {
  themeColor: "#02070A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-midnight" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${inter.variable} ${instrumentSerif.variable}`}
      >
        <script
          // Pre-paint gates:
          // - motion-ready: hero initial states only apply when JS is
          //   available and the OS does not request reduced motion.
          // - intro-pending: the cinematic preloader will play this
          //   session, so the hero is hidden and scroll locked before
          //   first paint to prevent any flash of unready content.
          // Both mutate the document element before hydration, so the
          // html element suppresses the known class-mismatch warning.
          dangerouslySetInnerHTML={{
            __html:
              "try{var m=matchMedia('(prefers-reduced-motion: reduce)');var ok=!m.matches&&!!window.matchMedia;if(ok){document.documentElement.classList.add('motion-ready')}m.addEventListener('change',function(e){if(e.matches){document.documentElement.classList.remove('motion-ready')}});if(ok){var replay=location.search.indexOf('intro=1')>=0;var seen=false;try{seen=window.sessionStorage.getItem('vercuno-intro-seen')==='1'}catch(e){}if(replay||!seen){document.documentElement.classList.add('intro-pending');document.documentElement.style.overflow='hidden'}}}catch(e){}",
          }}
        />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

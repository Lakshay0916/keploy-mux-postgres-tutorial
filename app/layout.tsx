import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollEffects } from "@/components/ScrollEffects";
import { MobileToc, Toc } from "@/components/Toc";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });

const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const metadata: Metadata = {
  metadataBase: new URL(productionHost ? `https://${productionHost}` : "http://localhost:3000"),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0f" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a
            href="#content"
            className="sr-only z-50 rounded-md bg-brand px-3 py-2 font-medium text-zinc-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          <ScrollEffects />
          <Header />
          <div className="mx-auto flex max-w-6xl gap-12 px-4 sm:px-6 lg:px-8">
            <main id="content" className="min-w-0 flex-1 pb-16 lg:pt-4">
              <MobileToc />
              <article id="top" className="prose mx-auto max-w-3xl dark:prose-invert">
                {children}
              </article>
            </main>
            <aside className="hidden w-56 shrink-0 lg:block print:hidden">
              <div className="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto py-12">
                <Toc />
              </div>
            </aside>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

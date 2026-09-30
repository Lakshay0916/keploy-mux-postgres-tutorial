import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Toc } from "@/components/Toc";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

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
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a
            href="#content"
            className="sr-only z-50 rounded-md bg-brand px-3 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          <Header />
          <div className="mx-auto flex max-w-6xl gap-10 px-4 sm:px-6">
            <main id="content" className="min-w-0 flex-1 py-10 lg:py-14">
              <article id="top" className="prose mx-auto max-w-3xl dark:prose-invert">
                {children}
              </article>
            </main>
            <aside className="hidden w-56 shrink-0 lg:block">
              <div className="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto py-14">
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

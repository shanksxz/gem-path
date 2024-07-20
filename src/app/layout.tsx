import "~/styles/globals.css";
import { Toaster } from "~/components/ui/sonner";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "GemPath",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <main>
          {children}
        </main>
        <Toaster  position="bottom-right"/>
      </body>
    </html>
  );
}

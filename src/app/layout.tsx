import "./globals.css";
import { Inter } from "next/font/google";
import ConvexClientProvider from "./ConvexClientProvider";
import { Navbar } from "./Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Scribble AI",
  description: "Generated AI images using scribble",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <ConvexClientProvider>
          <Navbar />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}

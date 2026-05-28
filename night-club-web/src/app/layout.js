import { Ubuntu } from "next/font/google";
import "./globals.css";

import Footer from "../components/Footer";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
});

export const metadata = {
  title: "Night Club",
  description: "Night Club booking system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${ubuntu.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

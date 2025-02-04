import localFont from "next/font/local";
import "./globals.css";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Analytics } from "@vercel/analytics/react"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Dimanco S.A DE C.V",
  description: "Constructora DIMANCO",
  icon: "/favicon.ico",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />

      </body>
    </html>
  );
}

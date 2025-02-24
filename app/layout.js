import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "./ReactQueryProvider";
import StoreProvider from "./StoreProvider";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import PageLoader from "@/components/PageLoader";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Genesis gallery",
  description: "Your ultimate destination for minting NFTs.",
};

export default function RootLayout({ children }) {
  return (
    <ReactQueryProvider>
      <StoreProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <ToastContainer />
            <Header />
            <Suspense fallback={<PageLoader />}>{children}</Suspense>
          </body>
        </html>
      </StoreProvider>
    </ReactQueryProvider>
  );
}

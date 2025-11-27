import QueryClientProviderWrapper from "@/components/shared/QueryClientProviderWrapper";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Web Developer Assignment",
  description: "This is an assessment for a frontend developer position",
  icons: ['https://cdn.prod.website-files.com/65e5d53252183f23144a7235/65f80f9e8c109b5c815e8b34_32%20logo.png']
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <QueryClientProviderWrapper>
          <div className="max-w-[900px] px-[10px] pt-[60px] sm:pt-[132px] pb-[40px] mx-auto">
            {children}
          </div>
          <ToastContainer />
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}

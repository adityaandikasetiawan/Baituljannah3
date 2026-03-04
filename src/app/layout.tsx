
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Baituljannah",
  description: "Yayasan Baituljannah - Membentuk Generasi Qur'ani",
  icons: {
    icon: [
      { url: "/uploads/logos/Yayasan.webp" }
    ],
    apple: [
      { url: "/uploads/logos/Yayasan.webp" }
    ],
    shortcut: [
      { url: "/uploads/logos/Yayasan.webp" }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

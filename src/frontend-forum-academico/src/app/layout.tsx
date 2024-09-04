import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import CustomToastContainer from "@/components/ToastContainer";
import { PostProvider } from "@/context/PostContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="imgs/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Rosario" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <PostProvider>
            <CustomToastContainer />
              {children}
          </PostProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import DrawerButton from "@/components/DrawerButton";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/header/Header";
import SignatureFooter from "@/components/footer/SignatureFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MACHINISTE",
  description: "Best Clothing Brand",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="drawer">
            <DrawerButton />
            <div className="drawer-content">
              <div className="min-h-screen flex flex-col bg-[#070707]">
                <Header />
                {children}
                <SignatureFooter />
              </div>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <Sidebar />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

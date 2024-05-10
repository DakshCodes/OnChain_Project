import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { PaymentsProvider } from "@/context/paymetsContext";

const font = Poppins({
  subsets: ["latin"],
  weight: "600"
});

export const metadata: Metadata = {
  title: "Course-Application",
  description: "Blockchain-Application For Course Selling ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  


  return (
    <html lang="en">
      <PaymentsProvider>
        <body className={font.className}>
          <Navbar />
          {children}
        </body>
      </PaymentsProvider>
    </html>
  );
}

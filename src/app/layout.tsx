import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/utils/providers/theme-provider";
import localFont from 'next/font/local'
import { Toaster } from "@/components/ui/toaster"
import { faker } from "@faker-js/faker";

export const metadata: Metadata = {
  title: "Prediqs",
  applicationName: "Prediqs",
  authors: [{ name: "Tougen", url: "https://github.com/tougenrip" }, { name:"DorukTan", url: "https://github.com/DorukTan" }],
  description: "Prediqs is an interactive platform where users can engage in market-driven forecasting by trading opinions on the outcomes of real-world events.",
};

const gilroy = localFont({
  src: [
    {
      path: './fonts/Gilroy-Regular.woff',
      weight: '300',
      style: 'normal'
    },
    {
      path: './fonts/Gilroy-Bold.woff',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--font-gilroy'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  faker.seed(31)
  return (
    <html className={gilroy.variable} lang="en" suppressHydrationWarning>
      <body className="max-w-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
        >
        <Navigation />
        {children}
        <Footer />
        <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

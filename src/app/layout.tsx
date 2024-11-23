import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/utils/providers/theme-provider";

export const metadata: Metadata = {
  title: "Prediqs",
  applicationName: "Prediqs",
  authors: [{ name: "Tougen", url: "https://github.com/tougenrip" }, { name:"DorukTan", url: "https://github.com/DorukTan" }],
  description: "Prediqs is an interactive platform where users can engage in market-driven forecasting by trading opinions on the outcomes of real-world events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          value={{ light: "light", dark: "dark" }}
        >
        <Navigation />
        {children}
        <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

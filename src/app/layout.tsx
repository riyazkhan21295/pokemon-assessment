import type { Metadata } from "next";
import "./globals.css";

import StyledComponentsRegistry from "@/lib/styled-components-registry";
import ReactQueryProviders from "@/lib/react-query-providers";

export const metadata: Metadata = {
  title: "Pokemon Assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ReactQueryProviders>{children}</ReactQueryProviders>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

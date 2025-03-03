import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contributor Badge",
  description: "Simple and customizable badges to showcase your OSS contributions in your Github profile or personal website.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

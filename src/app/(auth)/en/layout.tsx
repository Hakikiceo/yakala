import type { ReactNode } from "react";

import "@/app/globals.css";

const themeInitScript = `
  try {
    var storedTheme = window.localStorage.getItem("yakala-theme");
    var theme = storedTheme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
  } catch (error) {
    document.documentElement.dataset.theme = "dark";
  }
`;

export default function AuthEnglishLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full bg-[var(--color-bg)] text-[var(--color-text)]">{children}</body>
    </html>
  );
}

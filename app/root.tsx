import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export function meta() {
  return [
    { title: "Paul Truitt — AI Engineer" },
    { name: "description", content: "Portfolio of Paul Truitt, AI Engineer at Ayzenberg with 3 years of experience building intelligent systems, AI agents, and full-stack applications." },
    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:title", content: "Paul Truitt — AI Engineer" },
    { property: "og:description", content: "Portfolio of Paul Truitt, AI Engineer at Ayzenberg with 3 years of experience building intelligent systems, AI agents, and full-stack applications." },
    { property: "og:url", content: "https://paultruitt.dev" },
    { property: "og:site_name", content: "Paul Truitt" },
    { property: "og:locale", content: "en_US" },
    { property: "og:image", content: "https://paultruitt.dev/og-image.svg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Paul Truitt — AI Engineer" },
    { name: "twitter:description", content: "AI Engineer at Ayzenberg. Building intelligent systems, AI agents, and full-stack applications." },
    { name: "twitter:image", content: "https://paultruitt.dev/og-image.svg" },
    // Additional SEO
    { name: "author", content: "Paul Truitt" },
    { tagName: "link", rel: "canonical", href: "https://paultruitt.dev" },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <Meta />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://paultruitt.dev/#person",
                  name: "Paul Truitt",
                  jobTitle: "AI Engineer",
                  worksFor: {
                    "@type": "Organization",
                    name: "Ayzenberg",
                    url: "https://ayzenberg.com",
                  },
                  url: "https://paultruitt.dev",
                  sameAs: [
                    "https://github.com/donslaine",
                    "https://linkedin.com/in/paultruittdev",
                  ],
                  knowsAbout: [
                    "Artificial Intelligence",
                    "Machine Learning",
                    "TypeScript",
                    "Python",
                    "React",
                    "FastAPI",
                    "LangChain",
                    "Google Cloud Platform",
                  ],
                },
                {
                  "@type": "WebSite",
                  url: "https://paultruitt.dev",
                  name: "Paul Truitt — AI Engineer",
                  author: { "@id": "https://paultruitt.dev/#person" },
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

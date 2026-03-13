import { ExternalLink } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface Site {
  title: string;
  url: string;
  description: string;
  tech: string[];
}

const sites: Site[] = [
  {
    title: "Soulmates.ai",
    url: "https://soulmates.ai",
    description:
      "Marketing site for the Soulmates.ai consumer app. Built with Remix and Sanity CMS, featuring a library of CMS-driven blade components, HubSpot form integrations, and deployed on Netlify.",
    tech: ["Remix", "Sanity CMS", "TypeScript", "Netlify"],
  },
  {
    title: "Earned Media Values",
    url: "https://www.earnedmediavalues.com",
    description:
      "Enterprise social media analytics platform for Ayzenberg clients. Built with Remix and Contentful, featuring deep social data search and dashboards spanning Instagram, TikTok, YouTube, and X/Twitter.",
    tech: ["Remix", "Contentful", "Algolia", "JavaScript"],
  },
  {
    title: "Paul Hastings",
    url: "https://paulhastings.com",
    description:
      "Website for Paul Hastings LLP, one of the world's leading global law firms. Built with Gatsby and React, deployed on AWS CloudFront with multiple staging environments.",
    tech: ["Gatsby", "React", "JavaScript", "AWS CloudFront"],
  },
  {
    title: "Ayzenberg.com",
    url: "https://ayzenberg.com",
    description:
      "Corporate site for Ayzenberg, a full-service marketing agency. Built with Gatsby and deployed on AWS CloudFront, with CMS-driven content and custom tooling for editors.",
    tech: ["Gatsby", "React", "JavaScript", "AWS CloudFront"],
  },
  {
    title: "UVS Games",
    url: "https://www.uvsgames.com",
    description:
      "Website for UVS Games, the publisher of the UniVersus card game. A content-rich site serving a dedicated TCG community with game info, rules, and event coverage.",
    tech: ["Gatsby", "JavaScript", "React"],
  },
];

function SitePreview({ url, title }: { url: string; title: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block h-44 w-full overflow-hidden rounded-t-lg bg-muted"
    >
      <iframe
        src={url}
        title={`${title} preview`}
        className="pointer-events-none h-[900px] w-[1440px] origin-top-left scale-[0.25] border-0"
        loading="lazy"
        sandbox="allow-same-origin"
        tabIndex={-1}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-transparent transition-colors group-hover:bg-white/5" />
    </a>
  );
}

export default function LiveSites() {
  return (
    <section id="live-sites" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Live Sites
        </h2>
        <h3 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Deployed Work
        </h3>
        <p className="mb-10 text-muted-foreground">
          Production websites I've built and shipped at Ayzenberg.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => (
            <Card
              key={site.title}
              className="flex flex-col overflow-hidden border-border/50 bg-card p-0 transition-colors hover:border-border"
            >
              <SitePreview url={site.url} title={site.title} />

              <div className="flex flex-1 flex-col p-5">
                <CardHeader className="p-0 pb-2">
                  <CardTitle className="text-base font-semibold">
                    {site.title}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {site.url.replace("https://", "")}
                  </p>
                </CardHeader>

                <CardContent className="flex-1 p-0">
                  <CardDescription className="text-sm leading-relaxed">
                    {site.description}
                  </CardDescription>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {site.tech.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-0 pt-4">
                  <Button variant="ghost" size="sm" asChild className="h-8 px-2">
                    <a href={site.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                      Visit Site
                    </a>
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

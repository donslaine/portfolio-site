import { ExternalLink, Github, Lock } from "lucide-react";
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

interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  private?: boolean;
}

const projects: Project[] = [
  {
    title: "Soulmates — Consumer App & Backend",
    description:
      "Core contributor to the Soulmates.ai consumer application and its Python backend. Built and maintained product features across the full stack — from the React/TypeScript frontend to FastAPI services — as the platform scaled to production on GCP.",
    tech: ["TypeScript", "React", "Python", "FastAPI", "GCP"],
    private: true,
  },
  {
    title: "AI Orchestration Agent",
    description:
      "Developed the Soulmates orchestrator agent: a Python-based AI agent responsible for routing, coordinating, and managing multi-step AI workflows across the platform. Integrated OpenTelemetry tracing with Langfuse and LiteLLM for full observability of LLM calls in production.",
    tech: ["Python", "LangChain", "LiteLLM", "Langfuse", "OpenTelemetry"],
    private: true,
  },
  {
    title: "Social Index Enterprise",
    description:
      "Built and maintained Social Index for Enterprise — a data-rich social media analytics platform serving enterprise clients. Developed with Remix and Contentful, featuring deeply integrated social data search and an admin dashboard spanning Instagram, TikTok, YouTube, and X/Twitter.",
    tech: ["JavaScript", "Remix", "Contentful", "Algolia", "TypeScript"],
    private: true,
  },
  {
    title: "Soulmates Audit Log Service",
    description:
      "Designed and built a production microservice for append-only audit logging across the Soulmates platform. Features cursor-based event querying, aggregated stats, filter endpoints for the admin dashboard, and hardened auth using GCP Workload Identity in production and API keys in dev.",
    tech: ["Python", "FastAPI", "MongoDB", "GCP Cloud Run", "GitHub Actions"],
    private: true,
  },
  {
    title: "Soulmates.ai — Marketing Site",
    description:
      "Built and maintain the public marketing site for the Soulmates.ai consumer app. A TypeScript/React application powered by Sanity CMS, featuring a library of CMS-driven blade components, SSR with hydration-safe viewport handling, and responsive mobile layouts.",
    tech: ["TypeScript", "React", "Sanity CMS", "SSR", "Tailwind CSS"],
    private: true,
  },
  {
    title: "GCP Load Balancer Infrastructure",
    description:
      "Authored Terraform infrastructure for the Soulmates.ai API tier — provisioning GCP Cloud Armor, a global load balancer, and defense-in-depth security rules as Infrastructure as Code. Ensured HA and DDoS protection for all backend services.",
    tech: ["Terraform", "GCP Cloud Armor", "HCL", "Load Balancing"],
    private: true,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Projects
        </h2>
        <h3 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Things I've Built
        </h3>
        <p className="mb-10 text-muted-foreground">
          A selection of projects from my work at{" "}
          <a
            href="https://ayzenberg.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-colors hover:text-foreground"
          >
            Ayzenberg
          </a>{" "}
          on the Soulmates.ai platform and client products. All source code is
          proprietary.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <Card
              key={project.title}
              className="flex flex-col border-border/50 bg-card transition-colors hover:border-border"
            >
              <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
                <CardTitle className="text-base font-semibold">
                  {project.title}
                </CardTitle>
                {project.private && (
                  <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                )}
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="text-sm leading-relaxed">
                  {project.description}
                </CardDescription>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              {(project.github || project.demo) && (
                <CardFooter className="gap-2 pt-0">
                  {project.github && (
                    <Button variant="ghost" size="sm" asChild className="h-8 px-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-1.5 h-3.5 w-3.5" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button variant="ghost" size="sm" asChild className="h-8 px-2">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                        Demo
                      </a>
                    </Button>
                  )}
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

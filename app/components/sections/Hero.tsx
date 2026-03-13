import { ArrowDown, Github, Linkedin } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            AI Engineer
          </p>
          <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Paul Truitt
          </h1>
        </div>

        <p className="max-w-xl text-lg text-muted-foreground">
          Building intelligent systems and full-stack applications. 3 years of
          experience shipping products that matter.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <a href="#projects">View Projects</a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#contact">Get in Touch</a>
          </Button>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <a
            href="https://github.com/donslaine"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
            donslaine
          </a>
          <span className="text-border">|</span>
          <a
            href="https://linkedin.com/in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-10 flex flex-col items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Scroll to about"
      >
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}

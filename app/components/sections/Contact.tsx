import { Github, Linkedin } from "lucide-react";
import { Button } from "~/components/ui/button";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/donslaine",
    icon: Github,
    description: "See my public repos",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/",
    icon: Linkedin,
    description: "Connect with me",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Contact
        </h2>
        <h3 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Let's Talk
        </h3>
        <p className="mb-10 max-w-md text-muted-foreground">
          I'm open to new opportunities, collaborations, or just a good
          conversation about AI. Reach out through any of the channels below.
        </p>

        <div className="flex flex-wrap gap-4">
          {links.map((link) => (
            <Button
              key={link.label}
              variant="outline"
              size="lg"
              asChild
              className="h-14 px-6"
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <link.icon className="mr-2 h-4 w-4" />
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{link.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {link.description}
                  </span>
                </div>
              </a>
            </Button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-5xl border-t border-border/50 pt-8 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Paul Truitt. Built with React Router &
          ShadCN.
        </p>
      </div>
    </section>
  );
}

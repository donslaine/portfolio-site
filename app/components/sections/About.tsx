import ContributionGraph from "~/components/ContributionGraph";
import { Separator } from "~/components/ui/separator";

const stats = [
  { value: "3+", label: "Years of Experience" },
  { value: "10+", label: "Projects Shipped" },
  { value: "∞", label: "Problems Debugged" },
];

export default function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          About
        </h2>
        <h3 className="mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Who I Am
        </h3>

        <div className="grid gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-4 text-muted-foreground">
            <p>
              I'm Paul, an AI Engineer with 3 years of experience designing and
              shipping software at the intersection of machine learning and
              full-stack development. I specialize in building LLM-powered
              applications, intelligent pipelines, and the interfaces that make
              them useful.
            </p>
            <p>
              I've worked across the full stack — from crafting responsive UIs to
              designing scalable backend services and integrating AI models into
              real-world products. Most of my work lives in private repositories,
              but the principles behind it are open: write clear code, ship often,
              and solve problems that actually matter.
            </p>
            <p>
              When I'm not building, I'm exploring new techniques in the AI/ML
              space and staying current with a field that moves fast.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-6">
            {stats.map((stat, i) => (
              <div key={stat.label}>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-foreground">
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
                {i < stats.length - 1 && <Separator className="mt-6" />}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h4 className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            GitHub Activity
          </h4>
          <ContributionGraph />
        </div>
      </div>
    </section>
  );
}

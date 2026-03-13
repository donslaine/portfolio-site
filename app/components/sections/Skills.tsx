import { Badge } from "~/components/ui/badge";

const skillGroups = [
  {
    category: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "SQL", "Bash"],
  },
  {
    category: "AI / ML",
    skills: ["LangChain", "OpenAI API", "HuggingFace", "RAG", "Prompt Engineering", "Vector DBs"],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "Vite"],
  },
  {
    category: "Backend",
    skills: ["FastAPI", "Node.js", "PostgreSQL", "Redis", "REST APIs"],
  },
  {
    category: "Tools & Infra",
    skills: ["Docker", "Git", "AWS", "CI/CD", "Linux"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Skills
        </h2>
        <h3 className="mb-10 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Tech Stack
        </h3>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="text-xs font-normal"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

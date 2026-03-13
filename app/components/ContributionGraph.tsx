import { useEffect, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface Week {
  contributionDays: ContributionDay[];
}

interface CalendarData {
  totalContributions: number;
  weeks: Week[];
}

interface ActivityDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

function toActivityData(calendar: CalendarData): ActivityDay[] {
  return calendar.weeks
    .flatMap((w) => w.contributionDays)
    .map((d) => ({
      date: d.date,
      count: d.contributionCount,
      level: getLevel(d.contributionCount),
    }));
}

// Zinc-toned dark theme to match the site palette
const theme = {
  dark: [
    "oklch(0.269 0 0)",   // level 0 — muted bg
    "oklch(0.38 0 0)",    // level 1
    "oklch(0.52 0 0)",    // level 2
    "oklch(0.68 0 0)",    // level 3
    "oklch(0.922 0 0)",   // level 4 — near white
  ],
};

export default function ContributionGraph() {
  const [data, setData] = useState<ActivityDay[] | null>(null);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/.netlify/functions/contributions")
      .then((r) => {
        if (!r.ok) throw new Error("Failed");
        return r.json();
      })
      .then((calendar: CalendarData) => {
        setTotal(calendar.totalContributions);
        setData(toActivityData(calendar));
      })
      .catch(() => setError(true));
  }, []);

  if (error) return null;

  if (!data) {
    return <div className="h-32 w-full animate-pulse rounded-md bg-muted" />;
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="mb-3">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            {total.toLocaleString()}
          </span>{" "}
          contributions in the last year
        </p>
      </div>
      <ActivityCalendar
        data={data}
        theme={theme}
        colorScheme="dark"
        hideColorLegend={false}
        hideTotalCount={true}
        blockSize={11}
        blockMargin={3}
        fontSize={12}
        labels={{
          legend: { less: "Less", more: "More" },
          months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
          weekdays: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
          totalCount: "{{count}} contributions in {{year}}",
        }}
        style={{ color: "oklch(0.556 0 0)" }}
      />
    </div>
  );
}

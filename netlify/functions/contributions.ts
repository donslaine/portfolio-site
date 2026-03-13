import type { Handler } from "@netlify/functions";

const GITHUB_GRAPHQL = "https://api.github.com/graphql";

const query = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              color
            }
          }
        }
      }
    }
  }
`;

export const handler: Handler = async () => {
  const token = process.env.GITHUB_PAT;

  if (!token) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing GITHUB_PAT env var" }),
    };
  }

  const res = await fetch(GITHUB_GRAPHQL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login: "donslaine" } }),
  });

  if (!res.ok) {
    return {
      statusCode: res.status,
      body: JSON.stringify({ error: "GitHub API error" }),
    };
  }

  const json = await res.json();
  const calendar =
    json?.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Unexpected GitHub response" }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
    body: JSON.stringify(calendar),
  };
};

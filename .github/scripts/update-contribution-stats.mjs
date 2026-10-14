import fs from "node:fs";

const token = process.env.GH_TOKEN;
const username = "programmermdemonmiah";
if (!token) {
  throw new Error("Missing GH_TOKEN secret. Add a GitHub token as a repository Actions secret named GH_TOKEN.");
}

const now = new Date();
const iso = (date) => date.toISOString();
const startOfYear = (year) => new Date(Date.UTC(year, 0, 1));
const endOfYear = (year) => new Date(Date.UTC(year + 1, 0, 1) - 1000);
const daysAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

async function getContributions(from, to) {
  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
          totalIssueContributions
          totalPullRequestContributions
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "profile-contribution-summary"
    },
    body: JSON.stringify({
      query,
      variables: { login: username, from: iso(from), to: iso(to) }
    })
  });

  const payload = await response.json();
  if (!response.ok || payload.errors || !payload.data?.user) {
    throw new Error("GitHub GraphQL request failed: " + JSON.stringify(payload.errors || payload));
  }
  return payload.data.user.contributionsCollection;
}

function row(label, data) {
  return `| ${label} | ${data.totalCommitContributions} | ${data.totalPullRequestContributions} | ${data.totalIssueContributions} | ${data.contributionCalendar.totalContributions} |\n`;
}

const currentYear = now.getUTCFullYear();
const previousYear = currentYear - 1;
const periods = [
  ["Last 365 days", daysAgo, now],
  [`Calendar year ${currentYear}`, startOfYear(currentYear), now],
  [`Calendar year ${previousYear}`, startOfYear(previousYear), endOfYear(previousYear)]
];

let table = "| Period | GitHub-counted commits | Pull requests | Issues | Total contributions |\n";
table += "|---|---:|---:|---:|---:|\n";
for (const [label, from, to] of periods) {
  const data = await getContributions(from, to);
  table += row(label, data);
}

const readmePath = "README.md";
const readme = fs.readFileSync(readmePath, "utf8");
const start = "<!-- CONTRIBUTION_STATS:START -->";
const end = "<!-- CONTRIBUTION_STATS:END -->";
if (!readme.includes(start) || !readme.includes(end)) {
  throw new Error("README contribution stats markers were not found.");
}
const replacement = `${start}\n${table.trimEnd()}\n${end}`;
const updated = readme.replace(new RegExp(start + "[\\s\\S]*?" + end), replacement);
if (updated === readme) {
  console.log("Contribution summary is already up to date.");
} else {
  fs.writeFileSync(readmePath, updated);
  console.log("Updated README contribution summary.");
}

import { StepConfig } from './types';

export const STEPS: StepConfig[] = [
  { id: 0, label: "Nice To Meet You", number: "01", title: "Nice To Meet You" },
  { id: 1, label: "What Are You Looking For", number: "02", title: "What kind of help are you looking for?" },
  { id: 2, label: "Where are you right now?", number: "03", title: "What does your current situation look like?" },
  { id: 3, label: "What are you hoping this leads to?", number: "04", title: "What are you hoping this turns into?" },
  { id: 4, label: "Anything we should know?", number: "05", title: "Anything Else We Should Know?" },
  { id: 5, label: "Our Perspective", number: "06", title: "Our Perspective" },
];

export const LOOKING_FOR_OPTIONS = [
  "Website rebuild / new site",
  "SEO & growth",
  "CRO / optimization",
  "AI & automation",
  "Ongoing marketing partnership"
];

export const CURRENT_WEBSITE_OPTIONS = [
  "We don't have a website yet",
  "We have a website, but it's outdated",
  "We have a website, but it's not converting",
  "We recently launched or redesigned our website",
  "Our website is solid, but we've outgrown it",
  "I'm not sure; it just doesn't feel right"
];

export const TEAM_SITUATION_OPTIONS = [
  "Founder-led (we do most things ourselves)",
  "Small internal team, wearing multiple hats",
  "Dedicated marketing role or team",
  "Working with freelancers or agencies",
  "A mix of internal team + external partners",
  "I'm not sure — it's a bit messy right now"
];

export const TRAFFIC_REALITY_OPTIONS = [
  "We're getting very little traffic",
  "Traffic is steady, but leads are inconsistent",
  "We get traffic, but it's not the right audience",
  "Traffic and leads are growing, but not fast enough",
  "We're growing, but we don't fully trust the data",
  "I'm not sure — we haven't looked closely"
];

export const HOPING_FOR_OPTIONS = [
  "More qualified inbound leads",
  "A foundation we can build on long-term",
  "Higher conversion rates",
  "Easier internal management",
  "I'm not sure — I want guidance"
];

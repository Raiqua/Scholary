export type Mode = "demo" | "real";
export type EntryType = "income" | "expense";
export type EntryOrigin = "screenshot" | "email" | "voice" | "manual";

export type Hustle = {
  id: string;
  name: string;
  icon: string;
  color: string;
  hourlyGoal?: number;
};

export type Entry = {
  id: string;
  hustleId: string;
  amount: number;
  source: string;
  date: string;
  type: EntryType;
  hours?: number;
  origin: EntryOrigin;
  verified?: boolean;
  note?: string;
};

export type Goal = {
  id: string;
  name: string;
  mode: "save" | "earn";
  target: number;
  saved: number;
  deadline: string;
  color: string;
};

export type JarTransfer = {
  id: string;
  amount: number;
  date: string;
  note: string;
};

export type ScholaryData = {
  name: string;
  hustles: Hustle[];
  entries: Entry[];
  goals: Goal[];
  transfers: JarTransfer[];
};

export const zeroData: ScholaryData = {
  name: "New account",
  hustles: [],
  entries: [],
  goals: [],
  transfers: [],
};

export const demoData: ScholaryData = {
  name: "Maya Rivera",
  hustles: [
    {
      id: "tutor",
      name: "Tutoring",
      icon: "✦",
      color: "#D6A94B",
      hourlyGoal: 28,
    },
    {
      id: "dogs",
      name: "Dog walking",
      icon: "⌁",
      color: "#A6B68A",
      hourlyGoal: 22,
    },
    {
      id: "etsy",
      name: "Etsy shop",
      icon: "◇",
      color: "#D17C62",
      hourlyGoal: 32,
    },
    {
      id: "delivery",
      name: "DoorDash",
      icon: "↗",
      color: "#8D9A70",
      hourlyGoal: 25,
    },
  ],
  entries: [
    {
      id: "e1",
      hustleId: "tutor",
      amount: 120,
      source: "Tutoring · Maya",
      date: "2026-10-02",
      type: "income",
      hours: 4,
      origin: "voice",
    },
    {
      id: "e2",
      hustleId: "dogs",
      amount: 84,
      source: "Dog walking · 3 visits",
      date: "2026-10-01",
      type: "income",
      hours: 3,
      origin: "manual",
      verified: true,
    },
    {
      id: "e3",
      hustleId: "delivery",
      amount: 62.5,
      source: "DoorDash payout",
      date: "2026-09-30",
      type: "income",
      origin: "screenshot",
      verified: true,
    },
    {
      id: "e4",
      hustleId: "etsy",
      amount: 48,
      source: "Etsy order #1048",
      date: "2026-09-28",
      type: "income",
      origin: "email",
    },
    {
      id: "e5",
      hustleId: "delivery",
      amount: 16.25,
      source: "Gas + parking",
      date: "2026-09-28",
      type: "expense",
      origin: "manual",
      note: "Route costs",
    },
    {
      id: "e6",
      hustleId: "tutor",
      amount: 95,
      source: "Tutoring · Leo",
      date: "2026-09-26",
      type: "income",
      hours: 3.5,
      origin: "manual",
    },
    {
      id: "e7",
      hustleId: "dogs",
      amount: 70,
      source: "Dog walking · weekend",
      date: "2026-09-24",
      type: "income",
      hours: 2.5,
      origin: "manual",
    },
  ],
  goals: [
    {
      id: "g1",
      name: "Laptop upgrade",
      mode: "save",
      target: 900,
      saved: 560,
      deadline: "2026-12-20",
      color: "#D6A94B",
    },
    {
      id: "g2",
      name: "Earn $1k this month",
      mode: "earn",
      target: 1000,
      saved: 742.5,
      deadline: "2026-10-31",
      color: "#D17C62",
    },
  ],
  transfers: [
    { id: "t1", amount: 190, date: "2026-10-01", note: "Weekly tax set-aside" },
    { id: "t2", amount: 120, date: "2026-09-24", note: "Weekly tax set-aside" },
  ],
};

export const sourceLabels: Record<EntryOrigin, string> = {
  screenshot: "From screenshot",
  email: "From email",
  voice: "Voice logged",
  manual: "Manual",
};

export function summarize(data: ScholaryData) {
  const income = data.entries
    .filter(entry => entry.type === "income")
    .reduce((sum, entry) => sum + entry.amount, 0);
  const expenses = data.entries
    .filter(entry => entry.type === "expense")
    .reduce((sum, entry) => sum + entry.amount, 0);
  const estimatedTax = income * 0.18;
  const jar = data.transfers.reduce(
    (sum, transfer) => sum + transfer.amount,
    0
  );
  const safeToSpend = Math.max(0, income - expenses - estimatedTax);
  const currentGoal = data.goals[0];
  const goalProgress = currentGoal
    ? Math.min(100, Math.round((currentGoal.saved / currentGoal.target) * 100))
    : 0;
  return {
    income,
    expenses,
    estimatedTax,
    jar,
    safeToSpend,
    currentGoal,
    goalProgress,
  };
}

export function forecastFor(data: ScholaryData) {
  if (!data.entries.some(entry => entry.type === "income")) return [];
  const base = [420, 540, 480, 650, 610, 760, 700, 820];
  const factor = Math.max(0.65, Math.min(1.4, summarize(data).income / 742.5));
  return base.map((value, index) => ({
    week: `W${index + 1}`,
    expected: Math.round(value * factor),
    low: Math.round(value * factor * 0.72),
    high: Math.round(value * factor * 1.24),
  }));
}

export function money(value: number, digits = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
}

export function shortDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export function entryColor(entry: Entry, hustles: Hustle[]) {
  return (
    hustles.find(hustle => hustle.id === entry.hustleId)?.color ?? "#8D9A70"
  );
}

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import {
  ArrowDownLeft,
  ArrowUpRight,
  BarChart3,
  Bell,
  Bot,
  CalendarDays,
  Camera,
  Check,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  CloudSun,
  FileText,
  FolderOpen,
  Goal,
  Inbox,
  LayoutDashboard,
  Leaf,
  LogOut,
  Mail,
  Menu,
  Mic,
  MoreHorizontal,
  Plus,
  ReceiptText,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Trash2,
  UploadCloud,
  WalletCards,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import {
  demoData,
  entryColor,
  forecastFor,
  money,
  shortDate,
  sourceLabels,
  summarize,
  zeroData,
  type Entry,
  type EntryOrigin,
  type Goal as GoalRecord,
  type Hustle as HustleRecord,
  type JarTransfer,
  type Mode,
  type ScholaryData,
} from "@/lib/scholary";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const navItems: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Income", href: "/income", icon: WalletCards },
  { label: "Hustles", href: "/hustles", icon: Zap },
  { label: "Goals", href: "/goals", icon: Goal },
  { label: "Tax jar", href: "/tax", icon: ReceiptText },
  { label: "Coach", href: "/coach", icon: Bot },
];

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 ${dark ? "text-[#E8DFC9]" : "text-[#2F3A2E]"}`}
    >
      <img
        src="/scholarify-logo.jpeg"
        alt="Scholary logo"
        className="h-9 w-9 rounded-[13px] bg-[#E8DFC9] object-cover object-[54%_46%] shadow-[0_5px_0_#2F3A2E]"
      />
      <span className="font-display text-[1.45rem] font-extrabold tracking-[-0.06em]">
        Scholary
      </span>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#6B7352]">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-xl font-extrabold tracking-[-0.04em] text-[#2F3A2E] sm:text-2xl">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}

function SourceBadge({
  origin,
  verified,
}: {
  origin: EntryOrigin;
  verified?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#CBD2C1]/55 px-2.5 py-1 text-[10px] font-bold text-[#526047]">
      {verified ? (
        <ShieldCheck className="h-3 w-3 text-[#3E6D51]" />
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-[#D17C62]" />
      )}
      {verified ? "Verified" : sourceLabels[origin]}
    </span>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  helper,
  className = "",
  dark = false,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  helper: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`rounded-[26px] p-5 shadow-[0_12px_30px_rgba(47,58,46,0.08)] ${dark ? "bg-[#2F3A2E] text-[#E8DFC9]" : "bg-[#F8F6EE] text-[#2F3A2E]"} ${className}`}
    >
      <div className="mb-7 flex items-center justify-between">
        <p
          className={`text-[10px] font-bold uppercase tracking-[0.18em] ${dark ? "text-[#CBD2C1]/65" : "text-[#6B7352]"}`}
        >
          {label}
        </p>
        <span
          className={`grid h-9 w-9 place-items-center rounded-2xl ${dark ? "bg-[#6B7352] text-[#E8DFC9]" : "bg-[#CBD2C1]/70 text-[#4A3A2C]"}`}
        >
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="font-display text-3xl font-extrabold tracking-[-0.06em]">
        {value}
      </p>
      <p
        className={`mt-1 text-xs ${dark ? "text-[#E8DFC9]/65" : "text-[#6B7352]"}`}
      >
        {helper}
      </p>
    </motion.div>
  );
}

function Landing({
  onDemo,
  onSignup,
  onLogin,
}: {
  onDemo: () => void;
  onSignup: () => void;
  onLogin: () => void;
}) {
  return (
    <div className="min-h-screen overflow-hidden bg-[#CBD2C1] text-[#2F3A2E]">
      <header className="relative z-10 mx-auto flex max-w-[1320px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Logo />
        <div className="hidden items-center gap-8 text-sm font-bold text-[#526047] md:flex">
          <a href="#how-it-works" className="transition hover:text-[#4A3A2C]">
            How it works
          </a>
          <a href="#privacy" className="transition hover:text-[#4A3A2C]">
            Our promise
          </a>
          <button onClick={onLogin} className="text-[#4A3A2C]">
            Log in
          </button>
          <Button
            onClick={onSignup}
            className="h-11 rounded-full bg-[#4A3A2C] px-5 text-[#E8DFC9] shadow-[0_4px_0_#2F3A2E] hover:bg-[#5a4838]"
          >
            Sign up free <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
        <button
          onClick={onLogin}
          className="grid h-10 w-10 place-items-center rounded-full bg-[#E8DFC9]/70 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      <main>
        <section className="relative mx-auto grid max-w-[1320px] items-center gap-12 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-12 lg:pb-28 lg:pt-16">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#6B7352]/25 bg-[#E8DFC9]/65 px-3 py-1.5 text-xs font-bold text-[#526047]">
              <Sparkles className="h-3.5 w-3.5 text-[#D17C62]" /> Built for the
              in-between income
            </div>
            <h1 className="max-w-xl font-display text-[3.65rem] font-extrabold leading-[.94] tracking-[-0.075em] sm:text-[5.5rem]">
              Your gigs.
              <br />
              <span className="text-[#4A3A2C]">Your paycheck.</span>
              <br />
              Zero bank linking.
            </h1>
            <p className="mt-7 max-w-md text-lg leading-8 text-[#526047]">
              Scholary turns the money you make between everything else into a
              plan you can actually see.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                onClick={onSignup}
                className="h-14 rounded-2xl bg-[#4A3A2C] px-6 text-base font-extrabold text-[#E8DFC9] shadow-[0_5px_0_#2F3A2E] hover:bg-[#5a4838]"
              >
                Start for free <ArrowUpRight className="h-5 w-5" />
              </Button>
              <Button
                onClick={onDemo}
                variant="outline"
                className="h-14 rounded-2xl border-[#6B7352]/45 bg-[#E8DFC9]/55 px-6 text-base font-extrabold text-[#2F3A2E] hover:bg-[#E8DFC9]"
              >
                Try the live demo
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-3 text-xs font-bold text-[#526047]">
              <span className="flex -space-x-2">
                <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#CBD2C1] bg-[#D17C62] text-[10px] text-white">
                  JR
                </span>
                <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#CBD2C1] bg-[#6B7352] text-[10px] text-white">
                  MK
                </span>
                <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#CBD2C1] bg-[#4A3A2C] text-[10px] text-white">
                  AS
                </span>
              </span>{" "}
              Made for people with more than one thing going on.
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] lg:justify-self-end">
            <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-[#E8DFC9]/50 blur-2xl" />
            <div className="relative rotate-[2deg] rounded-[34px] border border-white/35 bg-[#F8F6EE]/92 p-4 shadow-[0_30px_70px_rgba(47,58,46,0.20)] backdrop-blur sm:p-5">
              <div className="flex items-center justify-between border-b border-[#CBD2C1]/65 px-2 pb-4">
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#4A3A2C] text-xs font-black text-[#E8DFC9]">
                    S
                  </span>
                  <span className="text-sm font-extrabold">Add income</span>
                </div>
                <span className="rounded-full bg-[#CBD2C1]/55 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-[#6B7352]">
                  Screenshot
                </span>
              </div>
              <div className="my-5 flex items-center gap-4 rounded-2xl border border-dashed border-[#6B7352]/35 bg-[#E8DFC9]/45 p-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#D17C62]/15 text-[#D17C62]">
                  <Camera className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-extrabold">Etsy payout.png</p>
                  <p className="mt-1 text-xs text-[#6B7352]">
                    Scanned just now · 94% confident
                  </p>
                </div>
                <Check className="ml-auto h-5 w-5 rounded-full bg-[#3E6D51] p-1 text-white" />
              </div>
              <div className="rounded-[22px] bg-[#2F3A2E] p-5 text-[#E8DFC9]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#CBD2C1]/65">
                      Looks like income
                    </p>
                    <p className="mt-2 font-display text-4xl font-extrabold tracking-[-.06em]">
                      $48.00
                    </p>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#6B7352]">
                    <ArrowDownLeft className="h-5 w-5" />
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-xl bg-white/5 p-3">
                    <span className="text-[#CBD2C1]/55">Source</span>
                    <p className="mt-1 font-bold">Etsy</p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3">
                    <span className="text-[#CBD2C1]/55">Date</span>
                    <p className="mt-1 font-bold">Sep 28, 2026</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-[#CBD2C1]/65">
                    Hustle · Etsy shop
                  </span>
                  <button
                    onClick={onDemo}
                    className="rounded-xl bg-[#D6A94B] px-3 py-2 text-xs font-extrabold text-[#2F3A2E]"
                  >
                    Confirm & log
                  </button>
                </div>
              </div>
              <p className="px-1 pt-4 text-center text-[11px] font-bold text-[#6B7352]">
                No bank. No passwords to your accounts. Just your proof.
              </p>
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-2xl bg-[#4A3A2C] px-4 py-3 text-[#E8DFC9] shadow-xl">
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#CBD2C1]/70">
                Safe this week
              </p>
              <p className="mt-1 font-display text-xl font-extrabold">
                $186.40
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#E8DFC9] px-5 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-4 md:grid-cols-3">
              <ProblemStat
                icon={CloudSun}
                title="Income moves around"
                copy="A steady plan should not require a steady paycheck."
              />
              <ProblemStat
                icon={ReceiptText}
                title="Taxes sneak up"
                copy="Know what to set aside before the deadline does."
              />
              <ProblemStat
                icon={FileText}
                title="Proof is scattered"
                copy="Turn your hustle history into something you can share."
              />
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="bg-[#2F3A2E] px-5 py-20 text-[#E8DFC9] sm:px-8 lg:px-12"
        >
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[.24em] text-[#CBD2C1]/65">
                  A calmer way to hustle
                </p>
                <h2 className="max-w-lg font-display text-4xl font-extrabold leading-[.95] tracking-[-.06em] sm:text-5xl">
                  From a scattered side gig to a clear next move.
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-6 text-[#CBD2C1]/70">
                Built for the money you make after school, between shifts, or on
                the weekend.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              <HowStep
                number="01"
                title="Log it"
                copy="Snap a payout, forward an email, say it out loud, or type it in."
                icon={UploadCloud}
              />
              <HowStep
                number="02"
                title="Understand it"
                copy="See what is safe to spend, what belongs in your tax jar, and what comes next."
                icon={BarChart3}
              />
              <HowStep
                number="03"
                title="Prove it"
                copy="Keep a clean, shareable snapshot of the work you are already doing."
                icon={ShieldCheck}
              />
            </div>
          </div>
        </section>

        <section
          id="privacy"
          className="bg-[#E8DFC9] px-5 py-16 sm:px-8 lg:px-12"
        >
          <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-8 rounded-[30px] bg-[#CBD2C1] p-7 sm:p-10 md:flex-row md:items-center">
            <div className="flex max-w-xl items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#4A3A2C] text-[#E8DFC9]">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-2xl font-extrabold tracking-[-.04em]">
                  Your money should stay yours.
                </p>
                <p className="mt-2 text-sm leading-6 text-[#526047]">
                  No bank. No passwords to your accounts. No mystery math.
                  Scholary only knows what you choose to log.
                </p>
              </div>
            </div>
            <Button
              onClick={onSignup}
              className="h-12 rounded-2xl bg-[#4A3A2C] px-5 font-extrabold text-[#E8DFC9] hover:bg-[#5a4838]"
            >
              Make it yours <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      <footer className="flex flex-col justify-between gap-3 bg-[#E8DFC9] px-5 pb-8 text-xs font-bold text-[#6B7352] sm:flex-row sm:px-8 lg:px-12">
        <span>© 2026 Scholary</span>
        <span>From Hustle to Harmony.</span>
        <span>No bank linking. Ever.</span>
      </footer>
    </div>
  );
}

function ProblemStat({
  icon: Icon,
  title,
  copy,
}: {
  icon: LucideIcon;
  title: string;
  copy: string;
}) {
  return (
    <div className="rounded-[26px] bg-[#F8F6EE] p-6">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#CBD2C1] text-[#4A3A2C]">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-6 font-display text-xl font-extrabold tracking-[-.04em]">
        {title}
      </h3>
      <p className="mt-2 max-w-xs text-sm leading-6 text-[#6B7352]">{copy}</p>
    </div>
  );
}

function HowStep({
  number,
  title,
  copy,
  icon: Icon,
}: {
  number: string;
  title: string;
  copy: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-[26px] border border-[#CBD2C1]/20 bg-[#6B7352]/30 p-6">
      <div className="flex items-center justify-between">
        <span className="font-display text-4xl font-extrabold tracking-[-.08em] text-[#D6A94B]">
          {number}
        </span>
        <Icon className="h-6 w-6 text-[#CBD2C1]" />
      </div>
      <h3 className="mt-10 font-display text-2xl font-extrabold tracking-[-.05em]">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-[#CBD2C1]/70">{copy}</p>
    </div>
  );
}

function AuthPage({
  kind,
  onDemo,
  onEnter,
}: {
  kind: "login" | "signup";
  onDemo: () => void;
  onEnter: (mode: Mode, name?: string) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [accountName, setAccountName] = useState("");
  const signup = kind === "signup";
  return (
    <div className="min-h-screen bg-[#CBD2C1] px-5 py-6 text-[#2F3A2E] sm:px-8">
      <div className="mx-auto flex max-w-[1160px] items-center justify-between">
        <a href="/" className="no-underline">
          <Logo />
        </a>
        <button onClick={onDemo} className="text-sm font-bold text-[#4A3A2C]">
          Try the demo <ArrowUpRight className="ml-1 inline h-4 w-4" />
        </button>
      </div>
      <div className="mx-auto grid max-w-[1160px] items-center gap-12 py-14 lg:grid-cols-[.9fr_1.1fr] lg:py-24">
        <div className="hidden lg:block">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[.24em] text-[#6B7352]">
            {signup
              ? "Your own pocket-sized paycheck"
              : "Good to see you again"}
          </p>
          <h1 className="max-w-md font-display text-6xl font-extrabold leading-[.93] tracking-[-.07em]">
            {signup ? (
              <>
                Make your money feel{" "}
                <span className="text-[#4A3A2C]">less random.</span>
              </>
            ) : (
              <>
                Pick up where your{" "}
                <span className="text-[#4A3A2C]">hustle</span> left off.
              </>
            )}
          </h1>
          <p className="mt-6 max-w-sm text-base leading-7 text-[#526047]">
            No bank linking. No judgment. Just a clear view of the work you are
            already doing.
          </p>
        </div>
        <div className="mx-auto w-full max-w-md rounded-[30px] bg-[#F8F6EE] p-6 shadow-[0_22px_50px_rgba(47,58,46,0.12)] sm:p-8">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#6B7352]">
            {signup ? "Start your free account" : "Welcome back"}
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-[-.06em]">
            {signup
              ? "A better money habit starts here."
              : "Log in to your Scholary."}
          </h2>
          <div className="mt-7 space-y-4">
            <label className="block text-sm font-bold">
              {signup && "Your name"}
              <input
                className="mt-2 h-12 w-full rounded-2xl border border-[#CBD2C1] bg-[#E8DFC9]/40 px-4 outline-none transition focus:border-[#4A3A2C]"
                placeholder={signup ? "Maya Rivera" : "you@example.com"}
                value={signup ? accountName : undefined}
                onChange={event => signup && setAccountName(event.target.value)}
              />
            </label>
            {signup && (
              <label className="block text-sm font-bold">
                Email
                <input
                  className="mt-2 h-12 w-full rounded-2xl border border-[#CBD2C1] bg-[#E8DFC9]/40 px-4 outline-none transition focus:border-[#4A3A2C]"
                  placeholder="you@example.com"
                  type="email"
                />
              </label>
            )}
            <label className="block text-sm font-bold">
              Password
              <div className="relative mt-2">
                <input
                  className="h-12 w-full rounded-2xl border border-[#CBD2C1] bg-[#E8DFC9]/40 px-4 pr-12 outline-none transition focus:border-[#4A3A2C]"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(value => !value)}
                  className="absolute right-3 top-3 text-xs font-bold text-[#6B7352]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>
          </div>
          <button
            onClick={() =>
              onEnter("real", signup ? accountName.trim() : undefined)
            }
            className="mt-6 h-12 w-full rounded-2xl bg-[#4A3A2C] font-extrabold text-[#E8DFC9] shadow-[0_4px_0_#2F3A2E] transition hover:bg-[#5a4838]"
          >
            {signup ? "Create my account" : "Log in"}{" "}
            <ArrowUpRight className="ml-1 inline h-4 w-4" />
          </button>
          <div className="my-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-[#9AA18B]">
            <span className="h-px flex-1 bg-[#CBD2C1]" /> or{" "}
            <span className="h-px flex-1 bg-[#CBD2C1]" />
          </div>
          <button
            onClick={() => onEnter("demo")}
            className="h-12 w-full rounded-2xl border border-[#CBD2C1] bg-[#E8DFC9]/45 font-extrabold text-[#2F3A2E] hover:bg-[#E8DFC9]"
          >
            Continue with the demo account
          </button>
          <p className="mt-6 text-center text-xs leading-5 text-[#6B7352]">
            {signup ? "Already have an account?" : "New here?"}{" "}
            <a
              href={signup ? "/login" : "/signup"}
              className="font-extrabold text-[#4A3A2C]"
            >
              {signup ? "Log in" : "Sign up free"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function AppShell({
  mode,
  data,
  setData,
  onLogout,
  onSignup,
}: {
  mode: Mode;
  data: ScholaryData;
  setData: React.Dispatch<React.SetStateAction<ScholaryData>>;
  onLogout: () => void;
  onSignup: () => void;
}) {
  const [location, setLocation] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [incomeOpen, setIncomeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<EntryOrigin>("screenshot");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationEmail, setNotificationEmail] = useState(() =>
    typeof window !== "undefined"
      ? (localStorage.getItem("scholary-notification-email") ?? "")
      : ""
  );
  const summary = useMemo(() => summarize(data), [data]);
  const page = location.replace("/", "") || "dashboard";
  const active = navItems.find(item => item.href === location);
  const displayTitle =
    active?.label ??
    (page === "proof"
      ? "Proof of income"
      : page === "settings"
        ? "Settings"
        : "Overview");

  const addEntry = (entry: Entry) => {
    setData(current => ({ ...current, entries: [entry, ...current.entries] }));
    setIncomeOpen(false);
    toast.success("Income logged", {
      description: "Your dashboard numbers are up to date.",
    });
  };

  const deleteEntry = (id: string) => {
    setData(current => ({
      ...current,
      entries: current.entries.filter(entry => entry.id !== id),
    }));
    toast("Entry removed", {
      action: {
        label: "Undo",
        onClick: () =>
          setData(current => ({ ...current, entries: data.entries })),
      },
    });
  };

  const navigate = (href: string) => {
    setLocation(href);
    setMobileOpen(false);
  };
  const runSearch = (query = searchQuery) => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return;
    const matches = [
      ...data.hustles.map(item => item.name),
      ...data.goals.map(item => item.name),
      ...data.entries.map(item => item.source),
    ].filter(item => item.toLowerCase().includes(normalized));
    toast(
      matches.length
        ? `${matches.length} match${matches.length === 1 ? "" : "es"} found`
        : "No matches found",
      {
        description: matches.length
          ? matches.slice(0, 3).join(" · ")
          : "Try a hustle, goal or income source.",
      }
    );
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-[#CBD2C1] text-[#2F3A2E]">
      {mode === "demo" && (
        <div className="flex items-center justify-center gap-2 bg-[#D6A94B] px-4 py-2 text-center text-[11px] font-extrabold text-[#2F3A2E]">
          <Sparkles className="h-3.5 w-3.5" /> You’re viewing demo data.{" "}
          <button onClick={onSignup} className="underline underline-offset-2">
            Sign up to track your own.
          </button>
        </div>
      )}
      <div className="flex min-h-[calc(100vh-32px)]">
        <aside className="hidden w-[245px] shrink-0 flex-col bg-[#2F3A2E] px-5 py-6 text-[#E8DFC9] lg:flex">
          <Logo dark />
          <div className="mt-14 flex-1">
            <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[.22em] text-[#CBD2C1]/45">
              Your money
            </p>
            <nav className="space-y-1">
              {navItems.map(item => (
                <NavButton
                  key={item.href}
                  item={item}
                  active={location === item.href}
                  onClick={() => navigate(item.href)}
                  dark
                />
              ))}
            </nav>
            <p className="mb-4 mt-10 px-3 text-[10px] font-bold uppercase tracking-[.22em] text-[#CBD2C1]/45">
              Keep it clear
            </p>
            <NavButton
              item={{
                label: "Proof of income",
                href: "/proof",
                icon: FileText,
              }}
              active={location === "/proof"}
              onClick={() => navigate("/proof")}
              dark
            />
            <NavButton
              item={{ label: "Settings", href: "/settings", icon: Settings }}
              active={location === "/settings"}
              onClick={() => navigate("/settings")}
              dark
            />
          </div>
          <div className="rounded-2xl bg-[#6B7352]/45 p-4">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#D17C62] text-xs font-extrabold text-white">
                {data.name === "New account" ? "N" : "MR"}
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-extrabold">{data.name}</p>
                <p className="text-[10px] text-[#CBD2C1]/60">
                  {mode === "demo" ? "Demo account" : "Personal account"}
                </p>
              </div>
              <button
                onClick={onLogout}
                title="Log out"
                className="ml-auto text-[#CBD2C1]/70 hover:text-[#E8DFC9]"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </aside>
        <main className="min-w-0 flex-1 bg-[linear-gradient(120deg,#CBD2C1_0%,#E8DFC9_65%,#CBD2C1_100%)]">
          <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-[#6B7352]/10 bg-[#E8DFC9]/70 px-5 backdrop-blur-xl sm:px-8 lg:px-10">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(value => !value)}
                className="grid h-10 w-10 place-items-center rounded-xl bg-[#F8F6EE] lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#6B7352]">
                  {mode === "demo" ? "Demo account" : "Your account"}
                </p>
                <h1 className="mt-1 font-display text-xl font-extrabold tracking-[-.05em]">
                  {displayTitle}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {searchOpen ? (
                <form
                  onSubmit={event => {
                    event.preventDefault();
                    runSearch();
                  }}
                  className="hidden items-center gap-2 rounded-xl bg-[#F8F6EE]/80 px-3 py-1.5 md:flex"
                >
                  <Search className="h-4 w-4 text-[#6B7352]" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={event => setSearchQuery(event.target.value)}
                    placeholder="Search hustles, goals..."
                    className="w-40 bg-transparent text-xs font-bold text-[#2F3A2E] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="text-[10px] font-extrabold text-[#9AA18B]"
                  >
                    Esc
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="hidden items-center gap-2 rounded-xl bg-[#F8F6EE]/80 px-3 py-2 text-xs text-[#6B7352] md:flex"
                >
                  <Search className="h-4 w-4" /> Find anything
                </button>
              )}
              <button
                onClick={() =>
                  toast(
                    notificationEmail
                      ? "Notifications are clear"
                      : "Add an email for notifications",
                    {
                      description: notificationEmail
                        ? `Alerts are connected to ${notificationEmail}.`
                        : "Open Settings to add the email where you want alerts sent.",
                    }
                  )
                }
                className="grid h-10 w-10 place-items-center rounded-xl bg-[#F8F6EE]/80 text-[#6B7352]"
              >
                <Bell className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIncomeOpen(true)}
                className="flex h-10 items-center gap-2 rounded-xl bg-[#4A3A2C] px-3 text-xs font-extrabold text-[#E8DFC9] shadow-[0_3px_0_#2F3A2E] sm:px-4"
              >
                <Plus className="h-4 w-4" />{" "}
                <span className="hidden sm:inline">Add income</span>
              </button>
            </div>
          </header>
          {mobileOpen && (
            <div className="absolute left-4 right-4 top-[84px] z-30 rounded-2xl bg-[#2F3A2E] p-3 shadow-2xl lg:hidden">
              <div className="mb-3 px-3 py-2">
                <Logo dark />
              </div>
              {navItems.map(item => (
                <NavButton
                  key={item.href}
                  item={item}
                  active={location === item.href}
                  onClick={() => navigate(item.href)}
                  dark
                />
              ))}
              <NavButton
                item={{
                  label: "Proof of income",
                  href: "/proof",
                  icon: FileText,
                }}
                active={location === "/proof"}
                onClick={() => navigate("/proof")}
                dark
              />
            </div>
          )}
          <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
            {page === "dashboard" ? (
              <DashboardView
                mode={mode}
                data={data}
                summary={summary}
                navigate={navigate}
                onAdd={() => setIncomeOpen(true)}
              />
            ) : page === "income" ? (
              <IncomeView
                data={data}
                onAdd={() => setIncomeOpen(true)}
                onDelete={deleteEntry}
              />
            ) : page === "hustles" ? (
              <HustlesView data={data} setData={setData} />
            ) : page === "goals" ? (
              <GoalsView data={data} setData={setData} />
            ) : page === "tax" ? (
              <TaxView data={data} summary={summary} setData={setData} />
            ) : page === "coach" ? (
              <CoachView data={data} summary={summary} />
            ) : page === "proof" ? (
              <ProofView data={data} navigate={navigate} />
            ) : (
              <SettingsView
                mode={mode}
                data={data}
                setData={setData}
                notificationEmail={notificationEmail}
                setNotificationEmail={setNotificationEmail}
                onLogout={onLogout}
              />
            )}
          </div>
        </main>
      </div>
      <div className="fixed bottom-4 left-1/2 z-20 flex w-[calc(100%-32px)] max-w-md -translate-x-1/2 items-center justify-around rounded-2xl bg-[#2F3A2E] p-2 shadow-2xl lg:hidden">
        {navItems.slice(0, 5).map(item => (
          <button
            key={item.href}
            onClick={() => navigate(item.href)}
            className={`grid h-11 min-w-[50px] place-items-center rounded-xl ${location === item.href ? "bg-[#6B7352] text-[#E8DFC9]" : "text-[#CBD2C1]/65"}`}
          >
            <item.icon className="h-4 w-4" />
            <span className="mt-0.5 text-[8px] font-bold">
              {item.label.split(" ")[0]}
            </span>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {incomeOpen && (
          <IncomeModal
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onClose={() => setIncomeOpen(false)}
            onSave={addEntry}
            hustles={data.hustles}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function NavButton({
  item,
  active,
  onClick,
  dark = false,
}: {
  item: { label: string; href: string; icon: LucideIcon };
  active: boolean;
  onClick: () => void;
  dark?: boolean;
}) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold transition ${active ? (dark ? "bg-[#6B7352] text-[#E8DFC9]" : "bg-[#CBD2C1] text-[#2F3A2E]") : dark ? "text-[#CBD2C1]/65 hover:bg-[#6B7352]/50 hover:text-[#E8DFC9]" : "text-[#6B7352] hover:bg-[#CBD2C1]/55"}`}
    >
      <Icon className="h-4 w-4" /> {item.label}
    </button>
  );
}

function DashboardView({
  mode,
  data,
  summary,
  navigate,
  onAdd,
}: {
  mode: Mode;
  data: ScholaryData;
  summary: ReturnType<typeof summarize>;
  navigate: (path: string) => void;
  onAdd: () => void;
}) {
  const forecast = forecastFor(data);
  const weekSpend = Math.round(summary.safeToSpend);
  const checklist = [
    ["Add a hustle", data.hustles.length > 0],
    [
      "Log your first income",
      data.entries.some(entry => entry.type === "income"),
    ],
    ["Set a goal", data.goals.length > 0],
    ["Check your tax jar", summary.jar > 0],
  ] as const;

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-bold text-[#6B7352]">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[#D6A94B]/70">
              <CloudSun className="h-3.5 w-3.5 text-[#4A3A2C]" />
            </span>{" "}
            Hello there,
          </p>
          <h2 className="font-display text-4xl font-extrabold tracking-[-.07em] sm:text-5xl">
            Make your money <span className="text-[#4A3A2C]">make sense.</span>
          </h2>
          <p className="mt-2 text-sm text-[#6B7352]">
            Here’s your clear view for the week of October 5.
          </p>
        </div>
        <button
          onClick={onAdd}
          className="hidden h-11 items-center gap-2 rounded-xl border border-[#6B7352]/25 bg-[#F8F6EE] px-4 text-sm font-extrabold text-[#4A3A2C] sm:flex"
        >
          <Plus className="h-4 w-4" /> Log a win
        </button>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_1fr_1fr]">
        <motion.div
          layout
          className="relative overflow-hidden rounded-[28px] bg-[#4A3A2C] p-6 text-[#E8DFC9] shadow-[0_14px_35px_rgba(74,58,44,0.18)] sm:p-7"
        >
          <div className="absolute -right-14 -top-16 h-48 w-48 rounded-full border-[26px] border-[#D6A94B]/15" />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#CBD2C1]/70">
                Safe to spend
              </p>
              <p className="mt-4 font-display text-5xl font-extrabold tracking-[-.08em]">
                {money(weekSpend, 2)}
              </p>
              <p className="mt-2 max-w-[230px] text-xs leading-5 text-[#CBD2C1]/70">
                {summary.income
                  ? "After your tax jar and current expenses, this is your breathing room."
                  : "Log your first income to see what’s safe to spend."}
              </p>
            </div>
            <div
              className="relative grid h-[104px] w-[104px] shrink-0 place-items-center rounded-full"
              style={{
                background: `conic-gradient(#D6A94B ${summary.income ? 82 : 0}%, #6B7352 0)`,
              }}
            >
              <div className="grid h-[78px] w-[78px] place-items-center rounded-full bg-[#4A3A2C] text-center">
                <span className="font-display text-lg font-extrabold">
                  {summary.income ? "82" : "0"}
                  <small className="text-xs">%</small>
                </span>
                <span className="-mt-1 text-[8px] uppercase tracking-widest text-[#CBD2C1]/60">
                  steady
                </span>
              </div>
            </div>
          </div>
          <div className="relative mt-7 grid grid-cols-3 gap-2 border-t border-[#CBD2C1]/20 pt-4 text-[10px]">
            <div>
              <span className="text-[#CBD2C1]/55">Low</span>
              <p className="mt-1 font-extrabold">
                {money(Math.max(0, weekSpend * 0.7), 0)}
              </p>
            </div>
            <div>
              <span className="text-[#CBD2C1]/55">Expected</span>
              <p className="mt-1 font-extrabold">{money(weekSpend, 0)}</p>
            </div>
            <div>
              <span className="text-[#CBD2C1]/55">High</span>
              <p className="mt-1 font-extrabold">
                {money(weekSpend * 1.24, 0)}
              </p>
            </div>
          </div>
        </motion.div>
        <MetricCard
          icon={ReceiptText}
          label="Tax jar"
          value={money(summary.jar)}
          helper={`${money(summary.estimatedTax)} estimated total`}
          dark
        />
        <MetricCard
          icon={Goal}
          label={summary.currentGoal ? "Top goal" : "Your first goal"}
          value={summary.currentGoal ? `${summary.goalProgress}%` : "—"}
          helper={
            summary.currentGoal
              ? summary.currentGoal.name
              : "Add a goal to give your money a direction"
          }
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
        <div className="rounded-[28px] bg-[#F8F6EE] p-5 shadow-[0_12px_30px_rgba(47,58,46,0.06)] sm:p-6">
          <SectionTitle
            eyebrow="Your pattern"
            title="Forecast, without the false confidence."
            action={
              <button
                onClick={() => navigate("/tax")}
                className="text-xs font-extrabold text-[#4A3A2C]"
              >
                View details{" "}
                <ChevronRight className="ml-1 inline h-3.5 w-3.5" />
              </button>
            }
          />
          {forecast.length ? (
            <div>
              <div className="flex h-56 items-end gap-2 rounded-2xl border border-[#CBD2C1]/50 bg-[#E8DFC9]/25 px-4 pb-7 pt-7 sm:gap-4">
                {forecast.map(point => (
                  <div
                    key={point.week}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                  >
                    <div className="relative flex h-full w-full max-w-10 items-end justify-center">
                      <div
                        className="absolute bottom-0 w-full rounded-t-xl bg-[#CBD2C1]"
                        style={{
                          height: `${Math.max(24, (point.high / 1000) * 100)}%`,
                        }}
                      />
                      <div
                        className="relative z-10 w-1/2 rounded-t-xl bg-[#4A3A2C]"
                        style={{
                          height: `${Math.max(18, (point.expected / 1000) * 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-[#9AA18B]">
                      {point.week}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-4 text-[10px] font-bold text-[#6B7352]">
                <span className="flex items-center gap-1.5">
                  <i className="h-2 w-2 rounded-full bg-[#4A3A2C]" /> Expected
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="h-2 w-2 rounded-full bg-[#CBD2C1]" /> Confidence
                  range
                </span>
                <span className="ml-auto rounded-full bg-[#D6A94B]/25 px-2 py-1 text-[#6C5A26]">
                  {data.entries.length < 8
                    ? "Early estimate"
                    : "Growing confidence"}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#6B7352]/25 bg-[#E8DFC9]/35 px-5 text-center">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#CBD2C1] text-[#6B7352]">
                <BarChart3 className="h-5 w-5" />
              </div>
              <p className="mt-4 font-extrabold">
                Still learning your pattern.
              </p>
              <p className="mt-1 max-w-xs text-xs leading-5 text-[#6B7352]">
                Log a few weeks of income and your forecast appears here.
              </p>
              <button
                onClick={onAdd}
                className="mt-4 rounded-xl bg-[#4A3A2C] px-4 py-2 text-xs font-extrabold text-[#E8DFC9]"
              >
                Log income
              </button>
            </div>
          )}
        </div>
        <div className="rounded-[28px] bg-[#F8F6EE] p-5 shadow-[0_12px_30px_rgba(47,58,46,0.06)] sm:p-6">
          <SectionTitle eyebrow="Keep moving" title="Your checklist" />
          {checklist.map(([item, done], index) => (
            <div
              key={item}
              className="flex items-center gap-3 border-b border-[#CBD2C1]/55 py-3.5 last:border-0"
            >
              <span
                className={`grid h-7 w-7 place-items-center rounded-full ${done ? "bg-[#3E6D51] text-white" : "border border-[#CBD2C1] bg-[#E8DFC9]/45 text-[#9AA18B]"}`}
              >
                {done ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <span className="text-[10px] font-extrabold">
                    0{index + 1}
                  </span>
                )}
              </span>
              <span
                className={`text-sm font-bold ${done ? "text-[#6B7352] line-through" : "text-[#2F3A2E]"}`}
              >
                {item}
              </span>
              {!done && (
                <ChevronRight className="ml-auto h-4 w-4 text-[#9AA18B]" />
              )}
            </div>
          ))}
          <div className="mt-5 rounded-2xl bg-[#CBD2C1]/55 p-4">
            <div className="flex items-start gap-3">
              <ClipboardCheck className="mt-0.5 h-4 w-4 text-[#4A3A2C]" />
              <p className="text-xs leading-5 text-[#526047]">
                Small steps compound. You’re building a paycheck that can keep
                up with you.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] bg-[#F8F6EE] p-5 shadow-[0_12px_30px_rgba(47,58,46,0.06)] sm:p-6">
        <SectionTitle
          eyebrow="Latest movement"
          title="Recent income"
          action={
            <button
              onClick={() => navigate("/income")}
              className="text-xs font-extrabold text-[#4A3A2C]"
            >
              See all <ChevronRight className="ml-1 inline h-3.5 w-3.5" />
            </button>
          }
        />
        {data.entries.length ? (
          <div className="grid gap-2 md:grid-cols-2">
            {data.entries.slice(0, 4).map(entry => (
              <EntryRow key={entry.id} entry={entry} hustles={data.hustles} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={WalletCards}
            title="Your income feed is ready for its first win."
            copy="Log a tutoring session, a delivery payout or anything in between."
            action="Add your first income"
            onClick={onAdd}
          />
        )}
      </div>
      <div>
        <SectionTitle
          eyebrow="Your mix"
          title="Side hustle snapshot"
          action={
            <button
              onClick={() => navigate("/hustles")}
              className="text-xs font-extrabold text-[#4A3A2C]"
            >
              Manage hustles{" "}
              <ChevronRight className="ml-1 inline h-3.5 w-3.5" />
            </button>
          }
        />
        {data.hustles.length ? (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {data.hustles.map(hustle => {
              const total = data.entries
                .filter(
                  entry =>
                    entry.hustleId === hustle.id && entry.type === "income"
                )
                .reduce((sum, entry) => sum + entry.amount, 0);
              return (
                <div
                  key={hustle.id}
                  className="min-w-[180px] flex-1 rounded-[24px] bg-[#F8F6EE] p-4 shadow-[0_10px_25px_rgba(47,58,46,0.05)]"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="grid h-9 w-9 place-items-center rounded-xl text-lg"
                      style={{ backgroundColor: `${hustle.color}35` }}
                    >
                      {hustle.icon}
                    </span>
                    <MoreHorizontal className="h-4 w-4 text-[#9AA18B]" />
                  </div>
                  <p className="mt-5 text-sm font-extrabold">{hustle.name}</p>
                  <p className="mt-1 font-display text-2xl font-extrabold tracking-[-.06em]">
                    {money(total)}
                  </p>
                  <p className="mt-1 text-[10px] font-bold text-[#6B7352]">
                    {hustle.hourlyGoal
                      ? `$${hustle.hourlyGoal}/hr goal`
                      : "Set an hourly goal"}
                  </p>
                </div>
              );
            })}
            <button
              onClick={() => navigate("/hustles")}
              className="grid min-w-[90px] place-items-center rounded-[24px] border border-dashed border-[#6B7352]/35 bg-[#E8DFC9]/40 text-center text-xs font-extrabold text-[#6B7352]"
            >
              <Plus className="mb-1 h-5 w-5" /> Add
            </button>
          </div>
        ) : (
          <EmptyState
            icon={Zap}
            title="Add your first hustle."
            copy="Give your income a home, even if it starts at $0."
            action="Add a hustle"
            onClick={() => navigate("/hustles")}
          />
        )}
      </div>
    </div>
  );
}

function EntryRow({
  entry,
  hustles,
}: {
  entry: Entry;
  hustles: ScholaryData["hustles"];
}) {
  const hustle = hustles.find(item => item.id === entry.hustleId);
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-[#E8DFC9]/38 p-3">
      <span
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-lg"
        style={{ backgroundColor: `${entryColor(entry, hustles)}35` }}
      >
        {hustle?.icon ?? "•"}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-extrabold">{entry.source}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-[10px] font-bold text-[#6B7352]">
            {shortDate(entry.date)}
          </span>
          <SourceBadge origin={entry.origin} verified={entry.verified} />
        </div>
      </div>
      <p
        className={`font-display text-base font-extrabold ${entry.type === "expense" ? "text-[#D17C62]" : "text-[#2F3A2E]"}`}
      >
        {entry.type === "expense" ? "−" : "+"}
        {money(entry.amount, 2)}
      </p>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  copy,
  action,
  onClick,
}: {
  icon: LucideIcon;
  title: string;
  copy: string;
  action: string;
  onClick: () => void;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-[#6B7352]/25 bg-[#E8DFC9]/35 p-6 text-center">
      <div className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-[#CBD2C1] text-[#6B7352]">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-3 text-sm font-extrabold">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[#6B7352]">
        {copy}
      </p>
      <button
        onClick={onClick}
        className="mt-4 rounded-xl bg-[#4A3A2C] px-4 py-2 text-xs font-extrabold text-[#E8DFC9]"
      >
        {action}
      </button>
    </div>
  );
}

function IncomeView({
  data,
  onAdd,
  onDelete,
}: {
  data: ScholaryData;
  onAdd: () => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#6B7352]">
            Your paper trail
          </p>
          <h2 className="mt-2 font-display text-4xl font-extrabold tracking-[-.07em]">
            Income & expenses
          </h2>
          <p className="mt-2 text-sm text-[#6B7352]">
            Every entry stays editable until it feels right.
          </p>
        </div>
        <button
          onClick={onAdd}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#4A3A2C] px-4 text-sm font-extrabold text-[#E8DFC9]"
        >
          <Plus className="h-4 w-4" /> Add income
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <MetricCard
          icon={ArrowDownLeft}
          label="Logged in"
          value={money(
            data.entries
              .filter(entry => entry.type === "income")
              .reduce((sum, entry) => sum + entry.amount, 0)
          )}
          helper="All time"
        />
        <MetricCard
          icon={ArrowUpRight}
          label="Expenses"
          value={money(
            data.entries
              .filter(entry => entry.type === "expense")
              .reduce((sum, entry) => sum + entry.amount, 0)
          )}
          helper="Tracked costs"
        />
        <MetricCard
          icon={Clock3}
          label="Entries"
          value={`${data.entries.length}`}
          helper="Keep the rhythm"
        />
      </div>
      <div className="rounded-[28px] bg-[#F8F6EE] p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => toast("Showing all entries")}
              className="rounded-xl bg-[#2F3A2E] px-3 py-2 text-xs font-extrabold text-[#E8DFC9]"
            >
              All entries
            </button>
            <button
              onClick={() => toast("Income filter selected")}
              className="rounded-xl px-3 py-2 text-xs font-bold text-[#6B7352] hover:bg-[#CBD2C1]/40"
            >
              Income
            </button>
            <button
              onClick={() => toast("Expense filter selected")}
              className="rounded-xl px-3 py-2 text-xs font-bold text-[#6B7352] hover:bg-[#CBD2C1]/40"
            >
              Expenses
            </button>
          </div>
          <button
            onClick={() =>
              toast("Search is ready", {
                description: "Try the income and hustle filters for now.",
              })
            }
            className="grid h-9 w-9 place-items-center rounded-xl bg-[#E8DFC9]/55"
          >
            <Search className="h-4 w-4 text-[#6B7352]" />
          </button>
        </div>
        {data.entries.length ? (
          <div className="space-y-2">
            {data.entries.map(entry => (
              <div
                key={entry.id}
                className="group flex items-center gap-3 rounded-2xl border border-[#CBD2C1]/45 bg-[#E8DFC9]/25 p-3 transition hover:bg-[#E8DFC9]/65"
              >
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-lg"
                  style={{
                    backgroundColor: `${entryColor(entry, data.hustles)}35`,
                  }}
                >
                  {data.hustles.find(hustle => hustle.id === entry.hustleId)
                    ?.icon ?? "•"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-extrabold">
                    {entry.source}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold text-[#6B7352]">
                      {shortDate(entry.date)} ·{" "}
                      {data.hustles.find(hustle => hustle.id === entry.hustleId)
                        ?.name ?? "Unassigned"}
                    </span>
                    <SourceBadge
                      origin={entry.origin}
                      verified={entry.verified}
                    />
                  </div>
                </div>
                <p
                  className={`font-display text-lg font-extrabold ${entry.type === "expense" ? "text-[#D17C62]" : "text-[#2F3A2E]"}`}
                >
                  {entry.type === "expense" ? "−" : "+"}
                  {money(entry.amount, 2)}
                </p>
                <button
                  onClick={() => onDelete(entry.id)}
                  className="grid h-8 w-8 place-items-center rounded-lg text-[#9AA18B] opacity-0 transition hover:bg-[#D17C62]/15 hover:text-[#D17C62] group-hover:opacity-100"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={WalletCards}
            title="No entries yet."
            copy="Start with a screenshot, a voice note, or a quick manual log."
            action="Log your first income"
            onClick={onAdd}
          />
        )}
      </div>
    </div>
  );
}

function SimpleEditModal({
  title,
  description,
  fields,
  onClose,
  onSave,
  onDelete,
}: {
  title: string;
  description?: string;
  fields: {
    key: string;
    label: string;
    value: string;
    type?: "text" | "number" | "date";
  }[];
  onClose: () => void;
  onSave: (values: Record<string, string>) => void;
  onDelete?: () => void;
}) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map(field => [field.key, field.value]))
  );
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#2F3A2E]/55 p-0 backdrop-blur-sm sm:items-center sm:p-5"
    >
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        className="w-full max-w-md rounded-t-[30px] bg-[#F8F6EE] p-6 shadow-2xl sm:rounded-[30px] sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#6B7352]">
              Edit details
            </p>
            <h2 className="mt-1 font-display text-2xl font-extrabold tracking-[-.05em]">
              {title}
            </h2>
            {description && (
              <p className="mt-2 text-xs leading-5 text-[#6B7352]">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-xl bg-[#E8DFC9]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-6 space-y-4">
          {fields.map(field => (
            <label
              key={field.key}
              className="block text-xs font-extrabold text-[#526047]"
            >
              {field.label}
              <input
                type={field.type ?? "text"}
                value={values[field.key] ?? ""}
                onChange={event =>
                  setValues(current => ({
                    ...current,
                    [field.key]: event.target.value,
                  }))
                }
                className="mt-2 h-11 w-full rounded-xl border border-[#CBD2C1] bg-[#E8DFC9]/35 px-3 text-sm font-bold outline-none focus:border-[#4A3A2C]"
              />
            </label>
          ))}
        </div>
        <div className="mt-7 flex items-center justify-between gap-3">
          {onDelete ? (
            <button
              onClick={onDelete}
              className="rounded-xl bg-[#D17C62]/10 px-3 py-2.5 text-xs font-extrabold text-[#A75944]"
            >
              Delete
            </button>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="rounded-xl border border-[#CBD2C1] px-4 py-2.5 text-xs font-extrabold text-[#526047]"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(values)}
              className="rounded-xl bg-[#4A3A2C] px-4 py-2.5 text-xs font-extrabold text-[#E8DFC9]"
            >
              Save changes <Check className="ml-1 inline h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function HustlesView({
  data,
  setData,
}: {
  data: ScholaryData;
  setData: React.Dispatch<React.SetStateAction<ScholaryData>>;
}) {
  const [editing, setEditing] = useState<HustleRecord | null>(null);
  const suggestions = [
    "Tutoring",
    "Babysitting",
    "Lawn mowing",
    "Dog walking",
    "Delivery",
    "Reselling",
    "Freelance",
  ];
  const addHustle = (name: string) => {
    const id = `${name.toLowerCase().replaceAll(" ", "-")}-${Date.now()}`;
    setData(current => ({
      ...current,
      hustles: [...current.hustles, { id, name, icon: "✦", color: "#D6A94B" }],
    }));
    toast.success(`${name} added`, {
      description: "Your new hustle is ready for its first entry.",
    });
  };
  const saveHustle = (values: Record<string, string>) => {
    if (!editing) return;
    setData(current => ({
      ...current,
      hustles: current.hustles.map(item =>
        item.id === editing.id
          ? {
              ...item,
              name: values.name || item.name,
              hourlyGoal: values.hourlyGoal
                ? Number(values.hourlyGoal)
                : undefined,
            }
          : item
      ),
    }));
    setEditing(null);
    toast.success("Hustle updated");
  };
  const deleteHustle = () => {
    if (!editing) return;
    setData(current => ({
      ...current,
      hustles: current.hustles.filter(item => item.id !== editing.id),
      entries: current.entries.map(entry =>
        entry.hustleId === editing.id
          ? { ...entry, hustleId: "unassigned" }
          : entry
      ),
    }));
    setEditing(null);
    toast.success("Hustle deleted", {
      description: "Its entries were kept as Unassigned.",
    });
  };
  return (
    <div className="space-y-7">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#6B7352]">
          The things you do
        </p>
        <h2 className="mt-2 font-display text-4xl font-extrabold tracking-[-.07em]">
          Your hustles
        </h2>
        <p className="mt-2 text-sm text-[#6B7352]">
          A little structure for every way you make money.
        </p>
      </div>
      {data.hustles.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {data.hustles.map(hustle => {
            const total = data.entries
              .filter(
                entry => entry.hustleId === hustle.id && entry.type === "income"
              )
              .reduce((sum, entry) => sum + entry.amount, 0);
            return (
              <div
                key={hustle.id}
                className="rounded-[26px] bg-[#F8F6EE] p-5 shadow-[0_12px_30px_rgba(47,58,46,0.06)]"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-2xl text-xl"
                    style={{ backgroundColor: `${hustle.color}35` }}
                  >
                    {hustle.icon}
                  </span>
                  <button
                    onClick={() => setEditing(hustle)}
                    aria-label={`Edit ${hustle.name}`}
                    className="rounded-lg p-1 text-[#9AA18B] hover:bg-[#CBD2C1]/45 hover:text-[#4A3A2C]"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
                <h3 className="mt-7 font-display text-xl font-extrabold tracking-[-.05em]">
                  {hustle.name}
                </h3>
                <p className="mt-1 font-display text-3xl font-extrabold tracking-[-.07em]">
                  {money(total)}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-[#CBD2C1]/55 pt-3 text-[10px] font-bold text-[#6B7352]">
                  <span>
                    {
                      data.entries.filter(entry => entry.hustleId === hustle.id)
                        .length
                    }{" "}
                    entries
                  </span>
                  <span>
                    {hustle.hourlyGoal
                      ? `$${hustle.hourlyGoal}/hr goal`
                      : "Set hourly goal"}
                  </span>
                </div>
              </div>
            );
          })}
          <button
            onClick={() => addHustle("New hustle")}
            className="min-h-[190px] rounded-[26px] border border-dashed border-[#6B7352]/35 bg-[#E8DFC9]/40 p-5 text-sm font-extrabold text-[#6B7352] hover:bg-[#E8DFC9]"
          >
            <Plus className="mx-auto mb-2 h-6 w-6" /> Add a hustle
          </button>
        </div>
      ) : (
        <div className="rounded-[30px] bg-[#F8F6EE] p-7 text-center sm:p-12">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-[22px] bg-[#CBD2C1] text-[#4A3A2C]">
            <Zap className="h-7 w-7" />
          </div>
          <h3 className="mt-6 font-display text-2xl font-extrabold tracking-[-.05em]">
            Give your income a home.
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6B7352]">
            Start with one of these — they are empty until you log a win.
          </p>
          <div className="mx-auto mt-7 flex max-w-2xl flex-wrap justify-center gap-2">
            {suggestions.map(suggestion => (
              <button
                key={suggestion}
                onClick={() => addHustle(suggestion)}
                className="rounded-full border border-[#CBD2C1] bg-[#E8DFC9]/50 px-4 py-2 text-xs font-extrabold text-[#526047] transition hover:border-[#4A3A2C] hover:bg-[#4A3A2C] hover:text-[#E8DFC9]"
              >
                + {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
      {editing && (
        <AnimatePresence>
          <SimpleEditModal
            title={editing.name}
            description="Update the name or hourly goal for this hustle."
            fields={[
              { key: "name", label: "Hustle name", value: editing.name },
              {
                key: "hourlyGoal",
                label: "Hourly goal (optional)",
                value: editing.hourlyGoal ? String(editing.hourlyGoal) : "",
                type: "number",
              },
            ]}
            onClose={() => setEditing(null)}
            onSave={saveHustle}
            onDelete={deleteHustle}
          />
        </AnimatePresence>
      )}
    </div>
  );
}

function GoalsView({
  data,
  setData,
}: {
  data: ScholaryData;
  setData: React.Dispatch<React.SetStateAction<ScholaryData>>;
}) {
  const [editing, setEditing] = useState<GoalRecord | null>(null);
  const addGoal = () => {
    const goal = {
      id: `goal-${Date.now()}`,
      name: "New goal",
      mode: "save" as const,
      target: 500,
      saved: 0,
      deadline: "2026-12-31",
      color: "#D6A94B",
    };
    setData(current => ({ ...current, goals: [...current.goals, goal] }));
    setEditing(goal);
    toast.success("Goal added");
  };
  const saveGoal = (values: Record<string, string>) => {
    if (!editing) return;
    setData(current => ({
      ...current,
      goals: current.goals.map(item =>
        item.id === editing.id
          ? {
              ...item,
              name: values.name || item.name,
              target: Number(values.target) || item.target,
              saved: Math.max(0, Number(values.saved) || 0),
              deadline: values.deadline || item.deadline,
            }
          : item
      ),
    }));
    setEditing(null);
    toast.success("Goal updated");
  };
  const deleteGoal = () => {
    if (!editing) return;
    setData(current => ({
      ...current,
      goals: current.goals.filter(item => item.id !== editing.id),
    }));
    setEditing(null);
    toast.success("Goal deleted");
  };
  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#6B7352]">
            Give it somewhere to go
          </p>
          <h2 className="mt-2 font-display text-4xl font-extrabold tracking-[-.07em]">
            Your goals
          </h2>
          <p className="mt-2 text-sm text-[#6B7352]">
            Small targets make irregular income feel intentional.
          </p>
        </div>
        <button
          onClick={addGoal}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#4A3A2C] px-4 text-sm font-extrabold text-[#E8DFC9]"
        >
          <Plus className="h-4 w-4" /> Add goal
        </button>
      </div>
      {data.goals.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {data.goals.map(goal => {
            const progress = Math.min(
              100,
              Math.round((goal.saved / goal.target) * 100)
            );
            return (
              <div
                key={goal.id}
                className="rounded-[28px] bg-[#F8F6EE] p-6 shadow-[0_12px_30px_rgba(47,58,46,0.06)]"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="grid h-12 w-12 place-items-center rounded-2xl"
                    style={{ backgroundColor: `${goal.color}35` }}
                  >
                    <Goal className="h-5 w-5" style={{ color: goal.color }} />
                  </div>
                  <button
                    onClick={() => setEditing(goal)}
                    aria-label={`Edit ${goal.name}`}
                    className="rounded-lg p-1 text-[#9AA18B] hover:bg-[#CBD2C1]/45 hover:text-[#4A3A2C]"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
                <h3 className="mt-6 font-display text-2xl font-extrabold tracking-[-.05em]">
                  {goal.name}
                </h3>
                <div className="mt-5 flex items-end justify-between">
                  <p className="font-display text-3xl font-extrabold tracking-[-.07em]">
                    {money(goal.saved)}{" "}
                    <span className="text-sm font-bold text-[#9AA18B]">
                      of {money(goal.target)}
                    </span>
                  </p>
                  <span className="text-sm font-extrabold text-[#4A3A2C]">
                    {progress}%
                  </span>
                </div>
                <Progress
                  value={progress}
                  className="mt-3 h-2 bg-[#CBD2C1] [&>div]:bg-[#4A3A2C]"
                />
                <p className="mt-3 text-xs font-bold text-[#6B7352]">
                  Target date · {shortDate(goal.deadline)}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={Goal}
          title="Add your first goal."
          copy="A laptop, a holiday, a first $1k month — make it concrete."
          action="Add your first goal"
          onClick={addGoal}
        />
      )}
      {editing && (
        <AnimatePresence>
          <SimpleEditModal
            title={editing.name}
            description="Update your target, current progress or deadline."
            fields={[
              { key: "name", label: "Goal name", value: editing.name },
              {
                key: "target",
                label: "Target amount",
                value: String(editing.target),
                type: "number",
              },
              {
                key: "saved",
                label: "Saved so far",
                value: String(editing.saved),
                type: "number",
              },
              {
                key: "deadline",
                label: "Target date",
                value: editing.deadline,
                type: "date",
              },
            ]}
            onClose={() => setEditing(null)}
            onSave={saveGoal}
            onDelete={deleteGoal}
          />
        </AnimatePresence>
      )}
    </div>
  );
}

function TaxView({
  data,
  summary,
  setData,
}: {
  data: ScholaryData;
  summary: ReturnType<typeof summarize>;
  setData: React.Dispatch<React.SetStateAction<ScholaryData>>;
}) {
  const [editing, setEditing] = useState<JarTransfer | null>(null);
  const [showWhatIf, setShowWhatIf] = useState(false);
  const [whatIf, setWhatIf] = useState("2300");
  const addTransfer = () => {
    const transfer: JarTransfer = {
      id: `transfer-${Date.now()}`,
      amount: 50,
      date: "2026-10-05",
      note: "Manual tax set-aside",
    };
    setData(current => ({
      ...current,
      transfers: [transfer, ...current.transfers],
    }));
    setEditing(transfer);
  };
  const saveTransfer = (values: Record<string, string>) => {
    if (!editing) return;
    setData(current => ({
      ...current,
      transfers: current.transfers.map(item =>
        item.id === editing.id
          ? {
              ...item,
              amount: Number(values.amount) || item.amount,
              note: values.note || item.note,
            }
          : item
      ),
    }));
    setEditing(null);
    toast.success("Tax transfer updated");
  };
  const deleteTransfer = () => {
    if (!editing) return;
    setData(current => ({
      ...current,
      transfers: current.transfers.filter(item => item.id !== editing.id),
    }));
    setEditing(null);
    toast.success("Tax transfer deleted");
  };
  return (
    <div className="space-y-7">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#6B7352]">
          No surprises later
        </p>
        <h2 className="mt-2 font-display text-4xl font-extrabold tracking-[-.07em]">
          Your tax jar
        </h2>
        <p className="mt-2 text-sm text-[#6B7352]">
          A simple estimate, based only on what you log.
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[30px] bg-[#2F3A2E] p-7 text-[#E8DFC9] sm:p-9">
          <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#CBD2C1]/65">
            Set aside so far
          </p>
          <p className="mt-4 font-display text-6xl font-extrabold tracking-[-.09em]">
            {money(summary.jar, 2)}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[#CBD2C1]/70">
            Based on {money(summary.income)} in logged earnings and an 18%
            cautious estimate.
          </p>
          <div className="mt-8 h-3 overflow-hidden rounded-full bg-[#6B7352]">
            <div
              className="h-full rounded-full bg-[#D6A94B]"
              style={{
                width: `${Math.min(100, summary.estimatedTax ? (summary.jar / summary.estimatedTax) * 100 : 0)}%`,
              }}
            />
          </div>
          <div className="mt-3 flex justify-between text-xs font-bold text-[#CBD2C1]/65">
            <span>{money(summary.jar)} set aside</span>
            <span>{money(summary.estimatedTax)} estimated total</span>
          </div>
        </div>
        <div className="rounded-[30px] bg-[#F8F6EE] p-7 sm:p-9">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#CBD2C1] text-[#4A3A2C]">
              <CircleHelp className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-xl font-extrabold tracking-[-.04em]">
                Do I owe tax?
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#6B7352]">
                Maybe — gig income is often taxable, even when it is not a
                traditional paycheck. Scholary keeps this estimate visible so
                you can ask a pro with better context.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowWhatIf(value => !value)}
            className="mt-7 rounded-xl border border-[#CBD2C1] bg-[#E8DFC9]/40 px-4 py-3 text-xs font-extrabold text-[#4A3A2C]"
          >
            {showWhatIf ? "Hide calculator" : "Try a what-if example · $2,300"}
          </button>
          {showWhatIf && (
            <div className="mt-4 rounded-2xl bg-[#E8DFC9]/55 p-4">
              <label className="text-xs font-extrabold text-[#526047]">
                Earnings to explore
                <input
                  value={whatIf}
                  onChange={event => setWhatIf(event.target.value)}
                  type="number"
                  className="mt-2 h-10 w-full rounded-xl border border-[#CBD2C1] bg-[#F8F6EE] px-3 text-sm font-bold"
                />
              </label>
              <p className="mt-3 text-sm font-extrabold text-[#4A3A2C]">
                Estimated set-aside · {money((Number(whatIf) || 0) * 0.18, 2)}
              </p>
              <p className="mt-1 text-[10px] text-[#6B7352]">
                This is a what-if only. Your real jar stays unchanged.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-[28px] bg-[#F8F6EE] p-6">
        <SectionTitle
          eyebrow="Jar history"
          title="Transfers"
          action={
            <button
              onClick={addTransfer}
              className="rounded-xl bg-[#4A3A2C] px-3 py-2 text-xs font-extrabold text-[#E8DFC9]"
            >
              + Log transfer
            </button>
          }
        />
        {data.transfers.length ? (
          <div className="space-y-2">
            {data.transfers.map(transfer => (
              <div
                key={transfer.id}
                className="flex items-center gap-3 rounded-2xl bg-[#E8DFC9]/35 p-3"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#CBD2C1] text-[#3E6D51]">
                  <ArrowDownLeft className="h-4 w-4" />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-extrabold">{transfer.note}</p>
                  <p className="mt-1 text-[10px] font-bold text-[#6B7352]">
                    {shortDate(transfer.date)}
                  </p>
                </div>
                <p className="font-display font-extrabold text-[#3E6D51]">
                  +{money(transfer.amount, 2)}
                </p>
                <button
                  onClick={() => setEditing(transfer)}
                  aria-label="Edit tax transfer"
                  className="rounded-lg p-1 text-[#9AA18B] hover:bg-[#CBD2C1]/45 hover:text-[#4A3A2C]"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={ReceiptText}
            title="Your tax jar starts at $0."
            copy="When you log income, you can choose what to set aside."
            action="Log a transfer"
            onClick={addTransfer}
          />
        )}
        {editing && (
          <AnimatePresence>
            <SimpleEditModal
              title="Tax jar transfer"
              description="Adjust the amount or note for this transfer."
              fields={[
                {
                  key: "amount",
                  label: "Amount",
                  value: String(editing.amount),
                  type: "number",
                },
                { key: "note", label: "Note", value: editing.note },
              ]}
              onClose={() => setEditing(null)}
              onSave={saveTransfer}
              onDelete={deleteTransfer}
            />
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

function CoachView({
  data,
  summary,
}: {
  data: ScholaryData;
  summary: ReturnType<typeof summarize>;
}) {
  const hasData = data.entries.some(entry => entry.type === "income");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<
    { role: "coach" | "you"; text: string }[]
  >([
    {
      role: "coach",
      text: hasData
        ? "Your mix is moving in the right direction. Ask me about safe-to-spend, taxes or your goals."
        : "Once you log your first income, I’ll help you turn it into a next step — no made-up numbers.",
    },
  ]);
  const sendMessage = (value = draft) => {
    const question = value.trim();
    if (!question) return;
    const lower = question.toLowerCase();
    const reply = lower.includes("safe")
      ? `Your computed safe-to-spend number is ${money(summary.safeToSpend, 2)} after logged expenses and the tax estimate.`
      : lower.includes("tax") || lower.includes("jar")
        ? `Your tax jar has ${money(summary.jar, 2)} set aside against an estimated ${money(summary.estimatedTax, 2)}.`
        : lower.includes("goal")
          ? summary.currentGoal
            ? `${summary.currentGoal.name} is ${summary.goalProgress}% complete.`
            : "You do not have a goal yet. Add one to give your next dollar a direction."
          : hasData
            ? `You have logged ${money(summary.income)} so far. Keep your next move small and specific.`
            : "Log an income entry first, and I can help you see what is safe to spend and what to set aside.";
    setMessages(current => [
      ...current,
      { role: "you", text: question },
      { role: "coach", text: reply },
    ]);
    setDraft("");
  };
  return (
    <div className="space-y-7">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#6B7352]">
          A second brain, not a boss
        </p>
        <h2 className="mt-2 font-display text-4xl font-extrabold tracking-[-.07em]">
          Your money coach
        </h2>
        <p className="mt-2 text-sm text-[#6B7352]">
          A little context for the decisions you are already making.
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <div className="rounded-[30px] bg-[#D17C62] p-7 text-[#2F3A2E] sm:p-9">
          <Bot className="h-8 w-8" />
          <p className="mt-14 font-display text-3xl font-extrabold leading-tight tracking-[-.06em]">
            {hasData
              ? "You are building a rhythm."
              : "Let’s start with one real number."}
          </p>
          <p className="mt-3 text-sm leading-6 text-[#2F3A2E]/70">
            {hasData
              ? `You have logged ${money(summary.income)} so far. Keep your next move small and specific.`
              : "Log an income entry first, and I can help you see what is safe to spend and what to set aside."}
          </p>
        </div>
        <div className="rounded-[30px] bg-[#F8F6EE] p-7 sm:p-9">
          <div className="flex items-center gap-3 border-b border-[#CBD2C1]/55 pb-5">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#CBD2C1] text-[#4A3A2C]">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-extrabold">Scholary coach</p>
              <p className="text-[10px] font-bold text-[#6B7352]">
                Only explains the numbers you logged
              </p>
            </div>
          </div>
          <div className="max-h-[290px] space-y-3 overflow-y-auto py-6">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[88%] rounded-2xl p-4 text-sm leading-6 ${message.role === "you" ? "ml-auto rounded-tr-sm bg-[#2F3A2E] text-[#E8DFC9]" : "rounded-tl-sm bg-[#E8DFC9]/55 text-[#526047]"}`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="mb-4 flex flex-wrap gap-2">
            <button
              onClick={() => sendMessage("Show me my safe-to-spend number.")}
              className="rounded-full border border-[#CBD2C1] px-3 py-1.5 text-[10px] font-bold text-[#6B7352]"
            >
              Safe to spend?
            </button>
            <button
              onClick={() => sendMessage("How is my tax jar doing?")}
              className="rounded-full border border-[#CBD2C1] px-3 py-1.5 text-[10px] font-bold text-[#6B7352]"
            >
              Tax jar?
            </button>
            <button
              onClick={() => sendMessage("How is my goal doing?")}
              className="rounded-full border border-[#CBD2C1] px-3 py-1.5 text-[10px] font-bold text-[#6B7352]"
            >
              Goal progress?
            </button>
          </div>
          <div className="flex gap-2">
            <input
              value={draft}
              onChange={event => setDraft(event.target.value)}
              onKeyDown={event => {
                if (event.key === "Enter") sendMessage();
              }}
              className="h-11 flex-1 rounded-xl border border-[#CBD2C1] bg-[#E8DFC9]/30 px-3 text-sm outline-none"
              placeholder="Ask about your logged income..."
            />
            <button
              onClick={() => sendMessage()}
              aria-label="Send coach message"
              className="grid h-11 w-11 place-items-center rounded-xl bg-[#4A3A2C] text-[#E8DFC9]"
            >
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProofView({
  data,
  navigate,
}: {
  data: ScholaryData;
  navigate: (path: string) => void;
}) {
  const hasIncome = data.entries.some(entry => entry.type === "income");
  return (
    <div className="space-y-7">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#6B7352]">
          Show the work
        </p>
        <h2 className="mt-2 font-display text-4xl font-extrabold tracking-[-.07em]">
          Proof of income
        </h2>
        <p className="mt-2 text-sm text-[#6B7352]">
          A clean snapshot for the moments your hustle needs to count.
        </p>
      </div>
      {hasIncome ? (
        <div className="grid gap-5 lg:grid-cols-[1fr_.8fr]">
          <div className="rounded-[30px] bg-[#F8F6EE] p-7 sm:p-9">
            <div className="flex items-start justify-between">
              <div>
                <Logo />
                <p className="mt-6 text-xs font-bold uppercase tracking-[.2em] text-[#6B7352]">
                  Income summary · Oct 2026
                </p>
              </div>
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#CBD2C1] text-[#3E6D51]">
                <ShieldCheck className="h-5 w-5" />
              </span>
            </div>
            <div className="mt-9 border-y border-[#CBD2C1] py-7">
              <p className="text-sm font-bold text-[#6B7352]">
                Logged earnings
              </p>
              <p className="mt-2 font-display text-5xl font-extrabold tracking-[-.08em]">
                {money(summarize(data).income, 2)}
              </p>
              <p className="mt-2 text-xs text-[#6B7352]">
                Across {data.hustles.length || 1} active hustles · generated
                just now
              </p>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs font-bold text-[#6B7352]">
                scholary.app/verify/maya-8k2
              </span>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(
                    "https://scholary.app/verify/maya-8k2"
                  );
                  toast.success("Proof link copied");
                }}
                className="rounded-xl bg-[#4A3A2C] px-4 py-2.5 text-xs font-extrabold text-[#E8DFC9]"
              >
                Copy link
              </button>
            </div>
          </div>
          <div className="rounded-[30px] bg-[#2F3A2E] p-7 text-[#E8DFC9] sm:p-9">
            <FileText className="h-7 w-7 text-[#D6A94B]" />
            <h3 className="mt-14 font-display text-3xl font-extrabold leading-tight tracking-[-.06em]">
              Proof without the awkward spreadsheet.
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#CBD2C1]/70">
              Create a private, revocable link that only shows the range and
              hustles you choose.
            </p>
            <button
              onClick={() =>
                toast.success("Proof link created", {
                  description: "Your private link is ready to copy.",
                })
              }
              className="mt-8 rounded-xl bg-[#D6A94B] px-4 py-3 text-xs font-extrabold text-[#2F3A2E]"
            >
              Create proof link <ArrowUpRight className="ml-1 inline h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-[30px] bg-[#F8F6EE] p-8 text-center sm:p-14">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-[22px] bg-[#CBD2C1] text-[#6B7352]">
            <FileText className="h-7 w-7" />
          </div>
          <h3 className="mt-6 font-display text-2xl font-extrabold tracking-[-.05em]">
            A proof link needs one real entry.
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6B7352]">
            Log some income first. Then you can make a clean link for a
            landlord, client or future you.
          </p>
          <button
            onClick={() => navigate("/income")}
            className="mt-6 rounded-xl bg-[#4A3A2C] px-4 py-3 text-xs font-extrabold text-[#E8DFC9]"
          >
            Go to income
          </button>
        </div>
      )}
    </div>
  );
}

function SettingsView({
  mode,
  data,
  setData,
  notificationEmail,
  setNotificationEmail,
  onLogout,
}: {
  mode: Mode;
  data: ScholaryData;
  setData: React.Dispatch<React.SetStateAction<ScholaryData>>;
  notificationEmail: string;
  setNotificationEmail: React.Dispatch<React.SetStateAction<string>>;
  onLogout: () => void;
}) {
  const reset = () => {
    setData(zeroData);
    toast.success("Your data is back to zero", {
      description: "This demo reset is local to this session.",
    });
  };
  return (
    <div className="space-y-7">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#6B7352]">
          Keep it yours
        </p>
        <h2 className="mt-2 font-display text-4xl font-extrabold tracking-[-.07em]">
          Settings
        </h2>
        <p className="mt-2 text-sm text-[#6B7352]">
          Your profile, your preferences, your data.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[28px] bg-[#F8F6EE] p-6">
          <h3 className="font-display text-xl font-extrabold tracking-[-.04em]">
            Profile
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-extrabold text-[#526047]">
              Name
              <input
                value={data.name}
                onChange={event =>
                  setData(current => ({ ...current, name: event.target.value }))
                }
                className="mt-2 h-11 w-full rounded-xl border border-[#CBD2C1] bg-[#E8DFC9]/35 px-3 text-sm font-bold outline-none focus:border-[#4A3A2C]"
              />
            </label>
            <label className="text-xs font-extrabold text-[#526047]">
              State
              <input
                defaultValue="CA"
                className="mt-2 h-11 w-full rounded-xl border border-[#CBD2C1] bg-[#E8DFC9]/35 px-3 text-sm font-bold outline-none focus:border-[#4A3A2C]"
              />
            </label>
            <label className="text-xs font-extrabold text-[#526047] sm:col-span-2">
              Notification email
              <input
                type="email"
                value={notificationEmail}
                onChange={event => setNotificationEmail(event.target.value)}
                placeholder="you@example.com"
                className="mt-2 h-11 w-full rounded-xl border border-[#CBD2C1] bg-[#E8DFC9]/35 px-3 text-sm font-bold outline-none focus:border-[#4A3A2C]"
              />
              <span className="mt-1 block text-[10px] font-medium text-[#6B7352]">
                Scholary will use this address for reminders and account alerts.
              </span>
            </label>
          </div>
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                localStorage.setItem(
                  "scholary-notification-email",
                  notificationEmail
                );
                localStorage.setItem("scholary-account-name", data.name);
              }
              toast.success("Profile saved", {
                description: notificationEmail
                  ? `Notifications will go to ${notificationEmail}.`
                  : "Add an email any time to receive notifications.",
              });
            }}
            className="mt-5 rounded-xl border border-[#CBD2C1] px-4 py-2.5 text-xs font-extrabold text-[#4A3A2C]"
          >
            Save profile
          </button>
        </div>
        <div className="rounded-[28px] bg-[#F8F6EE] p-6">
          <h3 className="font-display text-xl font-extrabold tracking-[-.04em]">
            Your data
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#6B7352]">
            Take it with you, reset it, or leave when you need to.
          </p>
          <div className="mt-5 grid gap-2">
            <button
              onClick={() =>
                toast.success("Export ready", {
                  description: "A JSON + CSV export would download here.",
                })
              }
              className="flex items-center gap-3 rounded-xl bg-[#E8DFC9]/50 p-3 text-left text-xs font-extrabold"
            >
              <FolderOpen className="h-4 w-4 text-[#4A3A2C]" /> Export my data{" "}
              <ChevronRight className="ml-auto h-4 w-4 text-[#9AA18B]" />
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-3 rounded-xl bg-[#E8DFC9]/50 p-3 text-left text-xs font-extrabold"
            >
              <Trash2 className="h-4 w-4 text-[#D17C62]" /> Reset my data to
              zero <ChevronRight className="ml-auto h-4 w-4 text-[#9AA18B]" />
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-3 rounded-xl bg-[#D17C62]/10 p-3 text-left text-xs font-extrabold text-[#A75944]"
            >
              <LogOut className="h-4 w-4" /> Log out{" "}
              <ChevronRight className="ml-auto h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="rounded-[28px] bg-[#CBD2C1]/60 p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 text-[#3E6D51]" />
          <div>
            <h3 className="font-extrabold">Privacy promise</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-[#526047]">
              {mode === "demo"
                ? "This is demo data. Edits are temporary and never affect anyone else."
                : "Your rows are scoped to your account. No bank linking. No passwords to your accounts."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function IncomeModal({
  activeTab,
  setActiveTab,
  onClose,
  onSave,
  hustles,
}: {
  activeTab: EntryOrigin;
  setActiveTab: (tab: EntryOrigin) => void;
  onClose: () => void;
  onSave: (entry: Entry) => void;
  hustles: ScholaryData["hustles"];
}) {
  const [amount, setAmount] = useState(activeTab === "manual" ? "" : "48");
  const [source, setSource] = useState(
    activeTab === "manual"
      ? ""
      : activeTab === "email"
        ? "Etsy payout"
        : activeTab === "voice"
          ? "Tutoring · Maya"
          : "Etsy payout"
  );
  const [hustleId, setHustleId] = useState(hustles[0]?.id ?? "unassigned");
  const [scanning, setScanning] = useState(false);
  const tabs: { id: EntryOrigin; label: string; icon: LucideIcon }[] = [
    { id: "screenshot", label: "Screenshot", icon: Camera },
    { id: "email", label: "Email", icon: Mail },
    { id: "voice", label: "Voice", icon: Mic },
    { id: "manual", label: "Manual", icon: ReceiptText },
  ];
  const selectTab = (tab: EntryOrigin) => {
    setActiveTab(tab);
    setScanning(false);
    if (tab !== "manual") {
      setAmount(tab === "voice" ? "120" : tab === "email" ? "48" : "48");
      setSource(
        tab === "voice"
          ? "Tutoring · Maya"
          : tab === "email"
            ? "Etsy payout"
            : "Etsy payout"
      );
    } else {
      setAmount("");
      setSource("");
    }
  };
  const submit = () => {
    const parsed = Number(amount);
    if (!parsed || parsed <= 0) {
      toast.error("Add an amount first");
      return;
    }
    onSave({
      id: `entry-${Date.now()}`,
      amount: parsed,
      source: source || "New income",
      hustleId,
      date: "2026-10-05",
      type: "income",
      origin: activeTab,
      verified: activeTab === "screenshot" || activeTab === "email",
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#2F3A2E]/55 p-0 backdrop-blur-sm sm:items-center sm:p-5"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        className="max-h-[92vh] w-full max-w-xl overflow-auto rounded-t-[30px] bg-[#F8F6EE] p-5 shadow-2xl sm:rounded-[30px] sm:p-7"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#6B7352]">
              Add a win
            </p>
            <h2 className="mt-1 font-display text-2xl font-extrabold tracking-[-.05em]">
              Log income your way.
            </h2>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-xl bg-[#E8DFC9]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-4 gap-1 rounded-2xl bg-[#E8DFC9]/65 p-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => selectTab(tab.id)}
              className={`flex flex-col items-center gap-1 rounded-xl px-2 py-2.5 text-[10px] font-extrabold ${activeTab === tab.id ? "bg-[#2F3A2E] text-[#E8DFC9]" : "text-[#6B7352]"}`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === "screenshot" && (
          <div className="mt-5 rounded-2xl border border-dashed border-[#6B7352]/35 bg-[#E8DFC9]/45 p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#D17C62]/15 text-[#D17C62]">
                <UploadCloud className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-extrabold">
                  Drop a payout screenshot
                </p>
                <p className="mt-1 text-[10px] text-[#6B7352]">
                  DoorDash, Venmo, Etsy, Fiverr and more
                </p>
              </div>
              <button
                onClick={() => setScanning(true)}
                className="ml-auto rounded-xl bg-[#4A3A2C] px-3 py-2 text-[10px] font-extrabold text-[#E8DFC9]"
              >
                {scanning ? "Scanning..." : "Choose file"}
              </button>
            </div>
            {scanning && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#CBD2C1]/70 p-3 text-xs font-bold text-[#526047]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#D17C62]" />{" "}
                Found payout details · 94% confident
              </div>
            )}
          </div>
        )}
        {activeTab === "email" && (
          <div className="mt-5 rounded-2xl bg-[#E8DFC9]/55 p-4">
            <div className="flex items-start gap-3">
              <Inbox className="mt-0.5 h-5 w-5 text-[#4A3A2C]" />
              <div>
                <p className="text-sm font-extrabold">Forwarded email found</p>
                <p className="mt-1 text-xs leading-5 text-[#6B7352]">
                  Payout from Etsy · received just now. Nothing is logged until
                  you confirm the details below.
                </p>
              </div>
            </div>
          </div>
        )}
        {activeTab === "voice" && (
          <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#D17C62]/15 p-4">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#D17C62] text-white">
              <Mic className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-extrabold">
                “Got 120 for tutoring Maya.”
              </p>
              <p className="mt-1 text-xs text-[#6B7352]">
                Transcript ready · tap any field to edit
              </p>
            </div>
          </div>
        )}
        <div className="mt-5 rounded-2xl bg-[#2F3A2E] p-5 text-[#E8DFC9]">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#CBD2C1]/65">
              Confirmation card
            </p>
            <span className="rounded-full bg-[#6B7352] px-2 py-1 text-[9px] font-bold">
              {activeTab === "manual" ? "Manual" : "Ready to review"}
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#CBD2C1]/60">
              Amount
              <input
                value={amount}
                onChange={event => setAmount(event.target.value)}
                className="mt-1 h-11 w-full rounded-xl border border-[#CBD2C1]/20 bg-white/5 px-3 font-display text-xl font-extrabold text-[#E8DFC9] outline-none focus:border-[#D6A94B]"
              />
            </label>
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#CBD2C1]/60">
              Source
              <input
                value={source}
                onChange={event => setSource(event.target.value)}
                className="mt-1 h-11 w-full rounded-xl border border-[#CBD2C1]/20 bg-white/5 px-3 text-sm font-bold text-[#E8DFC9] outline-none focus:border-[#D6A94B]"
              />
            </label>
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#CBD2C1]/60">
              Hustle
              <select
                value={hustleId}
                onChange={event => setHustleId(event.target.value)}
                className="mt-1 h-11 w-full rounded-xl border border-[#CBD2C1]/20 bg-[#2F3A2E] px-3 text-sm font-bold text-[#E8DFC9] outline-none focus:border-[#D6A94B]"
              >
                <option value="unassigned">Unassigned</option>
                {hustles.map(hustle => (
                  <option key={hustle.id} value={hustle.id}>
                    {hustle.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#CBD2C1]/60">
              Confidence
              <div className="mt-1 flex h-11 items-center gap-2 rounded-xl border border-[#CBD2C1]/20 bg-white/5 px-3">
                <span className="h-2 w-2 rounded-full bg-[#D6A94B]" />
                <span className="text-xs font-bold normal-case tracking-normal text-[#E8DFC9]">
                  High confidence
                </span>
              </div>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-[#CBD2C1]/20 pt-4">
            <p className="text-[11px] text-[#CBD2C1]/65">
              Nothing saves until you confirm.
            </p>
            <button
              onClick={submit}
              className="rounded-xl bg-[#D6A94B] px-4 py-3 text-xs font-extrabold text-[#2F3A2E]"
            >
              Confirm & log <Check className="ml-1 inline h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function VerifyPage() {
  return (
    <div className="min-h-screen bg-[#CBD2C1] px-5 py-6 text-[#2F3A2E] sm:px-8">
      <div className="mx-auto flex max-w-[960px] items-center justify-between">
        <a href="/">
          <Logo />
        </a>
        <span className="rounded-full bg-[#E8DFC9]/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[.18em] text-[#6B7352]">
          Public verification
        </span>
      </div>
      <div className="mx-auto max-w-[760px] py-16 sm:py-24">
        <div className="rounded-[32px] bg-[#F8F6EE] p-7 shadow-[0_20px_55px_rgba(47,58,46,0.12)] sm:p-10">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#6B7352]">
                Verified proof of income
              </p>
              <h1 className="mt-3 font-display text-4xl font-extrabold tracking-[-.07em]">
                Maya Rivera’s work is real.
              </h1>
            </div>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#3E6D51] text-[#E8DFC9]">
              <ShieldCheck className="h-6 w-6" />
            </span>
          </div>
          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-[#E8DFC9]/55 p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B7352]">
                Date range
              </p>
              <p className="mt-2 text-sm font-extrabold">Sep 1 – Oct 5, 2026</p>
            </div>
            <div className="rounded-2xl bg-[#E8DFC9]/55 p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B7352]">
                Logged earnings
              </p>
              <p className="mt-2 font-display text-2xl font-extrabold tracking-[-.06em]">
                $742.50
              </p>
            </div>
            <div className="rounded-2xl bg-[#E8DFC9]/55 p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B7352]">
                Status
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-sm font-extrabold text-[#3E6D51]">
                <Check className="h-4 w-4" /> Verified
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-[#CBD2C1] pt-5 text-xs leading-6 text-[#6B7352]">
            This link was created by Scholary and can be revoked by the account
            holder at any time. It shows only the range and earnings they chose
            to share.
          </div>
        </div>
        <p className="mt-6 text-center text-xs font-bold text-[#6B7352]">
          From Hustle to Harmony · scholary.app
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const [location, setLocation] = useLocation();
  const [mode, setMode] = useState<Mode>(() =>
    typeof window !== "undefined" &&
    localStorage.getItem("scholary-mode") === "real"
      ? "real"
      : "demo"
  );
  const [data, setData] = useState<ScholaryData>(() => {
    if (
      typeof window === "undefined" ||
      localStorage.getItem("scholary-mode") !== "real"
    )
      return demoData;
    return {
      ...zeroData,
      name: localStorage.getItem("scholary-account-name") || zeroData.name,
    };
  });
  const enter = (nextMode: Mode, path = "/dashboard", name?: string) => {
    setMode(nextMode);
    const savedName =
      typeof window !== "undefined"
        ? localStorage.getItem("scholary-account-name")
        : null;
    const realData = {
      ...zeroData,
      name: name?.trim() || savedName || zeroData.name,
    };
    setData(nextMode === "demo" ? demoData : realData);
    if (typeof window !== "undefined") {
      localStorage.setItem("scholary-mode", nextMode);
      if (nextMode === "real" && name?.trim())
        localStorage.setItem("scholary-account-name", name.trim());
    }
    setLocation(path);
  };
  const logout = () => {
    if (typeof window !== "undefined") localStorage.removeItem("scholary-mode");
    setMode("demo");
    setData(demoData);
    setLocation("/");
  };
  if (location === "/")
    return (
      <Landing
        onDemo={() => enter("demo")}
        onSignup={() => setLocation("/signup")}
        onLogin={() => setLocation("/login")}
      />
    );
  if (location.startsWith("/verify/")) return <VerifyPage />;
  if (location === "/login" || location === "/signup")
    return (
      <AuthPage
        kind={location.slice(1) as "login" | "signup"}
        onDemo={() => enter("demo")}
        onEnter={(nextMode, name) => enter(nextMode, "/dashboard", name)}
      />
    );
  return (
    <AppShell
      mode={mode}
      data={data}
      setData={setData}
      onLogout={logout}
      onSignup={() => setLocation("/signup")}
    />
  );
}

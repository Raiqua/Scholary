# Scholary implementation checklist

## 1. Brand shell, responsive navigation and route manifest
- The landing page uses the Scholary wordmark, tagline “From Hustle to Harmony.”, hero copy “Your gigs. Your paycheck. Zero bank linking.”, “Sign up free”, “Log in” and “Try the live demo” CTAs, a screenshot-to-income mock, three pain-point stats, six feature explanations, “Log it → Understand it → Prove it”, privacy strip and footer.
- Desktop uses a Forest Canopy sidebar; mobile uses a bottom tab bar and a floating Add income action. The palette follows the 60/30/10 rule with Pale Jade #CBD2C1 and Champagne #E8DFC9 as dominant surfaces, Mossy Green #6B7352 and Forest Canopy #2F3A2E as secondary structure, and Embered Earth #4A3A2C as the accent.
- `/manus-routes.json` returns HTTP 200 and declares every implemented page plus `/verify/:id`, excluding APIs/assets.

## 2. Demo mode and strict real-account zero state
- “Try the demo” opens a shared read-friendly demo account with four hustles, about ten weeks of realistic income and expenses, two goals, a tax jar balance, a forecast, a sample proof link, one client-verified entry and demo parsing samples.
- Demo mode shows “You’re viewing demo data. Sign up to track your own.” with a Sign up button; demo edits are session-only/reset on logout and are never copied into real accounts. Cached fallbacks keep demo rendering if APIs/network fail.
- Newly signed-up users have zero hustles, incomes, goals, tax jar balance and proof links. Dashboard zero state shows $0 safe-to-spend with “Log your first income to see what’s safe to spend.”, $0 tax jar, “Add your first goal.”, an empty income feed and “Add your first hustle.”
- New-user onboarding checklist contains Add a hustle, Log your first income, Set a goal and Check your tax jar, with completion state derived from the user’s own rows.

## 3. Auth, ownership and settings
- Email/password sign up and log in expose show/hide password, forgot-password affordance, friendly validation/errors, persistent-session loading and logout; protected app routes redirect signed-out visitors to `/login`, while `/verify/:id` remains public.
- Each user sees and mutates only their own incomes, hustles, goals, tax transfers and proof links through authenticated server procedures and user-owned rows.
- First login can be skipped and lands at zero-state dashboard; optional gig selections create empty hustles only. Settings support profile edits, password change affordance, CSV/JSON export, account deletion with confirmation and reset-data-to-zero with confirmation.

## 4. Dashboard, calculations and forecast
- Dashboard contains a safe-to-spend ring with low/expected/high range and explanation, tax jar amount vs estimated total with progress, top-goal progress and projected finish, forecast chart, source/verification badges, recent income feed and hustle summary.
- Tax, forecast, safe-to-spend and goal dates are computed in plain code from the signed-in user’s own rows; AI copy receives structured computed context and never invents dollar amounts.
- Forecast with no data shows “Still learning your pattern. Log a few weeks of income and your forecast appears here.” with no fake bands; fewer than three weeks shows a wide cautious band labeled “Early estimate.” Tax starts at $0, includes a “Do I owe tax?” explainer, and only shows the $2,300 example after the user clicks “Try an example”.

## 5. Income and expense management
- Manual add/edit/delete supports amount, hustle or create-new hustle, date defaulting to today, optional hours, note and income/expense toggle; entries can be bulk selected/deleted and reassigned.
- Screenshot, email and voice entries always stop at an editable confirmation card before saving. Confirmation supports amount, source, date, hustle assignment/creation, confidence indicators, notes and evidence; low-confidence fields are easy to fix.
- Add-income modal includes Screenshot, Email, Voice and Manual tabs. Screenshot drop/paste/file-picker states accept common payout evidence; demo-only sample screenshot thumbnails and simulated forwarded-email buttons never appear for real users.

## 6. Hustles, goals, tax jar and proofs
- Hustles can be added, edited, archived and deleted; deleting asks whether to keep entries by moving them to Unassigned or delete the entries too. Suggested chips include Tutoring, Babysitting, Lawn mowing, Dog walking, Delivery, Reselling and Freelance.
- Goals support save-up and earn-a-target modes, name, target, saved amount, deadline, image affordance, add/remove money, mark complete and delete. Empty state provides “+ Add your first goal.”
- Tax jar supports manual transfers in/out plus edit/delete of past transfers.
- Proof of Income supports create, extend, revoke and delete; it is disabled with a clear explanation until at least one income entry exists. Public verification is available at `/verify/:id`.

## 7. Coach, inbox and accessible interaction quality
- Coach with no data says it needs income logged first and suggests how to add it; it never makes up figures. With data it explains only computed values.
- Real users get an email-forwarding address/inbox concept with received → parsing → logged states and confirmation before counting; demo has only demo sample-email actions.
- Voice logging offers Web Speech API with typed fallback, live transcript and parser confirmation. All primary actions have keyboard/focus states, friendly toasts, responsive layout, and motion is subtle.

## 8. Backend foundation, validation and checkpoint
- Drizzle schema/migrations include profiles, hustles, income_entries, goals, tax_jar_transfers and proof_links with user_id ownership fields and demo marker support; seed path targets demo only.
- Server routes/procedures and client data-access hooks share typed view models and fall back safely for demo mode. `/api/health` remains healthy and app build uses the configured port.
- `pnpm check` and `pnpm build` pass; representative add/edit/delete flows update all dependent metrics and return to zero after all data is deleted; desktop and mobile preview are readable; intended files are committed/pushed to canonical main for a recorded checkpoint.

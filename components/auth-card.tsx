"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Compass, Eye, EyeOff, Mail, Lock, User, Ticket } from "lucide-react"
import { cn } from "@/lib/utils"

type Tab = "signup" | "login"
type Gender = "male" | "female" | "unspecified"

const genderOptions: { value: Gender; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "unspecified", label: "Prefer not to say" },
]

export function AuthCard() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>("signup")
  const [showPassword, setShowPassword] = useState(false)
  const [gender, setGender] = useState<Gender>("unspecified")

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 flex flex-col items-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-primary-foreground">
          <Compass className="h-8 w-8" aria-hidden="true" />
        </span>
        <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-foreground">
          Wanderlore
        </h1>
        <p className="mt-1 text-sm text-muted-foreground text-pretty">
          Journeys into the world&apos;s cultures, crafts, and flavors.
        </p>
      </div>

      <div className="rounded-4xl border border-border bg-card p-6 sm:p-8">
        <div
          role="tablist"
          aria-label="Authentication"
          className="mb-8 grid grid-cols-2 gap-1 rounded-full bg-muted p-1"
        >
          <TabButton active={tab === "signup"} onClick={() => setTab("signup")} controls="signup-panel">
            Sign up
          </TabButton>
          <TabButton active={tab === "login"} onClick={() => setTab("login")} controls="login-panel">
            Log in
          </TabButton>
        </div>

        {tab === "signup" ? (
          <form
            id="signup-panel"
            role="tabpanel"
            className="flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault()
              router.push("/home")
            }}
          >
            <Field label="Gmail" htmlFor="signup-email" icon={<Mail className="h-5 w-5" aria-hidden="true" />}>
              <input
                id="signup-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@gmail.com"
                className={inputClass}
              />
            </Field>

            <Field label="Password" htmlFor="signup-password" icon={<Lock className="h-5 w-5" aria-hidden="true" />}>
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Create a password"
                className={cn(inputClass, "pr-12")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </Field>

            <Field label="Username" htmlFor="signup-username" icon={<User className="h-5 w-5" aria-hidden="true" />}>
              <input
                id="signup-username"
                type="text"
                autoComplete="username"
                placeholder="Pick a username"
                className={inputClass}
              />
            </Field>

            <fieldset className="flex flex-col gap-2">
              <legend className="mb-2 text-sm font-medium text-foreground">Gender</legend>
              <div className="grid grid-cols-3 gap-2">
                {genderOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    aria-pressed={gender === opt.value}
                    onClick={() => setGender(opt.value)}
                    className={cn(
                      "rounded-full border px-3 py-2.5 text-sm font-medium leading-tight transition-colors text-balance",
                      gender === opt.value
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="signup-referral" className="text-xs font-medium text-muted-foreground">
                Referral code (optional)
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60">
                  <Ticket className="h-4 w-4" aria-hidden="true" />
                </span>
                <input
                  id="signup-referral"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter code if you have one"
                  className="w-full rounded-xl border border-border/60 bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/15"
                />
              </div>
            </div>

            <button type="submit" className={cn(primaryButtonClass, "mt-2")}>
              Create account
            </button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setTab("login")}
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                Log in
              </button>
            </p>
          </form>
        ) : (
          <form
            id="login-panel"
            role="tabpanel"
            className="flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault()
              router.push("/home")
            }}
          >
            <Field label="Gmail" htmlFor="login-email" icon={<Mail className="h-5 w-5" aria-hidden="true" />}>
              <input
                id="login-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@gmail.com"
                className={inputClass}
              />
            </Field>

            <Field label="Password" htmlFor="login-password" icon={<Lock className="h-5 w-5" aria-hidden="true" />}>
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                className={cn(inputClass, "pr-12")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </Field>

            <button type="submit" className={cn(primaryButtonClass, "mt-2")}>
              Log in
            </button>

            <p className="text-center text-sm">
              <button
                type="button"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                Forgot password?
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

function TabButton({
  active,
  onClick,
  controls,
  children,
}: {
  active: boolean
  onClick: () => void
  controls: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls={controls}
      onClick={onClick}
      className={cn(
        "rounded-full py-2.5 text-sm font-semibold transition-colors",
        active ? "bg-card text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  )
}

function Field({
  label,
  htmlFor,
  icon,
  children,
}: {
  label: string
  htmlFor: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        {children}
      </div>
    </div>
  )
}

const inputClass =
  "w-full rounded-2xl border border-input bg-background py-3 pl-12 pr-4 text-base text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/25"

const primaryButtonClass =
  "w-full rounded-full bg-primary py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-card"

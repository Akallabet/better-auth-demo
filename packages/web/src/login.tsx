// import { useLoaderData } from "react-router";
import { MagicLinkForm } from "./components/login/magic-link";
import { Card } from "./components/ui/card";

export function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 dark:bg-slate-900">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center justify-center rounded-full bg-primary/10 p-2 dark:bg-primary/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-primary dark:text-primary"
            >
              <path d="M2 22V8a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z" />
              <path d="M19 3v4" />
              <path d="M5 3v4" />
              <path d="M22 8H2" />
              <path d="M7 13h.01" />
              <path d="M12 13h.01" />
              <path d="M17 13h.01" />
              <path d="M7 17h.01" />
              <path d="M12 17h.01" />
              <path d="M17 17h.01" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Hello!</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Log in with your email address
          </p>
        </div>
        <Card>
          <MagicLinkForm />
          <div className="p-4 pt-0">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or
                </span>
              </div>
            </div>
            <div className="mt-4"></div>
          </div>
        </Card>
      </div>
    </div>
  );
}

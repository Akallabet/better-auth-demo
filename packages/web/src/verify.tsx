import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { authClient } from "./lib/auth";

interface VerificationError {
  message: string;
}

export function VerifyPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setErrorMessage("No verification token found in the URL.");
      return;
    }

    // Verify the magic link token by making a direct API call
    const verifyMagicLink = async () => {
      try {
        const response = await authClient.magicLink.verify({
          query: {
            token,
          },
        });
        if (response.data) {
          setStatus("success");
          // Redirect after a short delay to show success message
          setTimeout(() => {
            navigate(callbackURL);
          }, 2000);
        } else {
          setStatus("error");
          setErrorMessage(response.error.message || "Failed to verify magic link. The link may have expired or is invalid.");
        }
      } catch (error) {
        setStatus("error");
        setErrorMessage("Network error occurred while verifying the magic link.");
      }
    };

    verifyMagicLink();
  }, [searchParams, navigate]);

  const getStatusContent = () => {
    switch (status) {
      case "loading":
        return (
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <h3 className="text-xl font-semibold">Verifying your magic link...</h3>
            <p className="text-sm text-muted-foreground">
              Please wait while we verify your authentication.
            </p>
          </div>
        );

      case "success":
        return (
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold">Successfully verified!</h3>
            <p className="text-sm text-muted-foreground">
              You have been successfully authenticated. Redirecting you now...
            </p>
          </div>
        );

      case "error":
        return (
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
              <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-semibold">Verification failed</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              {errorMessage}
            </p>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
              >
                Try again
              </Button>
              <Button
                onClick={() => navigate("/")}
              >
                Go home
              </Button>
            </div>
          </div>
        );
    }
  };

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
          <h1 className="text-2xl font-bold tracking-tight">Magic Link Verification</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            {getStatusContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

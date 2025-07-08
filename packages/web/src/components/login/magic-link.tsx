import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { authClient } from "@/lib/auth";
import { useSearchParams } from "react-router";

export function MagicLinkForm() {
  const [loading, setLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [searchParams] = useSearchParams();
  const invitationCode = searchParams.get("invitation");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email")?.toString() || "";

    setLoading(true);
    authClient.signIn.magicLink(
      {
        email,
        callbackURL: invitationCode
          ? `/accept-invitation/${invitationCode}`
          : "/",
      },
      {
        onSuccess: () => {
          setLoading(false);
          setMagicLinkSent(true);
        },
        onError: () => {
          setLoading(false);
          setMagicLinkSent(false);
        },
      },
    );
  }
  return !magicLinkSent ? (
    <form onSubmit={handleSubmit}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Login</CardTitle>
        <CardDescription>Enter your email</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="email">email address</Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            name="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            required
            disabled={loading}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full" size="lg" type="submit" disabled={loading}>
          {loading ? "Sending magic link" : "send magic link"}
        </Button>
      </CardFooter>
    </form>
  ) : (
    <div className="p-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="rounded-full bg-primary/10 p-3">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">Check your email</h3>
      </div>
    </div>
  );
}

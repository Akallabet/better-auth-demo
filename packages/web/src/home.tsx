import { Button } from "./components/ui/button";
import { authClient } from "./lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { UsersList } from "./components/UsersList";

export function HomePage() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to BetterAuth Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isPending ? (
            <p className="text-muted-foreground">Loading session...</p>
          ) : session ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                You are signed in as:
              </p>
              <div className="p-3 bg-muted rounded-md">
                <p className="font-medium">{session.user.email}</p>
                <p className="text-sm text-muted-foreground">
                  User ID: {session.user.id}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                You are not signed in. Please sign in to access your account.
              </p>
              <Button asChild>
                <a href="/login">Sign In</a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {session && <UsersList />}
    </div>
  );
}

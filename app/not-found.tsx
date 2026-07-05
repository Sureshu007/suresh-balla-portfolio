import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <Card className="premium-card mx-4 w-full max-w-md">
        <CardContent className="pt-6">
          <div className="mb-4 flex gap-3">
            <AlertCircle className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            The page you are looking for does not exist.
          </p>

          <Button asChild className="mt-6">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Go home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

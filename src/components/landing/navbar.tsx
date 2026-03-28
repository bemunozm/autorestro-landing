"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navLinks = [
  { name: "Características", href: "#features" },
  { name: "Precios", href: "#pricing" },
  { name: "Demo", href: "#demo" },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center space-x-3 transition-transform hover:scale-105">
              <Image
                src="/auto-restro.png"
                alt="Auto-Restro Logo"
                width={48}
                height={48}
                className="h-12 w-auto"
              />
              <span className="hidden font-heading text-2xl font-bold sm:inline-block tracking-tight">
                Auto-Restro
              </span>
            </Link>

            <div className="hidden lg:flex lg:items-center lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-bold uppercase tracking-widest text-muted-foreground transition-all hover:text-primary hover:tracking-[0.2em]"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-muted"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-golden-accent" />
                ) : (
                  <Moon className="h-5 w-5 text-purple-primary" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}

            <Link 
              href="https://wa.me/56XXXXXXXXX"
              className={cn(
                buttonVariants({ variant: "default" }),
                "hidden md:inline-flex bg-golden-accent text-charcoal font-bold px-6 h-11 border-b-4 border-charcoal/20 active:border-b-0 active:translate-y-[2px] transition-all"
              )}
            >
              Habla con nosotros
            </Link>

            <Sheet>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                }
              />
              <SheetContent side="right">
                <SheetTitle className="text-left mb-8">Menú</SheetTitle>
                <div className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link 
                    href="https://wa.me/56XXXXXXXXX"
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "mt-4 bg-golden-accent text-charcoal hover:bg-golden-accent/90"
                    )}
                  >
                    Habla con nosotros
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

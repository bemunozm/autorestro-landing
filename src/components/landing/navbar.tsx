"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Moon, Sun, MessageCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { WhatsAppDialog } from "./whatsapp-dialog";

const navLinks = [
  { name: "Características", href: "#features" },
  { name: "Precios", href: "#precios" },
  { name: "Demo", href: "#demo" },
  { name: "FAQ", href: "#faq" },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center space-x-3 transition-transform hover:scale-105">
              <div className="w-10 h-10 bg-purple rounded-xl flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-purple/20">
                A
              </div>
              <span className="hidden font-heading text-2xl font-bold sm:inline-block tracking-tight text-charcoal dark:text-off-white">
                Auto-Restro
              </span>
            </Link>

            <div className="hidden lg:flex lg:items-center lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs font-bold uppercase tracking-widest text-muted-foreground transition-all hover:text-purple hover:tracking-[0.15em]"
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
                  <Sun className="h-5 w-5 text-golden" />
                ) : (
                  <Moon className="h-5 w-5 text-purple" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}

            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="hidden md:flex bg-golden text-charcoal font-bold px-6 h-11 rounded-xl shadow-lg shadow-golden/10 hover:bg-golden/90 transition-all active:scale-95 gap-2"
            >
              <MessageCircle size={18} className="fill-charcoal" />
              Habla con nosotros
            </Button>

            <Sheet>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" className="md:hidden rounded-full">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                }
              />
              <SheetContent side="right" className="w-[300px] sm:w-[400px] rounded-l-[2rem]">
                <SheetTitle className="text-left mb-8 font-heading text-2xl">Menú</SheetTitle>
                <div className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-xl font-heading font-bold text-charcoal dark:text-off-white transition-colors hover:text-purple"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Button 
                    onClick={() => setIsDialogOpen(true)}
                    className="mt-4 bg-golden text-charcoal font-bold h-14 rounded-2xl shadow-lg shadow-golden/10 flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={20} className="fill-charcoal" />
                    Habla con nosotros
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <WhatsAppDialog 
        isOpen={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        source="navbar"
      />
    </nav>
  );
}

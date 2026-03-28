"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Menu, Moon, Sun, MessageCircle, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
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
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center space-x-3 transition-transform hover:scale-105">
              <Image 
                src="/auto-restro.png" 
                alt="Auto-Restro Logo" 
                width={44} 
                height={44}
                className="object-contain"
              />
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
              className="hidden md:flex bg-[#D4A017] text-charcoal font-bold px-6 h-11 rounded-xl shadow-lg shadow-golden/10 hover:bg-[#D4A017]/90 transition-all active:scale-95 gap-2 border-none"
            >
              <MessageCircle size={18} className="fill-charcoal" />
              Habla con nosotros
            </Button>

            <Sheet>
              <SheetTrigger
                render={
                  <Button variant="outline" size="icon" className="md:hidden w-12 h-12 rounded-xl border-2 border-border/50 bg-background hover:bg-muted transition-colors">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                }
              />
              <SheetContent side="right" className="w-full sm:w-[400px] p-0 border-l-0">
                <div className="flex flex-col h-full bg-background">
                  <div className="p-6 border-b border-border/50">
                    <SheetTitle className="font-heading text-2xl font-bold">Menú</SheetTitle>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="flex flex-col gap-4">
                      {navLinks.map((link) => (
                        <SheetClose
                          key={link.name}
                          render={
                            <Link
                              href={link.href}
                              className="flex items-center h-16 px-6 text-xl font-heading font-bold text-charcoal dark:text-off-white rounded-2xl hover:bg-muted transition-colors"
                            >
                              {link.name}
                            </Link>
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <div className="p-6 border-t border-border/50 bg-muted/30">
                    <Button 
                      onClick={() => {
                        setIsDialogOpen(true);
                      }}
                      className="w-full bg-[#D4A017] text-charcoal font-bold h-16 rounded-2xl shadow-xl shadow-golden/20 flex items-center justify-center gap-3 text-lg border-none"
                    >
                      <MessageCircle size={24} className="fill-charcoal" />
                      Habla con nosotros
                    </Button>
                  </div>
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

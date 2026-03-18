"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/lib/button-variants";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/cities", label: "도시 탐색" },
  { href: "/compare", label: "도시 비교" },
  { href: "/calculator", label: "생활비 계산기" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<"KO" | "EN">("KO");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl shrink-0">
          <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <MapPin className="h-4 w-4 text-white" />
          </div>
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            KoreaNomad
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted",
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 hidden sm:flex"
            onClick={() => setLang(lang === "KO" ? "EN" : "KO")}
          >
            <Globe className="h-3.5 w-3.5" />
            {lang}
          </Button>
          <Link
            href="/cities"
            className={cn(buttonVariants({ size: "sm" }), "hidden md:flex")}
          >
            도시 탐색하기
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-muted",
                pathname === link.href
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-border/50">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 w-full justify-center"
              onClick={() => setLang(lang === "KO" ? "EN" : "KO")}
            >
              <Globe className="h-3.5 w-3.5" />
              {lang === "KO" ? "한국어" : "English"}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

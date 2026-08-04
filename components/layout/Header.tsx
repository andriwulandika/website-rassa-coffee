"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        isScrolled
          ? "bg-background/95 shadow-sm backdrop-blur-md"
          : "bg-background/60 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="Rassa Coffee - Beranda">
          <Image
            src="/images/logo.jpeg"
            alt="Rassa Coffee"
            width={48}
            height={48}
            className="h-12 w-12 rounded-xl object-cover"
            priority
          />
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-base font-medium text-foreground/80 hover:bg-accent/20 hover:text-primary focus:bg-accent/20"
                  )}
                >
                  <Link href={link.href}>{link.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden md:block">
          <Button asChild className="rounded-full px-6">
            <Link href="/contact">Kunjungi Kami</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Buka menu"
            >
              <Menu className="h-6 w-6 text-primary" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background">
            <SheetTitle className="flex items-center gap-2 text-left text-xl text-primary">
              <Image
                src="/images/logo.jpeg"
                alt="Rassa Coffee"
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg object-cover"
              />
              Rassa Coffee
            </SheetTitle>
            <nav className="mt-8 flex flex-col gap-2">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-md px-3 py-3 text-lg font-medium text-foreground/80 transition-colors hover:bg-accent/20 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <SheetClose asChild>
              <Button asChild className="mt-6 w-full rounded-full">
                <Link href="/contact">Kunjungi Kami</Link>
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

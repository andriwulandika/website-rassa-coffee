import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
} from "@/components/icons/SocialIcons";
import { whatsapp } from "@/lib/whatsapp";

const quickLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  {
    href: "https://www.instagram.com/rassa_coffee?igsh=MXF0MGphNGJnajdueA==",
    label: "Instagram",
    icon: InstagramIcon,
  },
  {
    href: "https://www.facebook.com/share/1BsTJLj4v3/",
    label: "Facebook",
    icon: FacebookIcon,
  },
  {
    href: whatsapp.greetingLink,
    label: "WhatsApp",
    icon: WhatsAppIcon,
  },
];

export function Footer() {
  return (
    <footer className="bg-primary text-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Image
              src="/images/logo.jpeg"
              alt="Rassa Coffee"
              width={56}
              height={56}
              className="h-14 w-14 rounded-xl object-cover"
            />
            <p className="mt-4 max-w-xs text-sm text-background/70">
              Sejak 2016, dari mobil kopi keliling hingga kini gallery kopi
              di Kutacane — kopi berkualitas dari dataran tinggi Gayo,
              Takengon, disajikan dengan suasana cozy.
            </p>
            <div className="mt-4 flex items-start gap-2 text-sm text-background/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>Kutacane, Aceh Tenggara</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 transition-colors hover:text-background"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
              Ikuti Kami
            </h3>
            <div className="mt-4 flex gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 transition-colors hover:bg-background/20"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-background/15 pt-6 text-center text-xs text-background/60">
          © 2026 Rassa Coffee. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const menuItems = [
  { href: "/length-converter", label: "길이" },
  { href: "/weight-converter", label: "무게" },
  { href: "/temperature-converter", label: "온도" },
  { href: "/area-converter", label: "면적" },
  { href: "/volume-converter", label: "부피" },
];

export default function Header() {
  return (
    <header className="sticky top-4 z-50 px-4">
      <div className="mx-auto max-w-5xl"><div className="h-14 rounded-full border border-border bg-white/70 px-6 shadow-sm backdrop-blur-md dark:bg-black/40"><nav className="flex h-full items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold transition-opacity hover:opacity-80">
          <Image src="/logo.png" alt="" width={32} height={32} priority className="h-8 w-8 object-contain" />
          <span>단위로</span>
        </Link>
        <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="rounded-full" aria-label="메뉴 열기"><Menu className="h-5 w-5" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-56">{menuItems.map((item) => <DropdownMenuItem key={item.href} asChild><Link href={item.href} className="cursor-pointer">{item.label}</Link></DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu>
      </nav></div></div>
    </header>
  );
}

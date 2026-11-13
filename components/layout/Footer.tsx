import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-12 border-t"><div className="container mx-auto px-4 py-6"><div className="flex flex-col items-center justify-center gap-3 text-center"><Link href="/" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"><Image src="/logo.png" alt="" width={22} height={22} className="h-[22px] w-[22px] object-contain" /><span>단위로</span></Link><p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()}</p></div></div></footer>
  );
}

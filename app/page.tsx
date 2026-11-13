import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Droplets, Gauge, Ruler, Thermometer, Weight } from "lucide-react";

const tools = [
  { title: "길이 변환기", description: "길이 단위 변환과 도면 축척 계산을 함께 제공합니다.", href: "/length-converter", icon: Ruler },
  { title: "무게 변환기", description: "단위를 변환하고 여러 항목의 무게를 합산·배분합니다.", href: "/weight-converter", icon: Weight },
  { title: "온도 변환기", description: "절대 온도와 온도 차이를 구분해 정확하게 계산합니다.", href: "/temperature-converter", icon: Thermometer },
  { title: "면적 변환기", description: "도형을 직접 조절하며 면적과 둘레까지 계산합니다.", href: "/area-converter", icon: Gauge },
  { title: "부피 변환기", description: "용기 치수와 수위를 바탕으로 용량과 채움량을 계산합니다.", href: "/volume-converter", icon: Droplets },
];

export default function HomePage() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      <section className="container relative mx-auto px-4 pb-20 pt-28 text-center md:pb-24 md:pt-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-white/40 px-4 py-2 text-sm font-medium tracking-wide text-muted-foreground backdrop-blur-sm dark:bg-white/5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-foreground" />
            빠르고 정확한 단위 변환
          </div>
          <h1 className="mb-8 text-5xl font-bold leading-tight tracking-tight md:text-7xl">단위 변환 계산기</h1>
          <p className="mx-auto max-w-2xl text-xl font-light leading-[1.7] text-muted-foreground md:text-2xl">길이, 무게, 온도, 면적, 부피 단위를 간편하게 계산하세요.</p>
        </div>
      </section>
      <section className="container relative mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.href} href={tool.href} className="group" style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both` }}>
                <div className="relative h-full">
                  <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-foreground/0 via-foreground/10 to-foreground/0 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />
                  <Card className="relative h-full">
                    <CardHeader className="space-y-4 p-6">
                      <div className="flex items-start justify-between"><div className="rounded-lg bg-foreground/5 p-2.5 transition-all duration-300 group-hover:scale-110 group-hover:bg-foreground/10"><Icon className="h-5 w-5 text-foreground/70" strokeWidth={2} /></div><ArrowRight className="h-4 w-4 text-muted-foreground/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground" /></div>
                      <div><CardTitle className="mb-2 text-lg tracking-tight">{tool.title}</CardTitle><CardDescription className="text-sm font-light leading-[1.6]">{tool.description}</CardDescription></div>
                    </CardHeader>
                  </Card>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ConverterPage from "@/components/converter/ConverterPage";
import { converterSlugs, getConverterCategory } from "@/lib/converters/unit-conversions";

interface PageProps { params: Promise<{ category: string }>; }

export function generateStaticParams() { return converterSlugs.map((category) => ({ category })); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const converterCategory = getConverterCategory(category);
  return converterCategory ? { title: converterCategory.title, description: converterCategory.description } : { title: "페이지를 찾을 수 없습니다" };
}

export default async function ConverterCategoryPage({ params }: PageProps) {
  const { category } = await params;
  const converterCategory = getConverterCategory(category);
  if (!converterCategory) notFound();
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      <main className="container relative mx-auto px-4 py-12 md:py-16">
        <section className="mx-auto mb-10 max-w-2xl text-center"><p className="mb-3 text-sm font-medium tracking-wide text-muted-foreground">단위 변환</p><h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">{converterCategory.title}</h1><p className="text-lg leading-relaxed text-muted-foreground">{converterCategory.description}</p></section>
        <ConverterPage categorySlug={converterCategory.slug} />
      </main>
    </div>
  );
}

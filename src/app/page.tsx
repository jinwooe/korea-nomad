import Link from "next/link";
import { ArrowRight, MapPin, Wifi, BarChart3, Star, Users, Database } from "lucide-react";
import { buttonVariants } from "@/lib/button-variants";
import { Badge } from "@/components/ui/badge";
import { CityCard } from "@/components/cities/city-card";
import { cities } from "@/lib/data/cities";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const featuredCities = cities.filter((c) =>
    ["seoul", "busan", "jeju"].includes(c.slug)
  );
  const gridCities = cities
    .filter((c) => !["seoul", "busan", "jeju"].includes(c.slug))
    .sort((a, b) => b.nomadScore - a.nomadScore)
    .slice(0, 6);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-indigo-900 to-blue-900 text-white">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 py-24 md:py-36">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <Badge
              variant="outline"
              className="border-blue-400/30 text-blue-200 bg-blue-500/10 px-4 py-1.5 text-sm"
            >
              <Star className="h-3.5 w-3.5 mr-1.5 fill-blue-300 text-blue-300" />
              2026 한국 디지털 노마드 가이드
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              한국 디지털 노마드의
              <br />
              <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                다음 도시를 찾아보세요
              </span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed max-w-2xl mx-auto">
              한국 15개 도시의 생활비, 인터넷 속도, 카공 환경을 한 번에 비교.
              <br className="hidden sm:block" />
              당신에게 완벽한 도시를 찾아드립니다.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/cities"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-white text-blue-900 hover:bg-blue-50 font-semibold px-8 shadow-lg shadow-blue-900/30"
                )}
              >
                도시 탐색하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/calculator"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "border-white/30 text-white hover:bg-white/10 px-8"
                )}
              >
                생활비 계산하기
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-white/10 bg-black/20">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-3 divide-x divide-white/10">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 py-2">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-300" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-2xl font-bold text-white">15개</p>
                  <p className="text-xs text-blue-200/70">도시</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 py-2">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Database className="h-5 w-5 text-blue-300" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-2xl font-bold text-white">20+</p>
                  <p className="text-xs text-blue-200/70">데이터 항목</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 py-2">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Users className="h-5 w-5 text-blue-300" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-2xl font-bold text-white">1,000+</p>
                  <p className="text-xs text-blue-200/70">리뷰</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cities */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">인기 추천 도시</h2>
            <p className="text-muted-foreground mt-1">노마드들이 가장 많이 선택하는 도시</p>
          </div>
          <Link
            href="/cities"
            className={cn(buttonVariants({ variant: "ghost" }), "hidden sm:flex gap-2")}
          >
            전체 보기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCities.map((city) => (
            <CityCard key={city.slug} city={city} featured />
          ))}
        </div>
      </section>

      {/* More Cities */}
      <section className="bg-muted/20 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">더 많은 도시 탐색</h2>
              <p className="text-muted-foreground mt-1">숨겨진 보석 같은 노마드 도시들</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {gridCities.map((city) => (
              <CityCard key={city.slug} city={city} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/cities"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }), "gap-2 px-8")}
            >
              15개 도시 모두 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            왜 KoreaNomad인가요?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            디지털 노마드에게 필요한 모든 정보를 한 곳에
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
              title: "실시간 데이터 비교",
              desc: "생활비, 인터넷 속도, 코워킹 비용을 도시별로 한눈에 비교하세요.",
            },
            {
              icon: <Wifi className="h-8 w-8 text-indigo-500" />,
              title: "인터넷 & 코워킹 정보",
              desc: "한국의 빠른 인터넷 인프라와 코워킹 스페이스 정보를 상세하게 확인하세요.",
            },
            {
              icon: <MapPin className="h-8 w-8 text-cyan-500" />,
              title: "맞춤 도시 추천",
              desc: "예산과 생활 방식을 입력하면 최적의 도시를 추천해드립니다.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center p-6 rounded-2xl border border-border/50 bg-card hover:border-primary/20 hover:shadow-md transition-all duration-200"
            >
              <div className="p-3 bg-muted/50 rounded-xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            지금 바로 나만의 도시를 찾아보세요
          </h2>
          <p className="text-blue-100/80 max-w-md mx-auto">
            생활비 계산기로 내 예산에 맞는 도시를 찾아보세요
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/calculator"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-white text-blue-900 hover:bg-blue-50 px-8"
              )}
            >
              생활비 계산하기
            </Link>
            <Link
              href="/compare"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-white/30 text-white hover:bg-white/10 px-8"
              )}
            >
              도시 비교하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

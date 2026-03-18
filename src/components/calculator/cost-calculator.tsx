"use client";

import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/lib/button-variants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cities, formatCost, City } from "@/lib/data/cities";
import { NomadScoreBadge } from "@/components/cities/nomad-score-badge";
import Link from "next/link";
import { ArrowRight, Wifi, Coffee, Building2, Utensils, Train } from "lucide-react";
import { cn } from "@/lib/utils";

type AccomType = "gosiwon" | "oneRoom" | "airbnb" | "shareHouse";
type WorkStyle = "cafe" | "coworking" | "home";

const ACCOM_LABELS: Record<AccomType, string> = {
  gosiwon: "고시원",
  oneRoom: "원룸",
  airbnb: "에어비앤비",
  shareHouse: "쉐어하우스",
};

const WORK_LABELS: Record<WorkStyle, string> = {
  cafe: "카페",
  coworking: "코워킹 스페이스",
  home: "재택 근무",
};

function getWorkCost(city: City, style: WorkStyle): number {
  if (style === "cafe") return 150000; // ~5 coffees/day x 20 days
  if (style === "coworking") return city.coworkingMonthly;
  return 0;
}

function estimateMonthlyCost(city: City, accom: AccomType, work: WorkStyle): number {
  return (
    city.accommodation[accom] +
    city.food.monthly +
    getWorkCost(city, work) +
    80000 + // transport
    80000   // misc
  );
}

export function CostCalculator() {
  const [budget, setBudget] = useState(1500000);
  const [accom, setAccom] = useState<AccomType>("oneRoom");
  const [work, setWork] = useState<WorkStyle>("cafe");

  const results = useMemo(() => {
    return cities
      .map((city) => {
        const estimated = estimateMonthlyCost(city, accom, work);
        return { city, estimated, fits: estimated <= budget };
      })
      .sort((a, b) => {
        if (a.fits && !b.fits) return -1;
        if (!a.fits && b.fits) return 1;
        return a.estimated - b.estimated;
      });
  }, [budget, accom, work]);

  const fittingCount = results.filter((r) => r.fits).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Input panel */}
      <div className="lg:col-span-2 space-y-6">
        {/* Budget */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">월 예산</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">예산 설정</span>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₩</span>
                  <Input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="pl-7 w-36 text-right"
                    min={500000}
                    max={5000000}
                    step={100000}
                  />
                </div>
              </div>
              <Slider
                value={budget}
                onValueChange={(v) => setBudget(typeof v === "number" ? v : (v as number[])[0])}
                min={500000}
                max={5000000}
                step={100000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>₩500,000</span>
                <span className="font-semibold text-primary">{formatCost(budget)}</span>
                <span>₩5,000,000</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accommodation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">숙소 유형</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(ACCOM_LABELS) as AccomType[]).map((key) => (
                <Button
                  key={key}
                  variant={accom === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAccom(key)}
                  className="justify-start gap-2"
                >
                  <Building2 className="h-3.5 w-3.5" />
                  {ACCOM_LABELS[key]}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Work style */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">근무 스타일</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              {(Object.keys(WORK_LABELS) as WorkStyle[]).map((key) => {
                const Icon = key === "cafe" ? Coffee : key === "coworking" ? Wifi : Building2;
                return (
                  <Button
                    key={key}
                    variant={work === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setWork(key)}
                    className="justify-start gap-2"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {WORK_LABELS[key]}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Summary of selections */}
        <Card className="bg-muted/20">
          <CardContent className="pt-5 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">월 예산</span>
              <span className="font-semibold">{formatCost(budget)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">숙소</span>
              <span className="font-semibold">{ACCOM_LABELS[accom]}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">근무</span>
              <span className="font-semibold">{WORK_LABELS[work]}</span>
            </div>
            <Separator className="my-1" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">맞는 도시</span>
              <span className="font-semibold text-green-600">{fittingCount}개</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results panel */}
      <div className="lg:col-span-3 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">추천 도시</h2>
          <Badge variant="secondary">{fittingCount}개 예산 적합</Badge>
        </div>

        <div className="space-y-3">
          {results.map(({ city, estimated, fits }) => {
            const accomCost = city.accommodation[accom];
            const foodCost = city.food.monthly;
            const workCost = getWorkCost(city, work);
            const transportCost = 80000;
            const miscCost = 80000;

            return (
              <Card
                key={city.slug}
                className={`transition-all duration-200 ${
                  fits
                    ? "border-green-500/30 hover:border-green-500/50 hover:shadow-md"
                    : "opacity-60 border-border/30"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Link href={`/cities/${city.slug}`} className="font-bold text-lg hover:text-primary transition-colors">
                          {city.name}
                        </Link>
                        <span className="text-muted-foreground text-sm">{city.nameEn}</span>
                        <NomadScoreBadge score={city.nomadScore} size="sm" />
                      </div>
                      <p className="text-sm text-muted-foreground">{city.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`text-xl font-bold ${fits ? "text-green-600" : "text-red-500"}`}>
                        {formatCost(estimated)}
                      </p>
                      <p className="text-xs text-muted-foreground">/ 월 예상</p>
                      {fits ? (
                        <Badge className="mt-1 bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                          예산 적합
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="mt-1 text-xs text-red-500 border-red-500/20">
                          +{formatCost(estimated - budget)} 초과
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                      <span>예산 사용률</span>
                      <span>{Math.round((estimated / budget) * 100)}%</span>
                    </div>
                    <Progress
                      value={Math.min(100, (estimated / budget) * 100)}
                      className={`h-1.5 ${fits ? "" : "[&>div]:bg-red-500"}`}
                    />
                  </div>

                  <div className="grid grid-cols-5 gap-2 text-center">
                    {[
                      { label: "숙소", value: accomCost, icon: <Building2 className="h-3 w-3" /> },
                      { label: "식비", value: foodCost, icon: <Utensils className="h-3 w-3" /> },
                      { label: "작업공간", value: workCost, icon: <Coffee className="h-3 w-3" /> },
                      { label: "교통", value: transportCost, icon: <Train className="h-3 w-3" /> },
                      { label: "기타", value: miscCost, icon: <Building2 className="h-3 w-3" /> },
                    ].map((item) => (
                      <div key={item.label} className="bg-muted/30 rounded-lg p-2">
                        <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                          {item.icon}
                        </div>
                        <p className="text-xs font-semibold">{Math.round(item.value / 10000)}만</p>
                        <p className="text-[10px] text-muted-foreground">{item.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex justify-end">
                    <Link
                      href={`/cities/${city.slug}`}
                      className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1 text-xs h-7")}
                    >
                      자세히 보기
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

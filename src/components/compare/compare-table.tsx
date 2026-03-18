"use client";

import { useState } from "react";
import { X, Plus, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cities, formatCost } from "@/lib/data/cities";
import { NomadScoreBadge } from "@/components/cities/nomad-score-badge";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const MAX_CITIES = 3;

const compareRows = [
  { label: "노마드 스코어", key: "nomadScore", format: (v: number) => `${v}점`, isScore: true },
  { label: "월 최저 생활비", key: "monthlyMinCost", format: (v: number) => formatCost(v) },
  { label: "월 최대 생활비", key: "monthlyMaxCost", format: (v: number) => formatCost(v) },
  { label: "인터넷 다운로드", key: "_internetDown", format: (v: number) => `${v} Mbps` },
  { label: "인터넷 업로드", key: "_internetUp", format: (v: number) => `${v} Mbps` },
  { label: "카공 지수", key: "cafeIndex", format: (v: number) => `${v}/10`, isProgress: true, max: 10 },
  { label: "안전 점수", key: "safetyScore", format: (v: number) => `${v}/10`, isProgress: true, max: 10 },
  { label: "날씨 점수", key: "weatherScore", format: (v: number) => `${v}/10`, isProgress: true, max: 10 },
  { label: "커뮤니티 점수", key: "communityScore", format: (v: number) => `${v}/10`, isProgress: true, max: 10 },
  { label: "코워킹 스페이스", key: "coworkingSpaces", format: (v: number) => `${v}개` },
  { label: "코워킹 일일 요금", key: "coworkingDaily", format: (v: number) => formatCost(v) },
  { label: "5G 커버리지", key: "wifi5gCoverage", format: (v: number) => `${v}%`, isProgress: true, max: 100 },
  { label: "연평균 기온", key: "_avgTemp", format: (v: number) => `${v}°C` },
];

function getCityValue(city: (typeof cities)[0], key: string): number {
  switch (key) {
    case "_internetDown": return city.internetSpeed.down;
    case "_internetUp": return city.internetSpeed.up;
    case "_avgTemp": return city.weather.avgTemp;
    default: return (city as unknown as Record<string, number>)[key] ?? 0;
  }
}

export function CompareTable() {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(["seoul", "busan", "jeju"]);

  const selectedCities = selectedSlugs.map((s) => cities.find((c) => c.slug === s)!).filter(Boolean);
  const availableCities = cities.filter((c) => !selectedSlugs.includes(c.slug));

  const addCity = (slug: string | null) => {
    if (slug && selectedSlugs.length < MAX_CITIES) {
      setSelectedSlugs([...selectedSlugs, slug]);
    }
  };

  const removeCity = (slug: string) => {
    setSelectedSlugs(selectedSlugs.filter((s) => s !== slug));
  };

  const gradients: Record<string, string> = {
    seoul: "from-blue-600 to-indigo-700",
    busan: "from-cyan-500 to-blue-600",
    jeju: "from-emerald-500 to-teal-600",
    daegu: "from-orange-500 to-red-600",
    incheon: "from-violet-500 to-purple-700",
    gwangju: "from-rose-500 to-pink-600",
    daejeon: "from-amber-500 to-orange-600",
    jeonju: "from-lime-500 to-green-600",
    gyeongju: "from-yellow-500 to-amber-600",
    gangneung: "from-sky-400 to-cyan-600",
    chuncheon: "from-teal-500 to-emerald-600",
    sokcho: "from-blue-400 to-sky-600",
    yeosu: "from-indigo-400 to-blue-600",
    suncheon: "from-green-500 to-emerald-700",
    mokpo: "from-slate-500 to-gray-700",
  };

  return (
    <div className="space-y-6">
      {/* City selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: MAX_CITIES }).map((_, i) => {
          const city = selectedCities[i];
          return (
            <div key={i} className="relative">
              {city ? (
                <div className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${gradients[city.slug] || "from-blue-500 to-indigo-600"} text-white p-4`}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-7 w-7 text-white/70 hover:text-white hover:bg-white/10"
                    onClick={() => removeCity(city.slug)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <p className="text-white/60 text-xs mb-0.5">{city.region}</p>
                  <p className="font-bold text-lg">{city.name}</p>
                  <p className="text-white/70 text-sm">{city.nameEn}</p>
                  <NomadScoreBadge score={city.nomadScore} size="sm" className="mt-2 bg-black/20 border-white/20 text-white" />
                </div>
              ) : (
                <div className="border-2 border-dashed border-border/50 rounded-xl p-4 flex flex-col items-center justify-center gap-2 min-h-[120px]">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                  <Select onValueChange={addCity}>
                    <SelectTrigger className="border-0 shadow-none focus:ring-0 text-muted-foreground">
                      <SelectValue placeholder="도시 추가..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCities.map((c) => (
                        <SelectItem key={c.slug} value={c.slug}>
                          {c.name} ({c.nameEn})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedCities.length < 2 && (
        <div className="text-center py-10 text-muted-foreground">
          <ArrowUpDown className="h-8 w-8 mx-auto mb-3 opacity-30" />
          <p>최소 2개의 도시를 선택하여 비교해보세요</p>
        </div>
      )}

      {/* Compare table */}
      {selectedCities.length >= 2 && (
        <div className="rounded-xl border border-border/50 overflow-hidden">
          {/* Header */}
          <div className={`grid gap-0 border-b border-border/50`} style={{ gridTemplateColumns: `200px repeat(${selectedCities.length}, 1fr)` }}>
            <div className="p-4 bg-muted/30 font-semibold text-sm">항목</div>
            {selectedCities.map((city) => (
              <div key={city.slug} className="p-4 bg-muted/30 font-semibold text-sm text-center border-l border-border/50">
                {city.name}
              </div>
            ))}
          </div>

          {/* Rows */}
          {compareRows.map((row, idx) => {
            const values = selectedCities.map((c) => getCityValue(c, row.key));
            const maxVal = Math.max(...values);
            const minVal = Math.min(...values);

            return (
              <div
                key={row.key}
                className={`grid gap-0 border-b border-border/40 last:border-0 ${idx % 2 === 0 ? "" : "bg-muted/10"}`}
                style={{ gridTemplateColumns: `200px repeat(${selectedCities.length}, 1fr)` }}
              >
                <div className="p-4 text-sm text-muted-foreground font-medium flex items-center">
                  {row.label}
                </div>
                {selectedCities.map((city, ci) => {
                  const val = values[ci];
                  const isBest = val === maxVal && maxVal !== minVal;
                  const isWorst = val === minVal && maxVal !== minVal;

                  return (
                    <div key={city.slug} className="p-4 border-l border-border/40 flex flex-col items-center justify-center gap-1.5">
                      {row.isScore ? (
                        <NomadScoreBadge score={val} size="sm" />
                      ) : (
                        <span className={`text-sm font-semibold ${isBest ? "text-green-600" : isWorst ? "text-red-500" : ""}`}>
                          {row.format(val)}
                        </span>
                      )}
                      {row.isProgress && (
                        <Progress value={(val / (row.max || 10)) * 100} className="h-1.5 w-16" />
                      )}
                      {isBest && !row.isScore && (
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-[10px] px-1.5 py-0">최고</Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

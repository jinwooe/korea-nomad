"use client";

import { useState } from "react";
import { cities } from "@/lib/data/cities";
import { CityCard } from "@/components/cities/city-card";
import { CityFilters } from "@/components/cities/city-filters";
import { City } from "@/lib/data/cities";

export default function CitiesPage() {
  const [filtered, setFiltered] = useState<City[]>(
    [...cities].sort((a, b) => b.nomadScore - a.nomadScore)
  );

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">도시 탐색</h1>
        <p className="text-muted-foreground text-lg">
          한국의 {cities.length}개 도시를 비교하고 나에게 맞는 도시를 찾아보세요
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 p-5 bg-muted/20 rounded-2xl border border-border/50">
        <CityFilters cities={cities} onFilter={setFiltered} />
      </div>

      {/* Results count */}
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{filtered.length}개</span> 도시 표시 중
        </p>
      </div>

      {/* City Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((city) => (
            <CityCard key={city.slug} city={city} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-xl font-semibold mb-2">검색 결과가 없습니다</p>
          <p className="text-sm">다른 검색어나 필터를 시도해보세요</p>
        </div>
      )}
    </div>
  );
}

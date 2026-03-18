"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { City } from "@/lib/data/cities";

interface CityFiltersProps {
  cities: City[];
  onFilter: (filtered: City[]) => void;
}

export function CityFilters({ cities, onFilter }: CityFiltersProps) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("nomadScore");
  const [region, setRegion] = useState("all");
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const applyFilters = (
    searchVal: string,
    sortVal: string,
    regionVal: string
  ) => {
    let filtered = [...cities];

    if (searchVal) {
      filtered = filtered.filter(
        (c) =>
          c.name.includes(searchVal) ||
          c.nameEn.toLowerCase().includes(searchVal.toLowerCase())
      );
    }

    if (regionVal !== "all") {
      filtered = filtered.filter((c) => c.region === regionVal);
    }

    filtered.sort((a, b) => {
      switch (sortVal) {
        case "nomadScore":
          return b.nomadScore - a.nomadScore;
        case "costLow":
          return a.monthlyMinCost - b.monthlyMinCost;
        case "costHigh":
          return b.monthlyMinCost - a.monthlyMinCost;
        case "internetSpeed":
          return b.internetSpeed.down - a.internetSpeed.down;
        default:
          return b.nomadScore - a.nomadScore;
      }
    });

    onFilter(filtered);
  };

  const handleSearch = (val: string) => {
    setSearch(val);
    setActivePreset(null);
    applyFilters(val, sortBy, region);
  };

  const handleSort = (val: string | null) => {
    const v = val ?? "nomadScore";
    setSortBy(v);
    applyFilters(search, v, region);
  };

  const handleRegion = (val: string | null) => {
    const v = val ?? "all";
    setRegion(v);
    setActivePreset(null);
    applyFilters(search, sortBy, v);
  };

  const handlePreset = (preset: string) => {
    setActivePreset(preset);
    if (preset === "budget") {
      const sorted = [...cities].sort((a, b) => a.monthlyMinCost - b.monthlyMinCost);
      onFilter(sorted.slice(0, 6));
    } else if (preset === "internet") {
      const sorted = [...cities].sort((a, b) => b.internetSpeed.down - a.internetSpeed.down);
      onFilter(sorted.slice(0, 6));
    } else if (preset === "remote") {
      const filtered = cities.filter((c) => c.cafeIndex >= 8.5);
      onFilter(filtered);
    }
  };

  const handleReset = () => {
    setSearch("");
    setSortBy("nomadScore");
    setRegion("all");
    setActivePreset(null);
    applyFilters("", "nomadScore", "all");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="도시 검색..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={sortBy} onValueChange={handleSort}>
          <SelectTrigger className="w-full sm:w-44">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            <SelectValue placeholder="정렬 기준" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nomadScore">노마드 스코어순</SelectItem>
            <SelectItem value="costLow">생활비 낮은순</SelectItem>
            <SelectItem value="costHigh">생활비 높은순</SelectItem>
            <SelectItem value="internetSpeed">인터넷 속도순</SelectItem>
          </SelectContent>
        </Select>
        <Select value={region} onValueChange={handleRegion}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="지역 분류" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 지역</SelectItem>
            <SelectItem value="대도시">대도시</SelectItem>
            <SelectItem value="관광·워케이션">관광·워케이션</SelectItem>
            <SelectItem value="신흥 노마드">신흥 노마드</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={handleReset} className="sm:w-auto">
          초기화
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm text-muted-foreground">빠른 선택:</span>
        <Badge
          variant={activePreset === "budget" ? "default" : "secondary"}
          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() => handlePreset("budget")}
        >
          💰 예산 절약형 TOP 6
        </Badge>
        <Badge
          variant={activePreset === "internet" ? "default" : "secondary"}
          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() => handlePreset("internet")}
        >
          ⚡ 초고속 인터넷 TOP 6
        </Badge>
        <Badge
          variant={activePreset === "remote" ? "default" : "secondary"}
          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() => handlePreset("remote")}
        >
          ☕ 카공 천국
        </Badge>
      </div>
    </div>
  );
}

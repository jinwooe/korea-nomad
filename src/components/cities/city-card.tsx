import Link from "next/link";
import { Wifi, MapPin, Banknote, Coffee } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NomadScoreBadge } from "./nomad-score-badge";
import { City, formatCost } from "@/lib/data/cities";

interface CityCardProps {
  city: City;
  featured?: boolean;
}

export function CityCard({ city, featured = false }: CityCardProps) {
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

  const gradient = gradients[city.slug] || "from-blue-500 to-indigo-600";

  return (
    <Link href={`/cities/${city.slug}`}>
      <Card
        className={`group overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer ${featured ? "h-full" : ""}`}
      >
        {/* Hero gradient image area */}
        <div
          className={`relative bg-gradient-to-br ${gradient} ${featured ? "h-48" : "h-36"} flex items-end p-4`}
        >
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFYwYzk5LjY2IDAgMTggOC4wNiAxOCAxOGgtMnoiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')]" />
          <div className="relative z-10 flex items-end justify-between w-full">
            <div>
              <p className="text-white/70 text-xs font-medium mb-0.5">{city.region}</p>
              <h3 className="text-white font-bold text-xl leading-tight">
                {city.name}
                <span className="ml-2 text-white/70 text-sm font-normal">{city.nameEn}</span>
              </h3>
            </div>
            <NomadScoreBadge score={city.nomadScore} size="sm" className="bg-black/30 border-white/20 text-white backdrop-blur-sm" />
          </div>
        </div>

        <CardContent className="p-4">
          {featured && (
            <p className="text-muted-foreground text-sm mb-3 line-clamp-1">{city.description}</p>
          )}

          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="flex flex-col items-center gap-1 bg-muted/30 rounded-lg p-2">
              <Wifi className="h-3.5 w-3.5 text-blue-500" />
              <span className="text-xs font-semibold">{city.internetSpeed.down}Mbps</span>
              <span className="text-[10px] text-muted-foreground">인터넷</span>
            </div>
            <div className="flex flex-col items-center gap-1 bg-muted/30 rounded-lg p-2">
              <Banknote className="h-3.5 w-3.5 text-green-500" />
              <span className="text-xs font-semibold">
                {Math.round(city.monthlyMinCost / 10000)}만~
              </span>
              <span className="text-[10px] text-muted-foreground">월 생활비</span>
            </div>
            <div className="flex flex-col items-center gap-1 bg-muted/30 rounded-lg p-2">
              <Coffee className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-xs font-semibold">{city.cafeIndex}</span>
              <span className="text-[10px] text-muted-foreground">카공지수</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {city.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0">
                {tag}
              </Badge>
            ))}
            {city.region && (
              <Badge variant="outline" className="text-[10px] px-2 py-0 ml-auto">
                <MapPin className="h-2.5 w-2.5 mr-0.5" />
                {city.region}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

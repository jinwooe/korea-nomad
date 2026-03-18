import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Wifi,
  Shield,
  Coffee,
  Thermometer,
  Users,
  Train,
  Building2,
  Download,
  Upload,
  Signal,
  Globe,
} from "lucide-react";
import { cities, getCityBySlug, formatCost } from "@/lib/data/cities";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/lib/button-variants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { NomadScoreBadge, NomadScoreCircle } from "@/components/cities/nomad-score-badge";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export default async function CityDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) notFound();

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
  const gradient = gradients[city.slug] || "from-blue-600 to-indigo-700";

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className={`relative bg-gradient-to-br ${gradient} text-white overflow-hidden`}>
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFYwYzk5LjY2IDAgMTggOC4wNiAxOCAxOGgtMnoiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')]" />
        <div className="container mx-auto px-4 py-12">
          <Link
            href="/cities"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-6 text-white/70 hover:text-white hover:bg-white/10 -ml-2")}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            도시 목록으로
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-1">
              <Badge className="bg-white/10 text-white border-white/20 mb-4">
                {city.region}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {city.name}
                <span className="ml-3 text-white/60 text-2xl font-normal">{city.nameEn}</span>
              </h1>
              <p className="text-white/70 text-lg mb-4">{city.description}</p>
              <div className="flex flex-wrap gap-2">
                {city.tags.map((tag) => (
                  <Badge key={tag} className="bg-white/10 text-white border-white/20">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <NomadScoreCircle score={city.nomadScore} />
              <p className="text-white/60 text-sm font-medium">노마드 스코어</p>
            </div>
          </div>

          {/* Key stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              { label: "월 최저 생활비", value: formatCost(city.monthlyMinCost), icon: <Building2 className="h-4 w-4" /> },
              { label: "인터넷 속도", value: `${city.internetSpeed.down}Mbps`, icon: <Wifi className="h-4 w-4" /> },
              { label: "코워킹 스페이스", value: `${city.coworkingSpaces}개`, icon: <Coffee className="h-4 w-4" /> },
              { label: "안전 점수", value: `${city.safetyScore}/10`, icon: <Shield className="h-4 w-4" /> },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 text-white/60 mb-1">
                  {stat.icon}
                  <span className="text-xs">{stat.label}</span>
                </div>
                <p className="text-xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-10">
        <Tabs defaultValue="overview">
          <TabsList className="mb-8 h-auto flex-wrap gap-1">
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="cost">생활비</TabsTrigger>
            <TabsTrigger value="internet">인터넷</TabsTrigger>
            <TabsTrigger value="workspace">워크스페이스</TabsTrigger>
            <TabsTrigger value="weather">날씨</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">점수 요약</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "인터넷", score: city.internetScore, color: "bg-blue-500" },
                    { label: "안전", score: city.safetyScore, color: "bg-green-500" },
                    { label: "카공", score: city.cafeIndex, color: "bg-amber-500" },
                    { label: "커뮤니티", score: city.communityScore, color: "bg-purple-500" },
                    { label: "날씨", score: city.weatherScore, color: "bg-cyan-500" },
                    { label: "가성비", score: city.costScore, color: "bg-rose-500" },
                  ].map((item) => (
                    <div key={item.label} className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.label}</span>
                        <span className="text-muted-foreground">{item.score}/10</span>
                      </div>
                      <Progress value={item.score * 10} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">도시 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: "인구", value: city.population.toLocaleString("ko-KR") + "명", icon: <Users className="h-4 w-4 text-muted-foreground" /> },
                    { label: "외국인 비율", value: `${city.foreignerRatio}%`, icon: <Globe className="h-4 w-4 text-muted-foreground" /> },
                    { label: "평균 기온", value: `${city.weather.avgTemp}°C`, icon: <Thermometer className="h-4 w-4 text-muted-foreground" /> },
                    { label: "연간 강수량", value: `${city.weather.rainfall}mm`, icon: <Thermometer className="h-4 w-4 text-muted-foreground" /> },
                    ...(city.transportFromSeoul.ktxMinutes > 0
                      ? [{
                          label: "서울까지 KTX",
                          value: `${city.transportFromSeoul.ktxMinutes}분 (${formatCost(city.transportFromSeoul.ktxCost)})`,
                          icon: <Train className="h-4 w-4 text-muted-foreground" />,
                        }]
                      : []),
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-border/40 last:border-0">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {item.icon}
                        {item.label}
                      </div>
                      <span className="text-sm font-medium">{item.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Best seasons */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">추천 방문 시기</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {city.season.map((s) => (
                    <Badge key={s} variant="secondary" className="px-3 py-1.5 text-sm">
                      🌸 {s}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cost Tab */}
          <TabsContent value="cost" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">숙소 비용 (월)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { label: "고시원", value: city.accommodation.gosiwon },
                      { label: "쉐어하우스", value: city.accommodation.shareHouse },
                      { label: "원룸", value: city.accommodation.oneRoom },
                      { label: "에어비앤비", value: city.accommodation.airbnb },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                        <span className="font-semibold">{formatCost(item.value)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">식비</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { label: "저렴한 식사 1끼", value: city.food.cheap },
                      { label: "평균 식사 1끼", value: city.food.average },
                      { label: "월 식비 추정", value: city.food.monthly },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                        <span className="font-semibold">{formatCost(item.value)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">월 생활비 총 추정</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <p className="text-sm text-muted-foreground mb-1">절약형 (고시원 기준)</p>
                    <p className="text-2xl font-bold text-green-600">{formatCost(city.monthlyMinCost)}</p>
                    <p className="text-xs text-muted-foreground mt-1">/ 월</p>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <p className="text-sm text-muted-foreground mb-1">일반형 (원룸 기준)</p>
                    <p className="text-2xl font-bold text-blue-600">{formatCost(city.monthlyMaxCost)}</p>
                    <p className="text-xs text-muted-foreground mt-1">/ 월</p>
                  </div>
                </div>

                <Separator className="my-5" />

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground">절약형 세부 내역</h4>
                  {[
                    { label: "숙소 (고시원)", value: city.accommodation.gosiwon },
                    { label: "식비", value: city.food.monthly },
                    { label: "코워킹/카페", value: city.coworkingMonthly },
                    { label: "교통", value: 80000 },
                    { label: "기타", value: 100000 },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{formatCost(item.value)}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex items-center justify-between font-semibold">
                    <span>합계</span>
                    <span className="text-green-600">
                      {formatCost(
                        city.accommodation.gosiwon +
                          city.food.monthly +
                          city.coworkingMonthly +
                          80000 +
                          100000
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Internet Tab */}
          <TabsContent value="internet" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">인터넷 속도</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Download className="h-5 w-5 text-blue-500" />
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-medium">다운로드</span>
                          <span className="text-blue-600 font-semibold">{city.internetSpeed.down} Mbps</span>
                        </div>
                        <Progress value={(city.internetSpeed.down / 600) * 100} className="h-3" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Upload className="h-5 w-5 text-green-500" />
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-medium">업로드</span>
                          <span className="text-green-600 font-semibold">{city.internetSpeed.up} Mbps</span>
                        </div>
                        <Progress value={(city.internetSpeed.up / 300) * 100} className="h-3" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium flex items-center gap-1.5">
                          <Signal className="h-4 w-4 text-purple-500" /> 5G 커버리지
                        </span>
                        <span className="font-semibold">{city.wifi5gCoverage}%</span>
                      </div>
                      <Progress value={city.wifi5gCoverage} className="h-2" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium flex items-center gap-1.5">
                          <Wifi className="h-4 w-4 text-cyan-500" /> 공공 와이파이
                        </span>
                        <span className="font-semibold">{city.publicWifiCoverage}%</span>
                      </div>
                      <Progress value={city.publicWifiCoverage} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">인터넷 점수</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <div className="text-6xl font-bold text-blue-600 mb-2">{city.internetScore}</div>
                  <div className="text-muted-foreground text-sm">/ 10</div>
                  <NomadScoreBadge score={Math.round(city.internetScore * 10)} size="sm" className="mt-4" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Workspace Tab */}
          <TabsContent value="workspace" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">코워킹 현황</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: "코워킹 스페이스 수", value: `${city.coworkingSpaces}개` },
                    { label: "일일 이용료", value: formatCost(city.coworkingDaily) },
                    { label: "월 이용권", value: formatCost(city.coworkingMonthly) },
                    { label: "카공 지수", value: `${city.cafeIndex}/10` },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between py-2 border-b border-border/40 last:border-0">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <span className="font-semibold text-sm">{item.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">주요 코워킹 스페이스</CardTitle>
                </CardHeader>
                <CardContent>
                  {city.coworkingList && city.coworkingList.length > 0 ? (
                    <div className="space-y-3">
                      {city.coworkingList.map((ws) => (
                        <div key={ws.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/40">
                          <div>
                            <p className="font-medium text-sm">{ws.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              일일 {formatCost(ws.daily)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-sm text-blue-600">{formatCost(ws.monthly)}</p>
                            <p className="text-xs text-muted-foreground">/ 월</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">코워킹 스페이스 정보를 준비 중입니다.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Weather Tab */}
          <TabsContent value="weather" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">기후 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: "연평균 기온", value: `${city.weather.avgTemp}°C` },
                    { label: "연간 강수량", value: `${city.weather.rainfall}mm` },
                    { label: "날씨 점수", value: `${city.weatherScore}/10` },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between py-2 border-b border-border/40 last:border-0">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <span className="font-semibold text-sm">{item.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">추천 방문 시기</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {city.season.map((s) => (
                      <div key={s} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                        <span className="text-2xl">🌸</span>
                        <span className="text-sm font-medium">{s}</span>
                      </div>
                    ))}
                    <div className="mt-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">봄 (3~5월)</strong>과 <strong className="text-foreground">가을 (9~11월)</strong>이 일반적으로 가장 쾌적한 여행 시즌입니다. 여름은 덥고 습하며, 겨울은 춥습니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Monthly temp placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">월별 평균 기온 (참고)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                  {["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"].map(
                    (month, i) => {
                      const base = city.weather.avgTemp;
                      const temps = [-8, -5, 3, 12, 18, 23, 27, 28, 22, 14, 5, -3].map(
                        (t) => t + (base - 12)
                      );
                      const temp = temps[i];
                      const height = Math.max(10, Math.min(100, ((temp + 15) / 45) * 100));
                      return (
                        <div key={month} className="flex flex-col items-center gap-1">
                          <span className="text-xs font-medium">{temp > 0 ? "+" : ""}{Math.round(temp)}°</span>
                          <div className="w-full bg-muted rounded-full overflow-hidden" style={{ height: "60px" }}>
                            <div
                              className={`w-full rounded-full transition-all ${temp > 20 ? "bg-orange-400" : temp > 10 ? "bg-green-400" : temp > 0 ? "bg-blue-300" : "bg-blue-200"}`}
                              style={{ height: `${height}%`, marginTop: `${100 - height}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-muted-foreground">{month}</span>
                        </div>
                      );
                    }
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

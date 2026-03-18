import { CostCalculator } from "@/components/calculator/cost-calculator";

export default function CalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">생활비 계산기</h1>
        <p className="text-muted-foreground text-lg">
          예산과 생활 스타일을 설정하면 맞는 도시를 추천해드립니다
        </p>
      </div>
      <CostCalculator />
    </div>
  );
}

import { CompareTable } from "@/components/compare/compare-table";

export default function ComparePage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">도시 비교</h1>
        <p className="text-muted-foreground text-lg">
          최대 3개 도시를 선택하여 나란히 비교해보세요
        </p>
      </div>
      <CompareTable />
    </div>
  );
}

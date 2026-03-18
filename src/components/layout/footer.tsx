import Link from "next/link";
import { MapPin, Github, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 font-bold text-lg">
              <div className="h-7 w-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <MapPin className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                KoreaNomad
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              한국의 디지털 노마드를 위한 가이드. 15개 도시의 생활비, 인터넷 속도, 코워킹 환경을 비교하세요.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">탐색</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/cities" className="hover:text-foreground transition-colors">도시 탐색</Link></li>
              <li><Link href="/compare" className="hover:text-foreground transition-colors">도시 비교</Link></li>
              <li><Link href="/calculator" className="hover:text-foreground transition-colors">생활비 계산기</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">인기 도시</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/cities/seoul" className="hover:text-foreground transition-colors">서울 Seoul</Link></li>
              <li><Link href="/cities/busan" className="hover:text-foreground transition-colors">부산 Busan</Link></li>
              <li><Link href="/cities/jeju" className="hover:text-foreground transition-colors">제주 Jeju</Link></li>
              <li><Link href="/cities/gangneung" className="hover:text-foreground transition-colors">강릉 Gangneung</Link></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 KoreaNomad. 모든 권리 보유.</p>
          <p className="text-xs">
            데이터는 참고용이며, 실제 비용은 개인 생활 방식에 따라 다를 수 있습니다.
          </p>
        </div>
      </div>
    </footer>
  );
}

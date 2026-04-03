import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { SparePartDetail } from "@/components/spare-part/spare-part-detail";
import { sparePartMock } from "@/mock/spare-part";

export const Route = createFileRoute("/spare-parts/$id")({
  component: SparePartDetailPage,
});

export function SparePartDetailPage() {
  const { id } = Route.useParams();
  const item = sparePartMock.find((s) => s.id === id);

  if (!item) {
    return (
      <div className="p-6">
        <div className="text-center py-20">
          <p className="text-muted-foreground">备件不存在</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link to="/spare-parts">返回列表</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/spare-parts">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">备件详情</h1>
          <p className="text-sm text-muted-foreground mt-1 font-mono">
            {item.partCode}
          </p>
        </div>
      </div>
      <SparePartDetail data={item} />
    </div>
  );
}

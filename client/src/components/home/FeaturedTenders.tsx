import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import TenderCard from "@/components/tenders/TenderCard";
import { Tender } from "@/lib/types";
import { ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedTenders = () => {
  const { data: tenders, isLoading, error } = useQuery<Tender[]>({
    queryKey: ['/api/tenders'],
    queryFn: async () => {
      const res = await fetch('/api/tenders?status=open&limit=3');
      if (!res.ok) {
        throw new Error('Failed to fetch tenders');
      }
      return res.json();
    }
  });

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Популярные тендеры</h2>
        <Link 
          href="/tenders"
          className="text-primary hover:text-primary-dark flex items-center text-sm font-medium"
        >
          Смотреть все
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array(3).fill(0).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-5">
                <Skeleton className="h-6 w-24 mb-4" />
                <Skeleton className="h-8 w-full mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-4/5 mb-4" />
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Skeleton className="h-8 w-8 rounded-full mr-2" />
                    <div>
                      <Skeleton className="h-4 w-20 mb-1" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            </div>
          ))
        ) : error ? (
          <div className="col-span-3 text-center p-8 bg-red-50 rounded-lg">
            <p className="text-red-500">Ошибка загрузки тендеров. Пожалуйста, попробуйте позже.</p>
          </div>
        ) : tenders && tenders.length > 0 ? (
          tenders.map((tender) => (
            <TenderCard key={tender.id} tender={tender} />
          ))
        ) : (
          <div className="col-span-3 text-center p-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Нет активных тендеров на данный момент.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedTenders;

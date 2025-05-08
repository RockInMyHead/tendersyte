import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import MarketplaceItemCard from "@/components/marketplace/MarketplaceItemCard";
import { MarketplaceListing } from "@/lib/types";
import { ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedMarketplace = () => {
  const { data: listings, isLoading, error } = useQuery<MarketplaceListing[]>({
    queryKey: ['/api/marketplace'],
    queryFn: async () => {
      const res = await fetch('/api/marketplace?limit=4');
      if (!res.ok) {
        throw new Error('Failed to fetch marketplace listings');
      }
      return res.json();
    }
  });

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Популярные предложения маркетплейса</h2>
        <Link 
          href="/marketplace"
          className="text-primary hover:text-primary-dark flex items-center text-sm font-medium"
        >
          Смотреть все
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {isLoading ? (
          Array(4).fill(0).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative">
                <Skeleton className="w-full h-44" />
              </div>
              <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-3" />
                <div className="flex justify-between items-center mt-4">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            </div>
          ))
        ) : error ? (
          <div className="col-span-4 text-center p-8 bg-red-50 rounded-lg">
            <p className="text-red-500">Ошибка загрузки объявлений. Пожалуйста, попробуйте позже.</p>
          </div>
        ) : listings && listings.length > 0 ? (
          listings.map((listing) => (
            <MarketplaceItemCard key={listing.id} listing={listing} />
          ))
        ) : (
          <div className="col-span-4 text-center p-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Нет активных объявлений на данный момент.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedMarketplace;

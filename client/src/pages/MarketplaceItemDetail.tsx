import { useParams } from 'wouter';
import { Helmet } from 'react-helmet';
import MarketplaceItemDetailComponent from '@/components/marketplace/MarketplaceItemDetail';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { MarketplaceListing } from '@/lib/types';

export default function MarketplaceItemDetail() {
  const { id } = useParams<{ id: string }>();
  const listingId = parseInt(id);

  // Fetch listing for meta information
  const { data: listing } = useQuery<MarketplaceListing>({
    queryKey: [`/api/marketplace/${listingId}`],
  });

  if (isNaN(listingId)) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-500 p-4 rounded-md text-center">
          Неверный идентификатор объявления
        </div>
        <div className="mt-4 text-center">
          <Link href="/marketplace">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Вернуться к списку объявлений
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getListingTypeText = (type?: string) => {
    switch (type) {
      case 'sell': return 'Продажа';
      case 'rent': return 'Аренда';
      case 'buy': return 'Покупка';
      default: return '';
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {listing
            ? `${listing.title} | ${getListingTypeText(listing.listingType)} | СтройТендер`
            : 'Объявление | СтройТендер'}
        </title>
        <meta
          name="description"
          content={
            listing
              ? `${listing.title}. ${getListingTypeText(listing.listingType)}. Цена: ${listing.price.toLocaleString()} ₽${listing.listingType === 'rent' ? '/день' : ''}. Местоположение: ${listing.location}.`
              : 'Подробная информация об объявлении на строительные материалы и оборудование.'
          }
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/marketplace">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              К списку объявлений
            </Button>
          </Link>
        </div>

        <MarketplaceItemDetailComponent listingId={listingId} />
      </div>
    </>
  );
}

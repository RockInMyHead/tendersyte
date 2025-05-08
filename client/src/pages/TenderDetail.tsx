import { useParams } from 'wouter';
import { Helmet } from 'react-helmet';
import TenderDetailComponent from '@/components/tenders/TenderDetail';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Tender } from '@/lib/types';

export default function TenderDetail() {
  const { id } = useParams<{ id: string }>();
  const tenderId = parseInt(id);

  // Fetch tender for meta information
  const { data: tender } = useQuery<Tender>({
    queryKey: [`/api/tenders/${tenderId}`],
  });

  if (isNaN(tenderId)) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-500 p-4 rounded-md text-center">
          Неверный идентификатор тендера
        </div>
        <div className="mt-4 text-center">
          <Link href="/tenders">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Вернуться к списку тендеров
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {tender
            ? `${tender.title} | Тендер #${tender.id} | СтройТендер`
            : 'Детали тендера | СтройТендер'}
        </title>
        <meta
          name="description"
          content={
            tender
              ? `${tender.title}. Бюджет: ${tender.budget ? `${tender.budget.toLocaleString()} ₽` : 'Договорной'}. Местоположение: ${tender.location}. Срок выполнения до: ${new Date(tender.deadline).toLocaleDateString()}.`
              : 'Подробная информация о тендере, условиях, требованиях и бюджете.'
          }
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/tenders">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              К списку тендеров
            </Button>
          </Link>
        </div>

        <TenderDetailComponent tenderId={tenderId} />
      </div>
    </>
  );
}

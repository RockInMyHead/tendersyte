import { Helmet } from 'react-helmet';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import MarketplaceItemForm from '@/components/marketplace/MarketplaceItemForm';
import { useAuth } from '@/lib/authContext';
import { Redirect } from 'wouter';

export default function MarketplaceItemCreate() {
  const { isAuthenticated, isLoading } = useAuth();

  // Wait for auth state to be determined
  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Загрузка...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Helmet>
        <title>Разместить объявление | СтройТендер</title>
        <meta
          name="description"
          content="Разместите объявление о продаже или аренде строительной техники, оборудования и материалов на маркетплейсе СтройТендер."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-4">
          <Link href="/marketplace">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Назад
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Разместить объявление</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <MarketplaceItemForm />
        </div>
      </div>
    </>
  );
}

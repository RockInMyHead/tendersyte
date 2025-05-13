import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Plus, Loader2, Calendar, DollarSign, User, Check, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useAuth } from "@/lib/authContext";
import { formatDate } from "@/lib/utils";

// Тип для банковской гарантии
interface BankGuarantee {
  id: number;
  customerId: number;
  contractorId: number;
  tenderId?: number;
  amount: number;
  description: string;
  terms: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled' | 'disputed';
  createdAt: string;
  updatedAt: string;
  customerName?: string;
  contractorName?: string;
}

export default function Guarantees() {
  const { user, isAuthenticated } = useAuth();
  
  // Получаем список гарантий из API
  const { 
    data: guarantees = [], 
    isLoading,
    error 
  } = useQuery<BankGuarantee[]>({
    queryKey: ['/api/guarantees'],
  });

  // Получение цвета статуса
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      case 'disputed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Перевод статуса гарантии
  const translateStatus = (status: string) => {
    switch (status) {
      case 'active':
        return 'Активна';
      case 'pending':
        return 'Ожидает подтверждения';
      case 'completed':
        return 'Завершена';
      case 'cancelled':
        return 'Отменена';
      case 'disputed':
        return 'Оспаривается';
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Банковские гарантии</h1>
          <p className="text-gray-600 mt-2">
            Безопасность и уверенность для заказчиков и исполнителей
          </p>
        </div>
        {isAuthenticated && (
          <Link href="/guarantees/create">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Оформить гарантию
            </Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-blue-600" />
              Для исполнителей
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Повысьте доверие заказчиков, получите конкурентное преимущество и 
              уменьшите риски при выполнении проектов.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-green-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-green-600" />
              Для заказчиков
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Защитите свои инвестиции, получите гарантию выполнения 
              обязательств и уверенность в качестве работ.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-purple-600" />
              Наша гарантия
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Прозрачные условия, удобный процесс оформления и надежная 
              защита интересов всех сторон.
            </p>
          </CardContent>
        </Card>
      </div>

      {isAuthenticated ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Ваши гарантии</h2>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : error ? (
            <Card className="bg-red-50 border-red-100">
              <CardContent className="pt-6 pb-6 text-center">
                <p className="text-red-500 mb-4">Ошибка при загрузке гарантий. Попробуйте обновить страницу.</p>
              </CardContent>
            </Card>
          ) : guarantees.length > 0 ? (
            <div className="grid gap-6">
              {guarantees.map((guarantee) => (
                <Card key={guarantee.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle>{guarantee.description}</CardTitle>
                      <Badge className={getStatusColor(guarantee.status)}>
                        {translateStatus(guarantee.status)}
                      </Badge>
                    </div>
                    <CardDescription>
                      ID гарантии: {guarantee.id}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-gray-500" />
                          Стороны договора
                        </h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-gray-500">ID Заказчика:</span> {guarantee.customerId}</p>
                          <p><span className="text-gray-500">ID Исполнителя:</span> {guarantee.contractorId}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          Сроки действия
                        </h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-gray-500">Начало:</span> {new Date(guarantee.startDate).toLocaleDateString()}</p>
                          <p><span className="text-gray-500">Окончание:</span> {new Date(guarantee.endDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-gray-500" />
                          Финансовые условия
                        </h4>
                        <p className="text-lg font-semibold">{guarantee.amount.toLocaleString()} ₽</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Условия гарантии</h4>
                        <p className="text-sm text-gray-600">{guarantee.terms}</p>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="bg-gray-50 border-t">
                    <div className="w-full flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Создана: {new Date(guarantee.createdAt).toLocaleDateString()}
                      </span>
                      <Link href={`/guarantees/${guarantee.id}`}>
                        <Button variant="outline" className="ml-auto">
                          Подробнее
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-gray-50">
              <CardContent className="pt-6 pb-6 text-center">
                <p className="text-gray-500 mb-4">У вас пока нет банковских гарантий</p>
                <Link href="/guarantees/create">
                  <Button>Оформить первую гарантию</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <Card className="bg-gray-50 mt-8">
          <CardContent className="pt-6 pb-6 text-center">
            <p className="text-gray-500 mb-4">Войдите в систему, чтобы видеть свои банковские гарантии</p>
            <div className="flex gap-4 justify-center">
              <Link href="/login">
                <Button variant="outline">Войти</Button>
              </Link>
              <Link href="/register">
                <Button>Зарегистрироваться</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
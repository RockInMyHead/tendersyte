import { useState } from "react";
import { useParams, Link } from "wouter";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShieldCheck, 
  ChevronLeft, 
  Calendar, 
  User, 
  DollarSign, 
  FileText, 
  CheckCircle,
  XCircle, 
  Clock,
  AlertTriangle,
  FileSignature,
  Eye,
  Loader2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency, formatDate } from "@/lib/utils";

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
  tenderTitle?: string;
}

// Тип для истории гарантии
interface GuaranteeHistory {
  id: number;
  date: string;
  action: string;
  user: string;
  details?: string;
}

export default function GuaranteeDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [disputeReason, setDisputeReason] = useState("");
  
  // Временные данные для примера
  const mockGuarantee: BankGuarantee = {
    id: parseInt(id || "1"),
    customerId: 1,
    contractorId: 2,
    tenderId: 1,
    amount: 500000,
    description: "Гарантия выполнения обязательств по строительству фундамента",
    terms: "Гарантия действует на протяжении всего срока строительства и 30 дней после сдачи объекта. В случае нарушения сроков или качества работ, заказчик имеет право на возмещение ущерба в пределах суммы гарантии. Исполнитель обязуется выполнить все работы в соответствии с техническим заданием и проектной документацией.",
    startDate: "2025-01-01T00:00:00Z",
    endDate: "2025-07-01T00:00:00Z",
    status: 'active',
    createdAt: "2024-12-15T10:00:00Z",
    updatedAt: "2024-12-15T10:00:00Z",
    customerName: "Иван Заказчиков",
    contractorName: "Алексей Строителев",
    tenderTitle: "Строительство фундамента для частного дома"
  };
  
  // История гарантии
  const mockHistory: GuaranteeHistory[] = [
    {
      id: 1,
      date: "2024-12-15T10:00:00Z",
      action: "Создание",
      user: "Иван Заказчиков",
      details: "Гарантия создана"
    },
    {
      id: 2,
      date: "2024-12-16T14:30:00Z",
      action: "Подтверждение",
      user: "Алексей Строителев",
      details: "Исполнитель подтвердил условия гарантии"
    },
    {
      id: 3,
      date: "2024-12-17T09:15:00Z",
      action: "Активация",
      user: "Система",
      details: "Гарантия активирована"
    }
  ];

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

  // Получение иконки для статуса
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'completed':
        return <FileSignature className="h-5 w-5 text-blue-600" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-gray-600" />;
      case 'disputed':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <Eye className="h-5 w-5 text-gray-600" />;
    }
  };

  // Обработчики действий
  const handleComplete = async () => {
    setIsLoading(true);
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Гарантия выполнена",
        description: "Статус гарантии изменен на 'Завершена'",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось изменить статус гарантии",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!cancelReason) {
      toast({
        title: "Ошибка",
        description: "Необходимо указать причину отмены",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Гарантия отменена",
        description: "Статус гарантии изменен на 'Отменена'",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отменить гарантию",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDispute = async () => {
    if (!disputeReason) {
      toast({
        title: "Ошибка",
        description: "Необходимо указать причину спора",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Гарантия оспорена",
        description: "Статус гарантии изменен на 'Оспаривается'",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось оспорить гарантию",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/guarantees" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Назад к гарантиям
      </Link>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-blue-600" />
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">Гарантия #{mockGuarantee.id}</h1>
              <Badge className={getStatusColor(mockGuarantee.status)}>
                {translateStatus(mockGuarantee.status)}
              </Badge>
            </div>
            <p className="text-gray-600 mt-1">{mockGuarantee.description}</p>
          </div>
        </div>
        
        <div className="space-x-2">
          <Button variant="outline" onClick={() => window.print()}>
            Печать
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Детали гарантии</TabsTrigger>
          <TabsTrigger value="history">История</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                    <User className="h-5 w-5 text-gray-500" />
                    Стороны договора
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700">Заказчик</h4>
                      <p className="text-lg">{mockGuarantee.customerName}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Исполнитель</h4>
                      <p className="text-lg">{mockGuarantee.contractorName}</p>
                    </div>
                    {mockGuarantee.tenderId && (
                      <div>
                        <h4 className="font-medium text-gray-700">Связанный тендер</h4>
                        <Link href={`/tenders/${mockGuarantee.tenderId}`}>
                          <p className="text-blue-600 hover:underline">{mockGuarantee.tenderTitle}</p>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    Сроки и суммы
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700">Сумма гарантии</h4>
                      <p className="text-lg font-bold">{mockGuarantee.amount.toLocaleString()} ₽</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-700">Дата начала</h4>
                        <p>{new Date(mockGuarantee.startDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700">Дата окончания</h4>
                        <p>{new Date(mockGuarantee.endDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Дата создания</h4>
                      <p>{new Date(mockGuarantee.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  Условия гарантии
                </h3>
                <div className="p-4 bg-gray-50 rounded-md text-gray-700">
                  {mockGuarantee.terms}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="bg-gray-50 border-t flex flex-wrap gap-3 justify-center md:justify-end">
              {mockGuarantee.status === 'active' && (
                <>
                  <Button 
                    variant="outline" 
                    className="border-green-500 text-green-600 hover:bg-green-50" 
                    onClick={handleComplete}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    )}
                    Подтвердить выполнение
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
                        <XCircle className="h-4 w-4 mr-2" />
                        Отменить гарантию
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Отмена гарантии</DialogTitle>
                        <DialogDescription>
                          Укажите причину отмены гарантии. Эта информация будет доступна всем сторонам.
                        </DialogDescription>
                      </DialogHeader>
                      <Textarea 
                        placeholder="Причина отмены..." 
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <DialogFooter>
                        <Button type="submit" variant="destructive" onClick={handleCancel} disabled={isLoading}>
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            "Отменить гарантию"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="border-yellow-500 text-yellow-600 hover:bg-yellow-50">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Оспорить
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Оспаривание гарантии</DialogTitle>
                        <DialogDescription>
                          Укажите причину оспаривания гарантии. После отправки формы, будет начата процедура разрешения спора.
                        </DialogDescription>
                      </DialogHeader>
                      <Textarea 
                        placeholder="Причина спора..." 
                        value={disputeReason}
                        onChange={(e) => setDisputeReason(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <DialogFooter>
                        <Button type="submit" variant="default" onClick={handleDispute} disabled={isLoading}>
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            "Отправить"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>История действий</CardTitle>
              <CardDescription>
                Хронология всех событий, связанных с гарантией
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockHistory.map((item, index) => (
                  <div key={item.id} className="relative pl-6 pb-6">
                    {index < mockHistory.length - 1 && (
                      <div className="absolute left-2.5 top-2.5 w-px h-full bg-gray-200" />
                    )}
                    <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className="font-medium">{item.action}</h4>
                      <span className="text-sm text-gray-500">
                        {new Date(item.date).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{item.details}</p>
                    <div className="text-sm text-gray-500 mt-1">
                      {item.user}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
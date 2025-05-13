import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  CreditCard as WalletIcon, 
  Plus, 
  ChevronLeft, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft,
  ExternalLink,
  Loader2
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/authContext";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

// Тип транзакции
interface Transaction {
  id: number;
  type: 'deposit' | 'withdrawal' | 'payment' | 'receipt';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  relatedEntity?: {
    type: 'guarantee' | 'tender' | 'marketplace';
    id: number;
    title: string;
  };
}

export default function Wallet() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [, navigate] = useLocation();
  
  // Временные данные для транзакций
  const mockTransactions: Transaction[] = [
    {
      id: 1,
      type: 'deposit',
      amount: 50000,
      description: 'Пополнение счета',
      date: '2025-01-10T10:15:00Z',
      status: 'completed'
    },
    {
      id: 2,
      type: 'payment',
      amount: 15000,
      description: 'Оплата гарантии #1',
      date: '2025-01-12T14:30:00Z',
      status: 'completed',
      relatedEntity: {
        type: 'guarantee',
        id: 1,
        title: 'Гарантия выполнения обязательств'
      }
    },
    {
      id: 3,
      type: 'receipt',
      amount: 8000,
      description: 'Возврат средств по тендеру #2',
      date: '2025-01-15T09:45:00Z',
      status: 'completed',
      relatedEntity: {
        type: 'tender',
        id: 2,
        title: 'Строительство фундамента для частного дома'
      }
    },
    {
      id: 4,
      type: 'withdrawal',
      amount: 20000,
      description: 'Вывод средств',
      date: '2025-01-20T16:20:00Z',
      status: 'pending'
    }
  ];
  
  // Функция для депозита
  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      toast({
        title: "Ошибка",
        description: "Введите корректную сумму для пополнения",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Счет пополнен",
        description: `Счет пополнен на ${parseInt(depositAmount).toLocaleString()} ₽`,
      });
      
      setDepositAmount("");
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось выполнить пополнение",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Функция для вывода средств
  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      toast({
        title: "Ошибка",
        description: "Введите корректную сумму для вывода",
        variant: "destructive",
      });
      return;
    }
    
    if (user?.walletBalance && parseFloat(withdrawAmount) > user.walletBalance) {
      toast({
        title: "Недостаточно средств",
        description: "На счете недостаточно средств для вывода",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Вывод средств",
        description: `Запрос на вывод ${parseInt(withdrawAmount).toLocaleString()} ₽ создан`,
      });
      
      setWithdrawAmount("");
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось выполнить вывод средств",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Получение иконки для типа транзакции
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
      case 'withdrawal':
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case 'payment':
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case 'receipt':
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  // Получение цвета для суммы транзакции
  const getAmountColor = (type: string) => {
    switch (type) {
      case 'deposit':
      case 'receipt':
        return 'text-green-600';
      case 'withdrawal':
      case 'payment':
        return 'text-red-600';
      default:
        return 'text-gray-900';
    }
  };

  // Получение префикса для суммы транзакции
  const getAmountPrefix = (type: string) => {
    switch (type) {
      case 'deposit':
      case 'receipt':
        return '+';
      case 'withdrawal':
      case 'payment':
        return '-';
      default:
        return '';
    }
  };

  // Перевод типа транзакции
  const translateTransactionType = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'Пополнение';
      case 'withdrawal':
        return 'Вывод средств';
      case 'payment':
        return 'Оплата';
      case 'receipt':
        return 'Поступление';
      default:
        return type;
    }
  };

  // Получение бейджа для статуса транзакции
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Выполнено</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">В обработке</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Ошибка</Badge>;
      default:
        return null;
    }
  };

  // Если пользователь не аутентифицирован
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  // Если пользователь не найден
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-500 p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Пользователь не найден</h2>
          <p className="mb-4">Пользователь с указанным идентификатором не существует или был удален.</p>
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Вернуться на главную
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/profile" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Назад в профиль
      </Link>
      
      <div className="flex items-center gap-3 mb-6">
        <WalletIcon className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-gray-900">Кошелек</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader className="pb-2">
              <CardTitle>Баланс</CardTitle>
              <CardDescription>Текущий баланс вашего счета</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                {user?.walletBalance ? user.walletBalance.toLocaleString() : "0"} ₽
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-1">
                    <Plus className="h-4 w-4" />
                    Пополнить
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Пополнение счета</DialogTitle>
                    <DialogDescription>
                      Введите сумму для пополнения счета
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        placeholder="Сумма"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                      />
                      <span className="text-lg">₽</span>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleDeposit} disabled={isLoading}>
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        "Пополнить"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-1">
                    <ArrowUpRight className="h-4 w-4" />
                    Вывести средства
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Вывод средств</DialogTitle>
                    <DialogDescription>
                      Введите сумму для вывода средств
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        placeholder="Сумма"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                      />
                      <span className="text-lg">₽</span>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleWithdraw} disabled={isLoading}>
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        "Вывести"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">История операций</h2>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="incoming">Поступления</TabsTrigger>
                <TabsTrigger value="outgoing">Списания</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {mockTransactions.map((transaction) => (
                        <div key={transaction.id} className="p-4 hover:bg-gray-50">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start gap-3">
                              <div className="mt-1">
                                {getTransactionIcon(transaction.type)}
                              </div>
                              <div>
                                <div className="font-medium">
                                  {translateTransactionType(transaction.type)}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {transaction.description}
                                </div>
                                {transaction.relatedEntity && (
                                  <Link 
                                    href={`/${transaction.relatedEntity.type}s/${transaction.relatedEntity.id}`}
                                    className="text-sm text-blue-600 hover:underline flex items-center mt-1"
                                  >
                                    {transaction.relatedEntity.title}
                                    <ExternalLink className="h-3 w-3 ml-1" />
                                  </Link>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`font-medium ${getAmountColor(transaction.type)}`}>
                                {getAmountPrefix(transaction.type)}{transaction.amount.toLocaleString()} ₽
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {new Date(transaction.date).toLocaleString()}
                              </div>
                              <div className="mt-1">
                                {getStatusBadge(transaction.status)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="incoming">
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {mockTransactions
                        .filter(t => t.type === 'deposit' || t.type === 'receipt')
                        .map((transaction) => (
                          <div key={transaction.id} className="p-4 hover:bg-gray-50">
                            <div className="flex justify-between items-start">
                              <div className="flex items-start gap-3">
                                <div className="mt-1">
                                  {getTransactionIcon(transaction.type)}
                                </div>
                                <div>
                                  <div className="font-medium">
                                    {translateTransactionType(transaction.type)}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {transaction.description}
                                  </div>
                                  {transaction.relatedEntity && (
                                    <Link 
                                      href={`/${transaction.relatedEntity.type}s/${transaction.relatedEntity.id}`}
                                      className="text-sm text-blue-600 hover:underline flex items-center mt-1"
                                    >
                                      {transaction.relatedEntity.title}
                                      <ExternalLink className="h-3 w-3 ml-1" />
                                    </Link>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={`font-medium ${getAmountColor(transaction.type)}`}>
                                  {getAmountPrefix(transaction.type)}{transaction.amount.toLocaleString()} ₽
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {new Date(transaction.date).toLocaleString()}
                                </div>
                                <div className="mt-1">
                                  {getStatusBadge(transaction.status)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="outgoing">
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {mockTransactions
                        .filter(t => t.type === 'withdrawal' || t.type === 'payment')
                        .map((transaction) => (
                          <div key={transaction.id} className="p-4 hover:bg-gray-50">
                            <div className="flex justify-between items-start">
                              <div className="flex items-start gap-3">
                                <div className="mt-1">
                                  {getTransactionIcon(transaction.type)}
                                </div>
                                <div>
                                  <div className="font-medium">
                                    {translateTransactionType(transaction.type)}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {transaction.description}
                                  </div>
                                  {transaction.relatedEntity && (
                                    <Link 
                                      href={`/${transaction.relatedEntity.type}s/${transaction.relatedEntity.id}`}
                                      className="text-sm text-blue-600 hover:underline flex items-center mt-1"
                                    >
                                      {transaction.relatedEntity.title}
                                      <ExternalLink className="h-3 w-3 ml-1" />
                                    </Link>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={`font-medium ${getAmountColor(transaction.type)}`}>
                                  {getAmountPrefix(transaction.type)}{transaction.amount.toLocaleString()} ₽
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {new Date(transaction.date).toLocaleString()}
                                </div>
                                <div className="mt-1">
                                  {getStatusBadge(transaction.status)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div>
          <Card className="bg-gradient-to-b from-blue-50 to-indigo-50 border-blue-100 sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-600" />
                Информация о кошельке
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-4">
              <div>
                <h4 className="font-medium mb-1">Возможности кошелька</h4>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>Пополнение и вывод средств</li>
                  <li>Оплата банковских гарантий</li>
                  <li>Оплата тендерных заявок</li>
                  <li>Оплата товаров и услуг</li>
                  <li>Получение возвратов и оплат</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Комиссии</h4>
                <ul className="text-gray-600">
                  <li><span className="font-medium">Пополнение:</span> 0%</li>
                  <li><span className="font-medium">Вывод:</span> 0.5%</li>
                  <li><span className="font-medium">Оплата услуг:</span> 1%</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Сроки операций</h4>
                <ul className="text-gray-600">
                  <li><span className="font-medium">Пополнение:</span> моментально</li>
                  <li><span className="font-medium">Вывод:</span> до 24 часов</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="bg-blue-100/50 flex justify-center border-t border-blue-100">
              <Link href="/help/wallet">
                <Button variant="link" className="text-blue-600">
                  Подробнее о работе кошелька
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
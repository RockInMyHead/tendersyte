import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ShieldCheck, ChevronLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/authContext";
import { Link } from "wouter";

// Схема для валидации формы
const guaranteeFormSchema = z.object({
  customerId: z.string().min(1, { message: "Выберите заказчика" }),
  contractorId: z.string().min(1, { message: "Выберите исполнителя" }),
  tenderId: z.string().optional(),
  amount: z.string().min(1, { message: "Укажите сумму гарантии" })
    .transform(val => Number(val))
    .refine(val => val > 0, { message: "Сумма должна быть больше нуля" }),
  description: z.string().min(5, { message: "Описание должно содержать не менее 5 символов" }),
  terms: z.string().min(10, { message: "Условия должны содержать не менее 10 символов" }),
  startDate: z.string().min(1, { message: "Выберите дату начала" }),
  endDate: z.string().min(1, { message: "Выберите дату окончания" }),
}).refine(data => {
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  return end > start;
}, {
  message: "Дата окончания должна быть позже даты начала",
  path: ["endDate"],
});

type GuaranteeFormValues = z.infer<typeof guaranteeFormSchema>;

interface User {
  id: number;
  username: string;
  fullName: string;
}

interface Tender {
  id: number;
  title: string;
}

export default function GuaranteeCreate() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Загрузка списка пользователей
  const { 
    data: users = [], 
    isLoading: isLoadingUsers,
    error: usersError 
  } = useQuery<User[]>({
    queryKey: ['/api/users'],
  });

  // Загрузка списка тендеров
  const { 
    data: tenders = [], 
    isLoading: isLoadingTenders,
    error: tendersError 
  } = useQuery<Tender[]>({
    queryKey: ['/api/tenders'],
  });

  const form = useForm<GuaranteeFormValues>({
    resolver: zodResolver(guaranteeFormSchema),
    defaultValues: {
      customerId: "",
      contractorId: "",
      tenderId: "",
      amount: "",
      description: "",
      terms: "",
      startDate: new Date().toISOString().split('T')[0], // Сегодня
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // +90 дней
    },
  });

  const onSubmit = async (values: GuaranteeFormValues) => {
    try {
      // В будущем заменить на реальный API запрос
      console.log("Submission values:", values);
      
      // Имитация успешного создания
      toast({
        title: "Гарантия создана",
        description: "Банковская гарантия успешно оформлена",
      });
      
      // Перенаправление на страницу гарантий
      navigate("/guarantees");
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать банковскую гарантию",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/guarantees" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Назад к гарантиям
      </Link>
      
      <div className="flex items-center gap-3 mb-6">
        <ShieldCheck className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Оформление банковской гарантии</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Детали гарантии</CardTitle>
              <CardDescription>Укажите всю необходимую информацию для оформления гарантии</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="customerId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Заказчик</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите заказчика" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {users.map(user => (
                                <SelectItem key={user.id} value={user.id.toString()}>
                                  {user.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Заказчик, для которого оформляется гарантия
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contractorId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Исполнитель</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите исполнителя" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {users.map(user => (
                                <SelectItem key={user.id} value={user.id.toString()}>
                                  {user.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Исполнитель, выполняющий работы
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="tenderId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Связанный тендер (необязательно)</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите тендер (если есть)" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="">Нет связанного тендера</SelectItem>
                            {tenders.map(tender => (
                              <SelectItem key={tender.id} value={tender.id.toString()}>
                                {tender.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Тендер, к которому относится данная гарантия
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Сумма гарантии (₽)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Сумма гарантийного обязательства в рублях
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Описание гарантии</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Опишите предмет гарантии..." 
                            className="resize-none h-20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Условия гарантии</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Укажите условия гарантии..." 
                            className="resize-none h-32"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Дата начала</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Дата окончания</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button type="submit" className="w-full md:w-auto">
                      Оформить гарантию
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="bg-blue-50 border-blue-100 sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-blue-600" />
                Информация о гарантии
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-4">
              <div>
                <h4 className="font-medium mb-1">Что такое банковская гарантия?</h4>
                <p className="text-gray-600">
                  Банковская гарантия — это финансовый инструмент, обеспечивающий 
                  выполнение обязательств между заказчиком и исполнителем.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Преимущества использования</h4>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>Защита финансовых интересов всех сторон</li>
                  <li>Повышение уровня доверия между заказчиком и исполнителем</li>
                  <li>Минимизация рисков при выполнении контрактов</li>
                  <li>Конкурентное преимущество при участии в тендерах</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Стоимость оформления</h4>
                <p className="text-gray-600">
                  Стоимость оформления зависит от суммы гарантии и составляет 
                  от 1% до 5% от суммы гарантии.
                </p>
              </div>
            </CardContent>
            <CardFooter className="bg-blue-100/50 flex justify-center border-t border-blue-100">
              <Link href="/help/guarantees">
                <Button variant="link" className="text-blue-600">
                  Подробнее о банковских гарантиях
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
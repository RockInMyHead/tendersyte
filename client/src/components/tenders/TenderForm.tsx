import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocation } from 'wouter';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { TENDER_CATEGORIES } from '@/lib/constants';
import { TenderFormData } from '@/lib/types';
import { insertTenderSchema } from '@shared/schema';

const tenderFormSchema = z.object({
  title: z.string().min(5, { message: 'Название должно содержать минимум 5 символов' }).max(150, { message: 'Название не должно превышать 150 символов' }),
  description: z.string().min(20, { message: 'Описание должно содержать минимум 20 символов' }).max(2000, { message: 'Описание не должно превышать 2000 символов' }),
  category: z.string({ required_error: 'Выберите категорию' }),
  subcategory: z.string().optional(),
  budget: z.number().optional(),
  location: z.string().min(2, { message: 'Укажите местоположение' }),
  deadline: z.date({ required_error: 'Выберите срок выполнения' }),
});

interface TenderFormProps {
  initialData?: TenderFormData;
  isEditing?: boolean;
}

export default function TenderForm({ initialData, isEditing = false }: TenderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof tenderFormSchema>>({
    resolver: zodResolver(tenderFormSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      category: '',
      subcategory: '',
      budget: undefined,
      location: '',
      deadline: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof tenderFormSchema>) => {
    setIsSubmitting(true);
    try {
      // Format the data to match the API requirements
      const tenderData: TenderFormData = {
        ...data,
        budget: data.budget || undefined,
      };

      if (isEditing && initialData?.id) {
        await apiRequest('PUT', `/api/tenders/${initialData.id}`, tenderData);
        toast({
          title: 'Тендер обновлен',
          description: 'Ваш тендер был успешно обновлен',
        });
      } else {
        await apiRequest('POST', '/api/tenders', tenderData);
        toast({
          title: 'Тендер создан',
          description: 'Ваш тендер был успешно создан',
        });
      }
      
      navigate('/tenders');
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: error.message || 'Произошла ошибка при сохранении тендера',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название тендера</FormLabel>
              <FormControl>
                <Input placeholder="Например: Ремонт ванной комнаты под ключ" {...field} />
              </FormControl>
              <FormDescription>
                Укажите краткое и понятное название для вашего тендера
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
              <FormLabel>Описание работ</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Опишите подробно какие работы нужно выполнить, укажите важные детали и требования"
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Чем подробнее вы опишете работы, тем более точные предложения получите
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Категория</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TENDER_CATEGORIES.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Бюджет (₽)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Укажите бюджет в рублях"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value ? parseInt(e.target.value) : undefined;
                      field.onChange(value);
                    }}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormDescription>
                  Оставьте пустым, если бюджет договорной
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Местоположение</FormLabel>
                <FormControl>
                  <Input placeholder="Например: Москва, ул. Ленина" {...field} />
                </FormControl>
                <FormDescription>
                  Укажите город и район проведения работ
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Срок выполнения до</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={`w-full pl-3 text-left font-normal ${
                          !field.value ? "text-muted-foreground" : ""
                        }`}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: ru })
                        ) : (
                          <span>Выберите дату</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/tenders')}
          >
            Отмена
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Сохранение...' : isEditing ? 'Обновить тендер' : 'Создать тендер'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

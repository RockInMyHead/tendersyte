import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useLocation } from 'wouter';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/authContext';
import { USER_TYPES } from '@/lib/constants';

const registerFormSchema = z.object({
  username: z.string()
    .min(3, { message: 'Имя пользователя должно содержать минимум 3 символа' })
    .max(50, { message: 'Имя пользователя не должно превышать 50 символов' })
    .regex(/^[a-zA-Z0-9_]+$/, { message: 'Имя пользователя может содержать только буквы, цифры и символ подчеркивания' }),
  password: z.string()
    .min(6, { message: 'Пароль должен содержать минимум 6 символов' })
    .max(100, { message: 'Пароль не должен превышать 100 символов' }),
  email: z.string()
    .email({ message: 'Введите корректный адрес электронной почты' }),
  fullName: z.string()
    .min(2, { message: 'Имя должно содержать минимум 2 символа' })
    .max(100, { message: 'Имя не должно превышать 100 символов' }),
  userType: z.string({ required_error: 'Выберите тип пользователя' }),
  location: z.string().optional(),
  phone: z.string().optional(),
});

export default function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: '',
      password: '',
      email: '',
      fullName: '',
      userType: 'individual',
      location: '',
      phone: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
    setIsSubmitting(true);
    try {
      await register(data);
      navigate('/profile');
    } catch (error) {
      toast({
        title: 'Ошибка регистрации',
        description: error.message || 'Произошла ошибка при регистрации',
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя пользователя</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>
                Используется для входа в систему
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormDescription>
                Минимум 6 символов
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Электронная почта</FormLabel>
              <FormControl>
                <Input type="email" placeholder="example@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Полное имя</FormLabel>
              <FormControl>
                <Input placeholder="Иван Иванов" {...field} />
              </FormControl>
              <FormDescription>
                Будет отображаться в вашем профиле
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="userType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Тип пользователя</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {USER_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Телефон</FormLabel>
                <FormControl>
                  <Input placeholder="+7 (999) 123-45-67" {...field} />
                </FormControl>
                <FormDescription>
                  Необязательно
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Местоположение</FormLabel>
              <FormControl>
                <Input placeholder="Например: Москва" {...field} />
              </FormControl>
              <FormDescription>
                Поможет находить предложения рядом с вами
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
          </Button>
          
          <div className="text-center text-sm text-gray-500">
            Уже есть аккаунт?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Войти
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}

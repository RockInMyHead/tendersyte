import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useLocation } from 'wouter';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/authContext';

const loginFormSchema = z.object({
  username: z.string().min(1, { message: 'Введите имя пользователя' }),
  password: z.string().min(1, { message: 'Введите пароль' }),
});

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    setIsSubmitting(true);
    try {
      await login(data.username, data.password);
      toast({
        title: 'Успешный вход',
        description: 'Вы успешно вошли в систему',
      });
      navigate('/profile');
    } catch (error) {
      toast({
        title: 'Ошибка входа',
        description: error.message || 'Проверьте имя пользователя и пароль',
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
                <Input placeholder="username" autoComplete="username" {...field} />
              </FormControl>
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
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  autoComplete="current-password" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Вход...' : 'Войти'}
          </Button>
          
          <div className="text-center text-sm text-gray-500">
            Нет аккаунта?{' '}
            <Link href="/register" className="text-primary hover:underline">
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}

import StarRating from "@/components/shared/StarRating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserInitials } from "@/lib/utils";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Виктор К.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rating: 5,
      text: "Отличная платформа для поиска подрядчиков! Разместил тендер на ремонт квартиры и через 2 дня выбрал исполнителя из 7 предложений. Все прозрачно и удобно.",
    },
    {
      name: "Елена М.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rating: 4,
      text: "Сдаю в аренду экскаватор через платформу уже полгода. Постоянный поток клиентов и никаких проблем с оплатой благодаря системе безопасных платежей.",
    },
    {
      name: "Сергей П.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rating: 4.5,
      text: "Я строитель с 10-летним стажем, и эта платформа значительно упростила поиск клиентов. Регулярно получаю заказы через тендеры, все прозрачно и честно.",
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Отзывы наших пользователей</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={testimonial.avatar} alt={`Фото ${testimonial.name}`} />
                <AvatarFallback>{getUserInitials(testimonial.name)}</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{testimonial.name}</h3>
                <StarRating rating={testimonial.rating} showText size="sm" />
              </div>
            </div>
            <p className="text-gray-600 italic">"{testimonial.text}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

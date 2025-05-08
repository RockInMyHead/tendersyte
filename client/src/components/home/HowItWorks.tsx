import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ClipboardList, MessageCircle, Shield } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <ClipboardList className="h-8 w-8" />,
      title: "Размещение тендера или объявления",
      description: "Зарегистрируйтесь и создайте тендер на строительные работы или разместите объявление о продаже/аренде техники и материалов",
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Общение и выбор",
      description: "Общайтесь с потенциальными исполнителями или покупателями, уточняйте детали и выбирайте лучшие предложения",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Безопасная сделка",
      description: "Заключайте сделки через систему безопасных платежей и оставляйте отзывы о качестве услуг и товаров",
    },
  ];

  return (
    <section className="bg-white rounded-lg shadow-sm overflow-hidden mb-12">
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Как это работает</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary bg-opacity-10 text-primary mb-4">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/how-it-works">
            <Button size="lg">Узнать больше</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useAuth } from "@/lib/authContext";

const CallToAction = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="bg-gradient-to-r from-primary to-primary-dark rounded-lg shadow-lg overflow-hidden mb-12">
      <div className="px-6 py-12 md:py-16 md:px-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Готовы начать работу на платформе?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Присоединяйтесь к тысячам пользователей, которые уже нашли лучшие 
          предложения для своих строительных проектов
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href={isAuthenticated ? "/tenders/create" : "/login"}>
            <Button 
              size="lg"
              className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100 hover:text-primary-dark"
            >
              Создать тендер
            </Button>
          </Link>
          <Link href={isAuthenticated ? "/marketplace/create" : "/login"}>
            <Button 
              size="lg"
              variant="outline" 
              className="w-full sm:w-auto text-white border-white hover:bg-white hover:bg-opacity-10"
            >
              Разместить объявление
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useAuth } from "@/lib/authContext";

const HeroSection = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="bg-primary bg-gradient-to-br from-primary to-primary-dark text-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Строительные тендеры и маркетплейс в одном месте
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white text-opacity-90">
              Размещайте заказы на строительные работы, продавайте и арендуйте 
              оборудование и материалы на единой безопасной платформе
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
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
                  className="w-full sm:w-auto bg-amber-500 text-white hover:bg-amber-600"
                >
                  Разместить объявление
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
              alt="Строительная площадка с техникой и рабочими" 
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

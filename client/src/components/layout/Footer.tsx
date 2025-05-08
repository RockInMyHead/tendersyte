import { Link } from "wouter";
import { Construction, Facebook, Mail, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Construction className="h-6 w-6 text-primary mr-2" />
              <span className="font-bold text-xl">СтройТендер</span>
            </div>
            <p className="text-gray-400 mb-4">
              Платформа для проведения тендеров и маркетплейс строительных материалов и оборудования.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 6L12 13L2 6"></path>
                  <path d="M2 6C2 4.9 2.9 4 4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6Z"></path>
                  <line x1="12" y1="13" x2="12" y2="16"></line>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12C21 7.03 16.97 3 12 3"></path>
                  <path d="M12 21C7.03 21 3 16.97 3 12"></path>
                  <path d="M12 8L12 16"></path>
                  <path d="M8 12L16 12"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Sections */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Разделы</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Главная
                </Link>
              </li>
              <li>
                <Link href="/tenders" className="text-gray-400 hover:text-white">
                  Тендеры
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-gray-400 hover:text-white">
                  Маркетплейс
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-400 hover:text-white">
                  Как это работает
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Безопасная сделка
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Информация</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  О компании
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Правила пользования
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Блог
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Поддержка</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white">
                  Помощь
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Сообщить о проблеме
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href="#"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Написать в поддержку
              </Link>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © 2023 СтройТендер. Все права защищены.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Visa_2021.svg"
              alt="Visa"
              className="h-8"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="Mastercard"
              className="h-8"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="PayPal"
              className="h-8"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

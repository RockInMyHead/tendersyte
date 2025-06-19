import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/authContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserInitials } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  User, 
  LogOut, 
  Settings, 
  MessageCircle, 
  PlusCircle, 
  Search,
  Menu,
  X,
  Construction,
  ShieldCheck,
  Shield
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const [location] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/tenders", label: "Тендеры" },
    { href: "/marketplace", label: "Маркетплейс" },
    { href: "/top-specialists", label: "Лучшие специалисты" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Unread messages count (this would be fetched from the API in a real app)
  const unreadMessagesCount = 3;

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-1">
              <Construction className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl text-primary">СтройТендер</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium ${
                  location === link.href
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            <Link href="/search" className="hidden md:inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary">
              <Search className="h-4 w-4 mr-1" />
              Поиск
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link href="/messages" className="relative hidden md:inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Сообщения
                  {unreadMessagesCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center p-0">
                      {unreadMessagesCount}
                    </Badge>
                  )}
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar} alt={user?.fullName} />
                        <AvatarFallback>{getUserInitials(user?.fullName || '')}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{user?.fullName}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        Профиль
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/messages">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Сообщения
                        {unreadMessagesCount > 0 && (
                          <Badge className="ml-auto bg-red-500 text-white text-xs p-1">
                            {unreadMessagesCount}
                          </Badge>
                        )}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/tenders/create">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Создать тендер
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/marketplace/create">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Разместить объявление
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {user?.isAdmin && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/admin">
                            <Shield className="mr-2 h-4 w-4" />
                            Панель администратора
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Выйти
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="link" className="text-primary">
                    Войти
                  </Button>
                </Link>
                <Link href="/register">
                  <Button>Регистрация</Button>
                </Link>
              </>
            )}
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-white border-t">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location === link.href
                  ? "text-primary bg-blue-50"
                  : "text-gray-700 hover:text-primary hover:bg-gray-100"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          {isAuthenticated && (
            <>
              <Link
                href="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Профиль
              </Link>
              <Link
                href="/messages"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Сообщения
                {unreadMessagesCount > 0 && (
                  <Badge className="ml-2 bg-red-500 text-white">
                    {unreadMessagesCount}
                  </Badge>
                )}
              </Link>
              <Link
                href="/tenders/create"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Создать тендер
              </Link>
              <Link
                href="/marketplace/create"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Разместить объявление
              </Link>
              {user?.isAdmin && (
                <Link
                  href="/admin"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Панель администратора
                </Link>
              )}
              <button
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
              >
                Выйти
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;

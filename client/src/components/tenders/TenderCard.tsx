import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarRating from "@/components/shared/StarRating";
import { Badge } from "@/components/ui/badge";
import { Tender } from "@/lib/types";
import { Eye, MapPin } from "lucide-react";
import { cn, formatDate, getUserInitials, getCategoryColor, getStatusColor, getPlaceholderImage } from "@/lib/utils";

interface TenderCardProps {
  tender: Tender;
}

const TenderCard = ({ tender }: TenderCardProps) => {
  const imageUrl = tender.images && tender.images.length > 0 
    ? tender.images[0] 
    : getPlaceholderImage(tender.category);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <Link href={`/tenders/${tender.id}`}>
          <img 
            src={imageUrl} 
            alt={tender.title} 
            className="w-full h-40 object-cover"
          />
        </Link>
        <div className="absolute top-0 left-0 m-2">
          <Badge 
            variant="secondary"
            className={cn("mr-2", getStatusColor(tender.status))}
          >
            {tender.status === 'open' ? 'Актуален' : 
             tender.status === 'in_progress' ? 'В работе' : 
             tender.status === 'completed' ? 'Завершен' : 'Отменен'}
          </Badge>
        </div>
        <div className="absolute top-0 right-0 m-2">
          <Badge 
            variant="secondary"
            className={getCategoryColor(tender.category)}
          >
            {tender.category.charAt(0).toUpperCase() + tender.category.slice(1)}
          </Badge>
        </div>
      </div>
      <div className="p-5">
        <Link href={`/tenders/${tender.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {tender.title}
          </h3>
        </Link>
        <div className="mt-2 text-sm text-gray-500 line-clamp-3">
          {tender.description}
        </div>
        <div className="mt-4 flex items-start justify-between">
          <div>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              {tender.location}
            </div>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <Eye className="h-4 w-4 mr-1" />
              {tender.viewCount} просмотров
            </div>
          </div>
          <div className="text-xl font-bold text-primary">
            {tender.budget ? `от ${tender.budget.toLocaleString()} ₽` : 'Договорная'}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage 
                src={tender.user?.avatar} 
                alt={tender.user?.fullName || 'Пользователь'} 
              />
              <AvatarFallback>
                {getUserInitials(tender.user?.fullName || 'Пользователь')}
              </AvatarFallback>
            </Avatar>
            <div className="ml-2 flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                {tender.user?.fullName || 'Пользователь'}
              </span>
              <StarRating rating={tender.user?.rating || 0} size="xs" showText />
            </div>
          </div>
          <Link href={`/tenders/${tender.id}`}>
            <Button size="sm">Подробнее</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TenderCard;

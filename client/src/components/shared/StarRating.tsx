import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  showText?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

const StarRating = ({
  rating,
  maxRating = 5,
  showText = false,
  size = "sm",
  className,
}: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  
  const sizeClasses = {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };
  
  const starSize = sizeClasses[size];
  
  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex">
        {Array.from({ length: maxRating }).map((_, index) => {
          if (index < fullStars) {
            return (
              <Star 
                key={index} 
                className={cn(starSize, "text-yellow-400 fill-yellow-400")} 
              />
            );
          } else if (index === fullStars && hasHalfStar) {
            return (
              <div key={index} className="relative">
                <Star 
                  className={cn(starSize, "text-gray-300 fill-gray-300")} 
                />
                <div className="absolute inset-0 overflow-hidden w-1/2">
                  <Star 
                    className={cn(starSize, "text-yellow-400 fill-yellow-400")} 
                  />
                </div>
              </div>
            );
          } else {
            return (
              <Star 
                key={index} 
                className={cn(starSize, "text-gray-300 fill-gray-300")} 
              />
            );
          }
        })}
      </div>
      {showText && (
        <span className={cn("text-gray-500 ml-1", {
          "text-xs": size === "xs" || size === "sm",
          "text-sm": size === "md",
          "text-base": size === "lg",
        })}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;

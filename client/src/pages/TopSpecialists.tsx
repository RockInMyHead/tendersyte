import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Briefcase, MapPin, Award } from "lucide-react";
import { getUserInitials } from "@/lib/utils";
import Spinner from "@/components/ui/spinner";

type Specialist = {
  id: number;
  fullName: string;
  userType: string;
  avatar?: string;
  rating: number;
  location?: string;
  completedProjects: number;
  isVerified: boolean;
  bio?: string;
};

const TopSpecialists = () => {
  const [selectedTab, setSelectedTab] = useState<"individual" | "legal">("individual");

  const { data: individuals, isLoading: loadingIndividuals } = useQuery<Specialist[]>({
    queryKey: ["/api/users/top", "individual"],
    queryFn: async () => {
      const response = await fetch(`/api/users/top?type=individual`);
      if (!response.ok) throw new Error("Failed to fetch individual specialists");
      return response.json();
    },
  });

  const { data: companies, isLoading: loadingCompanies } = useQuery<Specialist[]>({
    queryKey: ["/api/users/top", "legal"],
    queryFn: async () => {
      const response = await fetch(`/api/users/top?type=legal`);
      if (!response.ok) throw new Error("Failed to fetch company specialists");
      return response.json();
    },
  });

  const isLoading = selectedTab === "individual" ? loadingIndividuals : loadingCompanies;
  const specialists = selectedTab === "individual" ? individuals : companies;

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Helmet>
        <title>Лучшие специалисты | СтройТендер</title>
        <meta name="description" content="Топ физических и юридических лиц на платформе СтройТендер, ранжированные по рейтингу и выполненным проектам." />
      </Helmet>

      <h1 className="text-3xl font-bold mb-8 text-center">Лучшие специалисты</h1>

      <Tabs defaultValue="individual" className="w-full mb-8" onValueChange={(value) => setSelectedTab(value as "individual" | "legal")}>
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
          <TabsTrigger value="individual">Физические лица</TabsTrigger>
          <TabsTrigger value="legal">Юридические лица</TabsTrigger>
        </TabsList>

        <TabsContent value="individual">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-full flex justify-center py-20">
                <Spinner size="lg" />
              </div>
            ) : individuals && individuals.length > 0 ? (
              individuals.map((specialist) => (
                <SpecialistCard key={specialist.id} specialist={specialist} />
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500">
                Специалисты не найдены
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="legal">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-full flex justify-center py-20">
                <Spinner size="lg" />
              </div>
            ) : companies && companies.length > 0 ? (
              companies.map((company) => (
                <SpecialistCard key={company.id} specialist={company} />
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500">
                Компании не найдены
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const SpecialistCard = ({ specialist }: { specialist: Specialist }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <Avatar className="h-14 w-14 border-2 border-primary/10">
              <AvatarImage src={specialist.avatar} alt={specialist.fullName} />
              <AvatarFallback>{getUserInitials(specialist.fullName)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="flex items-center">
                {specialist.fullName}
                {specialist.isVerified && (
                  <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Проверено
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="mt-1 flex items-center">
                {specialist.location && (
                  <span className="flex items-center text-sm">
                    <MapPin className="h-3 w-3 mr-1" />
                    {specialist.location}
                  </span>
                )}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center mt-1">
            <Award className="h-5 w-5 text-primary mr-1" />
            <span className="font-semibold text-primary">{specialist.rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="flex">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < specialist.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
            </div>
            <span className="text-sm text-gray-500">
              ({specialist.rating}/5)
            </span>
          </div>

          <div className="flex items-center">
            <Briefcase className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm">
              {specialist.completedProjects} завершенных проектов
            </span>
          </div>

          {specialist.bio && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{specialist.bio}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopSpecialists;
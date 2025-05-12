import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { User } from "@shared/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { User as UserIcon, Star, Award, MapPin, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TopSpecialists() {
  const {
    data: individuals,
    isLoading: isLoadingIndividuals,
    error: individualsError,
  } = useQuery<User[]>({
    queryKey: ["/api/users/top", { personType: "individual" }],
  });

  const {
    data: companies,
    isLoading: isLoadingCompanies,
    error: companiesError,
  } = useQuery<User[]>({
    queryKey: ["/api/users/top", { personType: "company" }],
  });

  const isLoading = isLoadingIndividuals || isLoadingCompanies;
  const error = individualsError || companiesError;

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[50vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12">
        <div className="bg-red-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Ошибка</h2>
          <p className="text-red-700">Не удалось загрузить данные о лучших специалистах</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Лучшие специалисты | Строительная платформа</title>
        <meta
          name="description"
          content="Лучшие специалисты и компании в сфере строительства с высоким рейтингом и обширным портфолио выполненных проектов"
        />
      </Helmet>

      <div className="container py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Лучшие специалисты</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Проверенные мастера и компании с высоким рейтингом и большим количеством выполненных проектов
          </p>
        </div>

        <Tabs defaultValue="individuals" className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="individuals">Физические лица</TabsTrigger>
            <TabsTrigger value="companies">Юридические лица</TabsTrigger>
          </TabsList>
          
          <TabsContent value="individuals" className="mt-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {individuals?.map((specialist) => (
                <SpecialistCard key={specialist.id} specialist={specialist} />
              ))}
              {(!individuals || individuals.length === 0) && (
                <div className="col-span-full text-center p-8">
                  <p className="text-muted-foreground">Нет данных о лучших специалистах</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="companies" className="mt-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {companies?.map((company) => (
                <SpecialistCard key={company.id} specialist={company} />
              ))}
              {(!companies || companies.length === 0) && (
                <div className="col-span-full text-center p-8">
                  <p className="text-muted-foreground">Нет данных о лучших компаниях</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

interface SpecialistCardProps {
  specialist: User;
}

function SpecialistCard({ specialist }: SpecialistCardProps) {
  const initialsOrIcon = specialist.fullName 
    ? specialist.fullName.substring(0, 2).toUpperCase() 
    : specialist.userType === 'company' ? 'ЮЛ' : 'ФЛ';

  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <Avatar className="h-12 w-12 mr-3">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {initialsOrIcon}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-end">
            <Badge variant="outline" className="mb-2 flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400" />
              <span>{specialist.rating || 0}</span>
            </Badge>
            <Badge className="flex items-center gap-1">
              <Briefcase className="h-3 w-3" />
              <span>{specialist.completedProjects || 0}</span>
            </Badge>
          </div>
        </div>
        <CardTitle className="mt-3 line-clamp-1">
          {specialist.fullName}
        </CardTitle>
        {specialist.location && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{specialist.location}</span>
          </div>
        )}
        <Badge variant="secondary" className="mt-1 w-fit">
          {specialist.userType === "individual" ? "Физическое лицо" : "Юридическое лицо"}
        </Badge>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3 min-h-[4.5rem]">
          {specialist.bio || "Информация о специалисте отсутствует"}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
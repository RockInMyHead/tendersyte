import { useState } from 'react';
import { Search, MapPin, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  MARKETPLACE_CATEGORIES, 
  TENDER_CATEGORIES, 
  LISTING_TYPES,
  TENDER_STATUSES,
  PERSON_TYPES,
  PROFESSIONS
} from '@/lib/constants';
import { Badge } from '../ui/badge';

interface SearchFiltersProps {
  type: 'tenders' | 'marketplace';
  onSearch: (filters: any) => void;
  initialFilters?: any;
}

export default function SearchFilters({ type, onSearch, initialFilters = {} }: SearchFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm || '');
  const [location, setLocation] = useState(initialFilters.location || '');
  const [category, setCategory] = useState(initialFilters.category || '');
  const [subcategory, setSubcategory] = useState(initialFilters.subcategory || '');
  const [listingType, setListingType] = useState(initialFilters.listingType || '');
  const [status, setStatus] = useState(initialFilters.status || '');
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice || 0);
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice || 1000000);
  const [personType, setPersonType] = useState(initialFilters.personType || '');
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>(initialFilters.requiredProfessions || []);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleSearch = () => {
    const filters: any = { searchTerm };
    
    // Add additional filters
    if (location) filters.location = location;
    if (category) filters.category = category;
    if (subcategory) filters.subcategory = subcategory;
    
    if (type === 'marketplace') {
      if (listingType) filters.listingType = listingType;
      if (minPrice > 0) filters.minPrice = minPrice;
      if (maxPrice < 1000000) filters.maxPrice = maxPrice;
    } else {
      if (status) filters.status = status;
      if (personType) filters.personType = personType;
      if (selectedProfessions.length > 0) filters.requiredProfessions = selectedProfessions;
    }
    
    // Calculate active filters for display
    const newActiveFilters: string[] = [];
    if (category) newActiveFilters.push(`Категория: ${getCategoryLabel(category)}`);
    if (subcategory) newActiveFilters.push(`Подкатегория: ${subcategory}`);
    if (location) newActiveFilters.push(`Местоположение: ${location}`);
    
    if (type === 'marketplace') {
      if (listingType) newActiveFilters.push(`Тип: ${getListingTypeLabel(listingType)}`);
      if (minPrice > 0 || maxPrice < 1000000) {
        newActiveFilters.push(`Цена: ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()} ₽`);
      }
    } else {
      if (status) newActiveFilters.push(`Статус: ${getStatusLabel(status)}`);
      if (personType) newActiveFilters.push(`Тип заказчика: ${getPersonTypeLabel(personType)}`);
      
      if (selectedProfessions.length > 0) {
        const profLabels = selectedProfessions.map(p => {
          const prof = PROFESSIONS.find(item => item.value === p);
          return prof ? prof.label : p;
        });
        
        if (profLabels.length === 1) {
          newActiveFilters.push(`Профессия: ${profLabels[0]}`);
        } else {
          newActiveFilters.push(`Профессии: ${profLabels.length}`);
        }
      }
    }
    
    setActiveFilters(newActiveFilters);
    onSearch(filters);
  };

  const getCategoryLabel = (value: string) => {
    const categories = type === 'marketplace' ? MARKETPLACE_CATEGORIES : TENDER_CATEGORIES;
    const category = categories.find(c => c.value === value);
    return category ? category.label : value;
  };

  const getListingTypeLabel = (value: string) => {
    const type = LISTING_TYPES.find(t => t.value === value);
    return type ? type.label : value;
  };

  const getStatusLabel = (value: string) => {
    const status = TENDER_STATUSES.find(s => s.value === value);
    return status ? status.label : value;
  };
  
  const getPersonTypeLabel = (value: string) => {
    const personType = PERSON_TYPES.find(p => p.value === value);
    return personType ? personType.label : value;
  };

  const clearFilter = (filter: string) => {
    const filterName = filter.split(':')[0].trim();
    
    switch(filterName) {
      case 'Категория':
        setCategory('');
        break;
      case 'Подкатегория':
        setSubcategory('');
        break;
      case 'Местоположение':
        setLocation('');
        break;
      case 'Тип':
        setListingType('');
        break;
      case 'Цена':
        setMinPrice(0);
        setMaxPrice(1000000);
        break;
      case 'Статус':
        setStatus('');
        break;
      case 'Тип заказчика':
        setPersonType('');
        break;
      case 'Профессия':
      case 'Профессии':
        setSelectedProfessions([]);
        break;
    }
    
    setActiveFilters(activeFilters.filter(f => f !== filter));
    
    // Update search results
    setTimeout(handleSearch, 0);
  };

  const clearAllFilters = () => {
    setCategory('');
    setSubcategory('');
    setLocation('');
    setListingType('');
    setStatus('');
    setMinPrice(0);
    setMaxPrice(1000000);
    setActiveFilters([]);
    
    // Keep search term but clear other filters
    onSearch({ searchTerm });
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                className="pl-10"
                placeholder={type === 'tenders' ? "Поиск по тендерам" : "Поиск по объявлениям"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                className="pl-10"
                placeholder="Местоположение"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>
          <div>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Фильтры {activeFilters.length > 0 && `(${activeFilters.length})`}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Фильтры</SheetTitle>
                  <SheetDescription>
                    Настройте параметры поиска
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  <div className="space-y-2">
                    <Label>Категория</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Все категории</SelectItem>
                        {(type === 'marketplace' ? MARKETPLACE_CATEGORIES : TENDER_CATEGORIES).map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {type === 'marketplace' && (
                    <>
                      <div className="space-y-2">
                        <Label>Тип объявления</Label>
                        <Select value={listingType} onValueChange={setListingType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Все типы" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Все типы</SelectItem>
                            {LISTING_TYPES.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Цена (₽)</Label>
                        <div className="flex items-center justify-between mb-2">
                          <Input
                            type="number"
                            className="w-24"
                            value={minPrice}
                            onChange={(e) => setMinPrice(Number(e.target.value))}
                          />
                          <span className="mx-2">—</span>
                          <Input
                            type="number"
                            className="w-24"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                          />
                        </div>
                        <Slider
                          defaultValue={[minPrice, maxPrice]}
                          min={0}
                          max={1000000}
                          step={1000}
                          value={[minPrice, maxPrice]}
                          onValueChange={([min, max]) => {
                            setMinPrice(min);
                            setMaxPrice(max);
                          }}
                        />
                      </div>
                    </>
                  )}

                  {type === 'tenders' && (
                    <div className="space-y-2">
                      <Label>Статус</Label>
                      <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger>
                          <SelectValue placeholder="Все статусы" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Все статусы</SelectItem>
                          {TENDER_STATUSES.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                <SheetFooter>
                  <div className="flex w-full space-x-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={clearAllFilters}
                    >
                      Сбросить
                    </Button>
                    <SheetClose asChild>
                      <Button className="flex-1" onClick={handleSearch}>
                        Применить
                      </Button>
                    </SheetClose>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      
      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="flex items-center gap-1 pl-3 pr-2 py-1.5"
            >
              {filter}
              <button 
                className="ml-1 rounded-full p-0.5 hover:bg-gray-200 transition-colors"
                onClick={() => clearFilter(filter)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {activeFilters.length > 1 && (
            <Button 
              variant="link" 
              size="sm" 
              onClick={clearAllFilters}
              className="h-8 text-xs"
            >
              Сбросить все
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

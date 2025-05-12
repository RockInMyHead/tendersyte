// Tender categories
export const TENDER_CATEGORIES = [
  { value: "repair", label: "Ремонт" },
  { value: "construction", label: "Строительство" },
  { value: "design", label: "Проектирование" },
  { value: "finishing", label: "Отделка" },
  { value: "installation", label: "Монтаж" },
  { value: "demolition", label: "Демонтаж" },
  { value: "landscaping", label: "Ландшафтный дизайн" },
  { value: "other", label: "Другое" },
];

// Marketplace categories
export const MARKETPLACE_CATEGORIES = [
  { value: "equipment", label: "Спецтехника" },
  { value: "tools", label: "Инструменты" },
  { value: "materials", label: "Материалы" },
  { value: "services", label: "Услуги" },
];

// Marketplace subcategories
export const MARKETPLACE_SUBCATEGORIES = {
  equipment: [
    { value: "excavators", label: "Экскаваторы" },
    { value: "loaders", label: "Погрузчики" },
    { value: "cranes", label: "Краны" },
    { value: "trucks", label: "Грузовики" },
    { value: "concrete_mixers", label: "Бетоносмесители" },
  ],
  tools: [
    { value: "power_tools", label: "Электроинструменты" },
    { value: "hand_tools", label: "Ручные инструменты" },
    { value: "measuring_tools", label: "Измерительные инструменты" },
    { value: "ladders", label: "Лестницы" },
    { value: "scaffolding", label: "Строительные леса" },
  ],
  materials: [
    { value: "bricks", label: "Кирпич" },
    { value: "cement", label: "Цемент" },
    { value: "wood", label: "Древесина" },
    { value: "metal", label: "Металл" },
    { value: "paint", label: "Краска" },
  ],
  services: [
    { value: "repair", label: "Ремонт" },
    { value: "construction", label: "Строительство" },
    { value: "design", label: "Проектирование" },
    { value: "demolition", label: "Демонтаж" },
    { value: "cleaning", label: "Уборка" },
  ],
};

// Listing types
export const LISTING_TYPES = [
  { value: "sell", label: "Продажа" },
  { value: "rent", label: "Аренда" },
  { value: "buy", label: "Покупка" },
];

// Tender statuses
export const TENDER_STATUSES = [
  { value: "open", label: "Актуален" },
  { value: "in_progress", label: "В работе" },
  { value: "completed", label: "Завершен" },
  { value: "canceled", label: "Отменен" },
];

// User types
export const USER_TYPES = [
  { value: "individual", label: "Физическое лицо" },
  { value: "contractor", label: "Подрядчик" },
  { value: "company", label: "Компания" },
];

// Person types (for tenders)
export const PERSON_TYPES = [
  { value: "individual", label: "Физическое лицо" },
  { value: "legal_entity", label: "Юридическое лицо" },
];

// Professions
export const PROFESSIONS = [
  { value: "builder", label: "Строитель" },
  { value: "carpenter", label: "Плотник" },
  { value: "electrician", label: "Электрик" },
  { value: "plumber", label: "Сантехник" },
  { value: "painter", label: "Маляр" },
  { value: "welder", label: "Сварщик" },
  { value: "tiler", label: "Плиточник" },
  { value: "roofer", label: "Кровельщик" },
  { value: "plasterer", label: "Штукатур" },
  { value: "bricklayer", label: "Каменщик" },
  { value: "concrete_worker", label: "Бетонщик" },
  { value: "excavator_operator", label: "Оператор экскаватора" },
  { value: "crane_operator", label: "Крановщик" },
  { value: "architect", label: "Архитектор" },
  { value: "designer", label: "Дизайнер" },
  { value: "engineer", label: "Инженер" },
  { value: "project_manager", label: "Руководитель проекта" },
];

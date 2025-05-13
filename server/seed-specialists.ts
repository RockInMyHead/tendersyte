import { db } from './db-sqlite';
import { users } from '@shared/schema';
import bcrypt from 'bcryptjs';

// Функция для хэширования пароля
async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function seedTopSpecialists() {
  console.log('Seeding top specialists...');
  
  // Проверяем, не добавлены ли уже тестовые пользователи
  const existingUsers = await db.select().from(users);
  if (existingUsers.length > 10) {
    console.log('Top specialists data already exists');
    return;
  }
  
  // Тестовые данные для физических лиц - мастеров
  const individuals = [
    {
      username: 'master_ivan',
      password: await hashPassword('password123'),
      email: 'ivan@example.com',
      fullName: 'Иванов Иван',
      userType: 'individual',
      location: 'Москва',
      bio: 'Опытный мастер-отделочник с 15-летним стажем работы',
      rating: 5,
      completedProjects: 48,
      isVerified: true
    },
    {
      username: 'master_elena',
      password: await hashPassword('password123'),
      email: 'elena@example.com',
      fullName: 'Елена Смирнова',
      userType: 'individual',
      location: 'Санкт-Петербург',
      bio: 'Дизайнер интерьеров с портфолио более 50 проектов',
      rating: 5,
      completedProjects: 52,
      isVerified: true
    },
    {
      username: 'master_sergey',
      password: await hashPassword('password123'),
      email: 'sergey@example.com',
      fullName: 'Сергей Петров',
      userType: 'individual',
      location: 'Казань',
      bio: 'Электрик-профессионал, работаю с любыми объектами',
      rating: 4,
      completedProjects: 37,
      isVerified: true
    },
    {
      username: 'master_olga',
      password: await hashPassword('password123'),
      email: 'olga@example.com',
      fullName: 'Ольга Николаева',
      userType: 'individual',
      location: 'Новосибирск',
      bio: 'Специалист по ландшафтному дизайну и озеленению',
      rating: 4,
      completedProjects: 28,
      isVerified: true
    },
    {
      username: 'master_dmitry',
      password: await hashPassword('password123'),
      email: 'dmitry@example.com',
      fullName: 'Дмитрий Кузнецов',
      userType: 'individual',
      location: 'Екатеринбург',
      bio: 'Мастер по укладке плитки и сантехническим работам',
      rating: 5,
      completedProjects: 42,
      isVerified: true
    }
  ];
  
  // Тестовые данные для юридических лиц - компаний
  const companies = [
    {
      username: 'stroybest',
      password: await hashPassword('password123'),
      email: 'info@stroybest.ru',
      fullName: 'ООО "СтройБест"',
      userType: 'company',
      location: 'Москва',
      bio: 'Строительная компания полного цикла, работаем с 2005 года',
      rating: 5,
      completedProjects: 123,
      isVerified: true
    },
    {
      username: 'designpro',
      password: await hashPassword('password123'),
      email: 'info@designpro.ru',
      fullName: 'ООО "ДизайнПро"',
      userType: 'company',
      location: 'Санкт-Петербург',
      bio: 'Проектируем и реализуем дизайнерские решения для жилых и коммерческих помещений',
      rating: 5,
      completedProjects: 87,
      isVerified: true
    },
    {
      username: 'remstroi',
      password: await hashPassword('password123'),
      email: 'info@remstroi.ru',
      fullName: 'ООО "РемСтрой"',
      userType: 'company',
      location: 'Нижний Новгород',
      bio: 'Качественный ремонт квартир, офисов и других помещений',
      rating: 4,
      completedProjects: 56,
      isVerified: true
    },
    {
      username: 'architekton',
      password: await hashPassword('password123'),
      email: 'info@architekton.ru',
      fullName: 'ООО "Архитектон"',
      userType: 'company',
      location: 'Казань',
      bio: 'Архитектурное проектирование и строительство',
      rating: 5,
      completedProjects: 34,
      isVerified: true
    },
    {
      username: 'stroigrad',
      password: await hashPassword('password123'),
      email: 'info@stroigrad.ru',
      fullName: 'ООО "СтройГрад"',
      userType: 'company',
      location: 'Ростов-на-Дону',
      bio: 'Строительство малоэтажных жилых домов и коттеджей',
      rating: 4,
      completedProjects: 29,
      isVerified: true
    }
  ];
  
  // Для SQLite нам нужно использовать текстовый формат для дат
  // Преобразуем данные перед вставкой, удалив поля, которые вызывают проблемы
  for (const individual of individuals) {
    try {
      const userData = {
        username: individual.username,
        password: individual.password,
        email: individual.email,
        fullName: individual.fullName,
        userType: individual.userType,
        location: individual.location,
        bio: individual.bio,
        rating: individual.rating,
        completedProjects: individual.completedProjects,
        isVerified: individual.isVerified,
        // Добавляем новые поля с пустыми значениями для физ. лиц
        inn: null,
        website: null,
        walletBalance: 0,
        createdAt: new Date().toISOString(), // Конвертируем в ISO строку для SQLite 
        updatedAt: new Date().toISOString() // Конвертируем в ISO строку для SQLite
      };
      await db.insert(users).values(userData);
      console.log(`Добавлен специалист: ${individual.fullName}`);
    } catch (error) {
      console.error(`Ошибка при добавлении специалиста ${individual.fullName}:`, error);
    }
  }
  
  for (const company of companies) {
    try {
      const userData = {
        username: company.username,
        password: company.password,
        email: company.email,
        fullName: company.fullName,
        userType: company.userType,
        location: company.location,
        bio: company.bio,
        rating: company.rating,
        completedProjects: company.completedProjects,
        isVerified: company.isVerified,
        // Добавляем новые поля для юр. лиц с данными
        inn: company.userType === 'company' ? '7701234567' : null,
        website: company.userType === 'company' ? `https://www.${company.username}.ru` : null,
        walletBalance: 10000, // Добавим начальный баланс для примера
        createdAt: new Date().toISOString(), // Конвертируем в ISO строку для SQLite
        updatedAt: new Date().toISOString() // Конвертируем в ISO строку для SQLite
      };
      await db.insert(users).values(userData);
      console.log(`Добавлена компания: ${company.fullName}`);
    } catch (error) {
      console.error(`Ошибка при добавлении компании ${company.fullName}:`, error);
    }
  }
  
  console.log('Top specialists seeded successfully');
}
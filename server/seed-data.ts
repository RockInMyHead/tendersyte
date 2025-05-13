import { db } from './db';
import { tenders, marketplaceListings, tenderBids } from '@shared/schema';
import { storage } from './storage';

async function seedDatabase() {
  console.log('Начинаем заполнение базы данных тестовыми данными...');

  try {
    // Проверяем, есть ли пользователь для создания тестовых данных
    const user = await storage.getUserByUsername('testuser');
    
    if (!user) {
      console.error('Пользователь testuser не найден. Создайте пользователя перед заполнением базы данных.');
      process.exit(1);
    }
    
    const userId = user.id;
    
    // Тестовые тендеры
    const testTenders = [
      {
        userId,
        title: 'Разработка проекта жилого комплекса',
        description: 'Требуется разработка проекта жилого комплекса из 5 домов с инфраструктурой. Необходимо учесть все современные требования к жилым комплексам.',
        category: 'services',
        subcategory: 'design',
        location: 'Москва',
        budget: 2500000,
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // через 30 дней
        status: 'open',
        viewCount: 15,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        userId,
        title: 'Строительство фундамента для частного дома',
        description: 'Требуется строительство ленточного фундамента для частного дома площадью 150 кв.м. Все материалы предоставляются заказчиком.',
        category: 'services',
        subcategory: 'construction',
        location: 'Санкт-Петербург',
        budget: 500000,
        deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // через 15 дней
        status: 'open',
        viewCount: 8,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 дня назад
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        userId,
        title: 'Закупка строительных материалов для реконструкции офисного здания',
        description: 'Требуется поставка строительных материалов для реконструкции офисного здания в центре города. Список материалов включает: кирпич, цемент, арматуру, гипсокартон и т.д.',
        category: 'materials',
        subcategory: 'bricks',
        location: 'Екатеринбург',
        budget: 1200000,
        deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // через 10 дней
        status: 'open',
        viewCount: 12,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 дней назад
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        userId,
        title: 'Аренда экскаватора для земляных работ',
        description: 'Требуется аренда экскаватора с оператором для проведения земляных работ на строительной площадке.',
        category: 'equipment',
        subcategory: 'excavators',
        location: 'Краснодар',
        budget: 150000,
        deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // через 5 дней
        status: 'open',
        viewCount: 20,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 дня назад
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        userId,
        title: 'Отделочные работы в новом торговом центре',
        description: 'Требуется бригада отделочников для проведения работ в новом торговом центре. Общая площадь помещений составляет 5000 кв.м.',
        category: 'services',
        subcategory: 'repair',
        location: 'Новосибирск',
        budget: 3000000,
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // через 60 дней
        status: 'open',
        viewCount: 25,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 день назад
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
    
    // Тестовые объявления маркетплейса
    const testListings = [
      {
        userId,
        title: 'Продам башенный кран Liebherr',
        description: 'Продается башенный кран Liebherr 132 EC-H 8 в отличном состоянии. Год выпуска 2015, наработка 5000 моточасов. Все документы в порядке.',
        category: 'equipment',
        subcategory: 'cranes',
        listingType: 'sell',
        price: 15000000,
        location: 'Москва',
        condition: 'used',
        images: ['https://example.com/crane1.jpg', 'https://example.com/crane2.jpg'],
        isActive: true,
        viewCount: 30,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        userId,
        title: 'Аренда бетономешалки FIORI',
        description: 'Сдаю в аренду бетономешалку FIORI DB 460 объемом 4.6 м³. Исправное состояние, доставка по городу включена в стоимость.',
        category: 'equipment',
        subcategory: 'concrete_mixers',
        listingType: 'rent',
        price: 8000,
        location: 'Санкт-Петербург',
        condition: 'used',
        images: ['https://example.com/mixer1.jpg'],
        isActive: true,
        viewCount: 15,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 дня назад
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        userId,
        title: 'Продам кирпич облицовочный',
        description: 'Продам кирпич облицовочный красный, производство Россия. В наличии 20000 штук. Возможна доставка.',
        category: 'materials',
        subcategory: 'bricks',
        listingType: 'sell',
        price: 18,
        location: 'Казань',
        condition: 'new',
        images: ['https://example.com/brick1.jpg', 'https://example.com/brick2.jpg'],
        isActive: true,
        viewCount: 40,
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 дня назад
        updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        userId,
        title: 'Куплю арматуру А500С',
        description: 'Куплю арматуру А500С диаметром 12мм в количестве 5 тонн. Самовывоз.',
        category: 'materials',
        subcategory: 'metal',
        listingType: 'buy',
        price: 60000,
        location: 'Екатеринбург',
        condition: 'new',
        images: [],
        isActive: true,
        viewCount: 10,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 день назад
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        userId,
        title: 'Сдам в аренду строительные леса',
        description: 'Сдаю в аренду строительные леса на 100 кв.м фасада. Доставка, монтаж и демонтаж включены в стоимость.',
        category: 'equipment',
        subcategory: 'scaffolding',
        listingType: 'rent',
        price: 15000,
        location: 'Краснодар',
        condition: 'used',
        images: ['https://example.com/scaffold1.jpg'],
        isActive: true,
        viewCount: 22,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 дня назад
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      }
    ];
    
    // Тестовые заявки на тендеры
    const testBids = [
      {
        tenderId: 1,
        userId,
        amount: 2300000,
        description: 'Выполним проект жилого комплекса в кратчайшие сроки. Имеем опыт проектирования подобных комплексов.',
        isAccepted: false,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 день назад
      },
      {
        tenderId: 1,
        userId,
        amount: 2450000,
        description: 'Наша компания специализируется на проектировании жилых комплексов. Гарантируем высокое качество и соблюдение всех норм.',
        isAccepted: false,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 дня назад
      },
      {
        tenderId: 2,
        userId,
        amount: 480000,
        description: 'Бригада из 5 человек с опытом строительства фундаментов более 10 лет. Работаем быстро и качественно.',
        isAccepted: false,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 день назад
      },
      {
        tenderId: 3,
        userId,
        amount: 1150000,
        description: 'Предлагаем поставку всех необходимых материалов по оптовым ценам с доставкой на объект.',
        isAccepted: false,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 дня назад
      }
    ];
    
    // Добавляем тендеры в базу данных
    for (const tenderData of testTenders) {
      await db.insert(tenders).values(tenderData);
    }
    console.log(`Добавлено ${testTenders.length} тендеров`);
    
    // Добавляем объявления маркетплейса в базу данных
    for (const listingData of testListings) {
      await db.insert(marketplaceListings).values(listingData);
    }
    console.log(`Добавлено ${testListings.length} объявлений маркетплейса`);
    
    // Добавляем заявки на тендеры в базу данных
    for (const bidData of testBids) {
      await db.insert(tenderBids).values(bidData);
    }
    console.log(`Добавлено ${testBids.length} заявок на тендеры`);
    
    console.log('База данных успешно заполнена тестовыми данными!');
  } catch (error) {
    console.error('Ошибка при заполнении базы данных:', error);
    process.exit(1);
  }
  
  process.exit(0);
}

seedDatabase();
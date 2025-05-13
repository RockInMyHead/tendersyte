import Database from 'better-sqlite3';
import { join } from 'path';

export async function addUserFieldsAndGuarantees() {
  console.log('Добавление новых полей для пользователей и создание таблицы банковских гарантий...');
  
  try {
    // Получаем прямой доступ к SQLite для выполнения SQL-запросов
    const dataDir = join(process.cwd(), 'data');
    const sqlite = new Database(join(dataDir, 'construction-platform.db'));
    
    // 1. Добавление полей в таблицу пользователей
    // Проверяем, существует ли колонка inn
    let tableInfo = sqlite.prepare('PRAGMA table_info(users)').all() as any[];
    
    if (!tableInfo.some(column => column.name === 'inn')) {
      sqlite.prepare('ALTER TABLE users ADD COLUMN inn TEXT').run();
      console.log('Колонка inn добавлена успешно');
    } else {
      console.log('Колонка inn уже существует');
    }
    
    // Проверяем, существует ли колонка website
    if (!tableInfo.some(column => column.name === 'website')) {
      sqlite.prepare('ALTER TABLE users ADD COLUMN website TEXT').run();
      console.log('Колонка website добавлена успешно');
    } else {
      console.log('Колонка website уже существует');
    }
    
    // Проверяем, существует ли колонка wallet_balance
    if (!tableInfo.some(column => column.name === 'wallet_balance')) {
      sqlite.prepare('ALTER TABLE users ADD COLUMN wallet_balance INTEGER DEFAULT 0').run();
      console.log('Колонка wallet_balance добавлена успешно');
    } else {
      console.log('Колонка wallet_balance уже существует');
    }
    
    // 2. Создание таблицы банковских гарантий, если она не существует
    // Создаем enum для статусов гарантии, если он не существует
    try {
      sqlite.prepare(`
        CREATE TABLE IF NOT EXISTS guarantee_status (
          value TEXT PRIMARY KEY
        )
      `).run();
      
      // Вставляем значения в enum таблицу
      const statusValues = ['pending', 'active', 'completed', 'cancelled', 'disputed'];
      for (const status of statusValues) {
        try {
          sqlite.prepare(`INSERT OR IGNORE INTO guarantee_status (value) VALUES (?)`).run(status);
        } catch (err) {
          console.log(`Статус ${status} уже существует в таблице guarantee_status`);
        }
      }
      
    } catch (err) {
      console.log('Enum таблица guarantee_status уже существует');
    }
    
    // Создаем таблицу bank_guarantees, если она не существует
    sqlite.prepare(`
      CREATE TABLE IF NOT EXISTS bank_guarantees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER NOT NULL,
        contractor_id INTEGER NOT NULL,
        tender_id INTEGER,
        amount INTEGER NOT NULL,
        description TEXT NOT NULL,
        terms TEXT NOT NULL,
        start_date TEXT NOT NULL,
        end_date TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES users (id),
        FOREIGN KEY (contractor_id) REFERENCES users (id),
        FOREIGN KEY (tender_id) REFERENCES tenders (id),
        FOREIGN KEY (status) REFERENCES guarantee_status (value)
      )
    `).run();
    console.log('Таблица bank_guarantees создана или уже существует');
    
    // Закрываем подключение
    sqlite.close();
    console.log('Миграция успешно завершена');
  } catch (error) {
    console.error('Ошибка при выполнении миграции:', error);
    throw error;
  }
}
import Database from 'better-sqlite3';
import { join } from 'path';

export async function addMessagesTable() {
  console.log('Проверяем наличие таблицы messages…');

  // путь к вашей базе (тот же, что и в других миграциях)
  const dataDir = join(process.cwd(), 'data');
  const sqlite = new Database(join(dataDir, 'construction-platform.db'));

  try {
    // уже существует?
    const table = sqlite.prepare(`
      SELECT name FROM sqlite_master 
      WHERE type = 'table' AND name = 'messages'
    `).get();

    if (table) {
      console.log('Таблица messages уже есть – миграция не требуется');
      return;
    }

    // создаём таблицу
    sqlite.prepare(`
      CREATE TABLE messages (
        id           INTEGER PRIMARY KEY AUTOINCREMENT,
        sender_id    INTEGER NOT NULL REFERENCES users(id),
        receiver_id  INTEGER NOT NULL REFERENCES users(id),
        content      TEXT    NOT NULL,
        is_read      INTEGER NOT NULL DEFAULT 0,
        created_at   TEXT    NOT NULL DEFAULT (
          strftime('%Y-%m-%dT%H:%M:%fZ','now')
        )
      )
    `).run();

    console.log('Таблица messages создана успешно');
  } finally {
    sqlite.close();
  }
}

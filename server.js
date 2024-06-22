// Импортируем необходимые модули
import express from "express"; // Фреймворк для создания сервера
import cors from "cors"; // Модуль для разрешения CORS-запросов
import bodyParser from "body-parser"; // Модуль для парсинга тела запросов

// Создаем экземпляр приложения Express
const app = express();

// Используем middleware для разрешения CORS-запросов
app.use(cors());

// Используем middleware для парсинга JSON в теле запросов
app.use(
  bodyParser.json({
    type(req) {
      return true; // Применяем парсинг JSON ко всем типам запросов
    },
  })
);

// Устанавливаем заголовок 'Content-Type' для всех ответов как 'application/json'
app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next(); // Передаем управление следующему middleware
});

// Определяем маршрут для GET-запросов на /data
app.get("/data", async (req, res) => {
  // Отправляем JSON-ответ с данными
  res.send(JSON.stringify({ status: "ok" }));
});

// Определяем маршрут для GET-запросов на /error
app.get("/error", async (req, res) => {
  // Отправляем JSON-ответ с ошибкой и статусом 500
  res.status(500).send(JSON.stringify({ status: "Internal Error" }));
});

// Определяем маршрут для GET-запросов на /loading
app.get("/loading", async (req, res) => {
  // Ждем 5 секунд перед отправкой ответа
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(); // Разрешаем промис после 8 секунд
    }, 8000);
  });
  // Отправляем JSON-ответ с данными после задержки
  res.send(JSON.stringify({ status: "ok" }));
});

// Определяем порт для прослушивания
const port = process.env.PORT || 7070; // Используем порт из переменной окружения или 7070 по умолчанию

// Запускаем сервер и выводим сообщение о его запуске
app.listen(port, () => console.log(`The server is running on port ${port}.`));

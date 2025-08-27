module.exports = {
  apps: [
    {
      name: 'backend-bancasa', // Укажите любое имя для вашего приложения
      cwd: '/bancasa/backend', // Полный путь к папке с приложением
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        DATABASE_HOST: 'localhost',
        DATABASE_PORT: '5432',
        // ... другие переменные окружения (JWT_SECRET, ADMIN_JWT_SECRET, DATABASE_PASSWORD и т.д.)
        // ВСЕГДА используйте переменные окружения для секретов!
      },
      time: true,
      instances: 'max', // Использовать все CPU ядра (для кластера)
      exec_mode: 'cluster', // Режим кластера
      autorestart: true, // ✅ Автоматически перезапускать приложение при сбоях
      watch: false, // ❌ Оставьте false для продакшна. true только для разработки.
      max_memory_restart: '1G', // Перезапускать, если приложение превысит лимит памяти
    },
  ],
};
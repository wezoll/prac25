# Отчет по Практической работе №25: Применение CI/CD в проекте

## 1. Описание проекта
Проект представляет собой React-приложение, созданное с использованием Vite. В нем реализован простой интерфейс с заголовком, счетчиком и ссылками на документацию по Vite и React.

## 2. Цель CI/CD
Внедрение CI/CD направлено на автоматизацию процессов сборки, тестирования и развертывания проекта. Это позволяет:
- Обеспечить стабильность кода за счет автоматических проверок.
- Сократить время на ручное тестирование и интеграцию изменений.
- Автоматизировать процесс развертывания приложения (опционально).

## 3. Настройка CI/CD пайплайна
Для автоматизации процесса используется **GitHub Actions**. Настроены следующие этапы:
1. **Сборка проекта** – установка зависимостей и проверка компиляции.
2. **Тестирование** – запуск юнит-тестов с использованием Vitest.
3. **Развертывание** – автоматическое развертывание на GitHub Pages при каждом коммите в `main`.

### Файл конфигурации `.github/workflows/ci.yml`
```yaml
name: CI/CD for Vite React App

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install Dependencies
        run: npm install

      - name: Build Project
        run: npm run build

      - name: Deploy to GitHub Pages
        if: github.ref == 'refs/heads/main'
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          branch: gh-pages
          folder: dist
```
## Развертывание через GitHub Pages

Для автоматического развертывания проекта используется **GitHub Pages**, а процесс деплоя выполняется через **GitHub Actions**. 

1. В файле `package.json` должен быть указан `homepage`:
   ```json
   "homepage": "https://wezoll.github.io/prac25/"
   ```
2. В репозитории настроен CI/CD, который автоматически деплоит проект при каждом коммите в `main`.
3. В настройках репозитория на **GitHub** в разделе **Pages** выбрана ветка `gh-pages` в качестве источника развертывания.

После выполнения всех шагов проект автоматически публикуется по адресу:  
`https://wezoll.github.io/prac25/`

## 4. Тестирование
В проекте реализованы юнит-тесты с помощью **Vitest**. Проверяется:
- Отображение заголовка.
- Корректная работа счетчика.
- Наличие ссылок на документацию.

Пример тестов `src/App.test.jsx`:
```jsx
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("отображает заголовок", () => {
  render(<App />);
  expect(screen.getByText("wezoll + React")).toBeInTheDocument();
});

test("увеличивает счетчик при клике", () => {
  render(<App />);
  const button = screen.getByText("count is 0");
  fireEvent.click(button);
  expect(screen.getByText("count is 1")).toBeInTheDocument();
});

test("ссылки на Vite и React присутствуют", () => {
  render(<App />);
  expect(screen.getByRole("link", { name: /Vite logo/i })).toHaveAttribute(
    "href",
    "https://vite.dev"
  );
  expect(screen.getByRole("link", { name: /React logo/i })).toHaveAttribute(
    "href",
    "https://react.dev"
  );
});
```

## 5. Результаты выполнения пайплайна
После каждого коммита в `main` пайплайн автоматически выполняет сборку, тестирование и деплой проекта. На вкладке **Actions** в GitHub можно увидеть историю запусков пайплайна, а также статус каждого этапа.

Если процесс завершается успешно, изменения автоматически разворачиваются на GitHub Pages, и новая версия проекта становится доступной по ссылке.

**Пример успешного выполнения CI/CD пайплайна:**
![alt text](actions.png)

## 6. Используемые технологии
- **React** + **Vite** – основа проекта.
- **GitHub Pages** – хостинг фронтенд-приложений.
- **GitHub Actions** – CI/CD пайплайн.
- **Vitest** + **@testing-library/react** – тестирование.
- **Node.js** – среда выполнения JavaScript.

## 7. Выводы
Настроенный CI/CD процесс значительно упрощает развертывание и поддержку проекта. Автоматическая сборка и деплой позволяют сократить время на ручные операции и минимизировать вероятность ошибок при выкатывании изменений.

В результате внедрения CI/CD приложение автоматически собирается и разворачивается на GitHub Pages. Это обеспечивает удобный доступ к последней стабильной версии без необходимости ручного деплоя. Данный подход делает процесс разработки более гибким и удобным, упрощая обновление и развертывание новых версий приложения.

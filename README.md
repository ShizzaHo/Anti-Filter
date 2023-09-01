Этот проект [Next.js](https://nextjs.org/) создан с помощью [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## О проекте

Анти цензура это проект который призван покончить с адской и порой неуместной цензурой "ненормативной" лексики в русскоязычном интернете.

```
А русский мат наш дорогой,
Употребляйте осторожно.
Конечно, мат не хорошо,
Но и без мата невозможно.
```

## Режимы работы

| Название режима  | Описание                                                                                                                                                                                                                                            | Техническое название |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| Замена кириллицы | Самый красивый по восприятию режим, который меняет символы из кириллицы на аналогичные символы из латиницы, а также заменяет некоторые буквы на символы, это к сожалению бывает заметно на разных шрифтах, но все равно это остается лучшим режимом | CAR                  |
| Уродливый        | Самый отвратительный по восприятию режим, который меняет символы из кириллицы на отдаленно похожие по образу символы, это до ужаса заметно, противно и неудобно для восприятия, именно такой режим любят использовать безмозглые тиктокершы         | UGLY                 |
| Поцарапанный     | В целом достаточно читаемый и условно приятный для восприятия режим, однако работать он будет не везде, используемые вами сервисы могут удалять подобные Zalgo-подобные юникод символы, или же просто игнорировать их для проверки на цензуру       | SCRATCHED            |
| Легкая царапка   | Тоже самое что и режим “Поцарапанный”, однако заменяются не все символы, от чего возрастает приятность восприятия. Рекомендуется использовать именно этот режим вместо “Поцарапанный”, тот скорее как тяжелая артиллерия :]                         | SCRATCHEDEASY        |

## Запуск проекта

Сначала запустите сервер разработки:

```bash
npm run dev
# или
yarn dev
# или
pnpm dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере, чтобы увидеть результат.

Начать редактирование страницы можно, изменив файл `app/page.tsx`. Страница будет автоматически обновляться по мере редактирования файла.

## API Проекта

Вы можете интегрировать АНТИ ЦЕНЗУРУ в свой проект, для этого достаточно отправлять HTTP запрос к API проекта

`https://anti-filter.vercel.app/api/` - url адрес для обращения к api методам

### /api/unfiltered/ - Форматирование текста для обхода цензуры

Этот API метод позволяет отформатировать текст в текст который цензура скорее всего пропустит.

Пример запроса: http://localhost:3000/api/unfiltered?method=CAR&text=Хули%20ты%20это%20читаешь


Метод имеет 2 параметра, а также не требует никаких header параметров

-   **method** - Метод для форматирования текста, сюда нужно вводить техническое название из таблицы режимов выше (например: **CAR**)

-   **text** - Текст который будет отформатирован

Запрос вернет вам JSON ответ, в случае успеха вам будет возвращен ответ со статусом 200

```json
{
    "result": {
        "formatted": "Haxyй ты этo читaeшь?"
    }
}
```

А в случае ошибки будет возвращен статус 400, вот возможный пример JSON ответа при ошибке:

```json
{ 
    "error": { 
        "message": "Неправильно указан режим обхода фильтра" 
    } 
}
```

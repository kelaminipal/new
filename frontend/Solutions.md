make adaptive for navbar
make promotions upload from server
make promotions adaptive
make promotions for everyRegions
Техническое задание на реализацию Личного кабинета для корпоративного клиента:

Стек проекта: react.js / node.js/ MongoDB

Структура приложения.

1. Страница с формой входа в личный кабинет. (вводиться логин и пароль)
   система автоматически проверяет нужного пользователя в наличии в базе данных. (все корпоративне клиенты вводяться через основную систему ЦРМ ЦСК. цск.com )
   в разделе клиенты.

2. Функционал

1. Раздел Каталог товаров списком по категориям как на сайте. (возможность выбрать необходимое, поиск товаров по наименование и артикулу)
2. Раздел Мои заказы (отображается список заказов с подробной информацией о заказе и его статусу.)
3. Раздел Финансы (История отгрузок и оплаты)
4. Раздел Предложения (отображаються товары по акции, скидки, рекомендуем.)
5. Раздел Корзина (оформление заказов, с возможностью присвоить линого менеджера)


В связке это должно взаимодействовать с общей базой MongoDB, раздел клиенты должен отображать список B2B клиентов. Всю историю покупок, и присвоение менеджеров к заказам.
Также все заказы будут информированы ботом как заказчику, так и к нам в чат. Работать ЛК должен по ссылке tdcsk.online.
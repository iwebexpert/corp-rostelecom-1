/**
 * Домашнее задание #7
 * @author  Сорванов Михаил Леонидович [CorpRostelecom-1]
 */

'use strict';
window.addEventListener('DOMContentLoaded', function () {
  // const basket = new Basket();
  const catalog = new Catalog();

  catalog.add(1, 1, 147.68, 'руб./шт', 'чай Akbar в пакетиках 2г.*100 пак.', 'https://lavka-coffee-tea.ru/upload/iblock/277/AKBAR_Mountain_Fresh_100pak.jpg');

  catalog.add(2, 1, 66.33, 'руб./шт', 'чай Азерчай Чёрный с бергамотом 100 г.', 'https://lavka-coffee-tea.ru/upload/iblock/fbe/azerchai_cherny_bergamot_100g.jpg');

  catalog.add(3, 1, 238.55, 'руб./шт', 'чай Благовест шкатулка жест/б 60 г.', 'https://lavka-coffee-tea.ru/upload/iblock/92d/Dolche_vita_sergi_s_medvedem_60.jpg');

  catalog.add(4, 1, 76.97, 'руб./шт', 'чай Tess "Ceylon" крупный лист 100 г.', 'https://lavka-coffee-tea.ru/upload/iblock/c47/Tess_Ceylon_100g.jpg');

  catalog.add(5, 1, 71.60, 'руб./шт', 'чай Ассам сашет 1,8 г*25 пак.', 'https://lavka-coffee-tea.ru/upload/iblock/6e7/Tea_house_assam_vecher_25sashet.jpg');

  catalog.add(6, 1, 76.62, 'руб./шт', 'чай Гринфилд 2г.*25пак. черный', 'https://lavka-coffee-tea.ru/upload/iblock/93c/Greenfield_Kenyan_Sunrise.jpg');

  catalog.add(7, 1, 78.60, 'руб./шт', 'чай Ричард в пакетиках сашет 2 г*25 пак.', 'https://lavka-coffee-tea.ru/upload/iblock/011/Richard_Royal_English_Breakfast_25pak.jpg');

  catalog.add(8, 1, 190.55, 'руб./шт', 'чай SVAY в пакетиках зелёный 2 г*20 пак.', 'https://lavka-coffee-tea.ru/upload/iblock/8bc/Svay_romantic_jasmin_sashe.jpg');

  catalog.init();



});

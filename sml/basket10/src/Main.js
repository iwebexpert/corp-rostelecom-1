/**
 * Домашнее задание #10
 * @author  Сорванов Михаил Леонидович [CorpRostelecom-1]
 */
'use strict';
window.addEventListener('DOMContentLoaded', function () {
  const catalog = new Catalog();

  // catalog.makeGETRequest('http://localhost:3000/goods');

  catalog.getCatalogPromise('http://localhost:3000/goods');

});

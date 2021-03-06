'use strict';

// build store objects
var stores = []; // to retain all Store object instances
function Store(storeName, minHourlyTraffic, maxHourlyTraffic, avgPurchase) {
  // console.log('this', this);
  // properties that are passed in to constructor
  this.storeName = storeName;
  this.minHourlyTraffic = minHourlyTraffic;
  this.maxHourlyTraffic = maxHourlyTraffic;
  this.avgPurchase = avgPurchase;
  // properties that are used within the object instance for calculation and data storage
  this.dailySales = [];
  this.dailyCookieTotal = 0;
  // build sales table immediately when Store object instance is created
  this.populateSalesArray(this.minHourlyTraffic, this.maxHourlyTraffic, this.avgPurchase);
  stores.push(this); // saves current Store object instance in 'stores' array
}

// prototype functions for all store objects
Store.prototype.getHoursOfOp = function(hoursAfterOpening) { // populate dailySales[].time
  var time = '';
  if (hoursAfterOpening < 6) {
    time = `${hoursAfterOpening+6}:00am `;
  } else if (hoursAfterOpening === 6) {
    time = '12:00pm ';
  } else {
    time = `${hoursAfterOpening-6}:00pm `;
  }
  return time;
};

Store.prototype.getHourlyCustomers = function(min, max) { // populate dailySales[].customers
  var hourlyCustomers = Math.floor(Math.random() * (max-min + 1)) + min;
  // console.log('hourlyCustomers', hourlyCustomers);
  return hourlyCustomers;
};

Store.prototype.getHourlySales = function(custThisHour, cookiesPerCust) { // populate dailySales[].sales
  var hourlySales = Math.round(custThisHour * cookiesPerCust);
  // console.log('hourlySales', hourlySales);
  return hourlySales;
};

Store.prototype.populateSalesArray = function(minCust, maxCust, avgCookiesPerCust) { // use get... methods to populate sales array
  var custThisHour = 0;
  var salesThisHour = 0;
  var setClock = 0;
  for (var hoursAfterOpening = 0; hoursAfterOpening < 14; hoursAfterOpening++) {
    custThisHour = this.getHourlyCustomers(minCust, maxCust);
    salesThisHour = this.getHourlySales(custThisHour, avgCookiesPerCust);
    setClock = this.getHoursOfOp(hoursAfterOpening);
    this.dailySales[hoursAfterOpening] = {time: setClock, sales: salesThisHour, customers: custThisHour};
    // console.log('salesThisHour', salesThisHour);
    this.dailyCookieTotal += salesThisHour;
  }
  // console.log('dailySales', this.dailySales);
};

Store.prototype.render = function () {
  // IMPROVEMENT: Add logic to append row @ ID. Need to declare var here to tie to ID in "makeTable". Add IDs to append rows to in "makeTable".
  // create and populate data row for a store
  var rowGenericEl = document.createElement('tr'); // create row item
  // create, fill, and append store name row header  <th>
  var rowheadGenericEl = document.createElement('th'); // create row header (store name)
  rowheadGenericEl.className = 'leftColumn';
  rowheadGenericEl.textContent = this.storeName;
  rowGenericEl.appendChild(rowheadGenericEl);
  // create, fill append sales data cells for single store  <td>
  var tdGenericEl = 0; // generic placeholder to be recycled while generating and appending <td> cells
  for (var j=0; j<this.dailySales.length; j++) { // create and append single hourly sales data element
    tdGenericEl = document.createElement('td');
    // console.log('tdGenericEl', tdGenericEl);
    tdGenericEl.textContent = this.dailySales[j].sales; // point to sales data for this store at this hour
    rowGenericEl.appendChild(tdGenericEl);
  }
  // create, fill, and append store daily totals row header  <th>
  var rowtailGenericEl = document.createElement('th'); // create row header (store name)
  rowtailGenericEl.className = 'rightColumn';
  rowtailGenericEl.textContent = this.dailyCookieTotal;
  rowGenericEl.appendChild(rowtailGenericEl);
  return rowGenericEl;
};

// GLOBAL FUNCTIONS DECLARATIONS

// BUILD AND RENDER SALES DATA TABLE
function makeTable () {

  // create table, header, body, footer elements
  var mainEl = document.getElementById('main-content');
  var tableEl = document.createElement('table');
  var theadEl = document.createElement('thead');
  var tbodyEl = document.createElement('tbody');
  var tfootEl = document.createElement('tfoot');

  // give names to table, header, body, footer elements
  tableEl.id = ('salesTable');
  theadEl.id = ('salesHeader');
  tbodyEl.id = ('salesBody');
  tfootEl.id = ('salesFooter');

  // create table title
  var tableTitle = document.createElement('h1');
  tableTitle.textContent = 'Daily Demand (by Location)';
  tableTitle.id = ('tableTitle');

  // squish all the pieces together
  mainEl.appendChild(tableTitle);
  mainEl.appendChild(tableEl);
  tableEl.appendChild(theadEl);
  tableEl.appendChild(tbodyEl);
  tableEl.appendChild(tfootEl);
  
  // build and append table
  addHeaderRow();
  addStoreRows();
  addFooterRow();
}

// BUILD HEADER ROW
function addHeaderRow () {
  // create local var to tie to header element in 'makeTable'
  var theadEl = document.getElementById('salesHeader'); // getElementById('salesHeader');
  var headerRowEl = document.createElement('tr');

  // create and append top left corner cell to local row
  var thFirstColEl = document.createElement('th');
  thFirstColEl.className = 'topCornerCell';
  thFirstColEl.textContent = ' '; // *** DELETE? ***
  headerRowEl.appendChild(thFirstColEl); // append top left corner cell

  // create and append cells for hourly totals
  var tdSalesTotalEl = 0; // use as element holder in cell populating loops
  var column = 0; // counts through hours of operation
  for (column = 0; column < hourlyTotals.length; column++) {
    tdSalesTotalEl = document.createElement('th');
    tdSalesTotalEl.textContent = stores[0].dailySales[column].time; // point to sales data for this store at this hour
    headerRowEl.appendChild(tdSalesTotalEl);
  }

  // create and append top right cell for grand total
  var thGrandTotalEl = document.createElement('th'); // createNewElement('th', dailyTotalsAllStores);  IMPROVEMENT IN WORK
  thGrandTotalEl.className = 'topCornerCell';
  thGrandTotalEl.textContent = 'Daily Location Total';
  headerRowEl.appendChild(thGrandTotalEl);

  // console.log('header row', headerRowEl);

  theadEl.appendChild(headerRowEl);
}

// BUILD STORE DATA ROWS
function addStoreRows () {
  var tbodyEl = document.getElementById('salesBody');
  for (var dataRow = 0; dataRow < stores.length; dataRow++) {
    var addRow = stores[dataRow].render();
    tbodyEl.appendChild(addRow);
  }
}

// BUILD FOOTER ROW
function addFooterRow () {
  // create local var to tie to footer element in 'makeTable'
  var footerElement = document.getElementById('salesFooter');
  var footerRowEl = document.createElement('tr');

  // create and append bottom left corner cell to local row
  var thFirstColTotals = document.createElement('td');
  thFirstColTotals.id = 'leftFooter';
  thFirstColTotals.textContent = 'Totals';
  footerRowEl.appendChild(thFirstColTotals); // append top left corner cell

  // create and append cells for hourly totals
  var tdSalesTotalEl = 0; // use as element holder in cell populating loops
  var column = 0; // counts through hours of operation
  for (column = 0; column < hourlyTotals.length; column++) {
    tdSalesTotalEl = document.createElement('td');
    tdSalesTotalEl.textContent = hourlyTotals[column]; // point to sales data for this store at this hour
    footerRowEl.appendChild(tdSalesTotalEl);
  }

  // create and append bottom right cell for grand total
  var thGrandTotalEl = document.createElement('td'); // createNewElement('th', dailyTotalsAllStores);  IMPROVEMENT IN WORK
  thGrandTotalEl.id = 'rightFooter';
  thGrandTotalEl.textContent = dailyTotalsAllStores;
  footerRowEl.appendChild(thGrandTotalEl);

  // console.log('footer row', footerRowEl);

  footerElement.appendChild(footerRowEl);
}

// global function to sum an array
function sumArray (someArray) {
  var arraySum = 0;
  for (var i=0; i<someArray.length; i++) {
    arraySum += someArray[i];
  }
  return arraySum;
}


// BUILD FORM TO CREATE NEW STORE
function newStoreForm () {
  // create form elements
  var mainEl = document.getElementById('main-content');
  var formEl = document.createElement('form');
  // input headers
  // var inputTblEl = document.createElement('table')
  // var inputRowEl = document.createElement('tr');
  var hdNameEl = document.createElement('label');
  var hdMinEl = document.createElement('label');
  var hdMaxEl = document.createElement('label');
  var hdAvgSalesEl = document.createElement('label');

  // inputs
  // var headerRowEl = document.createElement('tr');
  var inputNameEl = document.createElement('input');
  var inputMinCustEl = document.createElement('input');
  var inputMaxCustEl = document.createElement('input');
  var inputAvgSaleEl = document.createElement('input');
  var buttonEl = document.createElement('button');
  buttonEl.type = 'submit';
  buttonEl.textContent = 'Add Store';

  // give names to input elements for reference
  formEl.id = 'addStoreForm';
  inputNameEl.name = 'inStoreName';
  inputMinCustEl.name = 'inMinCust';
  inputMaxCustEl.name = 'inMaxCust';
  inputAvgSaleEl.name = 'inAvgSale';

  hdNameEl.for = inputNameEl.name;
  hdMinEl.for = inputMinCustEl.name;
  hdMaxEl.for = inputMaxCustEl.name;
  hdAvgSalesEl.for = inputAvgSaleEl.name;

  //populate input labels with text
  hdNameEl.textContent = 'New Store Name';
  hdMinEl.textContent = 'Min Customers / Hr';
  hdMaxEl.textContent = 'Max Customers / Hr';
  hdAvgSalesEl.textContent = 'Avg Cookies / Cust';

  // assign input types to input elements
  inputNameEl.type = 'text';
  inputMinCustEl.type = 'number';
  inputMaxCustEl.type = 'number';
  inputAvgSaleEl.type = 'text';
  
  inputNameEl.placeholder = 'ex: Lincoln Square';
  inputMinCustEl.placeholder = 'ex: 3 (no decimals)';
  inputMaxCustEl.placeholder = 'ex: 8 (no decimals)';
  inputAvgSaleEl.placeholder = 'ex: 3.8 (decimals ok)';
  
  // squish all the pieces together
  // attach headers to form
  formEl.appendChild(hdNameEl);
  formEl.appendChild(hdMinEl);
  formEl.appendChild(hdMaxEl);
  formEl.appendChild(hdAvgSalesEl);
  // attach input fields to form
  formEl.appendChild(inputNameEl);
  formEl.appendChild(inputMinCustEl);
  formEl.appendChild(inputMaxCustEl);
  formEl.appendChild(inputAvgSaleEl);
  formEl.appendChild(buttonEl);
  // attach form to main
  mainEl.appendChild(formEl);
}

// ACCEPT NEW STORE PARAMETERS FROM USER
function makeNewStore(event) {
  event.preventDefault();
  // create vars to hold inputs
  var inputNameEl = event.target.inStoreName.value;
  var inputMinCustEl = event.target.inMinCust.value;
  var inputMaxCustEl = event.target.inMaxCust.value;
  var inputAvgSaleEl = event.target.inAvgSale.value;
  // create new store object instance
  new Store(inputNameEl, inputMinCustEl, inputMaxCustEl, inputAvgSaleEl);

  // re-render entire page
  // tie in to existing page elements
  var mainEl = document.getElementById('main-content');
  var tableTitleEl = document.getElementById('tableTitle'); // go find table title element
  var tableEl = document.getElementById('salesTable'); //go find form element
  // delete title, table, and form to re-render
  mainEl.removeChild(tableTitleEl);
  mainEl.removeChild(tableEl);

  // console.log('stores', stores);
  event.target.inStoreName.value = '';
  event.target.inMinCust.value = '';
  event.target.inMaxCust.value = '';
  event.target.inAvgSale.value = '';

  // re-render table and form
  makeTable();
}


// END GLOBAL FUNCTIONS DECLARACTIONS


// CREATE DATA AND BUILD PAGE

// create Store object instances
new Store('1st and Pike', 23, 65, 6.3);
new Store('SeaTac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);

// calculate total hourly sales for all stores
var hourlyTotals = [];
var thisHourThisStore = 0;
for (var i=0; i<stores[0].dailySales.length; i++) {
  thisHourThisStore = 0;
  for (var j=0; j<stores.length; j++) {
    thisHourThisStore += parseInt(stores[j].dailySales[i].sales);
  }
  hourlyTotals.push(thisHourThisStore);
}
// console.log('hourlyTotals', hourlyTotals);
var dailyTotalsAllStores = sumArray(hourlyTotals);

// render form and table
newStoreForm();
makeTable();

// create new store(s) if needed
var newStoreEl = document.getElementById('addStoreForm');
newStoreEl.addEventListener('submit', makeNewStore);





// IMPROVEMENTS IN WORK

// IMPROVEMENT: Make outside function for creating and appending a row
// // global function to create a row element and append it to the render
// function createNewElement (whatKind, contents) { // whatKind = case; contents = string for text content
//   var genericEl = '';
//   // switch (whatKind) {
//   // case 'h1':
//   //   genericEl = document.createElement('h1');
//   //   genericEl.textContent(contents);
//   //   break;
//   // case 'table':
//   //   genericEl = document.createElement('table');
//   //   break;
//   // case 'tr':
//   //   genericEl = document.createElement('tr');
//   //   genericEl.textContent(contents);
//   //   break;
//   // case 'th':
//     genericEl = document.createElement('th');
//     genericEl.textContent(contents);
//   //   break;
//   // case 'td':
//   //   genericEl = document.createElement('td');
//   //   genericEl.textContent(contents);
//   //   break;
//   // }
//   return genericEl;
// }
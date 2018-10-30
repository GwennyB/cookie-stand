
// BUILD LOCATION OBJECTS

var pikePlace = {
  storeName: '1st and Pike',
  minHourlyTraffic: 23,
  maxHourlyTraffic: 65,
  avgPurchase: 6.3,
  dailySales: [],
  dailySalesTotal: 0,

  trafficSimulated: function() {
    return randomInRange(this.minHourlyTraffic, this.maxHourlyTraffic);
  },

  salesTable: function() {
    var totalCookies = 0;
    var setClock = 0;
    for (var hoursAfterOpening = 0; hoursAfterOpening < 14; hoursAfterOpening++) {
      totalCookies = parseInt(this.trafficSimulated() * this.avgPurchase);
      setClock = setTime(hoursAfterOpening);
      this.dailySales[hoursAfterOpening] = {time: setTime(hoursAfterOpening), sales: totalCookies + ' cookies'};
      console.log('totalCookies', totalCookies);
      this.dailySalesTotal += totalCookies;
    }
    console.log('totalCookies', totalCookies);
  },

  render: function () {
    //create elements
    //create content for elements
    //append elements to page at anchor id
    var container = document.createElement('div');
    var listBoxEl = document.createElement('ul');
    var listHeadingEl = document.createElement('h3');
    var totalSalesEl = document.createElement('li');
    
    listHeadingEl.textContent = this.storeName;
    totalSalesEl.textContent = 'Total: ' + this.dailySalesTotal;
    
    listBoxEl.appendChild(listHeadingEl);

    var timeSlot = 0;    // append list items to list box
    for (var salesListWalk = 0; salesListWalk < this.dailySales.length; salesListWalk++) {
      timeSlot = document.createElement('li');
      timeSlot.textContent = this.dailySales[salesListWalk].time + this.dailySales[salesListWalk].sales;
      listBoxEl.appendChild(timeSlot);
    }
    
    listBoxEl.appendChild(totalSalesEl);
    
    container.appendChild(listBoxEl);

    var mainEl = document.getElementById('main-content');
    mainEl.appendChild(container);
  }

};


// POPULATE AND RENDER SALES TABLES
pikePlace.salesTable();
pikePlace.render();




// BUILD TABLE USING OBJECT LITERALS






// COMMON FUNCTIONS

function randomInRange(min,max) {
  return Math.floor(Math.random() * (max-min)) + min;
}

function setTime(hoursAfterOpening) {
  var time = '';
  if (hoursAfterOpening < 6) {
    time = `${hoursAfterOpening+6}am: `;
  } else if (hoursAfterOpening === 6) {
    time = '12pm: ';
  } else {
    time = `${hoursAfterOpening-6}pm: `;
  }
  return time;
}




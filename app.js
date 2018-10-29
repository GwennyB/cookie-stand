
// BUILD LOCATION OBJECTS

var pikePlace = {
  minHourlyTraffic: 23,
  maxHourlyTraffic: 65,
  avgPurchase: 6.3,
  dailySales: [],

  trafficSimulated: function() {
    return randomInRange(this.minHourlyTraffic, this.maxHourlyTraffic);
  },

  salesTable: function() {
    // var salesPikePlace = [
    //   {time: 0, sales: 0},
    // ];
    for (var hoursAfterOpening = 0; hoursAfterOpening < 14; hoursAfterOpening++) {
      var fixClock = setTime(hoursAfterOpening);
      var calcSales = parseInt(this.trafficSimulated() * this.avgPurchase);
      console.log('calcSales', calcSales);
      this.dailySales[hoursAfterOpening] = {time: fixClock, sales: calcSales};
      console.log('salesPikePlace',salesPikePlace[hoursAfterOpening]);
    }
    return this.dailySales;//salesPikePlace;
  }
};


// POPULATE SALES TABLES
pikePlace.salesTable();




// BUILD TABLE USING OBJECT LITERALS






// COMMON FUNCTIONS

function randomInRange(min,max) {
  return Math.floor(Math.random() * (max-min)) + min;
}

function setTime(hoursAfterOpening) {
  var time = '';
  if (hoursAfterOpening < 6) {
    time = `${hoursAfterOpening+6}am:`;
  } else {
    time = `${hoursAfterOpening-6}pm`;
  }
  return time;
}

function calcSales(customers, qtyPerCustomer) {
  return parseInt(customers * qtyPerCustomer);
}


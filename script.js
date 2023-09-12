let input1 = document.getElementById("input1");
let input2 = document.getElementById("input2");

function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;

  if (num % 2 === 0 || num % 3 === 0) return false;

  let i = 5;
  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
    i += 6;
  }
  return true;
}



function calculatePrime() {
  let start = parseInt(document.getElementById("input1").value);
  let end = parseInt(document.getElementById("input2").value);

  let totalTime = 0;
  let timesPerNumber = [];
  let timesPerPrime = [];

  let primes = [];

  let startTimeAll = performance.now();
  for (let i = start; i <= end; i++) {
    let startTimeSingle = performance.now();

    if (isPrime(i)) {
      let endTimeSingle = performance.now();
      primes.push(i);
      timesPerPrime.push(endTimeSingle - startTimeSingle);
    }

    let endTimeSingle = performance.now();
    timesPerNumber.push(endTimeSingle - startTimeSingle);
  }
  let endTimeAll = performance.now();
  totalTime = endTimeAll - startTimeAll;

  let avgTimePerNumber =
    timesPerNumber.reduce((a, b) => a + b, 0) / timesPerNumber.length;
  let avgTimePerPrime =
    timesPerPrime.reduce((a, b) => a + b, 0) / timesPerPrime.length;
  let avgTimeOverall = (avgTimePerNumber + avgTimePerPrime) / 2;

  document.getElementById("total-time").innerText = totalTime.toFixed(2);
  document.getElementById("avg-time").innerText = avgTimeOverall.toFixed(2);

  window.timesPerNumber = timesPerNumber;
  window.timesPerPrime = timesPerPrime;
  window.primes = primes;

  populateTables();
}

function populateTables() {
    let tableTimePerNumber = document.getElementById("timePerNumberTable").getElementsByTagName("tbody")[0];
    let tableTimePerPrime = document.getElementById("timePerPrimeTable").getElementsByTagName("tbody")[0];

    tableTimePerNumber.innerHTML = "";
    tableTimePerPrime.innerHTML = "";

    for (let i = 0; i < window.timesPerNumber.length; i++) {
        let newRow = tableTimePerNumber.insertRow();
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);

        cell1.innerHTML = i + parseInt(document.getElementById("input1").value);  
        cell2.innerHTML = window.timesPerNumber[i].toFixed(2);
    }

    for (let i = 0; i < window.timesPerPrime.length; i++) {
        let newRow = tableTimePerPrime.insertRow();
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);

        cell1.innerHTML = window.primes[i];  
        cell2.innerHTML = window.timesPerPrime[i].toFixed(2);
    }
}

 function showDetails() {
        console.log('hey');
    document.getElementById("popup").style.display = "flex";
}

function hideDetails() {
    document.getElementById("popup").style.display = "none";
}


function showTab(tabIndex) {
    let tabcontents = document.getElementsByClassName("tabcontent");
    for(let i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = "none";
    }
    tabcontents[tabIndex].style.display = "block";
}
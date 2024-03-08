const billValue = document.getElementById("bill");
const nOfPeople = document.getElementById("n-people");
const customTip = document.getElementById("custom-tip");
const tipOptions = document.querySelectorAll(".tip-option");
const resetBtn = document.querySelector(".reset-btn");
const totalAmount = document.getElementById("total-amount");
const tipAmount = document.getElementById("tip-amount");

let bill = parseFloat(billValue.value);
let people = parseFloat(nOfPeople.value);
let totalPerPerson = 0;
let totalTipPerPerson = 0;
let tipPercentage = 0;

const handleInputActiveStates = (e) => {
  const inputContainers = document.querySelectorAll(".input-container");

  bill = parseFloat(billValue.value);
  people = parseFloat(nOfPeople.value);

  if (e.target.id === "bill") {
    if (e.target.value < 0) {
      billValue.classList.add("invalid");
      inputContainers[0].classList.add("invalid");
    } else if (billValue.classList.contains("invalid")) {
      billValue.classList.remove("invalid");
      document.querySelector(".input-container").classList.remove("invalid");
    }

    if (
      (nOfPeople.value === "0" || nOfPeople.value === "") &&
      billValue.value &&
      !billValue.classList.contains("invalid")
    ) {
      nOfPeople.classList.add("invalid");
      inputContainers[2].classList.add("invalid");
    }
  }

  if (e.target.id === "n-people") {
    if (e.target.value < 0) {
      nOfPeople.classList.add("invalid");
      inputContainers[2].classList.add("invalid");
    } else if (nOfPeople.classList.contains("invalid")) {
      nOfPeople.classList.remove("invalid");
      inputContainers[2].classList.remove("invalid");
    }

    if (
      (billValue.value === "0" || billValue.value === "") &&
      nOfPeople.value &&
      !nOfPeople.classList.contains("invalid")
    ) {
      billValue.classList.add("invalid");
      inputContainers[0].classList.add("invalid");
    }
  }

  if (e.target.id === "custom-tip") {
    tipPercentage = 0;

    tipOptions.forEach((el) => {
      if (el.classList.contains("active")) {
        el.classList.remove("active");
      }
    });

    if (e.target.value < 0) {
      customTip.classList.add("invalid");
      inputContainers[1].classList.add("invalid");
    } else if (customTip.classList.contains("invalid")) {
      customTip.classList.remove("invalid");
      inputContainers[1].classList.remove("invalid");
      tipPercentage = parseFloat(e.target.value) / 100;
    } else {
      tipPercentage = parseFloat(e.target.value) / 100;
    }
  }

  if (
    !billValue.classList.contains("invalid") &&
    !nOfPeople.classList.contains("invalid") &&
    billValue.value != 0 &&
    billValue.value != "" &&
    nOfPeople.value != 0 &&
    nOfPeople.value != "" &&
    !customTip.classList.contains("invalid")
  ) {
    if (tipPercentage) {
      totalPerPerson = (bill * (1 + tipPercentage)) / people;
      totalTipPerPerson = (bill * (1 + tipPercentage) - bill) / people;
      totalAmount.innerHTML = `$${totalPerPerson.toFixed(2)}`;
      tipAmount.innerHTML = `$${totalTipPerPerson.toFixed(2)}`;
    } else {
      totalPerPerson = bill / people;
      totalAmount.innerHTML = `$${totalPerPerson.toFixed(2)}`;
      tipAmount.innerHTML = `$0.00`;
    }
  }
};

const handleTipOptionActiveStates = (e) => {
  bill = parseFloat(billValue.value);
  people = parseFloat(nOfPeople.value);

  if (customTip.value != 0) {
    customTip.value = "";
  }

  if (e.target.classList.contains("active")) {
    tipPercentage = 0;
    e.target.classList.remove("active");
    totalPerPerson = bill / people;
    totalTipPerPerson = (bill * (1 + tipPercentage) - bill) / people;
    totalAmount.innerHTML = `$${totalPerPerson.toFixed(2)}`;
    tipAmount.innerHTML = `$${totalTipPerPerson.toFixed(2)}`;
  } else {
    tipOptions.forEach((el) => {
      if (el.classList.contains("active")) {
        el.classList.remove("active");
      }
      e.target.classList.add("active");
    });
    tipPercentage = parseFloat(e.target.id) / 100;
    totalPerPerson = (bill * (1 + tipPercentage)) / people;
    totalTipPerPerson = (bill * (1 + tipPercentage) - bill) / people;
    totalAmount.innerHTML = `$${totalPerPerson.toFixed(2)}`;
    tipAmount.innerHTML = `$${totalTipPerPerson.toFixed(2)}`;
  }
};

billValue.addEventListener("input", handleInputActiveStates);
nOfPeople.addEventListener("input", handleInputActiveStates);
customTip.addEventListener("input", handleInputActiveStates);
tipOptions.forEach((el) => {
  el.addEventListener("click", handleTipOptionActiveStates);
});
resetBtn.addEventListener("click", () => {
  billValue.value = "";
  nOfPeople.value = "";
  customTip.value = "";
  tipOptions.forEach((el) => {
    if (el.classList.contains("active")) {
      el.classList.remove("active");
    }
  });
  totalAmount.innerHTML = `$0.00`;
  tipAmount.innerHTML = `$0.00`;
});

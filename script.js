const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

  const dropdownSelect = document.querySelectorAll(".dropdown select");
  const formButton = document.querySelector("form button");
  const fromCurrency = document.querySelector(".from select");
  const toCurrency = document.querySelector(".to select");
  const message = document.querySelector(".msg");


  for (let select of dropdownSelect){

    for(code in countryList){

        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;

        if(select.name == "from" && code == "USD"){
            newOption.selected = "selected";
        } else if(select.name == "to" && code == "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
  }

  const updateExchangeRate = async() => {

    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    // console.log(amountValue);

    if(amountValue == "" || amountValue < 1){

        amountValue = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();
    let rate = await data[toCurrency.value.toLowerCase()];
    let finalAmount = amountValue * rate;

    message.innerText = `${amountValue} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;
  };
  
  formButton.addEventListener("click", (event) => {
    
    event.preventDefault();
    updateExchangeRate();
  });

  window.addEventListener("load", () => {
    updateExchangeRate();
  });

  
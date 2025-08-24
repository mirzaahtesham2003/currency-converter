const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let select = document.querySelectorAll(".select-field");
let fromCurrency = document.querySelector("#from-currency");
let toCurrency = document.querySelector("#to-currency");
let swap = document.querySelector("#swapId");
let amount = document.querySelector("#amount");
let convertButton = document.querySelector("#convertButton");
let result = document.querySelector("#result-rate");
let exchangeRate = document.querySelector("#exchange-rate");


select.forEach((element)=>{
    for(currencyCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        element.appendChild(newOption);
    }
})


function disableBtt () {
    document.querySelectorAll("option").forEach( option => {
            if(option.value === ""){

            } else{
                option.disabled = false;
            }
        })

        fromCurrency.querySelectorAll("option").forEach( option =>{
            if(option.value === toCurrency.value)   option.disabled = true;
        });
        toCurrency.querySelectorAll("option").forEach( option =>{
            if(option.value === fromCurrency.value)   option.disabled = true;
        });
}

select.forEach((element) => {
    element.addEventListener("change", ()=>{
        let countryCode = countryList[element.value];

        // Update flags
        if(element.id === "from-currency"){
            document.querySelector("#fromImage").src = `https://flagsapi.com/${countryCode}/flat/64.png`;
        } 
        else if(element.id === "to-currency"){
            document.querySelector("#toImage").src = `https://flagsapi.com/${countryCode}/flat/64.png`;
        }   

        disableBtt();
});
});


swap.addEventListener("click", ()=>{
    
    // 1️⃣ Swap the select values
    let temp = fromCurrency.value; 
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;

    // 2️⃣ Swap the flag images
    let fromImg = document.querySelector("#fromImage");
    let toImg = document.querySelector("#toImage");

    let tempImg = fromImg.src;
    fromImg.src = toImg.src;
    toImg.src = tempImg; 

    disableBtt();

});

convertButton.addEventListener("click", async ()=> {
    if(amount.value === "" || amount.value < 1){
        amount.value = 1;
        return;
    }
    console.log("Entered Amount : ",amount.value);

    const URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let answer = data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()].toFixed(2);
    let converted = answer * amount.value;
    console.log(`${fromCurrency.value} --> ${toCurrency.value} : `, answer);
    result.innerText = `${amount.value} ${fromCurrency.value} = ${converted.toFixed(2)} ${toCurrency.value}`;
    result.style.fontSize = "25px";
    exchangeRate.innerText = `1 ${fromCurrency.value} --> 1 ${toCurrency.value} : ${answer}`; 
});


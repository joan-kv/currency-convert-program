const moneyInput = document.getElementById("input-money")
const resultArea = document.getElementById("resultArea")
const coinInput = document.getElementById("input-coin")

const exchangeRates = {
    usd: {
      eur: 0.91,
      aud: 1.48,
      krw: 1203.0,
      vnd: 23200.7
    },
    eur: {
      usd: 1.09,
      aud: 1.62,
      krw: 1316.21,
      vnd: 25383.96
    },
    aud: {
      usd: 0.68,
      eur: 0.62,
      krw: 813.58,
      vnd: 15690.63
    },
    krw: {
      usd: 0.00083,
      aud: 0.0012,
      eur: 0.00076,
      vnd: 19.29
    },
    vnd: {
      krw: 0.052,
      usd: 0.000043,
      aud: 0.000064,
      eur: 0.000039
    }
  };


function currencyConvert() {

    const input=document.querySelector('input[name="currency"]:checked').value;

    var e = document.getElementById("currencyto");
    var output = e.options[e.selectedIndex].value;


    console.log("moneyInput",moneyInput.value)


    callApi(input, output, moneyInput.value)

    // let result= formatNumber(moneyInput.value * exchangeRates[inputCurrency][outputCurrency]);

    // let newresult= formatCurrency(outputCurrency, moneyInput.value * exchangeRates[inputCurrency][outputCurrency])

    // resultArea.innerHTML=`Result is ${newresult} <div>  </div>`
}

async function callApi (from, to, amount){
    let currency = from + "_" + to ;
    console.log(currency);
    let url=`https://free.currencyconverterapi.com/api/v6/convert?q=${currency}&compact=y&apiKey=31afa7038ba9e6066b94`

    let data = await fetch(url);
    let jsonObj = await data.json() ;
    console.log(jsonObj[currency].val);

    let result = (amount * jsonObj[currency].val);
    console.log(result);

    let newresult= formatCurrency(to, result)

    resultArea.innerHTML=`Result is ${newresult} <div>  </div>`

}

// function formatNumber(num) {
//     return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
//   }

  function formatCurrency(type, value) {
    const formatter = new Intl.NumberFormat(type, {
      currency: type,
      style: "currency"
    });
    return formatter.format(value);
  }

  function coinConvert() {
    console.log(`실행`)

    let amount=coinInput.value
    const unit=[500000, 200000,100000, 50000,20000, 10000, 5000, 1000];
    const number=[];
    
    for(n=0; n<unit.length; n++) {
    const a=Math.floor(amount/unit[n]);
    console.log(`몫은`, a)
    if(a>0){
        number[n]=a;
        amount=amount-(a*unit[n])
    }
    else{number[n]=0}
    console.log(number);
    }

    let coinResult=document.getElementById("coinResult");
    let coinList="";
     for(i=0; i<unit.length; i++){
         coinList += `<li> ${unit[i]} * ${number[i]}</li>`
     }


    coinResult.innerHTML = coinList;


  }
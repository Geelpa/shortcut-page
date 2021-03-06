let version = "2.5 Milhares"; // VERSÃO ATUAL

console.log(`Versão: ${version}`)
document.querySelector('#version').innerHTML = version;

// SaveState

if (typeof(Storage) !== "undefined") {
    // Sem problemas, seu progresso ficará salvo.
  } else {
  window.alert("Sinto muito, o seu progresso não ficará salvo.")
  }

// LoadState

if (localStorage.getItem("advCap_Save") !== null) {
  var money = Number(localStorage.getItem("advCap_Save"));
  var lemonqtd = Number(localStorage.getItem("advCap_lemonqtd"));
  var lemonPrice = Number(localStorage.getItem("advCap_lemonPrice"));

  var appleqtd = Number(localStorage.getItem("advCap_appleqtd"));
  var applePrice = Number(localStorage.getItem("advCap_applePrice"));
  var appleRent = Number(localStorage.getItem("advCap_appleRent"));

  // Abaixo, todos os modificadores

  agro = Number(localStorage.getItem("advCap_agro"));

  if (agro==0) {
    agro = 1;
  }

  if (agro==1.5) {
    document.querySelector("#agrotoxico").remove();
  }

  // =================== 

  lemon_dezena = Number(localStorage.getItem("advCap_dezena"));

  if (lemon_dezena==0) {
    lemon_dezena = 1;
  }

  // Abaixo, todas as alterações no innerHTML que são necessárias quando um saveGame é encontrado

  document.querySelector('#money').innerHTML = money.toFixed(2);
  document.querySelector('#lemonBox').removeAttribute("onClick");
  document.querySelector('#lemonPrice').innerHTML = lemonPrice.toFixed(2); // Altera o preço do limão
  document.querySelector('#applePrice').innerHTML = applePrice.toFixed(2);
  document.querySelector('#lemonBox').setAttribute("onClick", "buyLemon()");

  ping(); // INICIA O GAME
  saveGame(); // INICIA O SALVADOR DE PROGRESSO

} else { // OQUE ACONTECE QUANDO UM PROGRESSO NÃO É ENCONTRADO
  console.log("Um progesso anterior não foi encontrado")

  var money = 1;
  var lemonqtd = 1;
  var lemonPrice = 10;

  var appleqtd = 0;
  var applePrice = 250;
  var appleRent = 0;

  var agro = 1;
  var lemon_dezena = 1;
}

// GAME STARTS HERE


// Resetar dinheiro

function resetMoney() {
  money = 1;
  console.log("resetado")
}

// Comprar estabelecimento
function buyLemon() {
    if (money>=lemonPrice) {
        money = money-lemonPrice;
        document.querySelector('#money').innerHTML = money.toFixed(2); // Altera o dinheiro atual
        lemonqtd++;
        kashing.play();

        // ALTERAÇÃO DO PREÇO
        lemonPrice = (lemonPrice*1.1);
        document.querySelector('#lemonPrice').innerHTML = lemonPrice.toFixed(2); // Altera o preço do limão

        // Quantidade de limões, dá um bônus para o jogador
        if (lemonqtd>=10) {
          lemon_dezena=1.1;
        }

        if (lemonqtd>=25) {
          lemon_dezena=1.25;
        }

        if (lemonqtd>=50) {
          lemon_dezena=1.5;
        }

        if (lemonqtd>=100) {
          lemon_dezena=2;
        }

        // MENSAGEM DE SUCESSO
        console.log("Limão comprado")
    } else {
        console.log("Dinheiro insuficiente")
    }
}

function buyApple() {
  if (money>=applePrice) {
      money = money-applePrice;
      document.querySelector('#money').innerHTML = money.toFixed(2); // Altera o dinheiro atual
      appleqtd++;
      kashing.play();

      // ALTERAÇÃO DO PREÇO
      applePrice = (applePrice*1.15);
      document.querySelector('#applePrice').innerHTML = applePrice.toFixed(2); // Altera o preço da maça

      // Quantidade de limões, dá um bônus para o jogador
      // if (lemonqtd>=10) {
      //   lemon_dezena=1.1;
      // }

      // if (lemonqtd>=25) {
      //   lemon_dezena=1.25;
      // }

      // if (lemonqtd>=50) {
      //   lemon_dezena=1.5;
      // }

      // if (lemonqtd>=100) {
      //   lemon_dezena=2;
      // }

      appleRent = appleqtd*20;

      // MENSAGEM DE SUCESSO
      console.log("Maçã comprada")
  } else {
      console.log("Dinheiro insuficiente")
  }
}

// Começar o jogo
function start() {
    document.querySelector('#lemonBox').removeAttribute("onClick");

    ping();
    document.querySelector('#lemonPrice').innerHTML = lemonPrice.toFixed(2); // Altera o preço do limão
    document.querySelector('#lemonBox').setAttribute("onClick", "buyLemon()");

    saveGame();
}

// Uma requisição por segundo

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function ping() {
    await sleep(1000); // Tempo necessário para cada atualização
    moneyMath(); // Faz a conta
    pong(); // Reinicia o ciclo
  }

  async function pong() {
    await sleep(1000); // Tempo necessário para cada atualização
    moneyMath(); // Faz a conta
    ping(); // Reinicia o ciclo
  }

// Variáveis de saveGame 

  async function saveGame() {
    await sleep(10000); // salva o dinheiro de 10 em 10s
    localStorage.setItem("advCap_Save", money);
    localStorage.setItem("advCap_lemonqtd", lemonqtd);
    localStorage.setItem("advCap_lemonPrice", lemonPrice);

    localStorage.setItem("advCap_appleqtd", appleqtd);
    localStorage.setItem("advCap_applePrice", applePrice);
    localStorage.setItem("advCap_appleRent", appleRent);

    localStorage.setItem("advCap_agro", agro); // Valor do modificador agro
    localStorage.setItem("advCap_dezena", lemon_dezena); // Valor do modificador agro

    saveGame();
    console.log("O progresso foi salvo")
  }



// Modificadores de Rentabilidade

function agrotoxico() {
  if (money>=5000) {
    money = money-5000;
    agro = 1.5;
    document.querySelector("#agrotoxico").remove();
    console.log("Agro foi comprado");
  } else {
    console.log("Dinheiro Insuficiente");
  }
}

// Rentabilidade das coisas

var lemon_rent = lemonqtd*agro // Rentabilidade do Limão

//   Matemática do dinheiro

function moneyMath() {
    money = ((money+appleRent)+((lemonqtd*agro)*lemon_dezena));

    if (money.toFixed(0).length>=7&&money.toFixed(0).length<10) {
      document.querySelector('#money').innerHTML = money.toFixed(2); // Altera o dinheiro atual (sem dígitos depois da virgula)
      document.querySelector('#milhar').innerHTML = "Milhões";
    } else if (money.toFixed(0).length>=10&&money.toFixed(0).length<13) {
      document.querySelector('#money').innerHTML = money.toFixed(2); // Altera o dinheiro atual (sem dígitos depois da virgula)
      document.querySelector('#milhar').innerHTML = "Bilhões";
    } else if (money.toFixed(0).length>=13&&money.toFixed(0).length<16) {
      document.querySelector('#money').innerHTML = money.toFixed(2); // Altera o dinheiro atual (sem dígitos depois da virgula)
      document.querySelector('#milhar').innerHTML = "Trilhões";
    } else {
      document.querySelector('#money').innerHTML = money.toFixed(2); // Altera o dinheiro atual (com dígitos depois da vírgula)
      document.querySelector('#milhar').innerHTML = " ";
    }
    document.querySelector('#moneypersecond').innerHTML = (appleRent+((lemonqtd*agro)*lemon_dezena)).toFixed(2); // Altera o dinheiro atual
    

}


footerBtn = document.querySelector("#footer_button");
realMenu = document.querySelector("#menu")
modal = document.querySelector("#modal")

function footerMenu() {
  footerBtn.classList.add('is-active')
  footerBtn.setAttribute('onClick', 'footerMenuOff()')
  // console.log("Open");
  realMenu.style="display: initial"

  modal.style="display: initial"
}

function footerMenuOff() {
  footerBtn.classList.remove('is-active')
  footerBtn.setAttribute('onClick', 'footerMenu()')
  // console.log("Close");
  realMenu.style="display: none"

  modal.style="display: none"
}



// Sounds

let kashing = document.querySelector("#kashing")
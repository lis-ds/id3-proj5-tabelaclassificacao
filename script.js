// Acessar um time específico:
// teams[i] <- i = índice do time que se quer acessar
// Acessar um valor de um time específico:
// teams[i].wins <- acessa valor 'wins' do time de índice i
var teams = [
  {
    name: "Excellent Era",
    logo: "https://i.ibb.co/h77QS8P/EE-red.png",
    wins: 2,
    losses: 3,
    draws: 5,
    points: 0,
    result: "none"
  },
  {
    name: "Tiny Herb",
    logo: "https://i.ibb.co/vsXHVgY/TH-red.png",
    wins: 4,
    losses: 2,
    draws: 4,
    points: 0,
    result: "none"
  },
  {
    name: "Happy",
    logo: "https://i.ibb.co/8DfXWzM/HA-red.png",
    wins: 3,
    losses: 4,
    draws: 3,
    points: 0,
    result: "none"
  },
  {
    name: "Misty Rain",
    logo: "https://i.ibb.co/985bcTb/MR-red.png",
    wins: 4,
    losses: 3,
    draws: 3,
    points: 0,
    result: "none"
  },
  {
    name: "BaTu",
    logo: "https://i.ibb.co/ZmSP5zP/BT-red.png",
    wins: 6,
    losses: 3,
    draws: 1,
    points: 0,
    result: "none"
  },
  {
    name: "Blue Rain",
    logo: "https://i.ibb.co/3Cr692v/BR-red.png",
    wins: 5,
    losses: 3,
    draws: 2,
    points: 0,
    result: "none"
  },
  {
    name: "Windy Howl",
    logo: "https://i.ibb.co/4dh85ks/WH-red.png",
    wins: 4,
    losses: 4,
    draws: 2,
    points: 0,
    result: "none"
  },
  {
    name: "Hundred Blossoms",
    logo: "https://i.ibb.co/yXQqrcd/HB-red.png",
    wins: 2,
    losses: 8,
    draws: 0,
    points: 0,
    result: "none"
  },
  {
    name: "Samsara",
    logo: "https://i.ibb.co/0sbC8wf/SA-red.png",
    wins: 3,
    losses: 5,
    draws: 2,
    points: 0,
    result: "none"
  },
  {
    name: "Thunderclap",
    logo: "https://i.ibb.co/kDMHxJR/TC-red.png",
    wins: 3,
    losses: 2,
    draws: 5,
    points: 0,
    result: "none"
  }
];

var orden = "classif";
var orden_auto = "auto_sim";

// Cálculo inicial de pontos:
for (var i = 0; i < teams.length; i++) {
  teams[i].points = calcPontos(i);
}

imprimirTabela();

// Calcular pontuação
function calcPontos(i) {
  var pontos = teams[i].wins * 3 + teams[i].draws;
  return pontos;
}

// Imprimir tabela com pontuação na tela
function imprimirTabela() {
  // Ordenação da tabela
  if (orden_auto == "auto_sim" && orden == "classif") {
    // ordena times por qtd de pontos
    ordenarListaPts(teams);
  }

  // verifica e marca primeiro(s) lugar(es)
  verificar();

  var elemento = "";
  for (var i = 0; i < teams.length; i++) {
    elemento +=
      "<tr class='" +
      teams[i].result +
      "'><td><img src='" +
      teams[i].logo +
      "' class='logo'></td>";
    elemento += "<td>" + teams[i].name + "</td>";
    elemento += "<td class=''>" + teams[i].wins + "</td>";
    elemento += "<td class=''>" + teams[i].draws + "</td>";
    elemento += "<td class=''>" + teams[i].losses + "</td>";
    elemento += "<td>" + teams[i].points + "</td>";
    elemento +=
      "<td><button class='btnWin' onClick='adicionarVitoria(" +
      i +
      ")'>+</button><button class='btnWin' onClick='removerVitoria(" +
      i +
      ")'>–</button></td>";
    elemento +=
      "<td><button class='btnDraw' onClick='adicionarEmpate(" +
      i +
      ")'>+</button><button class='btnDraw' onClick='removerEmpate(" +
      i +
      ")'>–</button></td>";
    elemento +=
      "<td><button class='btnLoss' onClick='adicionarDerrota(" +
      i +
      ")'>+</button><button class='btnLoss' onClick='removerDerrota(" +
      i +
      ")'>–</button></td></tr>";
  }

  var tabelaJogadores = document.getElementById("tabelaJogadores");
  tabelaJogadores.innerHTML = elemento;
}

// Adicionar uma vitória (win) a um time
function adicionarVitoria(i) {
  teams[i].wins++;
  teams[i].points = calcPontos(i);
  imprimirTabela();
}

// Remover uma vitória (win) de um time
function removerVitoria(i) {
  if (teams[i].wins > 0) {
    teams[i].wins--;
    teams[i].points = calcPontos(i);
    imprimirTabela();
  }
}

// Adicionar uma derrota (loss) a um time
function adicionarDerrota(i) {
  teams[i].losses++;
  imprimirTabela();
}

// Remover uma derrota (loss) de um time
function removerDerrota(i) {
  if (teams[i].losses > 0) {
    teams[i].losses--;
    imprimirTabela();
  }
}

// Adicionar um empate (draw) a um time
function adicionarEmpate(i) {
  teams[i].draws++;
  teams[i].points = calcPontos(i);
  imprimirTabela();
}

// Remover um empate (draw) de um time
function removerEmpate(i) {
  if (teams[i].draws > 0) {
    teams[i].draws--;
    teams[i].points = calcPontos(i);
    imprimirTabela();
  }
}

// Zerar pontuação
// zera pontuação de todos os times, mantém times adicionados
function zerar() {
  if (confirm("Deseja zerar todas as pontuações?")) {
    for (var i = 0; i < teams.length; i++) {
      teams[i].wins = 0;
      teams[i].losses = 0;
      teams[i].draws = 0;
      teams[i].points = 0;
    }
    imprimirTabela();
  }
}

// Adicionar novo time
// Adiciona novo time com pontuação zerada sem mexer nos já existentes
function adicionarTime() {
  // Puxa o nome do time digitado no campo de entrada
  var timeNovo = document.getElementById("timeNovo").value;
  var logoNovo = document.getElementById("logoNovo").value;

  // Verifica se o time já está registrado
  var j = teams.findIndex((i) => i.name === timeNovo);
  if (j >= 0) {
    alert("Esse time já está registrado");
  } else {
    j = teams.length; // <- teams.length muda depois de adicionar o primeiro campo
    teams[j] = { name: timeNovo };
    teams[j].logo = logoNovo;
    teams[j].wins = 0;
    teams[j].losses = 0;
    teams[j].draws = 0;
    teams[j].points = 0;

    if (orden == "alfab" && orden_auto == "auto_sim") {
      ordenarListaNome(teams);
    }

    imprimirTabela();
  }
  document.getElementById("timeNovo").value = "";
  document.getElementById("logoNovo").value = "";
}

// Deletar times da tabela
function deletarTime() {
  var timeNovo = document.getElementById("timeNovo").value;
  var j = teams.findIndex((i) => i.name === timeNovo);
  // /\ se não houver elemento igual, retorna valor -1
  if (j < 0) {
    alert("Esse time não está registrado");
  } else {
    teams.splice(j, 1);

    imprimirTabela();
  }
  document.getElementById("timeNovo").value = "";
  document.getElementById("logoNovo").value = "";
}

// Apaga todos os times da tabela
function apagarTabela() {
  if (confirm("Deseja apagar toda a tabela?")) {
    teams.splice(0, teams.length);
    imprimirTabela();
  }
}

// Ordena lista de times por pontuação
function ordenarListaPts(array) {
  array.sort(function (a, b) {
    if (a.points < b.points) {
      return 1;
    }
    if (a.points > b.points) {
      return -1;
    }
    if (a.points == b.points) {
      if (a.wins < b.wins) {
        return 1;
      }
      if (a.wins > b.wins) {
        return -1;
      }
      if (a.wins == b.wins) {
        return 0;
      }
    }
  });
}

// Ordena lista de times por ordem alfabetica
function ordenarListaNome(array) {
  array.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    if (a.name == b.name) {
      return 0;
    }
  });
}

// Verificação de colocação
// Verifica qual time está na frente, para marcar na tabela
// rodar depois de calcular pontos e ordenar, antes de imprimir na tela
function verificar() {
  var teams_copy = teams.slice();
  ordenarListaPts(teams_copy);

  var j = teams.findIndex((i) => i.name === teams_copy[0].name);
  if (teams_copy[0].points == 0) {
    teams[j].result = "none";
  } else {
    teams[j].result = "win";
  }

  for (var i = 1; i < teams.length; i++) {
    j = teams.findIndex((k) => k.name === teams_copy[i].name);
    if (
      teams_copy[i].points == teams_copy[0].points &&
      teams_copy[i].wins == teams_copy[0].wins &&
      teams_copy[i].points != 0
    ) {
      teams[j].result = "win";
    } else {
      teams[j].result = "none";
    }
  }
}

function modoOrdenar() {
  if (document.getElementById("classif").checked) {
    orden = "classif";
    ordenarListaPts(teams);
  } else {
    orden = "alfab";
    ordenarListaNome(teams);
  }
  imprimirTabela();
}

function ordenarAuto() {
  if (document.getElementById("auto_sim").checked) {
    orden_auto = "auto_sim";

    if (orden == "alfab") {
      ordenarListaNome(teams);
    }
    imprimirTabela();
  } else {
    orden_auto = "auto_nao";
  }
}
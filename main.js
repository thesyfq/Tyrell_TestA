var cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "X", "J", "Q", "K"];
var suits = ["D", "H", "S", "C"];
var button = document.getElementById("button");
var input = document.getElementById("input");
var peopleplay = "";

button.onclick = function () {
  /*get number of people playing based on user input*/
  peopleplay = input.value;
  /*check if input is either 0 or less than 0 to display error message*/
  if (peopleplay <= 0) {
    alert("Input value does not exist or value is invalid");
    input.value = "";
    return;
  } else if (peopleplay > 0) {
    load();
  }
};

function getDeck() {
  var deck = new Array();
  /*create deck array for all 52 cards*/
  for (var i = 0; i < suits.length; i++) {
    for (var x = 0; x < cards.length; x++) {
      var card = { Value: cards[x], Suit: suits[i] };
      deck.push(card);
    }
  }
  return deck;
}

function shuffle() {
  /* shuffle the cards for 1000 turns*/
  /* switch the values of two random cards*/
  for (var i = 0; i < 1000; i++) {
    var location1 = Math.floor(Math.random() * deck.length);
    var location2 = Math.floor(Math.random() * deck.length);
    var tmp = deck[location1];

    deck[location1] = deck[location2];
    deck[location2] = tmp;
  }
}

function renderDeck() {
  var playercard = new Array();
  /*create card combination in array based on the shuffled deck*/
  for (var i = 0; i < deck.length; i++) {
    var render = deck[i].Suit + "-" + deck[i].Value;
    playercard.push(render);
  }
  return playercard;
}

function splitToChunks(array, parts) {
  /*split the array depending on the number of people playing*/
  var result = [];
  for (let i = parts; i > 0; i--) {
    result.push(array.splice(0, Math.ceil(array.length / i)));
  }
  return result;
}

function load() {
  deck = getDeck();
  shuffle();
  playercard = renderDeck();
  var result = splitToChunks(playercard, peopleplay);
  var playdeck = document.getElementById("deck");

  playdeck.innerHTML = "";
  /*display player card, add comma and line break for each player*/
  for (var i = 0; i < result.length; i++) {
    let value = document.createElement("p");
    value.innerHTML = result[i] + ",<br>";
    playdeck.appendChild(value);
  }
  /*in case of irregularity*/
  try {
    if (isNaN(peopleplay)) throw "Irregularity occurred";
  } catch (err) {
    alert(err);
    return;
  }
}

window.onload = load;

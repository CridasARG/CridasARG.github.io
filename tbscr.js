const options = {
  Position: ['GK', 'LB', 'CB', 'RB', 'DM', 'CM', 'LW', 'RW', 'ST'],
  Age: Array.from({ length: 31 }, (_, i) => (15 + i).toString()),
  Rating: ['Weak', 'Average', 'Strong','World Class','Legend'],
  Potential: ['Weak', 'Average', 'Strong','World Class','Legend'],
  'Favorite Opponent': ["?",'AVL', 'BBZ', 'BDB', 'CCC', 'COB', 'COP', 'FLC', 'GAU', 'GIZ', 'GRR', 'GYM', 'HOS', 'IDF', 'INT', 'LEO', 'LUC', 'MAR', 'MAY', 'MEL', 'OIL', 'OLP', 'OSV', 'RAI', 'REV', 'ROY', 'SAV', 'SLB', 'SON', 'SUN', 'SYC'],
  'Worst Opponent': ["?",'AVL', 'BBZ', 'BDB', 'CCC', 'COB', 'COP', 'FLC', 'GAU', 'GIZ', 'GRR', 'GYM', 'HOS', 'IDF', 'INT', 'LEO', 'LUC', 'MAR', 'MAY', 'MEL', 'OIL', 'OLP', 'OSV', 'RAI', 'REV', 'ROY', 'SAV', 'SLB', 'SON', 'SUN', 'SYC'],
  'Favorite Mindset': ["?",'Defend','Neutral','Attack'],
  'Worst Mindset': ["?",'Defend','Neutral','Attack'],
  'Favorite Formation': ["?",'4-4-2','4-3-3','4-2-3-1','4-5-1','3-5-2','4-4-1-1'],
  'Second Position': ["?",'LB', 'CB', 'RB', 'DM', 'CM', 'LW', 'RW', 'ST']//,
  //'Favorite Owner': ["?",'Owner A', 'Owner B', 'Owner C'],
  //'Worst Owner': ["?",'Owner X', 'Owner Y', 'Owner Z']
};
const userData = {
  Team: ['Himachal Avalanche', 'BBZ F.C.', 'Blue Devils Busan', 'Cusco Conductores', 'Cobras United', 'Copthorne S.A.', 'Doha Falcons', 'Cordoba Gauchos', 'Giza Club', 'Sarabi SC', 'The Gymnastic Society', 'Barts Hospital', 'Ile-de-France Foot', 'Porto Alegre International', 'Mumbai Leopards', 'Luchadores', 'Valparaiso Mariners AC', 'Berlin Mayhem', 'Melbourne United', 'Alberta SC', 'Olympians Cariocas', 'Great OSV', 'Raizes Sao Paulo', 'Revolucao Sao Paulo', 'Royal Cambridge FC', 'Rotorua Savages', 'San Lorenzo Bulls', 'Sons of the Sahya', 'Lagos Sunshine FC', 'Sycamore FC'],
  Operation:['Sale','Loan'],
};
const uHead = ['Discord User','Team', 'Operation'];
const headers = [
  'Name', 'Position', 'Second Position','Age', 'Rating', 'Potential',
  'Favorite Opponent', 'Worst Opponent', 'Favorite Mindset', 'Worst Mindset',
  'Favorite Formation',  //'Favorite Owner', 'Worst Owner',
  'Price'
];

const tableBody = document.getElementById('tableBody');
const userBody = document.getElementById('userBody');

//Tabla jugadores
for (let i = 0; i < 10; i++) {
  const row = tableBody.insertRow();
  for (let j = 0; j < headers.length; j++) {
    const cell = row.insertCell();
    const key = headers[j];

    if (key === 'Name' || key === 'Price') {
      const input = document.createElement('input');
      input.type = 'text';
      cell.appendChild(input);
    } else {
      const select = document.createElement('select');

      for (const optionText of options[key]) {
        const option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        select.appendChild(option);
      }
      cell.appendChild(select);
    }
  }
}
//Tabla Inicio
for (let p = 0; p < 1; p++) {
  const row = userBody.insertRow();
  for (let l = 0; l < uHead.length; l++) {
    const cell = row.insertCell();
    const key = uHead[l];

    if (key === 'Discord User') {
      const input = document.createElement('input');
      input.type = 'text';
      cell.appendChild(input);
    }
    else if (''){

    }
    else {
      const select = document.createElement('select');
        for (const opText of userData[key]) {
          const option = document.createElement('option');
          option.value = opText;
          option.textContent = opText;
          select.appendChild(option);
        }          
      cell.appendChild(select);
    }
  }
};
/**
 * LISTINI TARIFFE SPEDIZIONI - MarterNeri/SoleBot
 *
 * Struttura aggiornata con 8 zone tariffarie:
 * - 🇮🇹 Toscana (regionale)
 * - 🇮🇹 Italia A (continentale escl. Toscana e isole)
 * - 🇮🇹 Italia B (Calabria, Sicilia, Sardegna)
 * - 🇪🇺 Zona 1 (Europa vicina)
 * - 🌍 Zona 2 (Balcani & Est Europa)
 * - 🌐 Zona 3 (Medio Oriente, Africa, Asia, Oceania)
 * - 🌎 Zona 4 (Americhe senza USA)
 * - 🇺🇸 Zona 5 (USA)
 *
 * Ultimo aggiornamento: Novembre 2025
 */

// ============================================================================
// 🇮🇹 ITALIA - TOSCANA, ZONA A, ZONA B
// ============================================================================

const zoneItaliaCAP = {
  // Toscana: CAP 50-59
  Toscana: ["50", "51", "52", "53", "54", "55", "56", "57", "58", "59"],

  // Zona B: Sardegna (07-09) + Calabria (87-89) + Sicilia (90-98)
  B: ["07", "08", "09", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98"],

  // Zona A: Resto Italia continentale (escluse Toscana e Zona B)
  A: ["00", "01", "02", "03", "04", "05", "06", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
      "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36",
      "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "60", "61", "62", "63",
      "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80",
      "81", "82", "83", "84", "85", "86"]
};

// Tariffe Italia per scaglioni di peso (in kg)
const tariffeItalia = {
  Toscana: [
    { pesoMax: 1, prezzo: 5.00 },
    { pesoMax: 3, prezzo: 5.00 },
    { pesoMax: 5, prezzo: 5.00 },
    { pesoMax: 10, prezzo: 5.00 },
    { pesoMax: 15, prezzo: 8.00 },
    { pesoMax: 20, prezzo: 8.00 },
    { pesoMax: 30, prezzo: 12.00 },
    { pesoMax: 50, prezzo: 20.00 },
    { pesoMax: Infinity, prezzoPerKg: 1.00 } // oltre 50kg: €1,00/kg
  ],
  A: [
    { pesoMax: 1, prezzo: 6.25 },
    { pesoMax: 3, prezzo: 6.25 },
    { pesoMax: 5, prezzo: 6.25 },
    { pesoMax: 10, prezzo: 6.25 },
    { pesoMax: 15, prezzo: 10.00 },
    { pesoMax: 20, prezzo: 10.00 },
    { pesoMax: 30, prezzo: 15.00 },
    { pesoMax: 50, prezzo: 25.00 },
    { pesoMax: Infinity, prezzoPerKg: 1.25 } // oltre 50kg: €1,25/kg
  ],
  B: [
    { pesoMax: 1, prezzo: 6.88 },
    { pesoMax: 3, prezzo: 9.00 },
    { pesoMax: 5, prezzo: 9.00 },
    { pesoMax: 10, prezzo: 6.88 },
    { pesoMax: 15, prezzo: 11.00 },
    { pesoMax: 20, prezzo: 11.00 },
    { pesoMax: 30, prezzo: 16.50 },
    { pesoMax: 50, prezzo: 27.50 },
    { pesoMax: Infinity, prezzoPerKg: 1.38 } // oltre 50kg: €1,38/kg
  ]
};

// ============================================================================
// 🇪🇺 ZONA 1 - EUROPA VICINA (EU)
// ============================================================================

const paesiZona1 = [
  "Austria", "Belgio", "Croazia", "Francia", "Germania", "Grecia", "Irlanda",
  "Lussemburgo", "Paesi Bassi", "Olanda", "Polonia", "Portogallo",
  "Repubblica Ceca", "Rep. Ceca", "Cechia", "Romania", "Slovacchia",
  "Slovenia", "Spagna", "Ungheria"
];

const tariffeZona1 = [
  { pesoMax: 1, prezzo: 9.60 },
  { pesoMax: 3, prezzo: 17.60 },
  { pesoMax: 5, prezzo: 24.00 },
  { pesoMax: 10, prezzo: 33.60 },
  { pesoMax: 15, prezzo: 43.20 },
  { pesoMax: 20, prezzo: 52.80 },
  { pesoMax: 30, prezzo: 72.00 },
  { pesoMax: 50, prezzo: 110.00 },
  { pesoMax: Infinity, prezzoPerKg: 1.38 } // oltre 50kg: €1,38/kg
];

// ============================================================================
// 🌍 ZONA 2 - BALCANI & EST EUROPA
// ============================================================================

const paesiZona2 = [
  "Albania", "Armenia", "Azerbaijan", "Azerbaigian", "Bielorussia", "Bielorrussia",
  "Bosnia-Erzegovina", "Bosnia", "Erzegovina", "Bulgaria", "Georgia",
  "Kazakhstan", "Kazakistan", "Macedonia", "Macedonia del Nord", "Moldavia",
  "Montenegro", "Russia", "Serbia", "Turchia", "Ucraina"
];

const tariffeZona2 = [
  { pesoMax: 1, prezzo: 14.95 },
  { pesoMax: 3, prezzo: 34.50 },
  { pesoMax: 5, prezzo: 37.95 },
  { pesoMax: 10, prezzo: 65.55 },
  { pesoMax: 15, prezzo: 84.53 },
  { pesoMax: 20, prezzo: 103.50 },
  { pesoMax: 30, prezzo: 130.00 },
  { pesoMax: 50, prezzo: 170.00 },
  { pesoMax: Infinity, prezzoPerKg: 1.38 } // oltre 50kg: €1,38/kg
];

// ============================================================================
// 🌐 ZONA 3 - MEDIO ORIENTE, AFRICA, ASIA, OCEANIA
// ============================================================================

const paesiZona3 = [
  // Asia
  "Cina", "India", "Giappone", "Corea del Sud", "Corea", "Thailandia", "Malesia",
  "Vietnam", "Filippine", "Indonesia", "Singapore", "Hong Kong", "Taiwan",
  "Pakistan", "Bangladesh",
  // Oceania
  "Australia", "Nuova Zelanda",
  // Medio Oriente
  "Emirati Arabi Uniti", "Emirati", "UAE", "Arabia Saudita", "Qatar", "Kuwait",
  "Israele",
  // Africa
  "Sud Africa", "Sudafrica", "Egitto", "Marocco", "Tunisia", "Kenya", "Nigeria"
];

const tariffeZona3 = [
  { pesoMax: 1, prezzo: 12.64 },
  { pesoMax: 3, prezzo: 18.96 },
  { pesoMax: 5, prezzo: 24.49 },
  { pesoMax: 10, prezzo: 36.34 },
  { pesoMax: 15, prezzo: 46.61 },
  { pesoMax: 20, prezzo: 57.20 },
  { pesoMax: 30, prezzo: 72.00 },
  { pesoMax: 50, prezzo: 110.00 },
  { pesoMax: Infinity, prezzoPerKg: 1.38 } // oltre 50kg: €1,38/kg
];

// ============================================================================
// 🌎 ZONA 4 - AMERICHE (SENZA USA)
// ============================================================================

const paesiZona4 = [
  "Argentina", "Brasile", "Canada", "Cile", "Colombia", "Messico",
  "Panama", "Perù", "Peru", "Uruguay", "Venezuela", "Ecuador",
  "Bolivia", "Paraguay", "Costa Rica", "Guatemala", "Honduras",
  "Nicaragua", "El Salvador", "Cuba", "Rep. Dominicana", "Giamaica"
];

const tariffeZona4 = [
  { pesoMax: 1, prezzo: 25.60 },
  { pesoMax: 3, prezzo: 32.00 },
  { pesoMax: 5, prezzo: 38.40 },
  { pesoMax: 10, prezzo: 60.80 },
  { pesoMax: 15, prezzo: 85.60 },
  { pesoMax: 20, prezzo: 107.20 },
  { pesoMax: 30, prezzo: 150.00 },
  { pesoMax: 50, prezzo: 210.00 },
  { pesoMax: Infinity, prezzoPerKg: 1.38 } // oltre 50kg: €1,38/kg
];

// ============================================================================
// 🇺🇸 ZONA 5 - USA (STATI UNITI)
// ============================================================================

const paesiZona5 = [
  "USA", "Stati Uniti", "United States", "America", "US"
];

// Include anche città/stati principali per riconoscimento
const cittaUSA = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
  "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville",
  "Fort Worth", "Columbus", "Charlotte", "San Francisco", "Indianapolis",
  "Seattle", "Denver", "Washington", "Boston", "Nashville", "Detroit",
  "Portland", "Las Vegas", "Memphis", "Louisville", "Baltimore", "Milwaukee",
  "Albuquerque", "Tucson", "Fresno", "Mesa", "Sacramento", "Atlanta", "Kansas",
  "Colorado", "Miami", "Raleigh", "Omaha", "Long Beach", "Virginia Beach",
  "Oakland", "Minneapolis", "Tampa", "Tulsa", "Arlington", "New Orleans",
  // Stati USA
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Carolina",
  "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii",
  "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma",
  "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
];

const tariffeZona5 = [
  { pesoMax: 1, prezzo: 27.55 },
  { pesoMax: 3, prezzo: 43.50 },
  { pesoMax: 5, prezzo: 59.31 },
  { pesoMax: 10, prezzo: 90.92 },
  { pesoMax: 15, prezzo: 119.77 },
  { pesoMax: 20, prezzo: 142.97 },
  { pesoMax: 30, prezzo: 190.00 },
  { pesoMax: 50, prezzo: 250.00 },
  { pesoMax: Infinity, prezzoPerKg: 1.38 } // oltre 50kg: €1,38/kg
];

// ============================================================================
// FUNZIONI DI UTILITÀ
// ============================================================================

/**
 * Trova il prezzo in base al peso tassabile e alla tabella tariffe
 * @param {number} peso - Peso tassabile in kg
 * @param {Array} tabellaTariffe - Array di scaglioni {pesoMax, prezzo} o {pesoMax, prezzoPerKg}
 * @returns {number} - Prezzo della spedizione
 */
function trovaPrezzoPerPeso(peso, tabellaTariffe) {
  for (let scaglione of tabellaTariffe) {
    if (peso <= scaglione.pesoMax) {
      // Se esiste prezzoPerKg, calcola il prezzo in base al peso
      if (scaglione.prezzoPerKg) {
        return peso * scaglione.prezzoPerKg;
      }
      return scaglione.prezzo;
    }
  }
  // Fallback: ultimo prezzo della tabella
  const ultimoScaglione = tabellaTariffe[tabellaTariffe.length - 1];
  if (ultimoScaglione.prezzoPerKg) {
    return peso * ultimoScaglione.prezzoPerKg;
  }
  return ultimoScaglione.prezzo;
}

/**
 * Determina la zona Italia in base al CAP
 * @param {string} cap - Codice di Avviamento Postale
 * @returns {string|null} - Zona (Toscana, A, B) o null se non trovato
 */
function getZonaItalia(cap) {
  const prefix = cap.substring(0, 2);
  if (zoneItaliaCAP.Toscana.includes(prefix)) return "Toscana";
  if (zoneItaliaCAP.B.includes(prefix)) return "B";
  if (zoneItaliaCAP.A.includes(prefix)) return "A";
  return null;
}

/**
 * Determina la zona internazionale in base alla nazione
 * @param {string} nazione - Nome della nazione
 * @returns {number|null} - Numero zona (1-5) o null
 */
function getZonaInternazionale(nazione) {
  const nazioneLower = nazione.toLowerCase();

  // Zona 5 (USA) - controllo per primo perché più specifico
  if (paesiZona5.some(p => nazioneLower.includes(p.toLowerCase()) || p.toLowerCase().includes(nazioneLower))) {
    return 5;
  }
  if (cittaUSA.some(c => nazioneLower.includes(c.toLowerCase()) || c.toLowerCase().includes(nazioneLower))) {
    return 5;
  }

  // Zona 1 (Europa vicina)
  if (paesiZona1.some(p => nazioneLower.includes(p.toLowerCase()) || p.toLowerCase().includes(nazioneLower))) {
    return 1;
  }

  // Zona 2 (Balcani & Est Europa)
  if (paesiZona2.some(p => nazioneLower.includes(p.toLowerCase()) || p.toLowerCase().includes(nazioneLower))) {
    return 2;
  }

  // Zona 3 (Mondo)
  if (paesiZona3.some(p => nazioneLower.includes(p.toLowerCase()) || p.toLowerCase().includes(nazioneLower))) {
    return 3;
  }

  // Zona 4 (Americhe)
  if (paesiZona4.some(p => nazioneLower.includes(p.toLowerCase()) || p.toLowerCase().includes(nazioneLower))) {
    return 4;
  }

  return null;
}

/**
 * Calcola il prezzo per spedizione Italia
 * @param {number} pesoTassabile - Peso tassabile in kg
 * @param {string} zona - Zona (Toscana, A, B)
 * @returns {number} - Prezzo in euro
 */
function calcolaPrezzoItalia(pesoTassabile, zona) {
  const tabella = tariffeItalia[zona];
  if (!tabella) return 0;
  return trovaPrezzoPerPeso(pesoTassabile, tabella);
}

/**
 * Calcola il prezzo per spedizione internazionale
 * @param {number} pesoTassabile - Peso tassabile in kg
 * @param {number} zona - Numero zona (1-5)
 * @returns {number} - Prezzo in euro
 */
function calcolaPrezzoInternazionale(pesoTassabile, zona) {
  let tabella;
  switch(zona) {
    case 1: tabella = tariffeZona1; break;
    case 2: tabella = tariffeZona2; break;
    case 3: tabella = tariffeZona3; break;
    case 4: tabella = tariffeZona4; break;
    case 5: tabella = tariffeZona5; break;
    default: return 0;
  }
  return trovaPrezzoPerPeso(pesoTassabile, tabella);
}

// ============================================================================
// BACKWARDS COMPATIBILITY (per codice esistente main.js)
// ============================================================================

// Variabili di compatibilità per main.js
const paesiEuropa = {
  zona1: paesiZona1,
  zona2: [],
  zona3: []
};

const zoneExtraUE = {
  zona1: paesiZona2,
  zona2: [],
  zona3: paesiZona3,
  zona4: paesiZona4
};

const zoneUSA = {
  zona1: cittaUSA,
  zona2: [],
  zona3: []
};

// Manteniamo le funzioni vecchie per compatibilità con main.js
function calcolaPrezzoEuropa(pesoTassabile, zona) {
  // Mappa vecchie zone Europa alla nuova Zona 1
  return calcolaPrezzoInternazionale(pesoTassabile, 1);
}

function calcolaPrezzoExtraUE(pesoTassabile, zona) {
  // Mappa vecchie zone Extra-UE alle nuove
  const zonaMap = { zona1: 2, zona2: 2, zona3: 3, zona4: 4 };
  return calcolaPrezzoInternazionale(pesoTassabile, zonaMap[zona] || 3);
}

function calcolaPrezzoUSA(pesoTassabile, zona) {
  return calcolaPrezzoInternazionale(pesoTassabile, 5);
}

function getZonaEuropa(nazione) {
  const zona = getZonaInternazionale(nazione);
  return zona === 1 ? "zona1" : null;
}

function getZonaExtraUE(nazione) {
  const zona = getZonaInternazionale(nazione);
  if (zona === 2) return "zona1";
  if (zona === 3) return "zona3";
  if (zona === 4) return "zona4";
  return null;
}

function getZonaUSA(nazione) {
  const zona = getZonaInternazionale(nazione);
  return zona === 5 ? "zona1" : "zona2";
}

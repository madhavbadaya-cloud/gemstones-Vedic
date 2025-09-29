const form   = document.getElementById('birthForm');
const loader = document.getElementById('loader');
const result = document.getElementById('result');

form.addEventListener('submit', async e=>{
  e.preventDefault();
  loader.hidden=false; result.hidden=true;

  const date = document.getElementById('dob').value;
  const time = document.getElementById('tob').value;
  const city = document.getElementById('place').value;

  // Drik Panchang free API (no key needed)
  const url = `https://api.drikpanchang.com/jyotisha/horoscope?date=${date}&time=${time}&place=${encodeURIComponent(city)}&ayanamsa=lahiri`;

  const rsp = await fetch(url);
  const data = await rsp.json();
  loader.hidden=true;

  // Basic validation
  if(!data.chart){alert('API error – check city spelling'); return;}

  window.chartData = data.chart;          // share with gems.js
  fillResult(data.chart);
});

function fillResult(ch){
  document.getElementById('lagna').textContent  = ch.ascendant;
  document.getElementById('llord').textContent  = ch.lagnaLord;
  buildGemTable(ch);
  result.hidden=false;
}

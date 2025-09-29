const NAVARATNA = {
  sun:     {gem:'Ruby',         metal:'Gold',   finger:'Ring',     day:'Sunday sunrise',     mantra:'Om Grāṇi Sūryāya Namaḥ'},
  moon:    {gem:'Pearl',        metal:'Silver', finger:'Little',   day:'Monday sunrise',     mantra:'Om Śrāṃ Śrīṃ Śrauṃ Candraye Namaḥ'},
  mars:    {gem:'Red Coral',    metal:'Gold',   finger:'Ring',     day:'Tuesday 1 h after',  mantra:'Om Krāṃ Krīṃ Krauṃ Bhaumāya Namaḥ'},
  mercury: {gem:'Emerald',      metal:'Gold',   finger:'Little',   day:'Wednesday 2 h',      mantra:'Om Brāṃ Brīṃ Brauṃ Budhāya Namaḥ'},
  jupiter: {gem:'Yellow Sapphire',metal:'Gold', finger:'Index',    day:'Thursday 1 h',       mantra:'Om Grāṃ Grīṃ Grauṃ Gurave Namaḥ'},
  venus:   {gem:'Diamond',      metal:'Plat/Gold',finger:'Middle', day:'Friday sunrise',     mantra:'Om Drāṃ Drīṃ Drauṃ Śukrāya Namaḥ'},
  saturn:  {gem:'Blue Sapphire',metal:'Silver', finger:'Middle',   day:'Saturday 1 h',       mantra:'Om Prāṃ Prīṃ Prauṃ Śanaiścarāya Namaḥ'},
  rahu:    {gem:'Hessonite',    metal:'Silver', finger:'Middle',   day:'Saturday afternoon', mantra:'Om Rāṃ Rahave Namaḥ'},
  ketu:    {gem:"Cat's Eye",    metal:'Silver', finger:'Middle',   day:'Tuesday midnight',   mantra:'Om Keṃ Ketave Namaḥ'}
};

function buildGemTable(ch){
  const tbody=document.querySelector('#gemTable tbody');
  tbody.innerHTML='';

  // 1. find functional benefics & lagna-lord strength
  const lagnaLord = ch.lagnaLord.toLowerCase();
  const shad      = ch.shadbala;          // object planet→score

  Object.keys(NAVARATNA).forEach(p=>{
    const info  = NAVARATNA[p];
    const score = shad[p]||0;
    const role  = planetRole(p, lagnaLord, score);

    if(role==='skip') return;        // no gem for malefic

    const tr=document.createElement('tr');
    tr.innerHTML=`
      <td>${p.charAt(0).toUpperCase()+p.slice(1)}</td>
      <td>${score.toFixed(2)}</td>
      <td>${role}</td>
      <td>${info.gem}</td>
      <td>${info.metal}</td>
      <td>${info.finger}</td>
      <td>${info.day}</td>
      <td><code>${info.mantra}</code></td>`;
    tbody.appendChild(tr);
  });
}

function planetRole(pl, ll, score){
  // ultra-light rule set – expand as needed
  const funcMalefic={
    aries:['venus','saturn','mercury'],
    taurus:['mars','jupiter','moon'],
    gemini:['mars','jupiter'],
    cancer:['mercury','venus'],
    leo:['moon','mars'],
    virgo:['mars','jupiter','moon'],
    libra:['sun','jupiter','mars'],
    scorpio:['venus','mercury'],
    sagittarius:['venus','saturn'],
    capricorn:['mars','jupiter','moon'],
    aquarius:['moon','mars'],
    pisces:['sun','venus','saturn']
  }[ch.ascendant.toLowerCase()]||[];

  if(funcMalefic.includes(pl)) return 'skip';
  if(pl===ll && score<1.2) return 'strengthen lagna-lord';
  if(pl===ll) return 'benefic (lagna-lord)';
  return 'functional benefic';
}

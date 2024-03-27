const app = document.querySelector('#app');
const lightBtn = document.querySelector('#lightBtn');
const bodyEl = document.querySelector('body');
const filterInput = document.querySelector('#filterInput');
const regionOption = document.querySelector('#regions');

const fetchData = async () => {

  try {
    const res = await fetch('data.json')
    const data = await res.json();
    // Accessing the data

    const items = data;
    for(const item of items){
      const flag = document.createElement('div');
      flag.innerHTML = `
      <div class="card">
          <img src=${item.flag} alt="">
          <div class="body">
              <h3 class="countryName">${item.name}</h3>
              <div class="thePopulation">
                  <h4 class="key">Population :</h4>
                  <span class="value">${item.population}</span>
              </div>
              <div class="theRegion">
                  <h4 class="key">Region :</h4>
                  <h4 class="value" id="region">${item.region}</h4>
              </div>
              <div class="theCapital">
                  <h4 class="key">Capital :</h4>
                  <h4 class="value">${item.capital}</h4>
              </div>
          </div>
      </div>
      `
      app.append(flag)
    }

  } catch (err) {
    console.log('Error parsing JSON string:', err)
}
}

fetchData()


/* Filter Data By Input */

const filterData = () => {
  const filterValue = filterInput.value.toLowerCase();
  const countriesName = app.querySelectorAll('h3');

  countriesName.forEach((countryName) => {
    const country = countryName.textContent.toLowerCase();
    const countryCard = countryName.parentElement.parentElement;

    if(country.includes(filterValue)){
      countryCard.style.display = "";

    }else{
      countryCard.style.display = "none";
    }
  })
}

filterInput.addEventListener('input', filterData);



/* Filter Data By Options */

const filterDataOptions = (e) => {
  //const option = options.innerHTML
  //const optionValue = options.value
  const selected = e.target.value;
  const countriesRegions = app.querySelectorAll('#region');
  
  countriesRegions.forEach(countryRegion => {

    const countryCard = countryRegion.parentElement.parentElement.parentElement;
    if(selected === ""){
      countryCard.style.display = "block";
 
    }else if(selected.toLowerCase() === countryRegion.textContent.toLowerCase()){
      countryCard.style.display = "flex";
    }else{
      countryCard.style.display = "none";
    }
  })
  console.log(selected)
}


regionOption.addEventListener('change', filterDataOptions);














/* Dark Light Theme */

const lightMode = () => {
  bodyEl.classList.toggle('light-theme');
}

lightBtn.addEventListener('click', () => {
  lightMode()
  let setLightMode = localStorage.getItem('light-theme');

  if(setLightMode !== "on"){
    setLightMode = localStorage.setItem('light-theme', 'on');
    lightBtn.innerHTML = 'Dark Mode';
  }else{
    setLightMode = localStorage.setItem('light-theme', null);
    lightBtn.innerHTML = 'Light Mode';
  }
})

let setLightMode = localStorage.getItem('light-theme');

if(setLightMode === 'on'){
  lightMode();
}
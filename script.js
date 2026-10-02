let searchInput = document.getElementById("searchInput");
let countryInfo = document.getElementById("countryInfo");
let searchBtn = document.getElementById("searchBtn");

// Event
searchBtn.addEventListener("click", searchCountry);

// search function

function searchCountry() {
  let countryName = searchInput.value.trim();
  if (!countryName) {
    showError("الرجاء ادخال اسم الدولة");
    return;
  }

  countryInfo.innerHTML = `<div class='loading'>جاري البحث ....</div>`;
  // Get API

  fetch(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
    .then((Response) => {
      if (!Response.ok) throw new Error("الدولة غير موجودة");
      return Response.json();
    })
    .then((data) => {
      displayCountryInfo(data);
    })

    .catch((error) => {
      showError(error.message);
    });
}

// معلومات الدولة

function displayCountryInfo(country) {
  countryInfo.innerHTML = `
    <div class="country-card">
    <img src="${country.flags.svg}" class='country-flag'>
    <div class='country-details'> 
    <h2 id="country-name">${country.name.common}</h2>
    <div class="detail-item">
    <span class="detail-label">العاصمة :</span>
    <span>${country.capital}</span>
    </div>
    <div class="detail-item">
    <span class="detail-label">عدد السكان :</span>
    <span>${country.population}</span>
    </div>
    <div class="detail-item">
    <span class="detail-label">المنطقة :</span>
    <span>${country.region}</span>
    </div>
    <div class="detail-item">
    <span class="detail-label">العملة المحلية :</span>
    <span>${country.currencies[Object.keys(country.currencies)[0]].name}</span>
</div>
    </div>
    </div>
    `;
}

// error function

function showError(message) {
  countryInfo.innerHTML = `<div class="error-message">${message} </div>`;
}

// searchCountry();

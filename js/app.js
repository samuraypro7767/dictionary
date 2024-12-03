  import dictionary from './dictionary.js';


 
  







  function display(){
    if (document.querySelector('input[name="category"]:checked')) {
  const SelectCategory = document.querySelector('input[name = "category"]:checked').value;
  console.log("Categoría seleccionada:", SelectCategory);
  const listWords = dictionary.categories[SelectCategory];
    

  if (listWords && Array.isArray(listWords)) {
    const boardWords = document.querySelector('.board-result');
    boardWords.innerHTML = `<h2>Palabras de ${SelectCategory}</h2>`;

    const ul = document.createElement('ul');
    listWords.forEach(word => {
        const li = document.createElement('li');
        li.textContent = word.english + " - " + word.spanish + ": " + word.example;
        ul.appendChild(li);
    });

    boardWords.appendChild(ul);
} else {
    const boardWords = document.querySelector('.board-result');
    boardWords.innerHTML  = `<h2>Palabras de ${SelectCategory}</h2><p>No se encontraron palabras en esta categoría.</p>`;
    console.error("No se encontraron palabras en esta categoría.");
}
}
  }
  function order() {
    const SelectCategory = document.querySelector('input[name="category"]:checked').value;
    console.log("Categoría seleccionada para ordenar:", SelectCategory); 
    let listWords = dictionary.categories[SelectCategory]; 

    if (listWords && Array.isArray(listWords)) {
        listWords.sort((a, b) => a.english.localeCompare(b.english)); 

        display();
    } else {
        console.error("No hay ninguna categoría seleccionada.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    display();

    const categoryRadios = document.querySelectorAll('input[name="category"]');
    categoryRadios.forEach(radio => {
        radio.addEventListener('change', display);
    });

    const orderbutton = document.querySelector('.buttonOrder');
    orderbutton.addEventListener('click', order);
});

//-----------------------------------------translate-------------------------------------------------//

document.addEventListener("DOMContentLoaded", () => {
  const translateButton = document.querySelector('.searchButton');
  translateButton.addEventListener('click', translationWord);
});

function translationWord() {
  const searchInput = document.querySelector('.searchInput').value.trim();
  const language = document.querySelector('input[name="language"]:checked');

  if (!language) {
      document.querySelector('.resultWord-search h4').textContent = "Selecciona un idioma de traducción.";
      return;
  }

  if (searchInput === "") {
      document.querySelector('.resultWord-search h4').textContent = "Ingresa una palabra.";
      return;
  }

  let translation = "";

  for (const category in dictionary.categories) {
      const words = dictionary.categories[category];
      for (const word of words) {
          if (language.value === "en-es" && word.english.toLowerCase() === searchInput.toLowerCase()) {
              translation = word.spanish;
              break;
          } else if (language.value === "es-en" && word.spanish.toLowerCase() === searchInput.toLowerCase()) {
              translation = word.english;
              break;
          }
      }
      if (translation) break;
  }


  const resultElement = document.querySelector('.resultWord-search h4');
  if (translation) {
      resultElement.textContent = `La traducción de "${searchInput}" es: ${translation}`;
  } else {
      resultElement.textContent = `No se encontró la palabra "${searchInput}" en el diccionario.`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("personajes");

  fetch("https://rickandmortyapi.com/api/character")
    .then((response) => response.json())
    .then((data) => {
      container.innerHTML = ""; 

      
      data.results.forEach((char) => {
        const card = document.createElement("article");
        card.className = "bg-slate-900 border-4 border-slate-700 p-4 flex flex-col justify-between hover:border-green-400 transition-all shadow-[4px_4px_0_0_#0f172a]";

        card.innerHTML = `
          <div>
            <img src="${char.image}" alt="${char.name}" class="w-full h-auto border-2 border-slate-950 mb-3">
            <h3 class="text-green-400 text-[10px] mb-2 truncate">${char.name}</h3>
            <p class="text-slate-400 text-[8px] mb-1">ESTADO: ${char.status}</p>
            <p class="text-slate-400 text-[8px] mb-3">ESPECIE: ${char.species}</p>
          </div>
          <a href="personaje.html?id=${char.id}" class="block text-center bg-slate-800 hover:bg-green-500 hover:text-black text-white text-[8px] py-2 border-2 border-black">
            VER DETALLES
          </a>
        `;

        container.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error al consumir la API:", error);
      container.innerHTML = `<p class="text-red-500 text-[10px] col-span-full text-center">Error al cargar los personajes.</p>`;
    });
});
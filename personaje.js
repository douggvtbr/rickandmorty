document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("character-detail");

  // usamos esta linea para obtener el id del personaje desde la url
  const params = new URLSearchParams(window.location.search);
  const characterId = params.get("id");

  if (!characterId) {
    container.innerHTML = `<p class="text-red-500 text-[10px] text-center">ID de personaje no proporcionado.</p>`;
    return;
  }

  // 2. Consumir la API para el personaje individual
  fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
    .then((response) => response.json())
    .then((char) => {
      // 3. Renderizar el detalle
      container.innerHTML = `
        <div class="flex flex-col items-center gap-4 text-[10px]">
          <img src="${char.image}" alt="${char.name}" class="w-48 h-48 border-4 border-slate-950 shadow-[4px_4px_0_0_#22c55e]">
          
          <h2 class="text-green-400 text-sm text-center font-bold uppercase my-2">${char.name}</h2>
          
          <div class="w-full bg-slate-950 p-4 border-2 border-slate-800 flex flex-col gap-2">
            <p class="text-slate-300">ESTADO: <span class="${char.status === 'Alive' ? 'text-green-400' : char.status === 'Dead' ? 'text-red-400' : 'text-gray-400'}">${char.status}</span></p>
            <p class="text-slate-300">ESPECIE: <span class="text-white">${char.species}</span></p>
            <p class="text-slate-300">GÉNERO: <span class="text-white">${char.gender}</span></p>
            <p class="text-slate-300">ORIGEN: <span class="text-white">${char.origin.name}</span></p>
            <p class="text-slate-300">UBICACIÓN: <span class="text-white">${char.location.name}</span></p>
          </div>

          <a href="personajes.html" class="mt-4 w-full text-center bg-slate-800 hover:bg-green-500 hover:text-black text-white py-3 border-2 border-black transition-colors">
            VOLVER
          </a>
        </div>
      `;
    })
    .catch((error) => {
      console.error("Error al obtener personaje:", error);
      container.innerHTML = `<p class="text-red-500 text-[10px] text-center">Error al cargar la información del personaje.</p>`;
    });
});
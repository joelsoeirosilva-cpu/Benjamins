fetch("jogos.json")
.then(response => response.json())
.then(jogos => {

    const lista = document.getElementById("listaJornadas");
    const proximo = document.getElementById("proximoJogo");

    const proximoJogo = jogos.find(j => !j.resultado);

    if(proximoJogo){

        proximo.innerHTML = `
            <div class="next-game-card">

                <h3>Jornada ${proximoJogo.jornada}</h3>

                <div class="equipas">
                    ${proximoJogo.casa}
                    <br>vs<br>
                    ${proximoJogo.fora}
                </div>

                <div class="info">📅 ${proximoJogo.data}</div>
                <div class="info">🕐 ${proximoJogo.hora}</div>
                <div class="info">📍 ${proximoJogo.local}</div>

            </div>
        `;
    }

    jogos.forEach(jogo => {

        lista.innerHTML += `
        <div class="jornada-card">

            <h3>Jornada ${jogo.jornada}</h3>

            <div class="equipas">
                ${jogo.casa}
                <br>vs<br>
                ${jogo.fora}
            </div>

            ${
                jogo.resultado
                ? `<div class="resultado">${jogo.resultado}</div>`
                : `<div class="info">Jogo por disputar</div>`
            }

            <div class="info">📅 ${jogo.data}</div>
            <div class="info">🕐 ${jogo.hora}</div>

            <button onclick="toggleDetalhes(${jogo.jornada})">
                Ver Detalhes
            </button>

            <div class="detalhes" id="detalhes-${jogo.jornada}">

                <p><b>Local:</b> ${jogo.local}</p>

                <br>

                <p><b>Convocados:</b></p>
                <ul>
                    ${jogo.convocados.map(x => `<li>${x}</li>`).join("")}
                </ul>

                <br>

                <p><b>Marcadores:</b></p>
                <ul>
                    ${jogo.marcadores.map(x => `<li>⚽ ${x}</li>`).join("")}
                </ul>

            </div>

        </div>
        `;
    });

});

function toggleDetalhes(id){

    const div = document.getElementById(`detalhes-${id}`);

    if(div.style.display === "block"){
        div.style.display = "none";
    }else{
        div.style.display = "block";
    }

}

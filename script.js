fetch("jogos.json")
.then(response => response.json())
.then(jogos => {

    const proximoJogo = jogos.find(j => !j.resultado);

    if(proximoJogo){

        document.getElementById("proximoJogo").innerHTML = `
            <div class="next-game-card">
                <h3>Jornada ${proximoJogo.jornada}</h3>

                <div class="equipas">
                    ${proximoJogo.adversario}
                    <br>VS<br>
                    GUS SUB10 B
                </div>

                <div class="info">📅 ${proximoJogo.data}</div>
                <div class="info">⏰ ${proximoJogo.hora}</div>
                <div class="info">📍 ${proximoJogo.local}</div>
                <div class="info">👥 Concentração: ${proximoJogo.concentracao}</div>
            </div>
        `;
    }

    let html = "";

    jogos.forEach(jogo => {

        html += `
            <div class="jornada-card">

                <h3>Jornada ${jogo.jornada}</h3>

                <div class="equipas">
                    ${jogo.adversario}
                </div>

                <div class="info">📅 ${jogo.data}</div>
                <div class="info">⏰ ${jogo.hora}</div>

                ${jogo.resultado ? `
                    <div class="resultado">${jogo.resultado}</div>
                ` : `
                    <div class="info">🔜 Por disputar</div>
                `}

                <button onclick="toggleDetalhes(${jogo.jornada})">
                    Ver Detalhes
                </button>

                <div class="detalhes" id="detalhes-${jogo.jornada}">

                    <p><strong>Local:</strong> ${jogo.local}</p>

                    <p><strong>Concentração:</strong> ${jogo.concentracao}</p>

                    <br>

                    <p><strong>Convocados:</strong></p>
                    <ul>
                        ${jogo.convocados.map(c => `<li>${c}</li>`).join("")}
                    </ul>

                    <br>

                    <p><strong>Marcadores:</strong></p>
                    <ul>
                        ${jogo.marcadores.map(m => `<li>⚽ ${m}</li>`).join("")}
                    </ul>

                </div>

            </div>
        `;
    });

    document.getElementById("listaJornadas").innerHTML = html;
});

function toggleDetalhes(id){

    const div = document.getElementById(`detalhes-${id}`);

    div.classList.toggle("active");
}

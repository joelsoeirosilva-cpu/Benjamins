fetch("jogos.json")
    .then(response => response.json())
    .then(jogos => {

        const proximoJogo = jogos.find(j =>
            j.data &&
            j.hora &&
            !j.resultado
        );

        if (proximoJogo) {

            document.getElementById("proximoJogo").innerHTML = `
                <div class="next-game-card">

                    <h3>Jornada ${proximoJogo.jornada}</h3>

                    <div class="equipas">
                        ${proximoJogo.casa}
                        <br>
                        VS
                        <br>
                        ${proximoJogo.fora}
                    </div>

                    <div class="info">📅 ${formatarData(proximoJogo.data)}</div>
                    <div class="info">⏰ ${proximoJogo.hora}</div>
                    <div class="info">📍 ${proximoJogo.local}</div>

                </div>
            `;
        }

        let html = "";

        jogos.forEach(jogo => {

            if (!jogo.casa && !jogo.fora) {
                return;
            }

            html += `
                <div class="jornada-card">

                    <h3>Jornada ${jogo.jornada}</h3>

                    <div class="equipas">
                        ${jogo.casa}
                        <br>
                        VS
                        <br>
                        ${jogo.fora}
                    </div>

                    <div class="info">📅 ${formatarData(jogo.data)}</div>
                    <div class="info">⏰ ${jogo.hora}</div>
                    <div class="info">📍 ${jogo.local}</div>

                    ${
                        jogo.resultado
                            ? `<div class="resultado">${jogo.resultado}</div>`
                            : `<div class="info">🔜 Por disputar</div>`
                    }

                    <button onclick="toggleDetalhes(${jogo.jornada})">
                        Ver Detalhes
                    </button>

                    <div class="detalhes" id="detalhes-${jogo.jornada}">

                        <p><strong>Convocados:</strong></p>

                        <ul>
                            ${jogo.convocados
                                .map(c => `<li>${c}</li>`)
                                .join("")}
                        </ul>

                        <br>

                        <p><strong>Marcadores:</strong></p>

                        <ul>
                            ${jogo.marcadores
                                .map(m => `<li>⚽ ${m}</li>`)
                                .join("")}
                        </ul>

                    </div>

                </div>
            `;
        });

        document.getElementById("listaJornadas").innerHTML = html;
    });

function toggleDetalhes(id) {

    const div = document.getElementById(`detalhes-${id}`);

    if (div.style.display === "block") {
        div.style.display = "none";
    } else {
        div.style.display = "block";
    }
}

function formatarData(dataString) {

    if (!dataString) return "";

    const data = new Date(dataString);

    return data.toLocaleDateString("pt-PT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

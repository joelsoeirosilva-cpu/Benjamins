fetch("jogos.json")
.then(response => response.json())
.then(jogos => {

    const proximoJogo = jogos.find(j => !j.resultado);
function iniciarContador(proximoJogo){

    const dataJogo = new Date(
        `${proximoJogo.data}T${proximoJogo.hora}:00`
    );

    function atualizar(){

        const agora = new Date();

        const diferenca = dataJogo - agora;

        if(diferenca <= 0){
            return;
        }

        const dias =
            Math.floor(diferenca / (1000 * 60 * 60 * 24));

        const horas =
            Math.floor((diferenca / (1000 * 60 * 60)) % 24);

        const minutos =
            Math.floor((diferenca / (1000 * 60)) % 60);

        const segundos =
            Math.floor((diferenca / 1000) % 60);

        document.getElementById("dias").textContent =
            dias.toString().padStart(2,"0");

        document.getElementById("horas").textContent =
            horas.toString().padStart(2,"0");

        document.getElementById("minutos").textContent =
            minutos.toString().padStart(2,"0");

        document.getElementById("segundos").textContent =
            segundos.toString().padStart(2,"0");
    }

    atualizar();

    setInterval(atualizar, 1000);
}

    if(proximoJogo){
    iniciarContador(proximoJogo);

        document.getElementById("proximoJogo").innerHTML = `
            <div class="next-game-card">
                <h3>Jornada ${proximoJogo.jornada}</h3>

                <div class="equipas">
                    ${proximoJogo.casa}
                    <br>VS<br>
                    ${proximoJogo.fora}
                </div>

                <div class="info">📅 ${proximoJogo.data}</div>
                <div class="info">⏰ ${proximoJogo.hora}</div>
                <div class="info">📍 ${proximoJogo.local}</div>
            </div>
        `;
    }

    let html = "";

    jogos.forEach(jogo => {

        html += `
            <div class="jornada-card">

                <h3>Jornada ${jogo.jornada}</h3>

                <div class="equipas">
                    ${jogo.casa}
                    <br>Vs<br>
                    ${jogo.fora}
                </div>

                <div class="info">📅 ${jogo.data}</div>
                <div class="info">⏰ ${jogo.hora}</div>
                <div class="info">📍 ${jogo.local}</div>

                ${jogo.resultado ? `
                    <div class="resultado">${jogo.resultado}</div>
                ` : `
                    <div class="info">🔜 Por disputar</div>
                `}

                <button onclick="toggleDetalhes(${jogo.jornada})">
                    Ver Detalhes
                </button>

                <div class="detalhes" id="detalhes-${jogo.jornada}">
                
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

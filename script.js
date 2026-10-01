fetch("jogos.json")
    .then(response => response.json())
    .then(jogos => {

        const proximoJogo = jogos.find(j =>
            j.data &&
            j.hora &&
            !j.resultado
        );

        if (proximoJogo) {

    const [ano, mes, dia] = proximoJogo.data.split("-");
const [hora, minuto] = proximoJogo.hora.split(":");

const dataJogo = new Date(
    ano,
    mes - 1,
    dia,
    hora,
    minuto,
    0
);

function atualizarContador() {

    const agora = new Date();
    const diferenca = dataJogo - agora;

    if (diferenca <= 0) {
        document.getElementById("countdown").innerHTML =
            "<div class='countdown-finished'>⚽ É dia de jogo!</div>";
        return;
    }

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
    const segundos = Math.floor((diferenca / 1000) % 60);

document.getElementById("countdown").innerHTML = `
    <div class="countdown-inline">
        ${dias} DIAS
        &nbsp;&nbsp;
        ${horas} HORAS
        &nbsp;&nbsp;
        ${minutos} MIN
        &nbsp;&nbsp;
        ${segundos} SEG
    </div>
`;
}


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
            atualizarContador();
setInterval(atualizarContador, 1000);
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

                    ${jogo.foto ? `
<button
class="btn-foto"
onclick="window.open('${jogo.foto}', '_blank')">
📸 Foto
</button>
` : ""}

${jogo.video ? `
<button
class="btn-video"
onclick="window.open('${jogo.video}', '_blank')">
🎥 Vídeo
</button>
` : ""}

<button 
class="btn-convocados"
onclick="toggleConvocados(${jogo.jornada})">
    👥 Convocados
</button>

<div class="secao-expandivel" id="convocados-${jogo.jornada}">

    <ul>
        ${(jogo.convocados || [])
            .map(c => `<li>${c}</li>`)
            .join("")}
    </ul>

</div>

<button 
class="btn-marcadores"
onclick="toggleMarcadores(${jogo.jornada})">
    ⚽ Marcadores
</button>

<div class="secao-expandivel" id="marcadores-${jogo.jornada}">

    <ul>
        ${(jogo.marcadores || [])
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

    const partes = dataString.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function toggleConvocados(jornada){

    document
        .getElementById(`convocados-${jornada}`)
        .classList
        .toggle("active");
}

function toggleMarcadores(jornada){

    document
        .getElementById(`marcadores-${jornada}`)
        .classList
        .toggle("active");
}

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors()); // middleware
app.use(express.json());

let PARTIDAS = [
    {
        id: 1,
        jogo: "Are",
        timeA: "Falcões",
        timeB: "Dragões",
        pontoA: 3,
        pontoB: 2,
        status: "finalizada"
    },
    {
        id: 2,
        jogo: "Corrida turbo",
        timeA: "Lobos",
        timeB: "Falcões",
        pontoA: 0,
        pontoB: 0,
        status: "agendada"
    }
];

// ROTA PRINCIPAL
app.get("/", (req, res) => {
    res.status(200).json({
        mensagem: "Campeonato Gamer no ar!"
    });
});

// LISTAR TODAS AS PARTIDAS
app.get("/partidas", (req, res) => {
    res.status(200).json(PARTIDAS);
});

// BUSCAR PARTIDA PELO ID
app.get("/partidas/:id", (req, res) => {

    const id = Number(req.params.id);

    const partida = PARTIDAS.find(p => p.id === id);

    if (!partida) {
        return res.status(404).json({
            mensagem: "Partida não encontrada"
        });
    }

    res.status(200).json(partida);
});

// CADASTRAR NOVA PARTIDA
app.post("/partidas", (req, res) => {

    const { jogo, timeA, timeB } = req.body;

    if (!jogo || !timeA || !timeB) {
        return res.status(400).json({
            mensagem: "Informe jogo, timeA e timeB"
        });
    }

    if (timeA.trim().toLowerCase() === timeB.trim().toLowerCase()) {
        return res.status(400).json({
            mensagem: "Os times devem ser diferentes"
        });
    }

    const novoId = PARTIDAS.length > 0
        ? Math.max(...PARTIDAS.map(p => p.id)) + 1
        : 1;

    const novaPartida = {
        id: novoId,
        jogo: jogo.trim(),
        timeA: timeA.trim(),
        timeB: timeB.trim(),
        pontoA: 0,
        pontoB: 0,
        status: "agendada"
    };

    PARTIDAS.push(novaPartida);

    res.status(201).json({
        mensagem: "Partida cadastrada",
        partida: novaPartida
    });
});

// ATUALIZAR PARTIDA
app.put("/partidas/:id", (req, res) => {

    const id = Number(req.params.id);

    const indice = PARTIDAS.findIndex(p => p.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Partida não encontrada"
        });
    }

    const {
        jogo,
        timeA,
        timeB,
        pontoA,
        pontoB,
        status
    } = req.body;

    if (
        !jogo ||
        !timeA ||
        !timeB ||
        !Number.isInteger(pontoA) ||
        !Number.isInteger(pontoB) ||
        pontoA < 0 ||
        pontoB < 0 ||
        !["agendada", "finalizada"].includes(status)
    ) {
        return res.status(400).json({
            mensagem: "Envie jogo, times, placares válidos e status"
        });
    }

    if (timeA.trim().toLowerCase() === timeB.trim().toLowerCase()) {
        return res.status(400).json({
            mensagem: "Os times devem ser diferentes"
        });
    }

    PARTIDAS[indice] = {
        id: id,
        jogo: jogo.trim(),
        timeA: timeA.trim(),
        timeB: timeB.trim(),
        pontoA: pontoA,
        pontoB: pontoB,
        status: status
    };

    res.status(200).json({
        mensagem: "Partida atualizada",
        partida: PARTIDAS[indice]
    });
});

// SERVIDOR
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
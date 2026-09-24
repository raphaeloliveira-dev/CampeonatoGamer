# Campeonato Gamer

## Situação-problema

Nossa turma vai organizar partidas de jogos. Queremos registrar **jogo**, **time A**, **time B**, **placar** e **status**. Uma partida começa `agendada` com placar `0 X 0`. Depois podemos atualizar o resultado para `finalizada`.

Ao final, a API terá essas notas:

| Método | Rota | O que faz |
| ------ | ---- | --------- |
| GET  | `/`  | Confirma que a API está funcionando |
| GET  | `/partidas` | Lista e filtra partidas |
| POST | `/partidas` | Cadastrar uma partida |
| PUT | `/partidas` | Altera a partida e o placar |
| DELETE | `partidas` | Exclui uma partida |

## Etapa 1 - Criar o projeto

No terminal, digite **uma linha por vez**;

```bash
   mkdir CampeonatoHamer
   cd CampeonatoGamer
   npm install -y
   npm install express cors
   code .
```










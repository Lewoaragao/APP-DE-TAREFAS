// CRIANDO BANCO DE DADOS
var db = openDatabase('dbcrud', '1.0', 'CRUD Tarefas', 2 * 1024 * 1024)
var dados = document.querySelector('#dados')
var nomeTarefa = document.querySelector('#nomeTarefa')
var btnCriar = document.querySelector('#btnCriar')
var ultimoId;
var proximoId;
var data = new Date();
var dia = data.getDay();
var mes = data.getMonth();
var ano = data.getFullYear();
if (dia < 10) { dia = "0" + dia }
if (mes < 10) { mes = "0" + mes }
var dataAtual = `${dia}/${mes}/${ano}`

btnCriar.addEventListener("click", function (e) {
    e.preventDefault();
    novaTarefa()
});

// CRIANDO TABELA
db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS tarefas (id PRIMARY KEY, tarefa TEXT, data_cadastro TEXT)')
})

db.transaction(function (tx) {
    tx.executeSql('SELECT id FROM tarefas ORDER BY id DESC', [], function (tx, results) {
        ultimoId = results.rows[0].id
        proximoId = ultimoId + 1
    })
})

function novaTarefa() {
    db.transaction(function (tx) {
        if (proximoId == null) {
            proximoId = 0;
        }
        tx.executeSql('INSERT INTO tarefas VALUES (?, ?, ?)', [proximoId, nomeTarefa.value, dataAtual])
    })
    location.reload()
}

// db.transaction(function (tx) {
//     tx.executeSql('DELETE FROM tarefas')
// })

// POPULANDO TABELA DE TAREFAS
db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM tarefas', [], function (tx, results) {
        var len = results.rows.length, i;
        var row = results.rows

        console.log()

        for (i = 0; i < len; i++) {
            dados.innerHTML += `
                <tr>
                    <td>${row[i].id}</td>
                    <td>${row[i].tarefa}</td>
                    <td>${row[i].data_cadastro}</td>
                    <td class="d-flex justify-content-center align-items-center">
                        <button class="btn btn-primary mr-2">Editar</button>
                        <button class="btn btn-danger">Excluir</button>
                    </td>
                </tr>
        `
        }
    }, null);
})
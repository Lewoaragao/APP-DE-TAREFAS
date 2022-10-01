// CRIANDO BANCO DE DADOS
var db = openDatabase('dbcrud', '1.0', 'CRUD Tarefas', 2 * 1024 * 1024)

// ELEMENTOS DO HTML
var dados = document.querySelector('#dados')
var divCriarNomeTarefa = document.querySelector('#divCriarNomeTarefa')
var divEditarNomeTarefa = document.querySelector('#divEditarNomeTarefa')
var nomeTarefa = document.querySelector('#nomeTarefa')
var nomeTarefaEditada = document.querySelector('#nomeTarefaEditada')
var nomeTarefaAntes
var nomeTarefaDepois
var idTarefaEditada = null
var btnCriar = document.querySelector('#btnCriar')
var btnConfirmarEdicao = document.querySelector('#btnConfirmarEdicao')
var btnVoltaTopo = document.querySelector('#btnVoltaTopo')

// VARIÁVEIS GERAIS
var estadoTarefa = "Não feita"
var ultimoId
var proximoId

// USUÁRIO
const idUsuario = 1;

// DATA
var data = new Date()
var dia = data.getDay()
var mes = data.getMonth()
var ano = data.getFullYear()
if (dia < 10) { dia = "0" + dia }
if (mes < 10) { mes = "0" + mes }
var dataAtual = `${dia}/${mes}/${ano}`

// REMOVENDO EVENTO ENVIAR DO FORM
btnCriar.addEventListener("click", function () {
    if (nomeTarefa.value != "") {
        let result = confirmarAcao("CRIAR")
        if(result) {
            criar()
        }
    } else {
        alert("Obrigatório preencher campo nome da tarefa...")
    }
})

// AÇÃO DE VOLTAR AO TOPO NO BOTÃO
btnVoltaTopo.addEventListener("click", function () {
    window.scrollTo(0, 0)
})

// MAPEAMENTO DE ATALHOS
document.addEventListener("keypress", function (e) {
    // console.log(e.key)

    // TECLA
    if (e.key == "Enter") {
        btnCriar.click()
    }
})

// CRIAR TABELA TAREFAS
db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS tarefas (id PRIMARY KEY, tarefa TEXT, data_cadastro TEXT, estado_tarefa TEXT, id_usuario INT)')
})

// CRIAR TABELA USUARIOS
db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (id PRIMARY KEY, usuario TEXT, data_cadastro TEXT)')
})

// APAGAR TABELA
// db.transaction(function (tx) {
//     tx.executeSql('DROP TABLE tarefas')
// })

// VALIDANDO POPULANDO TABELA DE TAREFAS
db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM tarefas', [], popularTarefas, erroPopularTarefas)
})

// POPULANDO TABELA DE TAREFAS
function popularTarefas(tx, results) {
    var len = results.rows.length, i;
    var row = results.rows

    if (len != 0) {
        pegaUltimoID()

        for (i = 0; i < len; i++) {
            dados.innerHTML += `
                    <tr class="px-0">
                        <td class="px-0">${row[i].id}</td>
                        <td class="px-0" id="tarefa${row[i].id}">${row[i].tarefa}</td>
                        <td>${row[i].data_cadastro}</td>
                        <td>${row[i].estado_tarefa}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" onclick="editar(${row[i].id})">
                                <span class="material-icons d-flex align-items-center justify-content-center">
                                    edit
                                </span>
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="excluir(${row[i].id})">
                                <span class="material-icons d-flex align-items-center justify-content-center">
                                    delete
                                </span>
                            </button>
                        </td>
                    </tr>
            `
        }
    }
}

function erroPopularTarefas() {
    alert("Erro ao popular tarefas.")
}

// PEGA ÚLTIMO ID
function pegaUltimoID() {
    db.transaction(function (tx) {
        tx.executeSql('SELECT id FROM tarefas ORDER BY id DESC', [], function (tx, results) {
            ultimoId = results.rows[0].id
            proximoId = ultimoId + 1
        })
    })
}

function criar() {
    db.transaction(function (tx) {
        if (proximoId == null) {
            proximoId = 0;
        }

        tx.executeSql('INSERT INTO tarefas VALUES (?, ?, ?, ?, ?)', [proximoId, nomeTarefa.value, dataAtual, estadoTarefa, idUsuario])
    })
    location.reload()
}

function editar(id) {
    let result = confirmarAcao("EDITAR")
    if (result) {
        editarTarefa(id)
    }
}

function editarTarefa(id) {
    let tarefaEditar = document.querySelector(`#tarefa${id}`)

    divCriarNomeTarefa.classList.add("d-none")
    divEditarNomeTarefa.classList.remove("d-none")

    nomeTarefaEditada.value = tarefaEditar.innerText
    idTarefaEditada = id

    nomeTarefaAntes = tarefaEditar.innerText
}

function lerNomeTarefaDepois(elemento) {
    nomeTarefaDepois = elemento.value
    console.log(nomeTarefaDepois)
}

btnConfirmarEdicao.addEventListener("click", () => {
    if(nomeTarefaAntes != nomeTarefaDepois && nomeTarefaDepois != null) {
        confirmarEdicao(idTarefaEditada)
    } else {
        alert("Mesmo nome de tarefa.")
    }
})

function confirmarEdicao(id) {
    let result = confirmarAcao("CONFIRMAR EDIÇÃO")
    if (result) {
        db.transaction(function (tx) {
            tx.executeSql('UPDATE tarefas SET tarefa = ? WHERE id = ?', [nomeTarefaEditada.value, id])
        })

        divCriarNomeTarefa.classList.remove("d-none")
        divEditarNomeTarefa.classList.add("d-none")

        location.reload()
    }
}

function excluir(id) {
    let result = confirmarAcao("EXCLUIR")
    if (result) {
        excluirTarefa(id)
    }
}

function excluirTarefa(id) {
    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM tarefas WHERE id = ?', [id])
    })
    location.reload()
}

function confirmarAcao(acao) {
    var confirmacao = confirm(`Confirmar ação ${acao}?`)
    return confirmacao
}
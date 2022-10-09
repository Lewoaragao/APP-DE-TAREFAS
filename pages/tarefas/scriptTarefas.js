// ELEMENTOS DO HTML
var dados = document.querySelector('#dados')
var divCriarNomeTarefa = document.querySelector('#divCriarNomeTarefa')
var divEditarNomeTarefa = document.querySelector('#divEditarNomeTarefa')
var nomeTarefa = document.querySelector('#nomeTarefa')
var nomeTarefaEditada = document.querySelector('#nomeTarefaEditada')
var idTarefaEditada = null
var btnCriar = document.querySelector('#btnCriar')
var btnLimparLista = document.querySelector('#btnLimparLista')
var btnConfirmarEdicao = document.querySelector('#btnConfirmarEdicao')

// VARIÁVEIS GERAIS
var estadoTarefa = "Não feita"
var ultimoId
var proximoId

// USUÁRIO
const idUsuario = STORAGE.getItem("idUsuarioLogado")

// REMOVENDO EVENTO ENVIAR DO FORM
btnCriar.addEventListener('click', () => {
    if (nomeTarefa.value != "") {
        // let result = confirmarAcao("CRIAR")
        // if(result) {
        criar()
        // }
    } else {
        alert("Obrigatório preencher campo nome da tarefa...")
    }
})

// MAPEAMENTO DE ATALHOS
document.addEventListener("keypress", (e) => {
    // TECLA
    if (e.key == "Enter") {
        btnCriar.click()
    }
})

// VALIDANDO POPULANDO TABELA DE TAREFAS
DB.transaction(function (tx) {
    tx.executeSql("SELECT * FROM tarefas WHERE id_usuario = ?", [idUsuario], popularTarefas, erroPopularTarefas)
})

// POPULANDO TABELA DE TAREFAS
function popularTarefas(tx, results) {
    let len = results.rows.length, i;
    let row = results.rows

    if (len != 0) {
        pegaUltimoID()

        for (i = 0; i < len; i++) {
            dados.innerHTML += `
                    <tr class="pr-0">
                        <td class="pr-0">${row[i].id}</td>
                        <td class="pr-0" id="tarefa${row[i].id}">${row[i].tarefa}</td>
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
    DB.transaction(function (tx) {
        tx.executeSql('SELECT id FROM tarefas ORDER BY id DESC', [], function (tx, results) {
            ultimoId = results.rows[0].id
            proximoId = ultimoId + 1
        })
    })
}

function criar() {
    DB.transaction(function (tx) {
        if (proximoId == null) {
            proximoId = 0;
        }

        tx.executeSql('INSERT INTO tarefas VALUES (?, ?, ?, ?, ?)', [proximoId, nomeTarefa.value, dataAtual, estadoTarefa, idUsuario])
    })
    location.reload()
}

function editar(id) {
    subirProTopo()
    editarTarefa(id)
}

function editarTarefa(id) {
    let tarefaEditar = document.querySelector(`#tarefa${id}`)

    divCriarNomeTarefa.classList.add("d-none")
    divEditarNomeTarefa.classList.remove("d-none")

    nomeTarefaEditada.value = tarefaEditar.innerText
    idTarefaEditada = id
}

btnConfirmarEdicao.addEventListener('click', () => {
    confirmarEdicao(idTarefaEditada)
})

function confirmarEdicao(id) {
    let result = confirmarAcao("CONFIRMAR EDIÇÃO")
    if (result) {
        DB.transaction(function (tx) {
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
    DB.transaction(function (tx) {
        tx.executeSql('DELETE FROM tarefas WHERE id = ?', [id])
    })
    location.reload()
}

btnLimparLista.addEventListener('click', () => {
    var result = confirmarAcao("LIMPAR LISTA")
    if (result) {
        DB.transaction(function (tx) {
            tx.executeSql('DELETE FROM tarefas')
        })
        location.reload()
    }
})

function confirmarAcao(acao) {
    var confirmacao = confirm(`Confirmar ação ${acao}?`)
    return confirmacao
}
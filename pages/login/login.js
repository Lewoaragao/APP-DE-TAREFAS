// ELEMENTOS DO HTML
var nome = document.querySelector('#nome')
var senha = document.querySelector('#senha')
var btnLogar = document.querySelector('#btnLogar')

btnLogar.addEventListener('click', function () {
    if (nome.value == '') {
        alert('Campo nome está em branco.')
        nome.value = ''
        nome.focus()
    } else if (senha.value == '') {
        alert('Campo senha está em branco.')
        senha.value = ''
        senha.focus()
    } else {
        verificaConta()
    }
})

// VERIFICAR SE USUARIO JA TEM CONTA
function verificaConta() {
    DB.transaction(function (tx) {
        tx.executeSql('SELECT * FROM usuarios', [], verificandoAcesso, erroAoVerificarAcesso)
    })
}

function verificandoAcesso(tx, results) {
    let len = results.rows.length, i
    let row = results.rows

    if(STORAGE.getItem("idUsuarioLogado") != null) {
        alert('Já existe um usuário logado.')
    } else {
        if(len == 0) {
            alert('Nenhum usuário cadastrado.')
        } else {
            for (i = 0; i < len; i++) {
                if (row[i].usuario == nome.value && row[i].senha == senha.value) {
                    STORAGE.setItem("idUsuarioLogado", row[i].id)
                    window.location = `${LOCALHOST}/pages/tarefas/tarefas.html`
                }
            }

            if(STORAGE.getItem("idUsuarioLogado") == null) {
                alert('Usuário não cadastrado.')
            }
        }
    }
}

function erroAoVerificarAcesso() {
    alert("Erro ao verificar acesso.")
}

// MAPEAMENTO DE ATALHOS
document.addEventListener("keypress", (e) => {
    // TECLA
    if (e.key == "Enter") {
        btnLogar.click()
    }
})
// ELEMENTOS DO HTML
var nome = document.querySelector('#nome')
var senha = document.querySelector('#senha')
var repitaSenha = document.querySelector('#repitaSenha')
var btnCadastrar = document.querySelector('#btnCadastrar')

// VARIÁVEIS GERAIS
var ultimoId
var proximoId
var nomeExiste

btnCadastrar.addEventListener('click', function () {
    if (nome.value == '') {
        alert('Campo nome está em branco.')
        nome.value = ''
        nome.focus()
    } else if (senha.value == '') {
        alert('Campo senha está em branco.')
        senha.value = ''
        senha.focus()
    } else if (senha.value == '') {
        alert('Campo confirmar senha está em branco.')
        repitaSenha.value = ''
        repitaSenha.focus()
    } else if (nome.value != '' && (senha.value != repitaSenha.value)) {
        alert('Senhas não conferem.')
        senha.value = ''
        repitaSenha.value = ''
        senha.focus()
    } else {
        verificaNome()

        if (nomeExiste == false) {
            pegaUltimoID()

            DB.transaction(function (tx) {
                if (proximoId == null) {
                    proximoId = 0;
                }

                tx.executeSql('INSERT INTO usuarios VALUES (?, ?, ?, ?)', [proximoId, nome.value, senha.value, dataAtual])

                alert('Usuário cadastrado com sucesso!')
                location.href = `${LOCALHOST}/index.html`
            })
        } else {
            alert('Nome de usuário já existe.')
            nome.value = ''
            senha.value = ''
            repitaSenha.value = ''
            nome.focus()
        }
    }
})

// PEGA ÚLTIMO ID
function pegaUltimoID() {
    DB.transaction(function (tx) {
        tx.executeSql('SELECT id FROM usuarios ORDER BY id DESC', [], function (tx, results) {
            ultimoId = results.rows[0].id
            proximoId = ultimoId + 1
        })
    })
}

// VERIFICAR SE USUARIO JA EXISTE 
function verificaNome() {
    DB.transaction(function (tx) {
        tx.executeSql('SELECT * FROM usuarios', [], verificandoUsuario, erroAoVerificarUsuario)
    })
}

function verificandoUsuario(tx, results) {
    let len = results.rows.length, i;
    let row = results.rows

    for (i = 0; i < len; i++) {
        if (row[i].usuario == nome.value) {
            nomeExiste = true
        } else {
            nomeExiste = false
        }
    }
}

function erroAoVerificarUsuario() {
    alert("Erro ao verificar usuários.")
}

// MAPEAMENTO DE ATALHOS
document.addEventListener("keypress", (e) => {
    // console.log(e.key)

    // TECLA
    if (e.key == "Enter") {
        btnCadastrar.click()
    }
})

// DB.transaction(function (tx) {
//     tx.executeSql('DELETE FROM usuarios')
// })
var nome = document.querySelector('#nome')
var senha = document.querySelector('#senha')
var repitaSenha = document.querySelector('#repitaSenha')
var btnCadastrar = document.querySelector('#btnCadastrar')

btnCadastrar.addEventListener('click', function () {
    DB.transaction(function (tx) {
        tx.executeSql('INSERT INTO usuarios VALUES (?, ?)')
    })
})
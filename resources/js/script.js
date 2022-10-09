// VARIÁVEIS GLOBAIS
const NAV = document.querySelector('nav')
const MENSAGEM_DADOS_FICTICIOS = document.querySelector('#mensagemUsarDadosFicticios')
const FOOTER = document.querySelector('footer')
const STORAGE = sessionStorage

// CRIANDO E ABRINDO CONEXÃO COM O BANCO DE DADOS
const DB = openDatabase('dbAppTarefas', '1.0', 'App Tarefas', 2 * 1024 * 1024)

// VARIÁVEIS LOCAIS
var origem = window.location.origin

// CONSULTANDO URL LOCALHOST
switch (origem) {
    case "https://lewoaragao.github.io":
        LOCALHOST = origem + "/APP-DE-TAREFAS"
        break
    case "http://127.0.0.1:5080":
        LOCALHOST = origem
        break
    default:
        document.innerHTML = `ERRO`
        break
}

function deslogar() {
    STORAGE.removeItem("idUsuarioLogado")
}

// ADICIONANDO DINAMICAMENTE ELEMENTOS NO HTML
// MENU GERAL
const NAV_USUARIO_LOGADO = `
    <div class="navbar navbar-expand-lg navbar-light bg-light mb-3">
        <a class="navbar-brand" href="${LOCALHOST}/index.html">LISTA DE TAREFAS</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="${LOCALHOST}/index.html">Início</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="${LOCALHOST}/pages/cadastrar/cadastrar.html">Cadastrar</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="${LOCALHOST}/pages/login/login.html">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="${LOCALHOST}/pages/tarefas/tarefas.html">Tarefas</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="${LOCALHOST}/pages/perfil/perfil.html">Perfil</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="${LOCALHOST}/pages/sobre/sobre.html">Sobre</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" onclick="deslogar()" href="${LOCALHOST}/">Sair</a>
                </li>
            </ul>
        </div>
    </div>
`
const NAV_USUARIO_DESLOGADO = `
    <div class="navbar navbar-expand-lg navbar-light bg-light mb-3">
        <a class="navbar-brand" href="${LOCALHOST}/index.html">LISTA DE TAREFAS</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="${LOCALHOST}/index.html">Início</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="${LOCALHOST}/pages/cadastrar/cadastrar.html">Cadastrar</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="${LOCALHOST}/pages/login/login.html">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="${LOCALHOST}/pages/sobre/sobre.html">Sobre</a>
                </li>
            </ul>
        </div>
    </div>
`

// MENSAGEM PARA USAR DADOS FICTÍCIOS
if (MENSAGEM_DADOS_FICTICIOS != null) {
    MENSAGEM_DADOS_FICTICIOS.innerHTML = `
    <p class="text-muted my-3 small">
    Usar dados fictícios, somente para teste. 
        Os dados só ficam armazenados no seu navegador e só pode ser visto no seu dispositivo.
    </p>
`
}

// FOOTER
FOOTER.innerHTML = `
    <hr class="mt-5">
    <div class="mx-3 my-3 d-flex flex-row-reverse">
        <button onclick="subirProTopo()" type="button" class="btn btn-secondary btn-sm" data-toggle="tooltip" data-placement="top"
        title="Atalho: tecla Home">
            <span class="material-icons d-flex align-items-center justify-content-center">
                expand_less
            </span>
        </button>
    </div>

    <div class="text-right mx-3 my-3">
        <span><i>Open source</i> ❤</span>
        <span><i>Desenvolvido e mantido por: <a href="https://github.com/Lewoaragao" target="blank">Lewoaragao</a>.</i></span>
    </div>
`
// AÇÃO DE VOLTAR AO TOPO NO BOTÃO
function subirProTopo() {
    window.scrollTo(0, 0)
}

// CRIAR TABELA TAREFAS
DB.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS tarefas (id PRIMARY KEY, tarefa TEXT, data_cadastro TEXT, estado_tarefa TEXT, id_usuario INT)')
})

// CRIAR TABELA USUARIOS
DB.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (id PRIMARY KEY, usuario TEXT, senha TEXT, data_cadastro TEXT)')
})

// DATA DO DIA
var data = new Date()
var dia = data.getDate()
// SOMA MAIS 1 POIS OS MESES RETORNADOS SÃO ENTRE 0 (= 1 JANEIRO) E 11 (= 12 DEZEMBRO)
var mes = data.getMonth() + 1
var ano = data.getFullYear()
if (dia < 10) { dia = "0" + dia }
if (mes < 10) { mes = "0" + mes }
var dataAtual = `${dia}/${mes}/${ano}`

if (STORAGE.getItem("idUsuarioLogado") != null) {
    NAV.innerHTML = NAV_USUARIO_LOGADO
} else {
    NAV.innerHTML = NAV_USUARIO_DESLOGADO
}
// VARIÁVEIS GLOBAIS
const NAV = document.querySelector('nav')
const MENSAGEM_DADOS_FICTICIOS = document.querySelector('#mensagemUsarDadosFicticios')
const FOOTER = document.querySelector('footer')

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

// ADICIONANDO DINAMICAMENTE ELEMENTOS NO HTML
// MENU GERAL
NAV.innerHTML = `
    <div class="navbar navbar-expand-lg navbar-light bg-light mb-3">
        <a class="navbar-brand" href="${LOCALHOST}/index.html">LISTA DE TAREFAS</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
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
                    <a class="nav-link" href="${LOCALHOST}/">Sair</a>
                </li>
            </ul>
        </div>
    </div>
`

// MENSAGEM PARA USAR DADOS FICTÍCIOS
if(MENSAGEM_DADOS_FICTICIOS != null) {
    MENSAGEM_DADOS_FICTICIOS.innerHTML = `
    <p class="text-muted my-3">Usar dados fictícios, somente para teste.</p>
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
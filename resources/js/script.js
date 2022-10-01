// CONSULTANDO URL LOCALHOST
// COMENTAR QUANDO FOR DESENVOLVER 

// COMENTAR PARA MANDA PARA PRODUÇÃO
// const LOCALHOST_DESENVOLVIMENTO = window.location.origin
// const LOCALHOST = LOCALHOST_DESENVOLVIMENTO

// DESCOMENTAR QUANDO FOR PARA PRODUÇÃO
const LOCAL_REPOSITORIO_GITHUB = "/APP-DE-TAREFAS"
const LOCALHOST = LOCAL_REPOSITORIO_GITHUB

// ADICIONANDO DINAMICAMENTE ELEMENTOS NO HTML
// MENU GERAL
const NAV = document.querySelector('nav');
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

// FOOTER
const FOOTER = document.querySelector('footer')
FOOTER.innerHTML = `
    <hr class="mt-5">
    <div class="mx-3 my-3 d-flex flex-row-reverse">
        <button id="btnVoltaTopo" type="button" class="btn btn-secondary btn-sm" data-toggle="tooltip" data-placement="top"
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
btnVoltaTopo.addEventListener("click", function () {
    window.scrollTo(0, 0)
})
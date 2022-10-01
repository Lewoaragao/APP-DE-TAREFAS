// ADICIONANDO DINAMICAMENTE ELEMENTOS NO HTML
// MENU GERAL
const NAV = document.querySelector('nav');
NAV.innerHTML = `
<a class="navbar-brand" href="/index.html">LISTA DE TAREFAS</a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
</button>

<div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
        <li class="nav-item">
            <a class="nav-link" href="/pages/cadastrar/cadastrar.html">Cadastrar</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/pages/login/login.html">Login</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/pages/tarefas/tarefas.html">Tarefas</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/pages/perfil/perfil.html">Perfil</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/pages/sobre/sobre.html">Sobre</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/">Sair</a>
        </li>
    </ul>
</div>
`

// BOTÃO VOLTAR AO TOPO
const BOTAO_VOLTA_TOPO = document.querySelector('#divVoltaTopo')
BOTAO_VOLTA_TOPO.innerHTML = `
    <button id="btnVoltaTopo" type="button" class="btn btn-secondary btn-sm my-3 mx-3" data-toggle="tooltip" data-placement="top"
    title="Atalho: tecla Home">
        <span class="material-icons d-flex align-items-center justify-content-center">
            expand_less
        </span>
    </button>
`
// AÇÃO DE VOLTAR AO TOPO NO BOTÃO
btnVoltaTopo.addEventListener("click", function() {
    window.scrollTo(0, 0)
})
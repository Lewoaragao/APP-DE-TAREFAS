// ADICIONANDO DINAMICAMENTE ELEMENTOS NO HTML
// MENU GERAL
const nav = document.querySelector('nav');
nav.innerHTML = `
<a class="navbar-brand">LISTA DE TAREFAS</a>
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
            <a class="nav-link" href="/">Sair</a>
        </li>
    </ul>
</div>
`
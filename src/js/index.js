function obterFiltros() {
    const categoria = document.querySelector("#categoria").value.trim();
    const precoExato = document.querySelector("#preco").value.trim();
    return {
        categoria,
        precoExato
    };
}

function cartaPassaFiltroCategoria(carta, categoriaSelecionada) {
    if (categoriaSelecionada === '') return true;

    const categoriaCarta = carta.dataset.categoria || '';
    return categoriaCarta.toLowerCase().includes(categoriaSelecionada.toLowerCase());
}

function cartaPassaFiltroPrecoExato(carta, precoExatoSelecionado, categoriaSelecionada) {
    if (precoExatoSelecionado === '') return true;

    const precoCarta = parseFloat(carta.dataset.preco);
    const precoFiltro = parseFloat(precoExatoSelecionado);

    if (isNaN(precoFiltro)) return true;

  
    if (categoriaSelecionada.toLowerCase() === 'rara') {
        return precoCarta <= precoFiltro;
    }


    return precoCarta === precoFiltro;
}

function atualizarVisibilidadeCarta(carta, deveMostrar) {
    if (deveMostrar) {
        carta.classList.add('mostrar');
        carta.classList.remove('esconder');
    } else {
        carta.classList.remove('mostrar');
        carta.classList.add('esconder');
    }
}

function filtrarCartas() {
    const { categoria, precoExato } = obterFiltros();
    const cartas = document.querySelectorAll(".carta");

    cartas.forEach(function (carta) {
        const passaCategoria = cartaPassaFiltroCategoria(carta, categoria);
        const passaPreco = cartaPassaFiltroPrecoExato(carta, precoExato, categoria);
        const deveMostrar = passaCategoria && passaPreco;

        atualizarVisibilidadeCarta(carta, deveMostrar);
    });
}

function configurarEventosDeFiltroAutomatico() {
    const campoCategoria = document.querySelector("#categoria");
    const campoPreco = document.querySelector("#preco");

    campoCategoria.addEventListener("input", filtrarCartas);
    campoPreco.addEventListener("input", filtrarCartas);
}

function configurarBotaoFiltrar() {
    const botaoFiltrar = document.querySelector(".btn-filtrar");
    if (botaoFiltrar) {
        botaoFiltrar.addEventListener("click", filtrarCartas);
    }
}

function iniciarFiltro() {
    configurarEventosDeFiltroAutomatico();
    configurarBotaoFiltrar();
}

iniciarFiltro();
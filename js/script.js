/* ============================= */
/* Para Celular */
/* ============================= */

const menuMobile = document.getElementById("menuMobile");
const menu = document.getElementById("menu");

menuMobile.addEventListener("click", () => {
    menu.classList.toggle("ativo");
});

// Fecha o menu para celular quando clicar em algum link
const linksMenu = document.querySelectorAll(".menu a");

linksMenu.forEach((link) => {
    link.addEventListener("click", () => {
        menu.classList.remove("ativo");
    });
});


/* ============================= */
/* Popups */
/* ============================= */

const modalOverlay = document.getElementById("modalOverlay");

const modalAgendamento = document.getElementById("modalAgendamento");
const modalHorarioAgendado = document.getElementById("modalHorarioAgendado");
const modalSucesso = document.getElementById("modalSucesso");

const botoesAbrirAgendamento = document.querySelectorAll(".abrir-agendamento");
const fecharModal = document.getElementById("fecharModal");
const botoesFecharGeral = document.querySelectorAll(".fechar-geral");

const btnVoltar = document.getElementById("btnVoltar");
const btnConfirmar = document.getElementById("btnConfirmar");
const btnFecharFinal = document.getElementById("btnFecharFinal");


/* ============================= */
/* Formulário de Agendamento */
/* ============================= */

const formAgendamento = document.getElementById("formAgendamento");

const inputNome = document.getElementById("nome");
const inputData = document.getElementById("data");
const selectUnidade = document.getElementById("unidade");

const botoesHorario = document.querySelectorAll(".horario-btn");

const resumoNome = document.getElementById("resumoNome");
const resumoDataHorario = document.getElementById("resumoDataHorario");

let horarioSelecionado = "";


/* ============================= */
/* Abrir Popup de Agendamento */
/* ============================= */

botoesAbrirAgendamento.forEach((botao) => {
    botao.addEventListener("click", () => {
        abrirPopupAgendamento();
    });
});

function abrirPopupAgendamento() {
    modalOverlay.classList.add("ativo");
    mostrarPopup(modalAgendamento);
}


/* ============================= */
/* Fechar Popups */
/* ============================= */

function fecharTodosPopups() {
    modalOverlay.classList.remove("ativo");

    modalAgendamento.classList.remove("ativo");
    modalHorarioAgendado.classList.remove("ativo");
    modalSucesso.classList.remove("ativo");
}

fecharModal.addEventListener("click", fecharTodosPopups);

botoesFecharGeral.forEach((botao) => {
    botao.addEventListener("click", fecharTodosPopups);
});

btnFecharFinal.addEventListener("click", () => {
    fecharTodosPopups();
    limparFormulario();
});

// Fecha clicando fora do popup
modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
        fecharTodosPopups();
    }
});


/* ============================= */
/* Controlar qual Popup aparece */
/* ============================= */

function mostrarPopup(popupAtual) {
    modalAgendamento.classList.remove("ativo");
    modalHorarioAgendado.classList.remove("ativo");
    modalSucesso.classList.remove("ativo");

    popupAtual.classList.add("ativo");
}


/* ============================= */
/* Selecionar o Horário */
/* ============================= */

botoesHorario.forEach((botao) => {
    botao.addEventListener("click", () => {
        botoesHorario.forEach((item) => {
            item.classList.remove("selecionado");
        });

        botao.classList.add("selecionado");
        horarioSelecionado = botao.dataset.horario;
    });
});


/* ============================= */
/* Validar e Agendar */
/* ============================= */

formAgendamento.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = inputNome.value.trim();
    const data = inputData.value;
    const unidade = selectUnidade.value;

    if (nome === "") {
        alert("Por favor, informe seu nome completo.");
        return;
    }

    if (data === "") {
        alert("Por favor, selecione uma data.");
        return;
    }

     if (data < 2026) {
        alert("Por favor, selecione uma data no ano que estámos.");
        return;
    }

    if (unidade === "") {
        alert("Por favor, selecione uma unidade.");
        return;
    }

    if (horarioSelecionado === "") {
        alert("Por favor, selecione um horário.");
        return;
    }

    const dataFormatada = formatarData(data);

    resumoNome.textContent = nome;
    resumoDataHorario.textContent = `${dataFormatada} às ${horarioSelecionado}`;

    mostrarPopup(modalHorarioAgendado);
});


/* ============================= */
/* Botão para Voltar */
/* ============================= */

btnVoltar.addEventListener("click", () => {
    mostrarPopup(modalAgendamento);
});


/* ============================= */
/* Confirmar o Agendamento */
/* ============================= */

btnConfirmar.addEventListener("click", () => {
    const linkWhatsApp = montarMensagemWhatsApp();

    window.open(linkWhatsApp, "_blank");

    mostrarPopup(modalSucesso);
});


/* ============================= */
/* Funções Auxiliares */
/* ============================= */

function formatarData(data) {
    const partes = data.split("-");
    const ano = partes[0];
    const mes = partes[1];
    const dia = partes[2];

    return `${dia}/${mes}/${ano}`;
}

function limparFormulario() {
    formAgendamento.reset();

    horarioSelecionado = "";

    botoesHorario.forEach((botao) => {
        botao.classList.remove("selecionado");
    });

    resumoNome.textContent = "";
    resumoDataHorario.textContent = "";
}


/* ============================= */
/* WhatsApp da Loja */
/* ============================= */

function montarMensagemWhatsApp() {
    const nome = inputNome.value.trim();
    const data = formatarData(inputData.value);
    const unidade = selectUnidade.value;

    const mensagem = `Olá, gostaria de agendar um horário na Barbearia Baruc.%0A%0A` +
        `Nome: ${nome}%0A` +
        `Data: ${data}%0A` +
        `Horário: ${horarioSelecionado}%0A` +
        `Unidade: ${unidade}`;

    const linkWhatsApp = `https://wa.me/5511984312295?text=${mensagem}`;

    return linkWhatsApp;
}

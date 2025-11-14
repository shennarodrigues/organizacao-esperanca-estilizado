// === Máscaras para CPF, Telefone e CEP ===

function mascaraCPF(cpf) {
  cpf.value = cpf.value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function mascaraTelefone(tel) {
  tel.value = tel.value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4,5})(\d{4})$/, "$1-$2");
}

function mascaraCEP(cep) {
  cep.value = cep.value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

// === Função para mostrar toast/alerta na tela ===

function showToast(message, type = "success") {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "polite");
    toast.setAttribute("aria-atomic", "true");
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.padding = "12px 24px";
    toast.style.borderRadius = "4px";
    toast.style.color = "white";
    toast.style.fontWeight = "bold";
    toast.style.fontSize = "16px";
    toast.style.zIndex = "9999";
    toast.style.minWidth = "250px";
    toast.style.textAlign = "center";
    toast.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
    toast.style.transition = "opacity 0.3s ease";
    document.body.appendChild(toast);
  }

  toast.textContent = message;

  if (type === "error") {
    toast.style.backgroundColor = "#e74c3c";
  } else if (type === "warning") {
    toast.style.backgroundColor = "#f39c12";
  } else {
    toast.style.backgroundColor = "#2ecc71";
  }

  toast.style.opacity = "1";

  toast.setAttribute("tabindex", "-1");
  toast.focus();

  setTimeout(() => {
    toast.style.opacity = "0";
  }, 4000);
}

// === Validações ===

function validaCPF(cpf) {
  const valor = cpf.replace(/\D/g, "");
  return valor.length === 11;
}

function validaTelefone(tel) {
  const valor = tel.replace(/\D/g, "");
  return valor.length >= 10 && valor.length <= 11;
}

function validaCEP(cep) {
  const valor = cep.replace(/\D/g, "");
  return valor.length === 8;
}

function validaEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// === Função principal para validar o formulário ===

function validarFormulario(form) {
  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const email2 = form.email2.value.trim();
  const cpf = form.cpf.value.trim();
  const nascimento = form.nascimento.value;
  const telefone = form.telefone.value.trim();
  const cep = form.cep.value.trim();
  const termos = form.termos.checked;

  if (!nome) {
    showToast("Por favor, preencha seu nome completo.", "error");
    form.nome.focus();
    return false;
  }

  if (!email || !validaEmail(email)) {
    showToast("Por favor, insira um e-mail válido.", "error");
    form.email.focus();
    return false;
  }

  if (email !== email2) {
    showToast("Os e-mails não conferem.", "error");
    form.email2.focus();
    return false;
  }

  if (!cpf || !validaCPF(cpf)) {
    showToast("CPF inválido. Use o formato 000.000.000-00.", "error");
    form.cpf.focus();
    return false;
  }

  if (!nascimento) {
    showToast("Por favor, selecione sua data de nascimento.", "error");
    form.nascimento.focus();
    return false;
  }

  if (!telefone || !validaTelefone(telefone)) {
    showToast("Telefone inválido. Use o formato (00)00000-0000.", "error");
    form.telefone.focus();
    return false;
  }

  if (cep && !validaCEP(cep)) {
    showToast("CEP inválido. Use o formato 00000-000.", "error");
    form.cep.focus();
    return false;
  }

  if (!termos) {
    showToast("Você deve concordar com os termos para continuar.", "error");
    form.termos.focus();
    return false;
  }

  return true;
}

// === Controle do envio do formulário, máscaras e menu hamburguer ===

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formCadastro");

  if(form) {
    form.cpf.addEventListener("input", e => mascaraCPF(e.target));
    form.telefone.addEventListener("input", e => mascaraTelefone(e.target));
    form.cep.addEventListener("input", e => mascaraCEP(e.target));

    form.addEventListener("submit", e => {
      e.preventDefault();

      if (validarFormulario(form)) {
        showToast("Cadastro enviado com sucesso!", "success");
        form.reset();
        form.nome.focus();
      }
    });
  }

  // Controle do menu hamburguer
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');  // CORREÇÃO AQUI: usar a classe mobile-nav

  if(menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      mobileNav.setAttribute('aria-hidden', !isOpen);
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (event) => {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', false);
        mobileNav.setAttribute('aria-hidden', true);

        // Se o link for para a mesma página, impede recarregamento e só fecha o menu
        if (link.href === window.location.href) {
          event.preventDefault();
        }
      });
    });
  }
});


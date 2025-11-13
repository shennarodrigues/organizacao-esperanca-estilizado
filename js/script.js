// script.js — menu hambúrguer, toast e validação simples
document.addEventListener('DOMContentLoaded', function(){
  const navToggle = document.querySelectorAll('.nav-toggle');
  const mobileNavs = document.querySelectorAll('.mobile-nav');
  const toastEl = document.getElementById('toast');

  // Toggle mobile nav (works for multiple pages)
  navToggle.forEach(btn => {
    btn.addEventListener('click', () => {
      const mobile = document.querySelector('.mobile-nav');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      if(mobile){
        mobile.classList.toggle('open');
        mobile.setAttribute('aria-hidden', mobile.classList.contains('open') ? 'false' : 'true');
      }
    });
  });

  // Simple toast helper
  window.showToast = (msg, time = 3000) => {
    if(!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    setTimeout(()=> toastEl.classList.remove('show'), time);
  };

  // Basic form validation for cadastro page
  const form = document.getElementById('formCadastro');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      // Email matching check (if exists)
      const email = form.querySelector('#email') ? form.querySelector('#email').value.trim() : '';
      const email2 = form.querySelector('#email2') ? form.querySelector('#email2').value.trim() : '';
      if(email && email2 && email !== email2){
        showToast('Os e-mails não conferem. Verifique antes de enviar.', 4500);
        if(form.querySelector('#email2')) form.querySelector('#email2').focus();
        return;
      }

      // Rely on HTML5 validity for patterns, etc.
      if(!form.checkValidity()){
        showToast('Preencha os campos obrigatórios corretamente.', 3500);
        // highlight first invalid
        const firstInvalid = form.querySelector(':invalid');
        if(firstInvalid) firstInvalid.focus();
        return;
      }

      // At this point, you can submit via fetch or show success
      showToast('Cadastro enviado com sucesso!', 3000);
      form.reset();
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const birthdateInput = document.getElementById('birthdate');
  const ageInput = document.getElementById('age');

  birthdateInput.addEventListener('change', () => {
    const birthdate = new Date(birthdateInput.value);
    const today = new Date();

    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }

    if (!isNaN(age)) {
      ageInput.value = age;
    }
  });

  document.getElementById('telefone').addEventListener('input', function (e) {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);

    if (valor.length > 6) {
      e.target.value = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
    } else if (valor.length > 2) {
      e.target.value = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
    } else {
      e.target.value = valor;
    }
  });

  document.querySelector('form').addEventListener('submit', function (e) {
    const email = document.getElementById('email');
    const telefone = document.getElementById('telefone');
    let formValido = true;

    removerErros();

    if (!email.value.includes('@') || !email.value.includes('.')) {
      exibirErro(email, 'Email inválido');
      formValido = false;
    }

    if (telefone.value.replace(/\D/g, '').length < 10) {
      exibirErro(telefone, 'Telefone inválido');
      formValido = false;
    }

    if (!formValido) {
      e.preventDefault();
      alert('Por favor, corrija os erros antes de enviar.');
    }
  });

  function exibirErro(elemento, mensagem) {
    const campo = elemento.closest('.campo');
    campo.classList.add('erro');

    const msg = document.createElement('div');
    msg.className = 'mensagem-erro';
    msg.textContent = mensagem;
    campo.appendChild(msg);
  }

  function removerErros() {
    document.querySelectorAll('.mensagem-erro').forEach(el => el.remove());
    document.querySelectorAll('.erro').forEach(el => el.classList.remove('erro'));
  }
});

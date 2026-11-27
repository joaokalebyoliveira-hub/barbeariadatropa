document.addEventListener('DOMContentLoaded', () => {
  const inputCPF = document.getElementById('cpf');
  const inputTelefone = document.getElementById('telefone');
  const formCadastro = document.getElementById('form-cadastro');

  // Máscara de CPF
  inputCPF.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = v;
  });

  // Máscara de Telefone
  inputTelefone.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
    v = v.replace(/(\d{5})(\d)/, '$1-$2');
    e.target.value = v;
  });

  // Formulário
  formCadastro.addEventListener('submit', (e) => {
    e.preventDefault();

    const dadosCliente = {
      nome: document.getElementById('nome').value,
      cpf: inputCPF.value,
      dataNascimento: document.getElementById('dataNascimento').value,
      telefone: inputTelefone.value
    };

    // Armazena dados para resgatar no serviço 
    localStorage.setItem('dadosClienteAgendamento', JSON.stringify(dadosCliente));

    // Redireciona para a tela de serviço
    window.location.href = '../servicos/servicos.html';
  });
});
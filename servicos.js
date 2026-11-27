// Inicializa a conexão com o Supabase
const SUPABASE_URL = 'https://rtuidwijcbwffyajryog.supabase.co';
const SUPABASE_KEY = 'sb_publishable_RD1JvEIn_0kC2O3OToXk7w_5x0Pwtue';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', () => {
  const dadosClienteSalvos = localStorage.getItem('dadosClienteAgendamento');

  if (!dadosClienteSalvos) {
    alert('Por favor, preencha seus dados primeiro.');
    window.location.href = '../cadastro/index.html';
    return;
  }

  const cliente = JSON.parse(dadosClienteSalvos);
  document.getElementById('saudacao-cliente').innerText = `Olá, ${cliente.nome.split(' ')[0]}! Escolha o procedimento.`;

  const inputData = document.getElementById('dataAgendamento');
  inputData.min = new Date().toISOString().split('T')[0];

  const formServico = document.getElementById('form-servico');
  formServico.addEventListener('submit', async (e) => {
    e.preventDefault();

    const servicoEscolhido = document.getElementById('servico').value;
    const dataBruta = inputData.value;
    const horarioEscolhido = document.getElementById('horarioAgendamento').value;

    // Envia para o banco de dados PostgreSQL no Supabase
    const { error } = await supabaseClient
      .from('agendamentos')
      .insert([{
        nome: cliente.nome,
        cpf: cliente.cpf,
        data_nascimento: cliente.dataNascimento,
        telefone: cliente.telefone,
        servico: servicoEscolhido,
        data_agendamento: dataBruta,
        horario: horarioEscolhido,
        status: 'Pendente'
      }]);

    if (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao registrar agendamento. Tente novamente.');
      return;
    }

    localStorage.removeItem('dadosClienteAgendamento');
    alert('Agendamento registrado na nuvem com sucesso!');
    window.location.href = '../cadastro/index.html';
  });
});
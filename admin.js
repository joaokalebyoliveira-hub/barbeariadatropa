const SUPABASE_URL = 'https://rtuidwijcbwffyajryog.supabase.co';
const SUPABASE_KEY = 'sb_publishable_RD1JvEIn_0kC2O3OToXk7w_5x0Pwtue';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', () => {
  carregarPainel();
});

async function carregarPainel() {
  const listaPendentes = document.getElementById('lista-pendentes');
  const listaHistorico = document.getElementById('lista-historico');

  // Busca todos os agendamentos ordenados por data e horário
  const { data: agendamentos, error } = await supabaseClient
    .from('agendamentos')
    .select('*')
    .order('data_agendamento', { ascending: true });

  if (error) {
    console.error('Erro ao buscar agendamentos:', error);
    return;
  }

  listaPendentes.innerHTML = '';
  listaHistorico.innerHTML = '';

  const pendentes = agendamentos.filter(item => item.status === 'Pendente');
  const historico = agendamentos.filter(item => item.status === 'Confirmado');

  listaPendentes.innerHTML = pendentes.length === 0
    ? `<p class="empty-msg">Nenhum agendamento pendente no momento.</p>`
    : pendentes.map(item => criarCardHTML(item, false)).join('');

  listaHistorico.innerHTML = historico.length === 0
    ? `<p class="empty-msg">O histórico de confirmados está vazio.</p>`
    : historico.map(item => criarCardHTML(item, true)).join('');
}

function criarCardHTML(item, isHistorico) {
  const [ano, mes, dia] = item.data_agendamento.split('-');
  const dataFormatada = `${dia}/${mes}/${ano}`;

  const botoesAcao = !isHistorico
    ? `<button class="btn-confirm" onclick="confirmarAgendamento(${item.id})">✅ Confirmar</button>`
    : `<button class="btn-delete" onclick="excluirAgendamento(${item.id})">🗑️ Excluir</button>`;

  return `
    <div class="appointment-card">
      <div class="appointment-info">
        <p>👤 <strong>${item.nome}</strong> <span>(${item.telefone})</span></p>
        <p>✂️ <span>Serviço:</span> ${item.servico}</p>
        <p>📅 <span>Data/Hora:</span> ${dataFormatada} às ${item.horario}</p>
      </div>
      <div class="appointment-actions">
        ${botoesAcao}
      </div>
    </div>
  `;
}

async function confirmarAgendamento(id) {
  const { error } = await supabaseClient
    .from('agendamentos')
    .update({ status: 'Confirmado' })
    .eq('id', id);

  if (!error) carregarPainel();
}

async function excluirAgendamento(id) {
  if (confirm('Tem certeza que deseja remover este agendamento do histórico?')) {
    const { error } = await supabaseClient
      .from('agendamentos')
      .delete()
      .eq('id', id);

    if (!error) carregarPainel();
  }
}
# barbeariadatropa
Aplicação web full-stack para gestão de agendamentos em barbearias. Permite ao cliente realizar o cadastro e reservar horários pelo celular, enquanto o barbeiro acompanha, confirma e gerencia o histórico de atendimentos em tempo real via banco de dados em nuvem (Supabase/PostgreSQL).

# 💈 Sistema de Agendamento — Barbearia

Aplicação web *mobile-first* para agendamento de cortes e gerenciamento administrativo de horários em tempo real, integrada a banco de dados em nuvem.

🔗 **[Acessar Projeto Online](https://seu-link-aqui.vercel.app)**

---

## ✨ Funcionalidades

### Área do Cliente
- **Cadastro rápido:** Coleta de dados essenciais (nome, CPF, data de nascimento e telefone) com persistência temporária entre etapas.
- **Agendamento intuitivo:** Seleção de procedimento, data (com bloqueio de datas retroativas) e horário disponível.

### Área do Administrador
- **Fila de Pendentes:** Visualização imediata dos novos agendamentos enviados pelos clientes.
- **Confirmação de Horários:** Atualização de status de `Pendente` para `Confirmado` com um clique.
- **Histórico e Limpeza:** Listagem de atendimentos confirmados com opção de exclusão de registros antigos.

---

## 🛠️ Tecnologias Utilizadas

- **Front-end:** HTML5, CSS3 (Responsivo / Mobile-First) e JavaScript (ES6+ / Async-Await)
- **Banco de Dados & BaaS:** Supabase (PostgreSQL + Row Level Security)
- **Hospedagem:** Vercel 

---

## 🗂️ Estrutura de Pastas

```text
barbearia/
├── cadastro/
│   ├── index.html       # Tela inicial de identificação do cliente
│   └── script.js        # Validação e armazenamento temporário do cliente
├── servicos/
│   ├── servicos.html    # Seleção de corte, data e horário
    └── servicos.js      # Envio do agendamento para o Supabase

── admin/
  ├── admin.html       # Dashboard de gerenciamento da barbearia
  └── admin.js         # Listagem, confirmação e exclusão no banco

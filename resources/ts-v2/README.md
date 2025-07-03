
# Centro Clínico – Relatórios (v7)

### Novidades

* **Colunas vazias removidas** – a pré‑visualização e a grade de relatórios ignoram cabeçalhos `__EMPTY`.
* **Várias planilhas?** – Sempre carrega **a primeira aba** do Excel.
* **Login repaginado** – Card translúcido, ícone hospitalar, gradiente animado.
* **Menu com destaque ativo** – Links exibem sublinhado quando selecionados.
* **Tudo em português** – DataGrid, botões, mensagens.

### Origem dos dados

Os relatórios são persistidos em **`localStorage`** (chave `reports_store`).  
Enquanto não há backend real, é daí que a grade `/reports` lê os “dados dummy”.

### Testar

```bash
npm install
npm run dev
```

1. Abra **http://localhost:5173** → /login  
2. Faça login (qualquer usuário/senha).  
3. Vá para **Sincronizar**, selecione o arquivo Excel de 2025: veja colunas corretas (sem `empty`).  
4. Clique **Confirmar envio** e confira em **Relatórios**.


# 🚀 PromptCraft Manager - Deploy Ready

**Gerenciador Inteligente de Prompts de IA optimizado para Vercel**

## 🏗️ Estrutura para Deploy

```
├── frontend/               # React App
│   ├── src/               # Código fonte React
│   ├── package.json       # Dependências frontend
│   ├── vite.config.js     # Configuração Vite
│   └── index.html         # HTML principal
├── api/                   # Flask API
│   ├── src/               # Código fonte backend
│   ├── requirements.txt   # Dependências Python
│   └── main.py           # Entry point da API
├── vercel.json           # Configuração Vercel
└── README.md             # Este arquivo
```

## 🚀 Como fazer Deploy na Vercel

### 1. Preparar o Repositório
```bash
cd C:\Users\David\PromptCraft-Deploy
git init
git add .
git commit -m "Initial commit: PromptCraft Manager ready for Vercel"
```

### 2. Conectar com GitHub
```bash
# Criar repositório no GitHub primeiro
git remote add origin https://github.com/SEU_USERNAME/promptcraft-vercel.git
git push -u origin main
```

### 3. Deploy na Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Conecte sua conta GitHub
3. Clique em "New Project"
4. Selecione o repositório `promptcraft-vercel`
5. Vercel vai detectar automaticamente a configuração
6. Clique "Deploy"

## ⚙️ Configurações Importantes

### Frontend (React + Vite)
- Build otimizado para produção
- Tailwind CSS configurado
- shadcn/ui components
- React Router para SPA

### Backend (Flask API)
- Python 3.11 runtime
- Flask + SQLAlchemy
- CORS configurado
- Database SQLite incluído

### Vercel Configuration
- **Frontend**: Static build com Vite
- **Backend**: Serverless functions Python
- **Routing**: API routes em `/api/*`
- **Static**: Frontend em `/`

## 🔧 Variáveis de Ambiente

No Vercel, configure:
```
FLASK_ENV=production
```

## 📁 Principais Arquivos

### Frontend
- `frontend/src/App.jsx` - Componente principal
- `frontend/src/components/ui/` - Componentes shadcn/ui
- `frontend/package.json` - Dependências React

### Backend  
- `api/src/main.py` - Entry point da API Flask
- `api/src/models/` - Modelos SQLAlchemy
- `api/src/routes/` - Rotas da API
- `api/requirements.txt` - Dependências Python

## 🛠️ Próximos Passos

1. **Corrigir bugs críticos** identificados
2. **Implementar barra lateral** de navegação
3. **Adicionar templates de neurociência**
4. **Configurar domínio personalizado**
5. **Implementar sistema de pagamentos**

## 🌟 Vantagens da Vercel

✅ **Deploy automático** via Git  
✅ **Edge Network** global  
✅ **Serverless functions** escaláveis  
✅ **HTTPS** automático  
✅ **Preview deployments** para PRs  
✅ **Analytics** integrado  

## 📊 Performance Esperada

- **Frontend**: Edge cached, loading < 2s
- **API**: Serverless, cold start < 500ms
- **Database**: SQLite otimizado para read-heavy
- **Global**: CDN em 100+ regiões

---

**Desenvolvido por**: David De Cunto  
**Stack**: React + Flask + Vercel  
**URL**: Será gerada automaticamente pela Vercel
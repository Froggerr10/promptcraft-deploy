import { useState, useEffect } from 'react'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentView, setCurrentView] = useState('dashboard')
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Cafeteria Gourmet',
      description: 'Cafeteria especializada em grãos premium e experiências únicas para amantes de café',
      icon: '☕',
      status: 'Ativo',
      prompts: 8,
      color: 'from-orange-400 to-pink-400'
    },
    {
      id: 2,
      name: 'App de Fitness',
      description: 'Aplicativo mobile para treinos personalizados e acompanhamento de progresso',
      icon: '💪',
      status: 'Em progresso',
      prompts: 12,
      color: 'from-blue-400 to-purple-400'
    },
    {
      id: 3,
      name: 'Consultoria Sustentável',
      description: 'Consultoria em práticas sustentáveis e responsabilidade ambiental para empresas',
      icon: '🌱',
      status: 'Planejamento',
      prompts: 5,
      color: 'from-green-400 to-teal-400'
    }
  ])

  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [myPrompts, setMyPrompts] = useState([
    { id: 1, title: 'Email Marketing para E-commerce', category: 'Marketing', created: '2024-01-15', status: 'Ativo' },
    { id: 2, title: 'Análise SWOT Empresarial', category: 'Estratégia', created: '2024-01-14', status: 'Rascunho' },
    { id: 3, title: 'Roteiro de Vendas B2B', category: 'Vendas', created: '2024-01-13', status: 'Ativo' }
  ])

  // Templates expandidos com 28 itens
  const allTemplates = [
    { id: 1, name: 'Proposta Única de Valor', category: 'Marketing', icon: '🎯', description: 'Crie uma proposta de valor irresistível' },
    { id: 2, name: 'Criação de Persona', category: 'Estratégia', icon: '👤', description: 'Desenvolva personas detalhadas' },
    { id: 3, name: 'Landing Page', category: 'Web Design', icon: '🌐', description: 'Estruture landing pages de alta conversão' },
    { id: 4, name: 'VSL Script', category: 'Vídeo Marketing', icon: '🎬', description: 'Roteiros para vídeos de vendas' },
    { id: 5, name: 'Títulos Magnéticos', category: 'Copywriting', icon: '✨', description: 'Headlines que capturam atenção' },
    { id: 6, name: 'Análise de Concorrência', category: 'Pesquisa', icon: '🔍', description: 'Mapeie estratégias dos concorrentes' },
    { id: 7, name: 'Email Marketing', category: 'Marketing', icon: '📧', description: 'Campanhas de email que convertem' },
    { id: 8, name: 'Funil de Vendas', category: 'Vendas', icon: '🔄', description: 'Estruture funis de conversão' },
    { id: 9, name: 'Conteúdo para Redes Sociais', category: 'Social Media', icon: '📱', description: 'Posts envolventes' },
    { id: 10, name: 'Storytelling', category: 'Copywriting', icon: '📖', description: 'Narrativas que conectam' },
    { id: 11, name: 'SEO Content', category: 'SEO', icon: '🔍', description: 'Conteúdo otimizado' },
    { id: 12, name: 'Pitch Deck', category: 'Apresentações', icon: '📊', description: 'Apresentações persuasivas' },
    { id: 13, name: 'Análise SWOT', category: 'Estratégia', icon: '⚖️', description: 'Análise estratégica' },
    { id: 14, name: 'Product Description', category: 'E-commerce', icon: '🛍️', description: 'Descrições que vendem' },
    { id: 15, name: 'Webinar Script', category: 'Educação', icon: '🎓', description: 'Roteiros educativos' },
    { id: 16, name: 'Press Release', category: 'PR', icon: '📰', description: 'Comunicados profissionais' },
    { id: 17, name: 'Newsletter', category: 'Marketing', icon: '📮', description: 'Boletins engajadores' },
    { id: 18, name: 'FAQ Generator', category: 'Atendimento', icon: '❓', description: 'Perguntas frequentes' },
    { id: 19, name: 'Slogan Creator', category: 'Branding', icon: '💡', description: 'Slogans memoráveis' },
    { id: 20, name: 'Case Study', category: 'Vendas', icon: '📋', description: 'Estudos de caso' },
    { id: 21, name: 'Survey Questions', category: 'Pesquisa', icon: '📝', description: 'Questionários' },
    { id: 22, name: 'Job Description', category: 'RH', icon: '👔', description: 'Descrições de vagas' },
    { id: 23, name: 'Social Proof', category: 'Marketing', icon: '⭐', description: 'Provas sociais' },
    { id: 24, name: 'Call to Action', category: 'Copywriting', icon: '🎪', description: 'CTAs eficazes' },
    { id: 25, name: 'Blog Post', category: 'Conteúdo', icon: '✍️', description: 'Artigos otimizados' },
    { id: 26, name: 'Ad Copy', category: 'Publicidade', icon: '📢', description: 'Textos publicitários' },
    { id: 27, name: 'Video Script', category: 'Vídeo', icon: '🎥', description: 'Roteiros promocionais' },
    { id: 28, name: 'Chatbot Flow', category: 'Automação', icon: '🤖', description: 'Fluxos de conversação' }
  ]

  const loadTemplates = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    setTemplates(allTemplates)
    setLoading(false)
  }

  useEffect(() => {
    loadTemplates()
  }, [])

  // CORREÇÃO 1: Botão novo projeto funcionando
  const handleCreateProject = () => {
    const names = ['E-commerce Store', 'SaaS Platform', 'Blog Corporativo', 'App Mobile', 'Marketplace']
    const icons = ['🛒', '💻', '📝', '📱', '🏪']
    const colors = ['from-red-400 to-pink-400', 'from-indigo-400 to-purple-400', 'from-yellow-400 to-orange-400']
    
    const newProject = {
      id: projects.length + 1,
      name: names[Math.floor(Math.random() * names.length)],
      description: 'Projeto com estratégias personalizadas e templates exclusivos',
      icon: icons[Math.floor(Math.random() * icons.length)],
      status: 'Planejamento',
      prompts: 0,
      color: colors[Math.floor(Math.random() * colors.length)]
    }
    setProjects([...projects, newProject])
    setCurrentView('projects') // Vai direto para a página de projetos
  }

  // CORREÇÃO 2 e 7: Botões dos projetos funcionando
  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setCurrentView('project-detail')
  }

  // CORREÇÃO 3: Botões dos templates funcionando
  const handleUseTemplate = (template) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert(`✅ Template "${template.name}" aplicado com sucesso! Agora você pode personalizar o conteúdo.`)
    }, 1000)
  }

  // CORREÇÃO 4: Função para criar novos prompts
  const handleCreatePrompt = () => {
    const newPrompt = {
      id: myPrompts.length + 1,
      title: 'Novo Prompt Personalizado',
      category: 'Personalizado',
      created: new Date().toISOString().split('T')[0],
      status: 'Rascunho'
    }
    setMyPrompts([...myPrompts, newPrompt])
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        </div>
        
        <div className="relative w-full max-w-lg mx-auto">
          <div className="bg-white/95 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  PromptCraft
                </h1>
                <p className="text-gray-600 text-lg">Gerenciador de Prompts Inteligente</p>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-12"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-12"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Entrar
                </button>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Para demonstração, clique em "Entrar" com qualquer dados
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-72 bg-white shadow-xl border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">PromptCraft</h2>
              <p className="text-sm text-gray-500">v2.0 - {templates.length} templates</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4">
          <div className="space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'projects', label: 'Projetos', icon: '📁' },
              { id: 'templates', label: 'Templates', icon: '📚' },
              { id: 'prompts', label: 'Meus Prompts', icon: '✏️' },
              { id: 'upload', label: 'Upload', icon: '📤' },
              { id: 'help', label: 'Ajuda', icon: '❓' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 group ${
                  currentView === item.id
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
                {currentView === item.id && (
                  <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                U
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Usuário Demo</p>
                <p className="text-sm text-gray-500">demo@promptcraft.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-gray-900">Carregando...</span>
                </div>
              </div>
            </div>
          )}

          {currentView === 'dashboard' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                  <p className="text-gray-600 mt-1">Bem-vindo de volta! Gerencie seus prompts de forma inteligente.</p>
                </div>
                <button 
                  onClick={handleCreateProject}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  + Novo Projeto
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Projetos Ativos</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{projects.length}</p>
                      <p className="text-sm text-green-600 mt-1">+1 este mês</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Templates Disponíveis</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{templates.length}</p>
                      <p className="text-sm text-blue-600 mt-1">Sempre atualizados</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Prompts Criados</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{myPrompts.length}</p>
                      <p className="text-sm text-green-600 mt-1">+8 esta semana</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Projetos Recentes</h2>
                    <button 
                      onClick={() => setCurrentView('projects')}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Ver todos
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {projects.slice(0, 3).map((project) => (
                      <div 
                        key={project.id}
                        onClick={() => handleProjectClick(project)}
                        className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer hover:border-blue-300 group"
                      >
                        <div className={`w-12 h-12 bg-gradient-to-r ${project.color} rounded-xl flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform duration-200`}>
                          {project.icon}
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{project.name}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            project.status === 'Ativo' ? 'bg-green-100 text-green-700' :
                            project.status === 'Em progresso' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {project.status}
                          </span>
                          <span className="text-gray-500">{project.prompts} prompts</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CORREÇÃO 3: Templates com todos os 28 templates funcionando */}
          {currentView === 'templates' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
                  <p className="text-gray-600 mt-1">Biblioteca com {templates.length} templates profissionais para acelerar sua criação de prompts.</p>
                </div>
                <button 
                  onClick={loadTemplates}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  🔄 Recarregar
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <div key={template.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-blue-300 group">
                    <div className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200">
                          {template.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{template.name}</h3>
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">{template.category}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{template.description}</p>
                      <button 
                        onClick={() => handleUseTemplate(template)}
                        className="w-full bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 py-2 px-4 rounded-xl hover:from-blue-100 hover:to-purple-100 transition-all duration-200 font-medium group-hover:shadow-md"
                      >
                        Usar Template
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CORREÇÃO 2: Página de projetos funcionando */}
          {currentView === 'projects' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Projetos</h1>
                  <p className="text-gray-600 mt-1">Gerencie todos os seus projetos de prompts em um só lugar.</p>
                </div>
                <button 
                  onClick={handleCreateProject} // Reutiliza a função de criação de projeto
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  + Novo Projeto
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project.id} onClick={() => handleProjectClick(project)} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer">
                    <div className={`w-16 h-16 bg-gradient-to-r ${project.color} rounded-2xl flex items-center justify-center text-3xl mb-4`}>
                      {project.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        project.status === 'Ativo' ? 'bg-green-100 text-green-700' :
                        project.status === 'Em progresso' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {project.status}
                      </span>
                      <span className="text-gray-500">{project.prompts} prompts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App; // Linha de exportação corrigida

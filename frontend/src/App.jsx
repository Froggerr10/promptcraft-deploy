import { useState } from 'react'

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

  const [templates] = useState([
    { name: 'Proposta Única de Valor', category: 'Marketing', icon: '🎯', color: 'from-blue-400 to-blue-600', description: 'Crie uma proposta de valor irresistível que diferencia seu produto no mercado' },
    { name: 'Criação de Persona', category: 'Estratégia', icon: '👤', color: 'from-purple-400 to-purple-600', description: 'Desenvolva personas detalhadas baseadas em dados reais do seu público' },
    { name: 'Landing Page', category: 'Web Design', icon: '🌐', color: 'from-green-400 to-green-600', description: 'Estruture landing pages de alta conversão com copy persuasivo' },
    { name: 'VSL Script', category: 'Vídeo Marketing', icon: '🎬', color: 'from-red-400 to-red-600', description: 'Roteiros para vídeos de vendas que engajam e convertem' },
    { name: 'Títulos Magnéticos', category: 'Copywriting', icon: '✨', color: 'from-yellow-400 to-orange-600', description: 'Headlines que capturam atenção e aumentam cliques' },
    { name: 'Análise de Concorrência', category: 'Pesquisa', icon: '🔍', color: 'from-indigo-400 to-indigo-600', description: 'Mapeie estratégias dos concorrentes e encontre oportunidades' },
  ])

  const [selectedProject, setSelectedProject] = useState(null)

  const handleCreateProject = () => {
    const newProject = {
      id: projects.length + 1,
      name: 'Novo Projeto',
      description: 'Descrição do novo projeto',
      icon: '🚀',
      status: 'Planejamento',
      prompts: 0,
      color: 'from-gray-400 to-gray-600'
    }
    setProjects([...projects, newProject])
    alert('Novo projeto criado! Clique nele para editar.')
  }

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setCurrentView('project-detail')
  }

  const handleUseTemplate = (template) => {
    alert(`Template "${template.name}" selecionado! Em breve você poderá personalizá-lo.`)
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

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', active: currentView === 'dashboard' },
    { id: 'projects', label: 'Projetos', icon: '📁', active: currentView === 'projects' },
    { id: 'templates', label: 'Templates', icon: '📚', active: currentView === 'templates' },
    { id: 'prompts', label: 'Meus Prompts', icon: '✏️', active: currentView === 'prompts' },
    { id: 'upload', label: 'Upload', icon: '📤', active: currentView === 'upload' },
    { id: 'help', label: 'Ajuda', icon: '❓', active: currentView === 'help' },
  ]

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
              <p className="text-sm text-gray-500">v2.0</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 group ${
                  item.active
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
                {item.active && (
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

              {/* Stats Cards */}
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
                      <p className="text-sm text-blue-600 mt-1">Biblioteca completa</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Prompts Criados</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{projects.reduce((sum, p) => sum + p.prompts, 0)}</p>
                      <p className="text-sm text-purple-600 mt-1">+12 esta semana</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Projects Grid */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Projetos Recentes</h2>
                  <button 
                    onClick={() => setCurrentView('projects')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Ver todos
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <div 
                      key={project.id}
                      onClick={() => handleProjectClick(project)}
                      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${project.color} rounded-xl flex items-center justify-center`}>
                          <span className="text-white text-xl">{project.icon}</span>
                        </div>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          project.status === 'Ativo' ? 'bg-green-100 text-green-700' :
                          project.status === 'Em progresso' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{project.prompts} prompts criados</span>
                        <span className="text-blue-600 font-medium">Ver projeto →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentView === 'projects' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Meus Projetos</h1>
                  <p className="text-gray-600 mt-1">Gerencie todos os seus projetos em um só lugar</p>
                </div>
                <button 
                  onClick={handleCreateProject}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  + Novo Projeto
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div 
                    key={project.id}
                    onClick={() => handleProjectClick(project)}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${project.color} rounded-xl flex items-center justify-center`}>
                        <span className="text-white text-xl">{project.icon}</span>
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        project.status === 'Ativo' ? 'bg-green-100 text-green-700' :
                        project.status === 'Em progresso' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{project.prompts} prompts</span>
                      <span className="text-blue-600 font-medium">Abrir →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === 'templates' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Biblioteca de Templates</h1>
                <p className="text-gray-600 mt-1">{templates.length} templates especializados para acelerar sua criação de prompts</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 group">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${template.color} rounded-xl flex items-center justify-center`}>
                        <span className="text-white text-xl">{template.icon}</span>
                      </div>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        {template.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {template.description}
                    </p>
                    <button 
                      onClick={() => handleUseTemplate(template)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
                    >
                      Usar Template
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === 'project-detail' && selectedProject && (
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setCurrentView('projects')}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ← Voltar
                </button>
                <div className={`w-12 h-12 bg-gradient-to-r ${selectedProject.color} rounded-xl flex items-center justify-center`}>
                  <span className="text-white text-xl">{selectedProject.icon}</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{selectedProject.name}</h1>
                  <p className="text-gray-600">{selectedProject.description}</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Detalhes do Projeto</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-semibold">{selectedProject.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Prompts</p>
                    <p className="font-semibold">{selectedProject.prompts}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Criado em</p>
                    <p className="font-semibold">15/12/2024</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Última edição</p>
                    <p className="font-semibold">Hoje</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Prompts do Projeto</h2>
                <p className="text-gray-600">Funcionalidade em desenvolvimento. Em breve você poderá criar e gerenciar prompts específicos para este projeto.</p>
              </div>
            </div>
          )}

          {(currentView === 'prompts' || currentView === 'upload' || currentView === 'help') && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🚧</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Em Desenvolvimento</h2>
              <p className="text-gray-600">Esta seção está sendo desenvolvida e estará disponível em breve.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App

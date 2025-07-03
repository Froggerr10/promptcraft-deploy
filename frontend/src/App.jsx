import { useState, useEffect } from 'react'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentView, setCurrentView] = useState('dashboard')
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(false)

  const loadTemplates = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/templates')
      if (response.ok) {
        const data = await response.json()
        setTemplates(data.templates)
      } else {
        setTemplates([
          { id: 1, name: 'Proposta Única de Valor', category: 'Marketing', icon: '🎯' },
          { id: 2, name: 'Criação de Persona', category: 'Estratégia', icon: '👤' },
          { id: 3, name: 'Landing Page', category: 'Web Design', icon: '🌐' },
        ])
      }
    } catch (error) {
      setTemplates([
        { id: 1, name: 'Proposta Única de Valor', category: 'Marketing', icon: '🎯' },
        { id: 2, name: 'Criação de Persona', category: 'Estratégia', icon: '👤' },
        { id: 3, name: 'Landing Page', category: 'Web Design', icon: '🌐' },
      ])
    }
    setLoading(false)
  }

  useEffect(() => {
    loadTemplates()
  }, [])

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-xl p-8 rounded-2xl shadow-2xl max-w-md w-full">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">PromptCraft</h1>
            <div className="space-y-4">
              <input type="email" placeholder="seu@email.com" className="w-full px-4 py-3 border rounded-xl" />
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 border rounded-xl" />
              <button
                onClick={() => setIsLoggedIn(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl"
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-72 bg-white shadow-xl border-r">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">PromptCraft</h2>
          <p className="text-sm text-gray-500">{templates.length} templates</p>
        </div>
        <nav className="p-4 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'templates', label: 'Templates', icon: '📚' },
            { id: 'projects', label: 'Projetos', icon: '📁' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl ${
                currentView === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <main className="flex-1 p-8">
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span>Carregando...</span>
              </div>
            </div>
          </div>
        )}

        {currentView === 'dashboard' && (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <p className="text-sm text-gray-600">Templates</p>
                <p className="text-3xl font-bold">{templates.length}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <p className="text-sm text-gray-600">Projetos</p>
                <p className="text-3xl font-bold">3</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <p className="text-sm text-gray-600">Prompts</p>
                <p className="text-3xl font-bold">25</p>
              </div>
            </div>
          </div>
        )}

        {currentView === 'templates' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Templates</h1>
              <button 
                onClick={loadTemplates}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl"
              >
                🔄 Recarregar
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div key={template.id} className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
                      {template.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{template.category}</span>
                    </div>
                  </div>
                  <button className="w-full bg-blue-50 text-blue-700 py-2 rounded-xl">
                    Usar Template
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'projects' && (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Projetos</h1>
            <div className="text-center py-12">
              <p className="text-gray-600">Lista de projetos em desenvolvimento...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
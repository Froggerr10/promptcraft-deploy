import sys
import os
from flask import Flask, jsonify # Importar jsonify para garantir que o retorno é um JSON
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Adicionar o diretório src ao path para imports relativos
current_dir = os.path.dirname(os.path.abspath(__file__))
src_dir = os.path.dirname(current_dir)
sys.path.insert(0, src_dir)

app = Flask(__name__)
# A Vercel recomenda usar /tmp para arquivos graváveis em lambdas,
# mas para um SQLite que será apenas lido após o deploy, o diretório da app pode funcionar.
# No entanto, se você tentar ESCREVER nele, precisará de um banco de dados externo ou /tmp.
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///promptcraft.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

# Import models to ensure they're created
# A ordem dos imports pode ser importante se houver dependências entre modelos
from models.user import User
from models.project import Project
from models.prompt import Prompt, PromptVersion
from models.prompt_template import PromptTemplate

# Import data files
from data.prompt_templates import PROMPT_TEMPLATES

# --- NOVO BLOCO: INICIALIZAÇÃO E SEEDING DO BANCO DE DADOS ---
# Este bloco será executado quando o módulo for carregado pela Vercel
with app.app_context():
    # Cria todas as tabelas, se elas ainda não existirem
    db.create_all()
    print("✅ Banco de dados inicializado (ou já existia)!")

    # Popula os templates APENAS SE a tabela estiver vazia
    if PromptTemplate.query.count() == 0:
        print("🌱 Iniciando seed dos templates (tabela vazia)...")
        for template_data in PROMPT_TEMPLATES:
            # Verifica se o template já existe pelo nome para evitar duplicatas em caso de re-deploy
            existing_template = PromptTemplate.query.filter_by(name=template_data["name"]).first()
            if not existing_template:
                template = PromptTemplate(
                    name=template_data["name"],
                    title=template_data["title"],
                    description=template_data["description"],
                    content=template_data["content"],
                    category=template_data["category"],
                    template_type=template_data["template_type"],
                    variables=template_data["variables"],
                    icon=template_data["icon"]
                )
                db.session.add(template)
        try:
            db.session.commit()
            print(f"✅ {len(PROMPT_TEMPLATES)} templates adicionados com sucesso!")
        except Exception as e:
            db.session.rollback()
            print(f"Erro ao adicionar templates: {e}")
            print("Rollback da transação.")
    else:
        print("Banco de dados já contém templates, pulando seed inicial.")
# --- FIM DO NOVO BLOCO ---


@app.route('/')
def hello():
    return {"message": "PromptCraft API is running!"}

@app.route('/api/templates')
def get_templates():
    """Retorna todos os templates disponíveis"""
    templates = PromptTemplate.query.all()
    # Retorna uma lista de dicionários, conforme o frontend espera
    return jsonify({
        "templates": [
            {
                "id": template.id,
                "name": template.name,
                "title": template.title,
                "description": template.description,
                "category": template.category,
                "template_type": template.template_type,
                "variables": template.variables,
                "icon": template.icon
            }
            for template in templates
        ]
    })


@app.route('/api/templates/<int:template_id>')
def get_template(template_id):
    """Retorna um template específico com o conteúdo completo"""
    template = PromptTemplate.query.get_or_404(template_id)
    return jsonify({ # Usar jsonify para garantir o Content-Type correto
        "id": template.id,
        "name": template.name,
        "title": template.title,
        "description": template.description,
        "content": template.content,
        "category": template.category,
        "template_type": template.template_type,
        "variables": template.variables,
        "icon": template.icon
    })

# Estes comandos CLI são apenas para uso local (ex: flask seed-templates)
# e não são executados automaticamente pela Vercel no deploy normal.
# O novo bloco acima faz o seeding para o deploy.
@app.cli.command()
def seed_templates():
    """Popula o banco com os templates iniciais"""
    print("🌱 Iniciando seed dos templates...")
    
    # Limpar templates existentes (CUIDADO ao usar isso em produção!)
    PromptTemplate.query.delete()
    
    # Adicionar templates
    for template_data in PROMPT_TEMPLATES:
        template = PromptTemplate(
            name=template_data["name"],
            title=template_data["title"],
            description=template_data["description"],
            content=template_data["content"],
            category=template_data["category"],
            template_type=template_data["template_type"],
            variables=template_data["variables"],
            icon=template_data["icon"]
        )
        db.session.add(template)
    
    db.session.commit()
    print(f"✅ {len(PROMPT_TEMPLATES)} templates adicionados com sucesso!")
    
    # Mostrar resumo por categoria
    categories = {}
    for template_data in PROMPT_TEMPLATES:
        category = template_data["category"]
        if category not in categories:
            categories[category] = 0
        categories[category] += 1
    
    print("\n📊 Resumo por categoria:")
    for category, count in categories.items():
        print(f"  {category}: {count} templates")

@app.cli.command()
def init_db():
    """Inicializa o banco de dados"""
    db.create_all()
    print("✅ Banco de dados inicializado!")

if __name__ == '__main__':
    # Este bloco agora é principalmente para testar localmente.
    # A inicialização e seed para o deploy acontecem no bloco acima.
    app.run(debug=True)

import sys
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Adicionar o diretório src ao path para imports relativos
current_dir = os.path.dirname(os.path.abspath(__file__))
src_dir = os.path.dirname(current_dir)
sys.path.insert(0, src_dir)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///promptcraft.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

# Import models to ensure they're created
from models.user import User
from models.project import Project
from models.prompt import Prompt, PromptVersion
from models.prompt_template import PromptTemplate

# Import data files
from data.prompt_templates import PROMPT_TEMPLATES

@app.route('/')
def hello():
    return {"message": "PromptCraft API is running!"}

@app.route('/api/templates')
def get_templates():
    """Retorna todos os templates disponíveis"""
    templates = PromptTemplate.query.all()
    return {
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
    }

@app.route('/api/templates/<int:template_id>')
def get_template(template_id):
    """Retorna um template específico com o conteúdo completo"""
    template = PromptTemplate.query.get_or_404(template_id)
    return {
        "id": template.id,
        "name": template.name,
        "title": template.title,
        "description": template.description,
        "content": template.content,
        "category": template.category,
        "template_type": template.template_type,
        "variables": template.variables,
        "icon": template.icon
    }

@app.cli.command()
def seed_templates():
    """Popula o banco com os templates iniciais"""
    print("🌱 Iniciando seed dos templates...")
    
    # Limpar templates existentes
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
    with app.app_context():
        db.create_all()
    app.run(debug=True)

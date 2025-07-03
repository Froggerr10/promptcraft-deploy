from flask import Blueprint, request, jsonify
from src.models.user import db
from src.models.project import Project
from src.models.prompt import Prompt, PromptVersion
from datetime import datetime

prompt_bp = Blueprint('prompt', __name__)

@prompt_bp.route('/prompts', methods=['POST'])
def create_prompt():
    """Criar um novo prompt"""
    try:
        data = request.get_json()
        
        # Validação
        if not data.get('title') or not data.get('content') or not data.get('project_id'):
            return jsonify({'success': False, 'error': 'Título, conteúdo e projeto são obrigatórios'}), 400
        
        # Verificar se o projeto existe
        project = Project.query.get_or_404(data['project_id'])
        
        # Em produção, pegar user_id da sessão/token
        user_id = 1  # Mock user
        
        prompt = Prompt(
            title=data['title'],
            content=data['content'],
            description=data.get('description', ''),
            category=data.get('category', ''),
            template_type=data.get('template_type', 'custom'),
            variables=data.get('variables', []),
            project_id=data['project_id'],
            user_id=user_id
        )
        
        db.session.add(prompt)
        db.session.flush()  # Para obter o ID do prompt
        
        # Criar primeira versão
        version = PromptVersion(
            version_number=1,
            content=data['content'],
            description=data.get('description', ''),
            variables=data.get('variables', []),
            prompt_id=prompt.id
        )
        
        db.session.add(version)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'prompt': prompt.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500
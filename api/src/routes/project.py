from flask import Blueprint, request, jsonify
from src.models.user import db
from src.models.project import Project
from src.models.prompt import Prompt
from datetime import datetime

project_bp = Blueprint('project', __name__)

@project_bp.route('/projects', methods=['GET'])
def get_projects():
    """Listar todos os projetos do usuário"""
    try:
        # Em produção, pegar user_id da sessão/token
        user_id = 1  # Mock user
        
        projects = Project.query.filter_by(user_id=user_id).order_by(Project.updated_at.desc()).all()
        
        return jsonify({
            'success': True,
            'projects': [project.to_dict() for project in projects]
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@project_bp.route('/projects', methods=['POST'])
def create_project():
    """Criar um novo projeto"""
    try:
        data = request.get_json()
        
        # Validação
        if not data.get('name') or not data.get('idea'):
            return jsonify({'success': False, 'error': 'Nome e ideia são obrigatórios'}), 400
        
        # Em produção, pegar user_id da sessão/token
        user_id = 1  # Mock user
        
        project = Project(
            name=data['name'],
            idea=data['idea'],
            description=data.get('description', ''),
            user_id=user_id
        )
        
        db.session.add(project)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'project': project.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

@project_bp.route('/projects/<int:project_id>', methods=['GET'])
def get_project(project_id):
    """Obter um projeto específico"""
    try:
        # Em produção, verificar se o projeto pertence ao usuário
        project = Project.query.get_or_404(project_id)
        
        return jsonify({
            'success': True,
            'project': project.to_dict()
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@project_bp.route('/projects/<int:project_id>', methods=['PUT'])
def update_project(project_id):
    """Atualizar um projeto"""
    try:
        project = Project.query.get_or_404(project_id)
        data = request.get_json()
        
        # Atualizar campos
        if 'name' in data:
            project.name = data['name']
        if 'idea' in data:
            project.idea = data['idea']
        if 'description' in data:
            project.description = data['description']
        
        project.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'project': project.to_dict()
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

@project_bp.route('/projects/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):
    """Deletar um projeto"""
    try:
        project = Project.query.get_or_404(project_id)
        
        db.session.delete(project)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Projeto deletado com sucesso'
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

@project_bp.route('/projects/<int:project_id>/prompts', methods=['GET'])
def get_project_prompts(project_id):
    """Listar prompts de um projeto"""
    try:
        # Verificar se o projeto existe
        project = Project.query.get_or_404(project_id)
        
        prompts = Prompt.query.filter_by(project_id=project_id).order_by(Prompt.updated_at.desc()).all()
        
        return jsonify({
            'success': True,
            'prompts': [prompt.to_dict() for prompt in prompts]
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
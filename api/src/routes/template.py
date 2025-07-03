from flask import Blueprint, request, jsonify
from src.models.user import db
from src.models.prompt_template import PromptTemplate
from src.models.project import Project

template_bp = Blueprint('template', __name__)

@template_bp.route('/templates', methods=['GET'])
def get_templates():
    """Listar todos os templates disponíveis"""
    try:
        category = request.args.get('category')
        
        query = PromptTemplate.query.filter_by(is_active=True)
        
        if category and category != 'all':
            query = query.filter_by(category=category)
        
        templates = query.order_by(PromptTemplate.category, PromptTemplate.name).all()
        
        return jsonify({
            'success': True,
            'templates': [template.to_dict() for template in templates]
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@template_bp.route('/templates/<template_type>', methods=['GET'])
def get_template(template_type):
    """Obter um template específico pelo tipo"""
    try:
        template = PromptTemplate.query.filter_by(template_type=template_type, is_active=True).first_or_404()
        
        return jsonify({
            'success': True,
            'template': template.to_dict()
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
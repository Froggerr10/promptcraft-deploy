from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from src.models.user import db

class Prompt(db.Model):
    __tablename__ = 'prompts'
    __table_args__ = {'extend_existing': True}
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.String(100))
    is_template = db.Column(db.Boolean, default=False)  # Se é um template pré-definido
    template_type = db.Column(db.String(100))  # Tipo do template (puv, persona, etc.)
    variables = db.Column(db.JSON)  # Variáveis do prompt em formato JSON
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    versions = db.relationship('PromptVersion', backref='prompt', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'description': self.description,
            'category': self.category,
            'is_template': self.is_template,
            'template_type': self.template_type,
            'variables': self.variables,
            'project_id': self.project_id,
            'user_id': self.user_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'versions_count': len(self.versions) if self.versions else 0
        }

class PromptVersion(db.Model):
    __tablename__ = 'prompt_versions'
    __table_args__ = {'extend_existing': True}
    
    id = db.Column(db.Integer, primary_key=True)
    version_number = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text)
    variables = db.Column(db.JSON)
    prompt_id = db.Column(db.Integer, db.ForeignKey('prompts.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'version_number': self.version_number,
            'content': self.content,
            'description': self.description,
            'variables': self.variables,
            'prompt_id': self.prompt_id,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
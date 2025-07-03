from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from .user import db

class PromptTemplate(db.Model):
    __tablename__ = 'prompt_templates'
    __table_args__ = {'extend_existing': True}
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(100), nullable=False)
    template_type = db.Column(db.String(100), nullable=False, unique=True)
    variables = db.Column(db.JSON)  # Variáveis esperadas pelo template
    icon = db.Column(db.String(100))  # Nome do ícone para a UI
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'title': self.title,
            'description': self.description,
            'content': self.content,
            'category': self.category,
            'template_type': self.template_type,
            'variables': self.variables,
            'icon': self.icon,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
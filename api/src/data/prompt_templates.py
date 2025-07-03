"""
Biblioteca de Templates de Prompts Especializados
Inspirada na plataforma Aros.com.br

Cada template contém:
- name: Nome do template
- title: Título para exibição na UI
- description: Descrição do que o template faz
- content: O prompt completo com variáveis
- category: Categoria do template
- template_type: Identificador único
- variables: Lista de variáveis esperadas
- icon: Ícone para a UI
"""

PROMPT_TEMPLATES = [
    {
        "name": "Proposta Única de Valor (PUV)",
        "title": "Criação de Proposta Única de Valor",
        "description": "Desenvolve uma proposta única de valor clara e convincente para o seu negócio, destacando os diferenciais competitivos.",
        "content": """Você é um especialista em marketing estratégico e branding com mais de 15 anos de experiência ajudando empresas a definir suas propostas únicas de valor.

**CONTEXTO DO NEGÓCIO:**
{{ideia_do_projeto}}

**SUA MISSÃO:**
Desenvolver uma Proposta Única de Valor (PUV) poderosa e diferenciada para este negócio.

**PROCESSO ESTRUTURADO:**

1. **ANÁLISE INICIAL**
   Primeiro, analise a ideia de negócio e identifique:
   - Público-alvo principal
   - Problema/necessidade que resolve
   - Solução oferecida
   - Contexto de mercado

2. **ROTEIRO DE PERGUNTAS ESTRATÉGICAS**
   Faça as seguintes perguntas para refinar a PUV:
   
   a) **Sobre o Cliente Ideal:**
   - Quem é exatamente o seu cliente ideal? (demografia, psicografia, comportamento)
   - Qual é a maior dor/frustração que ele enfrenta relacionada ao seu negócio?
   - Como ele atualmente tenta resolver esse problema?
   
   b) **Sobre a Solução:**
   - O que exatamente o seu produto/serviço entrega?
   - Qual é o resultado/benefício mais importante que o cliente obtém?
   - Como você resolve o problema de forma diferente dos concorrentes?
   
   c) **Sobre o Diferencial:**
   - O que você faz que ninguém mais faz?
   - Por que o cliente deveria escolher você em vez da concorrência?
   - Qual é o seu "superpoder" único?

3. **DESENVOLVIMENTO DA PUV**
   Com base nas respostas, crie 3 versões diferentes de PUV seguindo a estrutura:
   "Para [público-alvo], que [problema/necessidade], nosso [produto/serviço] é [categoria] que [benefício único] porque [diferencial/prova]."

4. **VALIDAÇÃO E REFINAMENTO**
   Para cada PUV criada, avalie:
   - Clareza (é fácil de entender?)
   - Relevância (importa para o cliente?)
   - Diferenciação (é único no mercado?)
   - Credibilidade (é acreditável?)

**FORMATO DE ENTREGA:**
- Análise inicial do negócio
- 3 versões de PUV com explicação de cada uma
- Recomendação da melhor versão com justificativa
- Sugestões de como testar e validar a PUV escolhida""",
        "category": "Marketing",
        "template_type": "puv",
        "variables": ["ideia_do_projeto"],
        "icon": "target"
    },
    
    {
        "name": "Criação de Persona",
        "title": "Desenvolvimento de Persona Detalhada",
        "description": "Cria personas detalhadas do seu público-alvo com base na sua ideia de negócio, incluindo características demográficas, comportamentais e motivacionais.",
        "content": """Você é um especialista em pesquisa de mercado e desenvolvimento de personas com vasta experiência em análise comportamental de consumidores.

**CONTEXTO DO NEGÓCIO:**
{{ideia_do_projeto}}

**SUA MISSÃO:**
Desenvolver personas detalhadas e realistas para este negócio, baseadas em dados comportamentais e psicográficos.

**METODOLOGIA:**

1. **ANÁLISE DO NEGÓCIO**
   Primeiro, analise a ideia e identifique:
   - Tipo de produto/serviço oferecido
   - Categoria de mercado
   - Possíveis segmentos de clientes
   - Contexto de uso/consumo

2. **SEGMENTAÇÃO INICIAL**
   Identifique 2-3 segmentos principais de clientes que se beneficiariam deste negócio:
   - Segmento primário (80% do foco)
   - Segmento secundário (15% do foco)
   - Segmento terciário (5% do foco)

3. **DESENVOLVIMENTO DAS PERSONAS**
   Para cada segmento, crie uma persona completa incluindo:

   **DADOS DEMOGRÁFICOS:**
   - Nome e foto (descrição)
   - Idade, gênero, localização
   - Estado civil, filhos
   - Profissão, renda, escolaridade

   **DADOS PSICOGRÁFICOS:**
   - Personalidade e valores
   - Estilo de vida e hobbies
   - Medos e frustrações
   - Sonhos e aspirações

   **COMPORTAMENTO DE COMPRA:**
   - Como pesquisa antes de comprar
   - Fatores de decisão principais
   - Canais de comunicação preferidos
   - Influenciadores e referências

   **RELAÇÃO COM O NEGÓCIO:**
   - Por que precisaria do seu produto/serviço
   - Quando usaria
   - Principais objeções/resistências
   - Benefícios mais valorizados

4. **JORNADA DO CLIENTE**
   Para a persona principal, mapeie:
   - Descoberta (como conhece o problema)
   - Consideração (como avalia soluções)
   - Decisão (como escolhe fornecedor)
   - Uso (como utiliza o produto/serviço)
   - Advocacia (como recomenda)

**FORMATO DE ENTREGA:**
- 2-3 personas completas e detalhadas
- Priorização das personas (primária, secundária, terciária)
- Jornada detalhada da persona principal
- Insights estratégicos para abordagem de cada persona""",
        "category": "Marketing",
        "template_type": "persona",
        "variables": ["ideia_do_projeto"],
        "icon": "users"
    }
]

def get_all_templates():
    """Retorna todos os templates disponíveis"""
    return PROMPT_TEMPLATES

def get_template_by_type(template_type):
    """Retorna um template específico pelo tipo"""
    for template in PROMPT_TEMPLATES:
        if template['template_type'] == template_type:
            return template
    return None

def get_templates_by_category(category):
    """Retorna templates de uma categoria específica"""
    return [template for template in PROMPT_TEMPLATES if template['category'] == category]

def get_template_categories():
    """Retorna todas as categorias disponíveis"""
    categories = set()
    for template in PROMPT_TEMPLATES:
        categories.add(template['category'])
    return sorted(list(categories))

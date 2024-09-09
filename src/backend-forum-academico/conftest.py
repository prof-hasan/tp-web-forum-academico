import sys
import os

# Caminho do diretório raiz do projeto
# Mesmo com essa configuração, o pytest não consegue encontrar os modulos do projeto
# Isso é estranho pois é exatamente a mesma configuração feita no main.py
project_root = os.path.dirname(__file__)
backend_path = os.path.join(project_root, 'src', 'backend-forum-academico')
sys.path.append(backend_path)




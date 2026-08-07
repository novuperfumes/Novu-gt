import os
import re

src_dir = 'frontend/src'

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.ts', '.tsx')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            if 'http://localhost:3000' in content:
                # Replace backtick strings: `http://localhost:3000/foo` -> `${import.meta.env.VITE_API_URL}/foo`
                content = content.replace('`http://localhost:3000', '`${import.meta.env.VITE_API_URL}')
                
                # Replace single quote strings: 'http://localhost:3000/foo' -> import.meta.env.VITE_API_URL + '/foo'
                content = re.sub(r"'http://localhost:3000([^']*)'", r"import.meta.env.VITE_API_URL + '\1'", content)
                
                # Replace double quote strings: "http://localhost:3000/foo" -> import.meta.env.VITE_API_URL + "/foo"
                content = re.sub(r'"http://localhost:3000([^"]*)"', r'import.meta.env.VITE_API_URL + "\1"', content)
                
                with open(filepath, 'w') as f:
                    f.write(content)
                print(f"Updated {filepath}")

#!/usr/bin/env python3
"""
Static Analysis Tool for JavaScript and CSS Files
Generates Abstract Syntax Trees (AST) for all JavaScript and CSS files in the project
"""

import os
import json
from pathlib import Path


def get_js_files(root_dir):
    """Find all JavaScript files in the project"""
    js_files = []
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.js'):
                js_files.append(os.path.join(root, file))
    return js_files


def get_css_files(root_dir):
    """Find all CSS files in the project"""
    css_files = []
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.css'):
                css_files.append(os.path.join(root, file))
    return css_files


def create_mock_js_ast(file_path, file_content):
    """
    Create a mock AST representation for JavaScript files since we can't assume esprima is installed
    In a real scenario, we would use esprima.parse(file_content) here
    """
    # Count basic constructs as a simple analysis
    lines = file_content.split('\n')
    functions = []
    imports = []
    exports = []

    for i, line in enumerate(lines, 1):
        line = line.strip()

        # Detect function declarations
        if line.startswith('function ') or line.startswith('const ') or line.startswith('let '):
            if '=' in line and ('=>' in line or 'function' in line):
                # Arrow function or function assignment
                parts = line.split('=')
                func_name = parts[0].strip().split()[-1] if len(parts) > 0 else 'anonymous'
                functions.append({
                    'name': func_name,
                    'line': i,
                    'type': 'arrow_function' if '=>' in line else 'function_expression'
                })
            elif line.startswith('function '):
                # Regular function declaration
                func_name = line.split(' ')[1].split('(')[0] if len(line.split(' ')) > 1 else 'anonymous'
                functions.append({
                    'name': func_name,
                    'line': i,
                    'type': 'function_declaration'
                })

        # Detect import statements
        if line.startswith('import '):
            imports.append({
                'statement': line,
                'line': i
            })

        # Detect export statements
        if line.startswith('export '):
            exports.append({
                'statement': line,
                'line': i
            })

    return {
        'file': file_path,
        'loc': {'start': {'line': 1, 'column': 0}, 'end': {'line': len(lines), 'column': len(lines[-1])}},
        'ast_structure': {
            'total_lines': len(lines),
            'function_count': len(functions),
            'import_count': len(imports),
            'export_count': len(exports),
            'functions': functions,
            'imports': imports,
            'exports': exports
        }
    }


def create_mock_css_ast(file_path, file_content):
    """
    Create a mock AST representation for CSS files
    """
    lines = file_content.split('\n')
    rules = []
    selectors = []
    properties = []

    current_selector = None

    for i, line in enumerate(lines, 1):
        line = line.strip()

        if line.endswith('{'):
            # Found a selector
            selector = line.rstrip('{').strip()
            selectors.append({
                'selector': selector,
                'line': i
            })
            current_selector = selector

        elif line.endswith('}') and current_selector:
            # End of rule block
            current_selector = None

        elif ':' in line and '{' not in line and '}' not in line and current_selector:
            # Found a property inside a rule
            prop_parts = line.split(':')
            if len(prop_parts) >= 2:
                prop_name = prop_parts[0].strip()
                prop_value = ':'.join(prop_parts[1:]).rstrip(';').strip()

                properties.append({
                    'property': prop_name,
                    'value': prop_value,
                    'rule': current_selector,
                    'line': i
                })

    return {
        'file': file_path,
        'loc': {'start': {'line': 1, 'column': 0}, 'end': {'line': len(lines), 'column': len(lines[-1])}},
        'ast_structure': {
            'total_lines': len(lines),
            'selector_count': len(selectors),
            'property_count': len(properties),
            'selectors': selectors,
            'properties': properties
        }
    }


def analyze_project():
    """Analyze all JavaScript and CSS files in the project"""
    project_root = Path(__file__).parent
    js_files = get_js_files(project_root / 'src')
    css_files = get_css_files(project_root / 'src')

    print(f"Found {len(js_files)} JavaScript files to analyze:\n")
    print(f"Found {len(css_files)} CSS files to analyze:\n")

    all_asts = []

    # Analyze JavaScript files
    for js_file in js_files:
        try:
            with open(js_file, 'r', encoding='utf-8') as f:
                content = f.read()

            ast = create_mock_js_ast(js_file, content)
            all_asts.append(ast)

            print(f"=== AST for {js_file} ===")
            print(json.dumps(ast, indent=2))
            print("\n")

        except Exception as e:
            print(f"Error analyzing {js_file}: {str(e)}")

    # Analyze CSS files
    for css_file in css_files:
        try:
            with open(css_file, 'r', encoding='utf-8') as f:
                content = f.read()

            ast = create_mock_css_ast(css_file, content)
            all_asts.append(ast)

            print(f"=== AST for {css_file} ===")
            print(json.dumps(ast, indent=2))
            print("\n")

        except Exception as e:
            print(f"Error analyzing {css_file}: {str(e)}")

    # Save complete AST data to a file
    output_file = project_root / 'ast_output.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_asts, f, indent=2)

    print(f"All ASTs saved to {output_file}")

    return all_asts


def generate_summary(asts):
    """Generate a summary of the AST analysis"""
    print("\n=== PROJECT SUMMARY ===")

    total_files = len(asts)
    js_files = [ast for ast in asts if ast['file'].endswith('.js')]
    css_files = [ast for ast in asts if ast['file'].endswith('.css')]

    # JavaScript metrics
    js_total_lines = sum(ast['ast_structure']['total_lines'] for ast in js_files)
    js_total_functions = sum(ast['ast_structure']['function_count'] for ast in js_files)
    js_total_imports = sum(ast['ast_structure']['import_count'] for ast in js_files)
    js_total_exports = sum(ast['ast_structure']['export_count'] for ast in js_files)

    # CSS metrics
    css_total_lines = sum(ast['ast_structure']['total_lines'] for ast in css_files)
    css_total_selectors = sum(ast['ast_structure']['selector_count'] for ast in css_files)
    css_total_properties = sum(ast['ast_structure']['property_count'] for ast in css_files)

    print(f"Total files analyzed: {total_files} ({len(js_files)} JS, {len(css_files)} CSS)")
    print(f"Total lines of code: {js_total_lines + css_total_lines}")
    print(f"Total functions: {js_total_functions}")
    print(f"Total imports: {js_total_imports}")
    print(f"Total exports: {js_total_exports}")
    print(f"Total CSS selectors: {css_total_selectors}")
    print(f"Total CSS properties: {css_total_properties}")

    print("\nFile breakdown:")
    for ast in asts:
        file_path = ast['file'].replace(str(Path(__file__).parent), '')
        if ast['file'].endswith('.js'):
            print(f"  {file_path}: "
                  f"{ast['ast_structure']['total_lines']} lines, "
                  f"{ast['ast_structure']['function_count']} functions, "
                  f"{ast['ast_structure']['import_count']} imports")
        elif ast['file'].endswith('.css'):
            print(f"  {file_path}: "
                  f"{ast['ast_structure']['total_lines']} lines, "
                  f"{ast['ast_structure']['selector_count']} selectors, "
                  f"{ast['ast_structure']['property_count']} properties")


if __name__ == "__main__":
    print("Starting static analysis of JavaScript files...")
    asts = analyze_project()
    generate_summary(asts)
    print("\nAnalysis complete!")
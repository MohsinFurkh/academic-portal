import os
import json
import random
import tempfile
import subprocess
import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from openpyxl import Workbook, load_workbook

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
QUESTIONS_FILE = os.path.join(BASE_DIR, 'Exercises', 'questions.json')
EXCEL_FILE = os.path.join(BASE_DIR, 'Student_Marks.xlsx')

def get_questions():
    if not os.path.exists(QUESTIONS_FILE):
        return []
    with open(QUESTIONS_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def run_code_with_input(code, standard_input):
    """Saves code to a temp file, runs it with given input, and returns (stdout, stderr)."""
    with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False, encoding='utf-8') as temp_script:
        temp_script.write(code)
        temp_script_path = temp_script.name

    try:
        # Run the script with a 5-second timeout
        process = subprocess.run(
            ['python', temp_script_path],
            input=standard_input,
            capture_output=True,
            text=True,
            timeout=5
        )
        return process.stdout, process.stderr
    except subprocess.TimeoutExpired:
        return "", "Execution Timed Out"
    except Exception as e:
        return "", str(e)
    finally:
        # Clean up temp file
        if os.path.exists(temp_script_path):
            os.remove(temp_script_path)

def normalize_output(text):
    return text.strip().replace('\r\n', '\n')

@app.route('/api/get_question', methods=['GET'])
def api_get_question():
    questions = get_questions()
    if not questions:
        return jsonify({"error": "No questions available."}), 404
    selected = random.choice(questions)
    if selected.get("test_cases"):
        sample_tc = selected["test_cases"][0]
        sample_input = sample_tc.get("input", "")
        sample_output = sample_tc.get("expected_output", "")
    else:
        sample_input = ""
        sample_output = ""
    
    return jsonify({
        "id": selected["id"], 
        "text": selected["text"],
        "sample_input": sample_input,
        "sample_output": sample_output
    })

@app.route('/api/evaluate', methods=['POST'])
def api_evaluate():
    data = request.json
    name = data.get('name', '').strip()
    sap_id = data.get('sap_id', '').strip()
    question_id = data.get('question_id')
    code = data.get('code', '')

    if not name or not sap_id or question_id is None or not code:
        return jsonify({"error": "Missing required fields"}), 400

    questions = get_questions()
    question = next((q for q in questions if q['id'] == question_id), None)
    
    if not question:
        return jsonify({"error": "Question not found"}), 404

    test_cases = question.get('test_cases', [])
    if not test_cases:
        # If there are no test cases, we can't reliably grade it, but let's give 7 to be nice, or 0.
        marks = 0
    else:
        passed = 0
        total = len(test_cases)
        
        for tc in test_cases:
            tc_input = tc.get('input', '')
            expected_output = tc.get('expected_output', '')
            
            stdout, stderr = run_code_with_input(code, tc_input)
            
            # Simple evaluation logic: outputs must match when stripped.
            if stderr:
                continue # Failed this test due to error
            
            if normalize_output(stdout) == normalize_output(expected_output):
                passed += 1

        marks = round((passed / total) * 7.0, 2)

    # Log to Excel
    log_to_excel(name, sap_id, question_id, marks)

    return jsonify({"marks": marks, "total_marks": 7, "message": "Evaluation successful"})

def log_to_excel(name, sap_id, question_id, marks):
    try:
        if not os.path.exists(EXCEL_FILE):
            wb = Workbook()
            ws = wb.active
            ws.title = "Marks"
            ws.append(["Timestamp", "Name", "SAP ID", "Question ID", "Marks Out of 7"])
        else:
            wb = load_workbook(EXCEL_FILE)
            ws = wb.active

        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        ws.append([timestamp, name, sap_id, question_id, marks])
        wb.save(EXCEL_FILE)
    except Exception as e:
        print(f"Error saving to Excel: {e}")

if __name__ == '__main__':
    # Run on port 5000
    app.run(host='127.0.0.1', port=5000, debug=True)

#!/bin/bash
# Render startup script for Flask app

# Get the port from Render environment
PORT=${PORT:-5000}

# Start Flask with explicit binding
python -c "
import os
from app import app

# Force production mode
app.config['DEBUG'] = False
app.config['ENV'] = 'production'

# Get port from environment
port = int(os.environ.get('PORT', $PORT))

print(f'Starting Flask app on port {port}...')
print(f'Binding to 0.0.0.0:{port}')

# Run with explicit host and port
app.run(host='0.0.0.0', port=port, debug=False, threaded=True)
"

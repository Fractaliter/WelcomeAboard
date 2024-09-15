from flask import Flask
from company_routes import company_bp

app = Flask(__name__)

# Register company routes blueprint
app.register_blueprint(company_bp)

if __name__ == '__main__':
    app.run(debug=True)
    
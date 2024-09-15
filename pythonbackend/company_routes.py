from flask import Blueprint, request, jsonify
from botocore.exceptions import ClientError
from config import get_dynamodb_resource

# Create a Flask Blueprint for company-related routes
company_bp = Blueprint('company', __name__)

# Get DynamoDB resource and table
dynamodb = get_dynamodb_resource()
company_table = dynamodb.Table('Company')

# Create (POST) operation
@company_bp.route('/company', methods=['POST'])
def create_company():
    data = request.json
    try:
        company_table.put_item(Item={
            'companyID': data['companyID'],
            'name': data['name'],
            'location': data['location'],
            'industry': data.get('industry', 'Not specified'),
            'foundedYear': data.get('foundedYear', 2024)
        })
        return jsonify({"message": "Company created successfully"}), 201
    except ClientError as e:
        return jsonify({"error": str(e)}), 500
    
    
# Read (GET ALL) operation
@company_bp.route('/company/all', methods=['GET'])
def get_all_companies():
    response = company_table.scan()
    return jsonify(response['Items'])

# Read (GET) operation
@company_bp.route('/company/<int:companyID>', methods=['GET'])
def get_company(companyID):
    try:
        response = company_table.get_item(Key={'companyID': companyID})
        item = response.get('Item', {})
        if item:
            return jsonify(item), 200
        else:
            return jsonify({"message": "Company not found"}), 404
    except ClientError as e:
        return jsonify({"error": str(e)}), 500

# Update (PUT) operation
@company_bp.route('/company/<int:companyID>', methods=['PUT'])
def update_company(companyID):
    data = request.json
    try:
        response = company_table.update_item(
            Key={'companyID': companyID},
            UpdateExpression="set #name=:n, #location=:l,#industry=:i,#foundedYear=:f",
            ExpressionAttributeNames={
                '#name': 'name',
                '#location': 'location',
                '#industry': 'industry',
                '#foundedYear':'foundedYear'
            },
            ExpressionAttributeValues={
                ':n': data['name'],
                ':l': data['location'],
                ':i': data['industry'],
                ':f': data['foundedYear']
            },
            ReturnValues="UPDATED_NEW"
        )
        return jsonify({"message": "Company updated successfully", "updatedAttributes": response['Attributes']}), 200
    except ClientError as e:
        return jsonify({"error": str(e)}), 500

# Delete (DELETE) operation
@company_bp.route('/company/<int:companyID>', methods=['DELETE'])
def delete_company(companyID):
    try:
        company_table.delete_item(Key={'companyID': companyID})
        return jsonify({"message": "Company deleted successfully"}), 200
    except ClientError as e:
        return jsonify({"error": str(e)}), 500

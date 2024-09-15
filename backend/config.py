import boto3
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get AWS credentials and region from environment variables
aws_access_key = os.getenv('PYTHON_AWS_ACCESS_KEY_ID')
aws_secret_key = os.getenv('PYTHON_AWS_SECRET_ACCESS_KEY')
aws_region = os.getenv('PYTHON_AWS_REGION')

def get_dynamodb_resource():
    # Initialize DynamoDB resource using credentials from .env
    dynamodb = boto3.resource(
        'dynamodb',
        region_name=aws_region,
        aws_access_key_id=aws_access_key,
        aws_secret_access_key=aws_secret_key
    )
    return dynamodb

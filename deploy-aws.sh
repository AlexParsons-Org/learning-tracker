#!/bin/bash

echo "🚀 Deploying Learning Tracker to AWS..."

# Configuration
REGION="us-east-1"
ECR_REPO_NAME="learning-tracker"
ECS_CLUSTER_NAME="learning-tracker-cluster"
ECS_SERVICE_NAME="learning-tracker-service"
TASK_DEFINITION_NAME="learning-tracker-task"

# Build and tag Docker image
echo "🐳 Building Docker image..."
docker build -t $ECR_REPO_NAME .

# Get AWS account ID
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_URI="$AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$ECR_REPO_NAME"

# Create ECR repository if it doesn't exist
echo "📦 Setting up ECR repository..."
aws ecr create-repository --repository-name $ECR_REPO_NAME --region $REGION 2>/dev/null || true

# Login to ECR
echo "🔑 Logging into ECR..."
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ECR_URI

# Tag and push image
echo "📤 Pushing image to ECR..."
docker tag $ECR_REPO_NAME:latest $ECR_URI:latest
docker push $ECR_URI:latest

# Create ECS cluster if it doesn't exist
echo "🏗️ Setting up ECS cluster..."
aws ecs create-cluster --cluster-name $ECS_CLUSTER_NAME --region $REGION 2>/dev/null || true

# Create task definition
echo "📋 Creating ECS task definition..."
cat > task-definition.json << EOF
{
  "family": "$TASK_DEFINITION_NAME",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::$AWS_ACCOUNT_ID:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "learning-tracker",
      "image": "$ECR_URI:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        },
        {
          "name": "DATABASE_URL",
          "value": "\$DATABASE_URL"
        },
        {
          "name": "NEXTAUTH_URL",
          "value": "\$NEXTAUTH_URL"
        },
        {
          "name": "NEXTAUTH_SECRET",
          "value": "\$NEXTAUTH_SECRET"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/learning-tracker",
          "awslogs-region": "$REGION",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
EOF

# Register task definition
aws ecs register-task-definition --cli-input-json file://task-definition.json --region $REGION

# Create or update ECS service
echo "🚀 Deploying ECS service..."
aws ecs create-service \
  --cluster $ECS_CLUSTER_NAME \
  --service-name $ECS_SERVICE_NAME \
  --task-definition $TASK_DEFINITION_NAME \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx],assignPublicIp=ENABLED}" \
  --region $REGION 2>/dev/null || \
aws ecs update-service \
  --cluster $ECS_CLUSTER_NAME \
  --service $ECS_SERVICE_NAME \
  --task-definition $TASK_DEFINITION_NAME \
  --region $REGION

echo "✅ Deployment complete!"
echo "📋 Next steps:"
echo "   1. Configure your VPC subnets and security groups in the script"
echo "   2. Set up RDS PostgreSQL database"
echo "   3. Configure environment variables in ECS"
echo "   4. Set up Application Load Balancer"
echo "   5. Configure Route 53 for your domain"

# Cleanup
rm -f task-definition.json
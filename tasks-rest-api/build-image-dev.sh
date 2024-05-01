#!/bin/bash
set -e
aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin 362392363900.dkr.ecr.eu-west-2.amazonaws.com
docker buildx build --platform=linux/amd64 -t dev-internal-task-api-ecr-repository .
docker tag dev-internal-task-api-ecr-repository:latest 362392363900.dkr.ecr.eu-west-2.amazonaws.com/dev-internal-task-api-ecr-repository:latest
docker push 362392363900.dkr.ecr.eu-west-2.amazonaws.com/dev-internal-task-api-ecr-repository:latest
git tag dev-deployment-"$(date +%Y%m%d%H%M%S)"
git push --tags

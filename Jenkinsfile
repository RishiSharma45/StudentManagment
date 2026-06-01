pipeline {
    agent any

    stages {

        stage('Git Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t student-management:v4 .'
            }
        }

        stage('Load Image To Minikube') {
            steps {
                bat 'minikube image load student-management:v4'
            }
        }

        stage('Deploy To Kubernetes') {
            steps {
                bat 'kubectl apply -f k8s/'
                bat 'kubectl rollout restart deployment student-management'
            }
        }
    }
}
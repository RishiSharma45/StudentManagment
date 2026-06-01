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
                sh 'docker build -t student-management:v4 .'
            }
        }

        stage('Load Image To Minikube') {
            steps {
                sh 'minikube image load student-management:v4'
            }
        }

        stage('Deploy To Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/'
                sh 'kubectl rollout restart deployment student-management'
            }
        }
    }
}
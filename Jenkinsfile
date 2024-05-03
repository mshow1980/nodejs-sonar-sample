pipeline {
    agent any 
    tools {
        jdk 'jdk17'
        nodejs 'node16'
    }
    stages {
        stage ('clean workspace') {
            steps {
                cleanWs()
            }
        }
        stage (' Checkout SCM') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/mshow1980/nodejs-sonar-sample.git']])
            }
        }
        stage ('Building application') {
            steps {
                sh ' npm install'
            }
        }
        stage ('SOnarQube Analysis') {
            steps {
                withSonarQubeEnv(credentialsId: 'SOnar-token') {
                        sh """ -Dsonar.projectKey=nodejs-sonar-sample \
                            -Dsonar.sources=. """
                    }
                }
            }
        stage ('SOnar Quality Gate') {
            steps {
                waitForQualityGate abortPipeline: false, credentialsId: 'SOnar-token'
            }
        }
    }
}
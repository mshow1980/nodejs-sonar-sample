pipeline {
    agent any 
    tools {
        jdk 'jdk17'
        nodejs 'nodejs16'
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
        stage ('SOnarQube Analysis') {
            steps {
                withSonarQubeEnv(credentialsId: 'SOnar-token') {
                    sh ' npm run sonar'
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
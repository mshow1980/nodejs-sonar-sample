pipeline {
    agent any 
    tools {
        jdk 'jdk17'
        nodejs 'node16'
    }
    environment {
        SCANNER_HOME=tool 'sonar-scanner'
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
        stage ('Sonarqube analysis') {
            steps {
                script {
                    sh " npm run sonar"
                    }
                }
            }
        }
    }

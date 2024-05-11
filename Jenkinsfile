pipeline {
    agent any
    tools {
        nodejs 'node16'
        jdk 'jdk17'
    }
    environment {
        SCANNER_HOME = tool 'sonar-scanner'
        DOCKER_USERNAME = 'mshow1980'
        APP_NAME = 'nodejs-scion-scope'
        IMAGE_NAME = "${ DOCKER_USERNAME}"+"/"+"${APP_NAME}"
        RELEASE = "3.0"
        IMAGE_TAG = "${RELEASE}"+"${BUILD_NUMBER}"
        REGISTRY_CREDS = 'docker-login'
    }
    stages {
        stage('CleanWS') {
            steps {
                cleanWs()
            }
        }
        stage('Checkout SCM') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/mshow1980/nodejs-sonar-sample.git']])
            }
        }
        stage('installing Dependencies') {
            steps {
                script{
                    sh'npm install'
                }
            }
        }       
        stage ('Sonarqube analysis'){
            steps {
                script {
                    withSonarQubeEnv(credentialsId: 'SOnar-Token') {
                    sh """
                    npm install sonar-scanner
                    npm run sonar 
                    """
                    }
                }
            }
        }
        stage ('Quality gate'){
            steps{
                script{
                    waitForQualityGate abortPipeline: false, credentialsId: 'SOnar-Token'
                }
            }
        }
        stage ('OWASP Dependency-Check Vulnerabilities') {
            steps {
                script{
                dependencyCheck additionalArguments: ''' 
                    -o "./" 
                    -s "./"
                    -f "ALL" 
                    --prettyPrint''', odcInstallation: 'OWASP-DC'
                dependencyCheckPublisher pattern: 'dependency-check-report.xml'
                }
            }
        }
        stage('TRIVY FS SCAN'){
            steps{
                script{
                    sh 'trivy fs . > trivyfile.txt'
                    }
                }
            }
        stage ('Deploying ARtifact'){
            steps{
                script{
                    nexusArtifactUploader credentialsId: 'Nexus-login', 
                    groupId: 'release', 
                    nexusUrl: '100.26.228.243:8081/repository/nodejs-hosted/',
                    nexusVersion: 'nexus2', 
                    protocol: 'http', 
                    repository: 
                    'http://100.26.228.243:8081/repository/nodejs-hosted/', 
                    version: '3.68'
                    sh 'npm publish'
                }
            }
        }        
        stage ('Building  Push Image') {
            steps {
                script{
                withDockerRegistry(credentialsId: 'docker-login', toolName: 'docker') {
                    docker_image = docker.build "${IMAGE_NAME}"
                    docker_image.push("${IMAGE_TAG}")
                    docker_image.push("latest")
                    }
                }    
            }
        }
        stage ("TRIVY Image SCAN"){
            steps{
                    sh "trivy --timeout 10m image mshow1980/nodejs-sonar-sample:latest > trivyimage.txt "
            }
        post{
            always{
                slackSend channel: 'automation-group', 
                color: 'Blue', 
                message: '"started ${JOB_NAME} ${BUILD_NUMBER} (<${BUILD_URL}|Open>)"', 
                teamDomain: 'scionventuresllc', 
                tokenCredentialId: 'Slack-Token'
                }
            }
        }
        stage ('Delete docker image') {
            steps {
                script {
                    sh """
                    docker rmi ${IMAGE_NAME}
                    """
                    }
                }
            }
        }
        post {
            always {
                emailext attachLog: true, 
                attachmentsPattern: 'trivyimage.txt,trivyfile.txt', 
                body: '"Please go to ${BUILD_URL} and verify the build"', 
                subject: '"Job \'${JOB_NAME}\' (${BUILD_NUMBER}) is waiting for input",', 
                to: 'scionventureslls@gmail.com'
                }
            }
        }

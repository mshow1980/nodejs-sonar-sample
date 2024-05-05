const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner({
  serverUrl: 'http://3.82.4.90:9000/',
       options : {
	    'sonar.projectDescription': 'This is a Node JS application',
	    'sonar.projectName': 'YouTube-Skit',
	    'sonar.projectKey':'YouTube-Skit',
	    'sonar.login': 'sqa_c89ff6a802b6329debbe58b654c915093b5fbc37',
	    //'sonar.login': 'YWRtaW4=',
	    //'sonar.password': 'Q29udHJvbDEw',
            'sonar.projectVersion':'1.0',
	    'sonar.language':'js',
            'sonar.sourceEncoding':'UTF-8',
            'sonar.sources': '.',
	  //'sonar.tests': 'specs',
          //'sonar.inclusions' : 'src/**'
       },
}, () => {});
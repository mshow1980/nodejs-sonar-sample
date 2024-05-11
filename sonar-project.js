const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner({
  serverUrl: 'http://54.243.12.66:9000/',
       options : {
	    'sonar.projectDescription': 'This is a Node JS application',
	    'sonar.projectName': 'nodejs-sonar-sample',
	    'sonar.projectKey':'nodejs-sonar-sample',
	    'sonar.login': 'sqa_575b9c24a66829ffc84d797b8d76b8ac97497fd4',
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
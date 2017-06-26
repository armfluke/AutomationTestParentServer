### Required:
* Only a Node.js environment is required. On a command line, we require to have node and npm commands. That's it, nothing more. Other tools such as the TypeScript compiler, grunt or typings tools are automatically integrated in the dev enviromennt. Installing or having any of these tools already globally installed will have no effect on your build environment.
* npm 3+ is required. You could either update your npm package if you are using a Node.js < 5. If not, we recommend installing a 5+ Node.js.
* MongoDB

### Installation

* Clone the source code:
 * ```git clone https://Thanakit.Songsirisuk@git.sami.int.thomsonreuters.com/Amorn.Doowa/eikontester_parent.git```
* Setup the modules:
 * ```npm install```
* Start the testing server
 * ```npm start```

### API
* /test
 * Sends a GET request to the client, which initializes the testing. This API requires a 3 query parameter. name(name of test product e.g.EikonLight), test(name of test e.g.InstallationTest), url(url of installer e.g.http://bams-apac-sami-api.int.thomsonreuters.com/artifactory/default.generic.global/eikon-setup/packages/EikonOnElectron/Installer/EikonLight-installer-win32-x64_1.0.111.exe)
* /getres
 * This API provides an interface to show test results from MongoDB

### How to run test
* Start mongoDB server(mongod). You can edit path of MongoDB server at config.json
* Start the server by running npm start (express server)
* Wait to receive IP from the client(s)
* Send GET request to /test to start testing
* Wait for the result. 
* The /getres route will show the results of testing from MongoDB

### Result Log
* Results will be placed in the TestLogs directory as result.json with the timestamp as the name of the directory and a copy of it will be placed in MongoDB tests collection
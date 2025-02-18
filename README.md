# BankTransaction

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
## Setup 
1.Install Node.js → Version 18.20.3
2.Install Angular → Version 19.2
3.Navigate to Project Folder → Run
  cd your-project-folder
  npm install
4.Run the Application → Open in the default browser
  ng server --o

## Future Improvement
1.Implement Data Security → Add encryption & decryption for data integrity.
2.Improve UI for Mobile → Make the application fully responsive.
3.Integrate Authentication → Add an HTTP Interceptor for authentication & authorization.
4.Connect to Backend → Implement actual APIs and backend services.
5.Enhance UI Design → Create an elegant, user-friendly UI.
6.Optimize Performance →
  .Improve Ag-Grid Performance (Lazy loading, Virtual Scrolling).
  .Reduce Unnecessary API Calls using caching.
  .Optimize Change Detection with OnPush strategy.
  .Improve Directive Efficiency for highlighting transactions.

## know Issues
1.Custom Directive (appSuspiciousHighlighter) Not Working Properly
 .The directive is implemented but not highlighting transactions correctly.
 .Possible Fix: Debug the Directive Selector & Input Property.

2.Single Detail View & List View Should Use the Same Component
 .Need to refactor the component to support both single transaction details and multi transaction view dynamically.

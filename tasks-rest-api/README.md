<div align="center">
  📦 :octocat:
</div>

<h1 align="center">
  microservice template
</h1>

<p align="center">
   Template for all microservices
</p>

### 🧱 Prerequisites

Following dependencies needs to be downloaded and installed on your system for building and running the application.

- [NodeJs 16.x LTS](https://nodejs.org/download/release/latest-v16.x/)
- [Postgres 13.x](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

#### Install NodeJs with Node Version Manager (nvm)

You will likely need to switch between multiple Node.js versions based on the needs of different projects you're working on. Node Version Manager, more commonly called `nvm`, is the most popular way to install multiple versions of NodeJs.

1. Download and install the latest stable release of `nvm` from [windows-nvm repository](https://github.com/coreybutler/nvm-windows/releases)
2. Once the installation is complete, open the command prompt or power shell as administrator and install activate the latest release of Node.js 14.x

   ```shell
   nvm list available
   nvm install 16
   nvm use 16
   ```

#### Install Visual Studio Code and Recommended Extensions

It is recommended you install [Visual Studio Code](https://code.visualstudio.com/), for developing with Node.js on Windows. Additionally, Install the following extensions or pick and choose which seem the most useful to you.

1. [Node.js Extension Pack](https://marketplace.visualstudio.com/items?itemName=waderyan.nodejs-extension-pack)
2. [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
3. [Remote Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
4. [Remote WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
5. [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

### 🏃‍♀️ Run Project in the Local Development Environment

1. To configure the database, clone and run the [database-schema](https://github.com/Velaris-CSM/database-schema) repository. Detailed instructions are available in the [README](https://github.com/Velaris-CSM/database-schema#-run-migration-scripts) file.

2. Clone this repository and install the dependencies.

   ```
   git clone https://github.com/Velaris-CSM/ms-template-v3.git
   cd ms-template-v3
   npm install
   ```

3. Make a copy of `.env.example` as `.env` and update your database credentials.

   ```
   DB_PORT='5432'
   DB_HOST='db_host'
   DB_NAME='db_name'
   DB_USER='db_user'
   DB_PASSWORD='db_password'
   ```

4. Finally, start the application.

   ```
   npm run start:dev
   ```

### 🏗 Contribution and Development

1. Create a new feature branch from the sprint base branch (Eg: `fy23/sprint1/base-branch`) for the development. It is recommended to follow the naming convention `fy<year>/sprint<sprint_number>/jira-id/small-description` when creating new branches. Adding JIRA ID to the branch name will automatically create links between the branch and the JIRA ticket.

   ```
   git checkout develop
   git checkout -b fy23/sprint1/vel-1/add-readme-file
   ```

2. Do the development, [commit](https://git-scm.com/docs/git-commit) and [push](https://git-scm.com/docs/git-push) the changes. JIRA ID can be added to the body of commit message for creating links between the commit and JIRA ticket. Follow [this guide](https://velaris.atlassian.net/wiki/spaces/VELARIS/pages/330137642/How+to+write+a+good+commit+message) to write a good commit message.

   ```
   git add .
   git commit -m "feat: add new changes" -m "VEL-1"
   git push origin fy23/sprint1/vel-1/add-readme-file
   ```

3. Open a [pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) from GitHub.
   You can add more commits to the PR if it is necessary. Once you are ready to release the changes, go ahead and merge the pull request.

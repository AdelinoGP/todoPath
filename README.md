## todoPath

## Overview

This project is a Todo App built with Ruby on Rails for the backend and React Native for the frontend. It allows users to create, read, update, and delete tasks. Tasks are organized into projects, enabling users to manage their tasks more efficiently by grouping related tasks together.

## Features

- User authentication
- Create, read, update, and delete tasks
- Organize tasks into projects
- Responsive design
- Cross-platform support (iOS and Android)

## Prerequisites

- Ruby (version 2.7 or higher)
- Rails (version 6.0 or higher)
- Node.js (version 12 or higher)
- Yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

## Setup

1. **Clone the repository:**
    ```sh
    git clone /z:/Projetos/todoPath.git
    cd todoPath
    ```

2. **Backend setup:**
    - Install dependencies:
      ```sh
      bundle install
      ```
    - Setup the database:
      ```sh
      rails db:create
      rails db:migrate
      rails db:seed
      ```
    - Start the Rails server:
      ```sh
      rails server
      ```

3. **Frontend setup:**
    - Navigate to the React Native project directory:
      ```sh
      cd frontend
      ```
    - Install dependencies:
      ```sh
      yarn install
      ```
    - Start the React Native development server:
      ```sh
      yarn start
      ```

4. **Running on Android:**
    - Make sure you have an Android emulator running or an Android device connected.
    - Run the app:
      ```sh
      yarn android
      ```

5. **Running on iOS:**
    - Make sure you have an iOS simulator running or an iOS device connected.
    - Run the app:
      ```sh
      yarn ios
      ```

## Usage

- Open the app on your device or emulator.
- Sign up or log in with your credentials.
- Create a project to add tasks to
- Start managing your tasks by adding, updating, or deleting them.

## License

This project is licensed under the GPLv3 License.
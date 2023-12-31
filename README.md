# To Do List

To-Do List is a web application designed for managing your tasks. You can easily add new tasks, mark them as completed, and remove tasks from your list. This app utilizes MongoDB and ExpressJS to make task management a breeze. It also offers the convenience of creating separate lists for various interests using Express routing.

## Technologies Used

The following technologies and tools were used to develop this project:

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- MongoDB
- EJS (Embedded JavaScript)
- NPM modules (body-parser, lodash)

## Getting Started

Follow these steps to get the project up and running on your local machine for development and testing:

### Prerequisites

Make sure you have the following requirements met:

- Latest version of npm and Node.js installed.
- Windows/Linux/Mac machine.

### Installation

To run To do list locally, follow these steps:

1. Clone the repository

   ```bash
   git clone https://github.com/username/projectname.git
   ```

2. Move into the project directory

   ```bash
   cd projectname
   ```
3. You need to create .env into root directory & add following environment variable which includes mongodb username & password.

   ```
   MONGODB_USERNAME=<value>
   MONGODB_PASSWORD=<value>
   ```

4. Install the dependencies

   ```bash
   npm install
   ```

5. Run the application:

   ```bash
   node app.js
   ```

6. Open your web browser and navigate to `http://localhost:3000` to access the website.

### How to Use

Follow these steps to make the most of this to-do list application:

1. Start by viewing the default to-do list, which comes with some sample tasks.
2. To add a new task, simply type it into the input field and click the "+" button.
3. When a task is completed, check the checkbox next to it. This will visually mark the task as done with a strikethrough.
4. If you want to delete a task, click the "<--" button next to the task.
5. For added flexibility, you can create custom to-do lists by adding the list name to the URL, for example: http://localhost:3000/customListName.

## Screenshots

![Home Page](./assests/pictures/homepage.jpg)


![Work Page](./assests/pictures/usagepage.png)

## Contributing

Contributions to this projects are welcome! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:

```bash
git checkout -b feature/your-feature-name
```

3. Make changes and commit them:

```bash
git commit -m "Add your commit message here"
```

4. Push your changes to your branch:

```bash
git push origin feature/your-feature-name
```

5. Create a pull request on the main repository.

Please follow the project's coding guidelines and maintain a clean commit history.

## Contact

If you have any questions or feedback, feel free to reach out to me at therahman14@gmail.com. I'm excited to hear from you and make this project even better!

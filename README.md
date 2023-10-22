<h1 align="center" id="title">Authentication System</h1>

<p align="center"><img src="https://github.com/Paula-Refaat/api-authentication-system-mongoose-express/assets/120932892/ab7f93d7-1448-4433-8d87-91be2014167a" alt="project-image" width="750"></p>

## Introduction:
<p id="description">This repository contains a simple authentication system APT that can be used in any web application. The system supports user registration, login, and password reset. It also encrypts all passwords using a secure hashing algorithm.</p>

## 💻Technologies

Technologies and tools used in the project:
   * Node.js
   * express
   * MongoDB
   * mongoose
   * bcryptjs
   * dotenv
   * express-async-handler
   * express-validator
   * jsonwebtoken
   * morgan
   * nodemailer
   * slugify

<h2>🧐 Features</h2>

Here're some of the project's best features:

* User registration:
Users can register in our application using their email and password. It's important that the email is a valid email address, and the password contains at least 6 characters, numbers, or a combination of both.

* User login: Users can log in to our application using their email and password. It's important that the email and password are present in our database and belong to the respective user.

* Forgot password: When a user forgets their password, the application allows them to reset it by entering their email address. The application verifies that the email address is correct and is present in the database. It then generates a code and sends it to the user's email address. The code is valid for 10 minutes. When the user enters the code, the application hashes it and compares it to the hashed code stored in the database. If the codes match and the code has not expired, the user is allowed to reset their password.


## 🛠️ Installation Steps:
<p>1. node.js</p>

```
npm init
```
<p>2. express</p>

```
npm install express
```

<p>3. mongoose</p>

```
npm install mongoose
```

<p>4. bcryptjs</p>

```
npm install bcryptjs
```

<p>5. jsonwebtoken</p>

```
npm install jsonwebtoken
```

<p>6. express-validator</p>

```
npm install express-validator
```

<p>7. express-async-handler</p>

```
npm install express-async-handler
```

<p>8. morgan</p>

```
npm install morgan
```

<p>9. nodemailer</p>

```
npm install nodemailer
```

<p>10. dotenv</p>

```
npm install dotenv
```
<p>11. mrgan</p>

```
npm install morgan
```
<p>12. slugify</p>

```
npm install slugify
```

## Contributing
If you are interested in contributing to the Authentication System, please feel free to submit a pull request. We welcome all contributions!

## Contact
If you have any questions or feedback, please feel free to contact us at [poularefaat86@gmail.com].

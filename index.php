<?php

// didsplay error messages and set the active status based on user information

session_start();  // necessary to access session data


// define an array of error messages that occur during login and or register process (retrived from the session)
$errors = [
    'login' => $_SESSION['login_error'] ?? '',
    'register' => $_SESSION['register_error'] ?? ''
];

$activeForm = $_SESSION['active_form'] ?? 'login';

session_unset();   // remove all existing session variables but session remains active

function showError($error){
    return !empty($error) ? "<p class='error-message'>$error</p>" : '';
}

function isActiveForm($formName, $activeForm) {
    return $formName === $activeForm ? 'active' : '';
}

?>



<!doctype html>
<html lang="en">
  <head>  
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  
    <title>m&m stores</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
        <div class="container">

            <!-- login section -->
            <div class="form-box <?php  isActiveForm('login', $activeForm); ?>" id="login-form">
                <form action="login_register.php" method="POST">
                    <h2>Login</h2>
                    <!-- call the show error funciton ---->
                     <?php showError($errors['login']); ?>
                    <input type="email" name="email" id="" placeholder="Email" required>
                    <input type="password" name="password" id="" placeholder="Password" required>
                    <button type="submit" name="login">Login</button>
                    <p>Don't have an account? <a href="#" onclick="showForm('register-form')">Register</a></p>
                </form>
            </div>


            <!-- register section -->

             <div class="form-box <?php  isActiveForm('register', $activeForm); ?>" id="register-form">
                <form action="login_register.php" method="POST">
                    <h2>Register</h2>
                    <?php showError($errors['register']); ?>
                    <input type="text" name="fullname" id="" placeholder="Full Name">
                    <input type="email" name="email" id="" placeholder="Email" required>
                    <select name="role" id="">
                        <option value="">-- Select a role --</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <input type="password" name="password" id="" placeholder="Password" required>
                    <button type="submit" name="register">Register</button>
                    <p>Already have an account? <a href="#" onclick="showForm('login-form')">Login</a></p>
                </form>
            </div>
        </div>

    

    <script src="script.js"></script>
  </body>
</html>
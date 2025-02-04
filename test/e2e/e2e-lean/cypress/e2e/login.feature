Feature: User Login - Positive and Negative Scenarios

  # Positive Scenario
  Scenario: Successful Login
    Given the user is on the login page
    When the user enters a valid email and password
    When the user clicks on the "Login" button    
    Then the system should redirect him/her to the welcome page

  # Negative Scenarios
  Scenario: Incorrect Email with Correct Password
    Given the user is on the login page
    When the user enters an incorrect email and a correct password
    When the user clicks on the "Login" button
    Then the system should display an error message stating "Invalid credentials"

  Scenario: Correct Email with Incorrect Password
    Given the user is on the login page
    When the user enters a correct email and an incorrect password
    When the user clicks on the "Login" button
    Then the system should display an error message stating "Invalid credentials"

  Scenario: Both Email and Password Incorrect
    Given the user is on the login page
    When the user enters an incorrect email and an incorrect password
    When the user clicks on the "Login" button
    Then the system should display an error message stating "Invalid credentials"

  Scenario: Empty Email with Correct Password
    Given the user is on the login page
    When the user leaves the email field empty and enters a correct password
    When the user clicks on the "Login" button
    Then the system should display a message stating that the field "email" is required

  Scenario: Correct Email with Empty Password
    Given the user is on the login page
    When the user enters a correct email and leaves the password field empty
    When the user clicks on the "Login" button
    Then the system should display a message stating that the field "password" is required

  Scenario: Both Email and Password Fields Empty
    Given the user is on the login page
    When the user leaves both the email and password fields empty
    When the user clicks on the "Login" button
    Then the system should display a message stating that the fields are required
Feature: User Logout

  Scenario: Successful Logout
    Given the user is authenticated and on any page of the system
    When the user clicks on the "Logout" button
    Then the system should automatically redirect him/her to the login page

  Scenario: Failed Logout due to session already closed
    Given the user tries to access the system without authentication
    Then the system should automatically redirect him/her to the login page
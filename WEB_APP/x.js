// POST /teacher/signup {first_name, middle_name, sur_name,email, gender,user_name,password}

// Return 401 if a valid JWT that contains phone number and user type is not provided

// Return 400 if first_name is not provided
// Return 400 if first_name is less than 3
// Return 400 if first_name is greater 115

// Return 400 if middle_name is not provided
// Return 400 if middle_name is less than 3
// Return 400 if middle_name is greater 115

// Return 400 if sur_name is not provided
// Return 400 if sur_name is less than 3
// Return 400 if sur_name is greater 115

// Return 400 if email is not provided
// Return 400 if email is not valid

// Return 400 if password is not defined.
// Return 400 if password is less than 8 characters

// Return 400 if gender is not defined.
// Return 400 if gender is niether male nor female

// Return 400 if user_name is not defined.
// Return 400 if user_name is less than 3 characters.
// Return 403 if user_name is already taken

// Return 201 if the above cases are falsy.
//      Create  Teacher object
//      send a  valid json web token

// Function to create a cookie with a random value
function createCookie() {
    var randomValue = Math.random().toString(36).substring(2);
    document.cookie = "work=" + randomValue + "; path=/";
}

// Call the function to create the cookie
createCookie();

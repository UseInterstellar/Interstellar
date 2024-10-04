<?php
session_start();

// Function to get all cookies
function getCookies() {
    $cookies = [];
    foreach ($_COOKIE as $name => $value) {
        $cookies[] = [
            'name' => $name,
            'value' => $value,
            'last_visited' => isset($_SESSION[$name]) ? $_SESSION[$name] : 'Never'
        ];
    }
    return $cookies;
}

// Function to block a user
function blockUser($cookieName) {
    setcookie($cookieName, '', time() - 3600, '/'); // Delete the cookie
    $_SESSION['blocked'] = true;
}

// Handle block request
if (isset($_GET['block'])) {
    blockUser($_GET['block']);
    header("Location: control_panel.php");
    exit();
}

// Update last visited time
foreach ($_COOKIE as $name => $value) {
    $_SESSION[$name] = date('Y-m-d H:i:s');
}

// Check if user is blocked
if (isset($_SESSION['blocked']) && $_SESSION['blocked']) {
    header("Location: https://www.google.com");
    exit();
}

// Save cookies and activation list to a text file
function saveToFile($filename, $data) {
    $file = fopen($filename, 'w');
    fwrite($file, json_encode($data));
    fclose($file);
}

$cookies = getCookies();
saveToFile('cookies.txt', $cookies);
saveToFile('activation_list.txt', $_SESSION);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Cookie Control Panel</title>
</head>
<body>
    <h1>Cookie Control Panel</h1>
    <table border="1">
        <tr>
            <th>Cookie Name</th>
            <th>Cookie Value</th>
            <th>Last Visited</th>
            <th>Action</th>
        </tr>
        <?php foreach ($cookies as $cookie): ?>
        <tr>
            <td><?php echo htmlspecialchars($cookie['name']); ?></td>
            <td><?php echo htmlspecialchars($cookie['value']); ?></td>
            <td><?php echo htmlspecialchars($cookie['last_visited']); ?></td>
            <td><a href="?block=<?php echo urlencode($cookie['name']); ?>">Block</a></td>
        </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>

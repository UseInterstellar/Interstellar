<?php
// Load cookies and blocked users from files
$cookies = json_decode(file_get_contents('cookies.txt'), true) ?? [];
$blocked = json_decode(file_get_contents('blocked.txt'), true) ?? [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];
    $cookieName = $_POST['cookie_name'];

    if ($action === 'block') {
        $blocked[$cookieName] = true;
    } elseif ($action === 'unblock') {
        unset($blocked[$cookieName]);
    }

    file_put_contents('blocked.txt', json_encode($blocked));
    header('Location: sh.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Control Panel</title>
</head>
<body>
    <h1>Cookie Control Panel</h1>
    <table border="1">
        <tr>
            <th>Cookie Name</th>
            <th>Last Visited</th>
            <th>Action</th>
        </tr>
        <?php foreach ($cookies as $name => $lastVisited): ?>
            <tr>
                <td><?php echo htmlspecialchars($name); ?></td>
                <td><?php echo htmlspecialchars($lastVisited); ?></td>
                <td>
                    <?php if (isset($blocked[$name])): ?>
                        <form method="post">
                            <input type="hidden" name="cookie_name" value="<?php echo htmlspecialchars($name); ?>">
                            <input type="hidden" name="action" value="unblock">
                            <button type="submit">Unblock</button>
                        </form>
                    <?php else: ?>
                        <form method="post">
                            <input type="hidden" name="cookie_name" value="<?php echo htmlspecialchars($name); ?>">
                            <input type="hidden" name="action" value="block">
                            <button type="submit">Block</button>
                        </form>
                    <?php endif; ?>
                </td>
            </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>

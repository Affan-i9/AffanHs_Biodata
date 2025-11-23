<?php
require 'db.php';

$pdo = getDBConnection();
$data = json_decode(file_get_contents("php://input"), true);

$action = $_GET['action'] ?? '';

if ($action === 'register') {
    $name = htmlspecialchars(strip_tags($data['name']));
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $password = $data['password'];

    // Validasi Password 8 Karakter
    if (strlen($password) < 8) {
        echo json_encode(['success' => false, 'message' => 'Password minimal harus 8 karakter!']);
        exit;
    }

    // Cek apakah email sudah ada
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => false, 'message' => 'Email sudah terdaftar!']);
        exit;
    }

    // Hash Password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    try {
        $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
        if ($stmt->execute([$name, $email, $hashed_password])) {
            echo json_encode(['success' => true, 'message' => 'Registrasi berhasil! Silakan login.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Gagal mendaftar.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
    }

} elseif ($action === 'login') {
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $password = $data['password'];

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        // Hapus password dari respons
        unset($user['password']);
        echo json_encode([
            'success' => true,
            'message' => 'Login berhasil!',
            'user' => $user
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Email atau password salah!']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid action']);
}
?>
<?php
// ---------- CONEXIÓN ----------
$conexion = new mysqli("localhost", "root", "", "boceto_incriptos");

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$mensaje = "";

// ---------- VALIDAR DNI Y REGISTRAR TURNO ----------
if (isset($_POST["dni"]) && isset($_POST["turno"])) {
    $dni = $_POST["dni"];
    $turno_id = $_POST["turno"];

    // ¿El tutor existe?
    $buscarTutor = $conexion->query("SELECT * FROM tutor WHERE dni = '$dni'");

    if ($buscarTutor->num_rows === 0) {
        $mensaje = "❌ El DNI ingresado no está registrado como tutor.";
    } else {
        // Registrar inscripción
        $conexion->query("INSERT INTO inscriptos (dni_tutor, id_turno) VALUES ('$dni', '$turno_id')");
        $conexion->query("UPDATE turno SET ocupado = 1 WHERE id = '$turno_id'");
        $mensaje = "✔ Te anotaste correctamente.";
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Turnos para Tutores</title>
    <style>
        body { font-family: Arial; background: #eef2f3; padding: 20px; }
        .container { max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px; }
        input, select { width: 100%; padding: 10px; margin-bottom: 15px; }
        button { padding: 10px; width: 100%; background: #008000; color: white; border: none; cursor: pointer; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 10px; border: 1px solid #ccc; text-align: center; }
        .libre { background: #8cff8c; }
        .ocupado { background: #ff7b7b; }
        .msg { padding: 10px; margin-bottom: 10px; border-radius: 5px; }
    </style>
</head>
<body>

<div class="container">
    <h2>Anotarse a un Turno</h2>

    <?php if ($mensaje): ?>
        <div class="msg"><?= $mensaje ?></div>
    <?php endif; ?>

    <form method="POST">
        <label>Ingrese su DNI</label>
        <input type="text" name="dni" required>

        <label>Seleccione un turno</label>
        <select name="turno" required>
            <option value="">Elegir turno...</option>

            <?php
            $turnos = $conexion->query("SELECT * FROM turno");

            while ($t = $turnos->fetch_assoc()):
                $disabled = $t["ocupado"] == 1 ? "disabled" : "";
                $estadoTexto = $t["ocupado"] == 1 ? " (Ocupado)" : " (Libre)";
            ?>
                <option value="<?= $t["id"] ?>" <?= $disabled ?>>
                    <?= $t["fecha"] ?> - <?= $t["dia"] ?> - <?= $t["horario"] ?> <?= $estadoTexto ?>
                </option>
            <?php endwhile; ?>
        </select>

        <button type="submit">Confirmar Turno</button>
    </form>

    <h3>Estado de los turnos</h3>
    <table>
        <tr>
            <th>Fecha</th>
            <th>Día</th>
            <th>Horario</th>
            <th>Estado</th>
        </tr>

        <?php
        $turnos = $conexion->query("SELECT * FROM turno");

        while ($t = $turnos->fetch_assoc()):
            $estado = $t["ocupado"] == 1 ? "ocupado" : "libre";
        ?>
            <tr class="<?= $estado ?>">
                <td><?= $t["fecha"] ?></td>
                <td><?= $t["dia"] ?></td>
                <td><?= $t["horario"] ?></td>
                <td><?= $estado === "libre" ? "Libre" : "Ocupado" ?></td>
            </tr>
        <?php endwhile; ?>
    </table>
</div>

</body>
</html>

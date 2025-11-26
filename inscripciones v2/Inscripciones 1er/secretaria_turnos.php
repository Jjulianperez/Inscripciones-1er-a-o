<?php
// ---------- CONEXIÓN ----------
$conexion = new mysqli("localhost", "root", "", "boceto_incriptos");

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// ---------- GUARDAR TURNO ----------
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $fecha = $_POST["fecha"];
    $dia = $_POST["dia"];
    $horario = $_POST["horario"];

    $sql = "INSERT INTO turno (fecha, dia, horario, ocupado) VALUES ('$fecha', '$dia', '$horario', 0)";
    $conexion->query($sql);
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Agregar Turnos</title>
    <style>
        body { font-family: Arial; background: #fafafa; padding: 20px; }
        .container { max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 10px; }
        input, select { width: 100%; padding: 10px; margin-bottom: 15px; }
        button { padding: 10px; width: 100%; background: #0066cc; color: white; border: none; cursor: pointer; }
        table { width: 100%; margin-top: 20px; border-collapse: collapse; }
        th, td { padding: 10px; border: 1px solid #ddd; text-align: center; }
        .libre { background: #8cff8c; }
        .ocupado { background: #ff7b7b; }
    </style>
</head>
<body>

<div class="container">
    <h2>Agregar Turnos Disponibles</h2>

    <form method="POST">
        <label>Fecha</label>
        <input type="date" name="fecha" required>

        <label>Día</label>
        <input type="text" name="dia" required>

        <label>Horario</label>
        <input type="time" name="horario" required>

        <button type="submit">Agregar Turno</button>
    </form>

    <h3>Turnos disponibles</h3>
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

<?php
include 'config.php';

if(!isset($_SESSION['user'])){
  echo json_encode(['status'=>'error','error'=>'No autorizado']);
  exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if(!is_array($data)){
  echo json_encode(['status'=>'error','error'=>'Payload inválido']); exit;
}

$conn->begin_transaction();
try {
  foreach($data as $item){
    $id = intval($item['id'] ?? 0);
    $descontar = intval($item['descontar'] ?? 0);
    if($id <= 0 || $descontar <= 0) continue;

    // bloquear fila y comprobar
    $stmt = $conn->prepare('SELECT cantidad FROM productos WHERE id = ? FOR UPDATE');
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $res = $stmt->get_result();
    if($res->num_rows === 0){
      $conn->rollback();
      echo json_encode(['status'=>'error','error'=>"Producto no existe: $id"]);
      exit;
    }
    $row = $res->fetch_assoc();
    $actual = intval($row['cantidad']);
    if($actual < $descontar){
      $conn->rollback();
      echo json_encode(['status'=>'error','error'=>"Cantidad insuficiente para producto id $id"]);
      exit;
    }

    $stmt2 = $conn->prepare('UPDATE productos SET cantidad = cantidad - ? WHERE id = ?');
    $stmt2->bind_param('ii', $descontar, $id);
    $stmt2->execute();
  }

  $conn->commit();
  echo json_encode(['status'=>'ok','message'=>'Inventario actualizado correctamente']);
} catch(Exception $e){
  $conn->rollback();
  echo json_encode(['status'=>'error','error'=>$e->getMessage()]);
}
?>
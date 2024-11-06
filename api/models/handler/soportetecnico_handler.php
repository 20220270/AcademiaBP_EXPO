<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class SoporteTecnicoHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $idsoporte = null;
    protected $mensaje = null;
    protected $fechanevio = null;
    protected $estado = null;
    protected $idcliente = null;

    const RUTA_IMAGEN = '../../images/clientes/';

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = "SELECT id_soporte, mensaje, fecha_envio, estado_mensaje,  CONCAT(nombre_cliente, ' ', apellido_cliente) as 'cliente', correo_cliente, foto_cliente
                FROM tb_soporte_tecnico
                INNER JOIN tb_clientes USING(id_cliente)
                WHERE fecha_envio LIKE ? OR estado_mensaje LIKE ? OR nombre_cliente LIKE ? OR apellido_cliente LIKE ?
                ORDER BY id_soporte";
        $params = array($value, $value, $value, $value);
        return Database::getRows($sql, $params);
    }

    public function readAll()
    {
        $sql = "SELECT id_soporte, mensaje, fecha_envio, estado_mensaje,  CONCAT(nombre_cliente, ' ', apellido_cliente) as 'cliente', correo_cliente, foto_cliente
                FROM tb_soporte_tecnico
                INNER JOIN tb_clientes USING(id_cliente)
                ORDER BY id_soporte";
        return Database::getRows($sql);
    }

    //Más vistas para el soporte técnico
    //Consultas más recientes
    public function readAllRecientes()
    {
        $sql = "SELECT id_soporte, mensaje, fecha_envio, estado_mensaje,  CONCAT(nombre_cliente, ' ', apellido_cliente) as 'cliente', correo_cliente, foto_cliente
                FROM tb_soporte_tecnico
                INNER JOIN tb_clientes USING(id_cliente)
                ORDER BY fecha_envio DESC";
        return Database::getRows($sql);
    }

    //Consultas más recientes
    public function readAllVistos()
    {
        $sql = "SELECT id_soporte, mensaje, fecha_envio, estado_mensaje,  CONCAT(nombre_cliente, ' ', apellido_cliente) as 'cliente', correo_cliente, foto_cliente
                FROM tb_soporte_tecnico
                INNER JOIN tb_clientes USING(id_cliente)
                WHERE estado_mensaje = 'Visto'";
        return Database::getRows($sql);
    }

    //Consultas más recientes
    public function readAllAtendidos()
    {
        $sql = "SELECT id_soporte, mensaje, fecha_envio, estado_mensaje,  CONCAT(nombre_cliente, ' ', apellido_cliente) as 'cliente', correo_cliente, foto_cliente
                FROM tb_soporte_tecnico
                INNER JOIN tb_clientes USING(id_cliente)
                WHERE estado_mensaje = 'Atendido'";
        return Database::getRows($sql);
    }

    //Consultas más recientes
    public function readAllPendientes()
    {
        $sql = "SELECT id_soporte, mensaje, fecha_envio, estado_mensaje,  CONCAT(nombre_cliente, ' ', apellido_cliente) as 'cliente', correo_cliente, foto_cliente
                FROM tb_soporte_tecnico
                INNER JOIN tb_clientes USING(id_cliente)
                WHERE estado_mensaje = 'Pendiente'";
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_soporte, mensaje, fecha_envio, estado_mensaje, id_cliente
                FROM tb_soporte_tecnico
                WHERE id_soporte = ?';
        $params = array($this->idsoporte);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_soporte_tecnico
                SET estado_mensaje = ?
                WHERE id_soporte = ?';
        $params = array($this->estado, $this->idsoporte);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_soporte_tecnico
                WHERE id_soporte = ?';
        $params = array($this->idsoporte);
        return Database::executeRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT foto_cliente
                FROM tb_clientes
                WHERE id_cliente = ?';
        $params = array($this->idcliente);
        return Database::getRow($sql, $params);
    }

    //Agregar las consultas al sitio público
    public function createRow()
    {
        $sql = 'INSERT INTO tb_soporte_tecnico(mensaje, id_cliente)
                VALUES(?, ?)';
        $params = array($this->mensaje, $_SESSION['idCliente']);
        return Database::executeRow($sql, $params);
    }
}
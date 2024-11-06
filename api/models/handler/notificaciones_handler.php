<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class NotificacionesHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $idnotificacion = null;
    protected $titulo = null;
    protected $mensjae = null;
    protected $tipo = null;
    protected $fecha = null;
    protected $estado = null;
    protected $idnivel = null;


    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_notificacion, titulo, mensaje, tipo_notificacion, fecha_notificacion, estado_notificacion, id_nivel
                FROM tb_notificaciones
                WHERE titulo LIKE ? OR fecha_notificacion LIKE ? OR estado_notificacion LIKE ?
                ORDER BY id_notificacion';
        $params = array($value, $value, $value);
        return Database::getRows($sql, $params);
    }

    public function readAll()
    {
        $sql = "SELECT n.id_notificacion, n.titulo, n.mensaje, n.tipo_notificacion, n.fecha_notificacion, n.estado_notificacion, n.id_nivel
                FROM tb_notificaciones n
                JOIN tb_niveles_administradores na ON n.id_nivel = na.id_nivel
                WHERE (
                        (SELECT nivel FROM tb_niveles_administradores WHERE id_nivel = ?) = 'Administrador'
                        OR n.id_nivel = ?
                    )
                ORDER BY n.id_notificacion;";
        $params = array($this->idnivel, $this->idnivel);
        return Database::getRows($sql, $params);
    }


    public function readAll2()
    {
        $sql = 'SELECT id_notificacion, titulo, mensaje, tipo_notificacion, fecha_notificacion, estado_notificacion, id_nivel
                FROM tb_notificaciones
                ORDER BY id_notificacion';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_notificacion, titulo, mensaje, tipo_notificacion, fecha_notificacion, estado_notificacion, id_nivel
                FROM tb_notificaciones
                WHERE id_notificacion = ?';
        $params = array($this->idnotificacion);
        return Database::getRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_notificaciones
                WHERE id_notificacion = ?';
        $params = array($this->idnotificacion);
        return Database::executeRow($sql, $params);
    }
}

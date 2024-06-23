<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class AlumnosHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $fechanacimiento = null;
    protected $posicion = null;
    protected $idstaffcategoria = null;
    protected $ididaspago = null;
    protected $estado = null;
    protected $idcliente = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = "SELECT id_alumno, nombre_alumno, apellido_alumno, fecha_nacimiento, posicion_alumno, estado_alumno, categoria, nombre_staff, apellido_staff, numero_dias, mensualidad_pagar,
        CONCAT(nombre_cliente, ' ', apellido_cliente) as 'Encargado' FROM tb_alumnos
        INNER JOIN tb_staffs_categorias USING (id_staff_categorias)
        INNER JOIN tb_categorias_alumnos USING(id_categoria_alumno)
        INNER JOIN tb_staffs USING (id_staff)
        INNER JOIN tb_dias_pagos USING (id_dia_pago)
        INNER JOIN tb_clientes using(id_cliente)
        WHERE nombre_alumno LIKE ? OR apellido_alumno LIKE ? OR categoria LIKE ? OR nombre_staff LIKE ? OR apellido_staff LIKE ? OR numero_dias LIKE ? OR estado_alumno LIKE ?
        ORDER BY id_alumno";
        $params = array($value, $value, $value, $value, $value, $value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        // Llamada al procedimiento almacenado
        $sql = 'CALL sp_insert_alumno(?, ?, ?, ?, ?, ?)';

        $params = array($this->nombre, $this->apellido, $this->fechanacimiento, $this->posicion, $this->ididaspago, $this->idcliente);
        return Database::executeRow($sql, $params);
    }


    public function readAll()
    {
        $sql = "SELECT id_alumno, nombre_alumno, apellido_alumno, fecha_nacimiento, 
    TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()) AS edad,
    posicion_alumno, 
    estado_alumno, 
    categoria, 
    nombre_staff, 
    apellido_staff, 
    numero_dias, 
    mensualidad_pagar,
    CONCAT(nombre_cliente, ' ', apellido_cliente) AS 'Encargado' 
FROM 
    tb_alumnos
INNER JOIN 
    tb_staffs_categorias USING (id_staff_categorias)
INNER JOIN 
    tb_categorias_alumnos USING(id_categoria_alumno)
INNER JOIN 
    tb_staffs USING (id_staff)
INNER JOIN 
    tb_dias_pagos USING (id_dia_pago)
INNER JOIN 
    tb_clientes USING(id_cliente)
ORDER BY 
    id_alumno;";
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_alumno, nombre_alumno, apellido_alumno, fecha_nacimiento, posicion_alumno, id_staff_categorias, id_dia_pago, estado_alumno, id_cliente
        FROM tb_alumnos
        WHERE id_alumno = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_alumnos
                SET nombre_alumno = ?, apellido_alumno = ?, fecha_nacimiento = ?, posicion_alumno = ?, id_staff_categorias = ?, id_dia_pago = ?, estado_alumno = ?, id_cliente = ?
                WHERE id_alumno = ?';
        $params = array($this->nombre, $this->apellido, $this->fechanacimiento, $this->posicion, $this->idstaffcategoria, $this->ididaspago, $this->estado, $this->idcliente, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_alumnos
                WHERE id_alumno = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function readAllStaffCategorias()
    {
        $sql = "SELECT id_staff_categorias, CONCAT(nombre_staff, ' ', apellido_staff, ' - ' , categoria) AS 'nombre_categoria' FROM tb_staffs_categorias
                INNER JOIN tb_staffs USING(id_staff)
                INNER JOIN tb_categorias_alumnos USING(id_categoria_alumno);";
        return Database::getRows($sql);
    }

    public function readAllDiasPago()
    {
        $sql = "SELECT id_dia_pago, CONCAT(numero_dias, ' Días, $', mensualidad_pagar) AS 'dia_pago' FROM tb_dias_pagos;";
        return Database::getRows($sql);
    }

    //Sitio publico

    public function createRowAlumno()
    {
        $sql = 'INSERT INTO tb_alumnos(nombre_alumno, apellido_alumno, fecha_nacimiento, posicion_alumno, id_staff_categorias, id_dia_pago, estado_alumno, id_cliente)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellido, $this->fechanacimiento, $this->posicion, $this->idstaffcategoria, $this->ididaspago, $this->estado, $_SESSION['idCliente']);
        return Database::executeRow($sql, $params);
    }
}

<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla CLIENTE.
*/
class ClienteHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $dui = null;
    protected $correo = null;
    protected $telefono = null;
    protected $direccion = null;
    protected $clave = null;
    protected $estado = null;
    protected $fecha = null;
    protected $imagen = null;

    const RUTA_IMAGEN = '../../images/clientes/';

    /*
    *   Métodos para gestionar la cuenta del cliente.
    */
    public function checkUser($mail, $password)
    {
        $sql = 'SELECT id_cliente, correo_cliente, clave_cliente, estado_cliente
                FROM tb_clientes
                WHERE correo_cliente = ?';
        $params = array($mail);
        $data = Database::getRow($sql, $params);
        if (password_verify($password, $data['clave_cliente'])) {
            $this->id = $data['id_cliente'];
            $this->correo = $data['correo_cliente'];
            $this->estado = $data['estado_cliente'];
            return true;
        } else {
            return false;
        }
    }

    public function checkStatus() {
        $sql = 'SELECT estado_cliente FROM tb_clientes WHERE id_cliente = ?';
        $params = array($this->id);
        $data = Database::getRow($sql, $params);
        if ($data) {
            return $data['estado_cliente'] === 'Activo';
        } else {
            return false;
        }
    }


    // Método para obtener el ID del cliente usando el correo electrónico
    public function getIdByEmail($correo) {
        $sql = 'SELECT id_cliente FROM tb_clientes WHERE correo_cliente = ?';
        $params = array($correo);
        $data = Database::getRow($sql, $params);
        if ($data) {
            return $data['id_cliente'];
        } else {
            return null;
        }
    }

    public function changePassword()
    {
        $sql = 'UPDATE tb_clientes
                SET clave_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->clave, $_SESSION['idCliente']);
        return Database::executeRow($sql, $params);
    }

    public function checkCorreo()
    {
        $sql = 'SELECT correo_cliente, nombre_cliente
                FROM tb_clientes
                WHERE correo_cliente = ?;';
        $params = array($this->correo);
        return Database::getRow($sql, $params);
    }

    public function readProfile()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, correo_cliente, telefono_cliente, dui_cliente, direccion_cliente, foto_cliente, fecha_registro
            FROM tb_clientes
            WHERE id_cliente = ?';
        $params = array($_SESSION['idCliente']);
        return Database::getRow($sql, $params);
    }
    

    public function checkPassword($password)
    {
        $sql = 'SELECT clave_cliente
                FROM tb_clientes
                WHERE id_cliente = ?';
        $params = array($_SESSION['idCliente']);
        $data = Database::getRow($sql, $params);
        // Se verifica si la contraseña coincide con el hash almacenado en la base de datos.
        if (password_verify($password, $data['clave_cliente'])) {
            return true;
        } else {
            return false;
        }
    }


    public function editProfile()
    {
        $sql = 'UPDATE tb_clientes
            SET foto_cliente = ?, nombre_cliente = ?, apellido_cliente = ?, correo_cliente = ?, dui_cliente = ?, telefono_cliente = ?, direccion_cliente = ?
            WHERE id_cliente = ?';
        $params = array($this->imagen, $this->nombre, $this->apellido, $this->correo, $this->dui, $this->telefono, $this->direccion, $_SESSION['idCliente']);
        return Database::executeRow($sql, $params);
    }

    public function editProfile2()
    {
        $sql = 'UPDATE tb_clientes
            SET nombre_cliente = ?, apellido_cliente = ?, correo_cliente = ?, dui_cliente = ?, telefono_cliente = ?, direccion_cliente = ?
            WHERE id_cliente = ?';
        $params = array($this->imagen, $this->nombre, $this->apellido, $this->correo, $this->dui, $this->telefono, $this->direccion, $_SESSION['idCliente']);
        return Database::executeRow($sql, $params);
    }




    /* funcion para cambiar el estado del cliente 
    
    
    1*/
    public function changeStatus()
    {
        $sql = 'UPDATE tb_clientes
                SET estado_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */

    /*
    *  1
    */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = "SELECT id_cliente, CONCAT(nombre_cliente, ' ', apellido_cliente) AS nombre_completo, dui_cliente, correo_cliente, telefono_cliente, direccion_cliente, estado_cliente, fecha_registro, foto_cliente
                FROM tb_clientes
                WHERE CONCAT(nombre_cliente, ' ', apellido_cliente) LIKE ? OR apellido_cliente LIKE ? OR dui_cliente LIKE ? OR correo_cliente LIKE ? OR estado_cliente LIKE ?
                ORDER BY id_cliente";
        $params = array($value, $value, $value, $value, $value);
        return Database::getRows($sql, $params);
    }

    /*
    *  1
    */
    public function readAll()
    {
        $sql = "SELECT id_cliente, CONCAT(nombre_cliente, ' ', apellido_cliente) AS nombre_completo, dui_cliente, correo_cliente, telefono_cliente, direccion_cliente, estado_cliente, fecha_registro, foto_cliente
                FROM tb_clientes
                ORDER BY id_cliente";
        return Database::getRows($sql);
    }

    /*
    *  1
    */
    public function readOne()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, dui_cliente, correo_cliente, telefono_cliente, direccion_cliente, estado_cliente, fecha_registro, foto_cliente
                FROM tb_clientes
                WHERE id_cliente = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_clientes(nombre_cliente, apellido_cliente, correo_cliente, dui_cliente, telefono_cliente, direccion_cliente, clave_cliente, foto_cliente)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->dui, $this->telefono, $this->direccion, $this->clave , $this->imagen);
        return Database::executeRow($sql, $params);
    }

    public function signUpMovil()
    {
        $sql = 'INSERT INTO tb_clientes(nombre_cliente, apellido_cliente, correo_cliente, dui_cliente, telefono_cliente, direccion_cliente, clave_cliente, foto_cliente)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->dui, $this->telefono, $this->direccion, $this->clave , $this->imagen);
        return Database::executeRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_clientes
                SET foto_cliente = ?, estado_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->imagen, $this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function checkDuplicate($value)
    {
        $sql = 'SELECT id_cliente
                FROM tb_clientes
                WHERE dui_cliente = ? OR correo_cliente = ?';
        $params = array($value, $value);
        return Database::getRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_clientes
        WHERE id_cliente = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT foto_cliente
                FROM tb_clientes
                WHERE id_cliente = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    
    
    public function readAlumnos()
    {
        $sql = "SELECT id_alumno, CONCAT(nombre_alumno, ' ', apellido_alumno) as nombre,
                TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()) as edad,
                categoria,
                numero_dias
                FROM tb_alumnos
                INNER JOIN tb_clientes USING (id_cliente)
                INNER JOIN tb_staffs_categorias USING (id_staff_categorias)
                INNER JOIN tb_categorias_alumnos USING (id_categoria_alumno)
                INNER JOIN tb_dias_pagos USING (id_dia_pago)
                WHERE id_cliente = ?";
        $params = array($_SESSION['idCliente']);
        return Database::getRows($sql, $params); //Se manda rows, para que traiga todos los datos
    }
}

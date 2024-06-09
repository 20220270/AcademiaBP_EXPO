<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class TallasHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $talla = null;


    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = "SELECT DISTINCT
            cat.id_categoria_producto,
            cat.categoria_producto,
            cat.imagen_categoria,
            tal.id_talla,
            tal.talla,
            col.id_color,
            col.color
        FROM 
            tb_categorias_productos AS cat
        JOIN
            tb_tallas AS tal ON 1=1
        JOIN
            tb_colores AS col ON 1=1
        GROUP BY tal.id_talla
        ORDER BY cat.id_categoria_producto, tal.id_talla, col.id_color";
    
        $params = array();
        return Database::getRows($sql, $params);
    }

    /*Se ocupa select distinct para evitar datos repetidos

    *Les asignamos un identificador a cada campo para relacionarlos a su respectiva tabla

    Ocupamos JOIN (No inner join) para referencias varias tablas (en nuestro caso, colores y tallas) basándonos en una condicion, la cual es 1=1 y que siempre es verdadero,
    lo que nos permite unir las tablas sin problemas. Esto lo hacemos ya que las tres tablas no cuentan con un campo en común.

    Los agrupamos por elementos específicos
     */
    


    public function createRow()
    {
        $sql = 'INSERT INTO tb_tallas(talla)
                VALUES(?)';
        $params = array($this->talla);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_talla, talla
                FROM tb_tallas
                ORDER BY id_talla';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_talla, talla
                FROM tb_tallas
                WHERE id_talla = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_tallas
                SET talla = ?
                WHERE id_talla = ?';
        $params = array($this->talla, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_tallas
                WHERE id_talla = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}

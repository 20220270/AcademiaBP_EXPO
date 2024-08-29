<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class DetalleProductoHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $iddetalle = null;
    protected $idproducto = null;
    protected $idtalla = null;
    protected $idcolor = null;
    protected $existencias = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_detalle_producto, categoria_producto, nombre_producto, imagen_producto, talla, color, existencias_producto 
                FROM tb_detalleProducto
        INNER JOIN tb_productos USING(id_producto)
        INNER JOIN tb_categorias_productos USING(id_categoria_producto)
        INNER JOIN tb_tallas USING(id_talla)
        INNER JOIN tb_colores USING(id_color)
        WHERE categoria_producto LIKE ? OR nombre_producto LIKE ? OR talla LIKE ? OR color LIKE ? OR existencias_producto LIKE ?
        ORDER BY id_detalle_producto';
        $params = array($value, $value, $value, $value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_detalleProducto(id_producto, id_talla, id_color, existencias_producto)
                VALUES(?, ?, ?, ?)';
        $params = array($this->idproducto, $this->idtalla, $this->idcolor, $this->existencias);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_detalle_producto, id_producto, categoria_producto, nombre_producto, imagen_producto, talla, color, existencias_producto 
                FROM tb_detalleProducto
                INNER JOIN tb_productos USING(id_producto)
                INNER JOIN tb_categorias_productos USING(id_categoria_producto)
                INNER JOIN tb_tallas USING(id_talla)
                INNER JOIN tb_colores USING(id_color)
                ORDER BY id_detalle_producto';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_detalle_producto, id_producto, id_talla, id_color, existencias_producto
                FROM tb_detalleProducto
                WHERE id_detalle_producto = ?';
        $params = array($this->iddetalle);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_detalleProducto
                SET id_producto = ?, id_talla = ?, id_color = ?, existencias_producto = ?
                WHERE id_detalle_producto = ?';
        $params = array($this->idproducto, $this->idtalla, $this->idcolor, $this->existencias, $this->iddetalle);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_detalleProducto
                WHERE id_detalle_producto = ?';
        $params = array($this->iddetalle);
        return Database::executeRow($sql, $params);
    }

    //Metodos para los combobox

    public function readProductosCombobox()
    {
        $sql = "SELECT id_producto, nombre_producto FROM tb_productos
        ORDER BY 
        id_producto;";
        return Database::getRows($sql);
    }

    public function readTallasCombobox()
    {
        $sql = "SELECT id_talla, talla FROM tb_tallas
        ORDER BY 
        id_talla;";
        return Database::getRows($sql);
    }

    public function readColoresCombobox()
    {
        $sql = "SELECT id_color, color FROM tb_colores
        ORDER BY 
        id_color;";
        return Database::getRows($sql);
    }
}

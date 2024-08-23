<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class CategoriaProductosHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $nombre = null;
    protected $imagen = null;

    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/categorias_productos/';

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_categoria_producto, categoria_producto, imagen_categoria
                FROM tb_categorias_productos
                WHERE categoria_producto LIKE ?
                ORDER BY id_categoria_producto';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_categorias_productos(categoria_producto, imagen_categoria)
                VALUES(?, ?)';
        $params = array($this->nombre, $this->imagen);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_categoria_producto, categoria_producto, imagen_categoria
                FROM tb_categorias_productos
                ORDER BY id_categoria_producto';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_categoria_producto, categoria_producto, imagen_categoria
                FROM tb_categorias_productos
                WHERE id_categoria_producto = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT imagen_categoria
                FROM tb_categorias_productos
                WHERE id_categoria_producto = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_categorias_productos
                SET imagen_categoria = ?, categoria_producto = ?
                WHERE id_categoria_producto = ?';
        $params = array($this->imagen, $this->nombre, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_categorias_productos
                WHERE id_categoria_producto = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    //Gráfico parametrizado de los productos más vendidos por una categoría seleccionada

    public function readTopproductosCategoria()
    {
        $sql = 'SELECT
    nombre_producto,
    SUM(cantidad_producto) AS total_vendido
    FROM
    tb_detalles_compras
    INNER JOIN tb_detalleProducto USING (id_detalle_producto)
    INNER JOIN tb_productos USING(id_producto)
    INNER JOIN tb_compras USING(id_compra)
    INNER JOIN tb_categorias_productos USING(id_categoria_producto)
    WHERE
    id_categoria_producto = ?
    GROUP BY
    nombre_producto
    ORDER BY
    total_vendido DESC;';
        $params = array($this->id);
        return Database::getRows($sql, $params);
    }
}
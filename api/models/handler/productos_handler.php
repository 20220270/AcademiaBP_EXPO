<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla PRODUCTO.
*/
class ProductoHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id = null;
    protected $categoria = null;
    protected $nombre = null;
    protected $descripcion = null;
    protected $precio = null;
    protected $imagen = null;
    protected $estado = null;
    protected $descuento = null;

    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/productos/';

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_producto, categoria_producto, nombre_producto, descripcion_producto, precio_producto, imagen_producto, estado_producto, descuento_producto, fecha_registro FROM tb_productos
                INNER JOIN tb_categorias_productos USING(id_categoria_producto)
                WHERE nombre_producto LIKE ? OR descripcion_producto LIKE ? OR precio_producto LIKE ? or estado_producto LIKE ?
                ORDER BY id_producto';
        $params = array($value, $value, $value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_productos(id_categoria_producto, nombre_producto, descripcion_producto, precio_producto, imagen_producto, estado_producto, descuento_producto, id_administrador)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->categoria, $this->nombre, $this->descripcion, $this->precio, $this->imagen, $this->estado, $this->descuento, $_SESSION['idAdministrador']);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_producto, categoria_producto, nombre_producto, descripcion_producto, 
        precio_producto, imagen_producto, estado_producto, descuento_producto, fecha_registro FROM tb_productos
                INNER JOIN tb_categorias_productos USING(id_categoria_producto)
                ORDER BY id_producto';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_producto, categoria_producto, nombre_producto, descripcion_producto, 
        precio_producto, imagen_producto, estado_producto, descuento_producto, fecha_registro FROM tb_productos
                INNER JOIN tb_categorias_productos USING(id_categoria_producto)
                WHERE id_producto = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT imagen_producto
                FROM tb_productos
                WHERE id_producto = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_productos
                SET imagen_producto = ?, nombre_producto = ?, descripcion_producto = ?, precio_producto = ?, estado_producto = ?, descuento_producto = ? , id_categoria_producto = ?
                WHERE id_producto = ?';
        $params = array($this->imagen, $this->nombre, $this->descripcion, $this->precio, $this -> estado, $this->descuento, $this->categoria, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_productos
                WHERE id_producto = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function readProductosCategoria()
    {
        $sql = 'SELECT id_producto, id_categoria_producto, nombre_producto, descripcion_producto, precio_producto, imagen_producto, estado_producto, descuento_producto FROM tb_productos
        INNER JOIN tb_categorias_productos USING(id_categoria_producto)
                WHERE id_categoria_producto = ? AND estado_producto = "En venta"
                ORDER BY nombre_producto';
        $params = array($this->categoria);
        return Database::getRows($sql, $params);
    }


       /*
    *   Métodos para generar gráficos.
    */
    public function cantidadProductosCategoria()
    {
        $sql = 'SELECT nombre_categoria, COUNT(id_producto) cantidad_producto
                FROM tb_productos
                INNER JOIN tb_categorias USING(id_categoria)
                GROUP BY nombre_categoria ORDER BY cantidad_producto DESC LIMIT 5';
        return Database::getRows($sql);
    }

    public function porcentajeProductosCategoria()
    {
        $sql = 'SELECT nombre_categoria, ROUND((COUNT(id_producto) * 100.0 / (SELECT COUNT(id_producto) FROM tb_productos)), 2) porcentaje
        FROM tb_productos
        INNER JOIN tb_categorias USING(id_categoria)
        GROUP BY nombre_categoria ORDER BY porcentaje DESC';
        return Database::getRows($sql);
    }

    
    public function commentsProduct()
    {
        $sql = 'SELECT id_valoracion, nombre_producto, comentario_producto, calificacion_producto, nombre_cliente, apellido_cliente, fecha_valoracion from tb_valoraciones
        INNER JOIN tb_detallesordenes USING(id_detalle)
        INNER JOIN tb_ordenes USING(id_orden)
       INNER JOIN tb_productos USING(id_producto) 
       INNER JOIN tb_clientes USING(id_cliente)
        where id_producto = ? AND estado_comentario = "Habilitado"';
        $params = array($this->id);
        //return Database::getRows($sql);
        return Database::getRows($sql, $params);
    }

    /*
    *   Métodos para generar reportes.
    */
    public function productosCategoria()
    {
        $sql = 'SELECT nombre_producto, precio_producto, estado_producto
                FROM tb_productos
                INNER JOIN tb_categorias USING(id_categoria)
                WHERE id_categoria = ?
                ORDER BY nombre_producto';
        $params = array($this->categoria);
        return Database::getRows($sql, $params);
    }
}

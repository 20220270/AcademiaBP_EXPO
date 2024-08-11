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
    protected $iddetalle = null;
    protected $idadmin = null;

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
                WHERE nombre_producto LIKE ? OR precio_producto LIKE ? or estado_producto LIKE ? or descuento_producto LIKE ? OR categoria_producto LIKE ?
                ORDER BY id_producto';
        $params = array($value, $value, $value, $value, $value);
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
        $sql = 'SELECT id_producto, id_categoria_producto, nombre_producto, descripcion_producto, 
        precio_producto, imagen_producto, estado_producto, descuento_producto, fecha_registro FROM tb_productos
                INNER JOIN tb_categorias_productos USING(id_categoria_producto)
                WHERE id_producto = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function readOnee()
    {
        $sql = 'SELECT id_producto, id_categoria_producto, id_detalle_producto, nombre_producto, descripcion_producto, precio_producto, imagen_producto, estado_producto, descuento_producto, existencias_producto, id_talla, id_color, talla, color FROM tb_detalleproducto
                INNER JOIN tb_productos USING(id_producto)
                INNER JOIN tb_categorias_productos USING(id_categoria_producto)
                INNER JOIN tb_tallas USING(id_talla)
                INNER JOIN tb_colores USING(id_color)
                WHERE id_detalle_producto = ?
                GROUP BY talla, color';
        $params = array($this->iddetalle);
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

    public function readProductosCategorias()
    {
        $sql = 'SELECT id_producto, id_categoria_producto, nombre_producto, descripcion_producto, precio_producto, imagen_producto, 
        estado_producto, descuento_producto FROM tb_productos 
                INNER JOIN tb_categorias_productos USING(id_categoria_producto)
                WHERE id_categoria_producto = ? AND estado_producto = "En venta"
                ORDER BY nombre_producto';
        $params = array($this->categoria);
        return Database::getRows($sql, $params);
    }

    public function readProductosCategoria()
    {
        $sql = 'SELECT id_producto, id_categoria_producto, id_detalle_producto, nombre_producto, descripcion_producto, precio_producto, imagen_producto, 
        estado_producto, descuento_producto, existencias_producto, id_talla, id_color,
        talla, color FROM tb_detalleproducto
                INNER JOIN tb_productos USING(id_producto)
                INNER JOIN tb_categorias_productos USING(id_categoria_producto)
                INNER JOIN tb_tallas USING(id_talla)
                INNER JOIN tb_colores USING(id_color)
                WHERE id_categoria_producto = ?  AND id_producto = ? AND estado_producto = "En venta" AND existencias_producto > 0
                ORDER BY nombre_producto';
        $params = array($this->categoria , $this->id);
        return Database::getRows($sql, $params);
    }

    public function productosAdministradores()
    {
        $sql = 'SELECT nombre_producto, precio_producto, estado_producto, tb_productos.fecha_registro
                FROM tb_productos
                INNER JOIN tb_administradores USING(id_administrador)
                WHERE id_administrador = ?
                ORDER BY nombre_producto';
        $params = array($this->idadmin);
        return Database::getRows($sql, $params);
    }


       /*
    *   Métodos para generar gráficos.
    */
    public function productosMasVendids()
    {
        $sql = 'SELECT 
                nombre_producto,
                SUM(cantidad_producto) AS total_vendido
                FROM 
                tb_detalles_compras
                INNER JOIN 
                tb_detalleProducto USING (id_detalle_producto)
                INNER JOIN 
                tb_productos USING (id_producto)
                GROUP BY 
                id_producto
                ORDER BY 
                total_vendido DESC
                LIMIT 5;';
        return Database::getRows($sql);
    }

    public function productosMasVendi2()
    {
        $sql = 'SELECT 	
                nombre_producto,
                imagen_producto,
                estado_producto,
                tb_productos.precio_producto,
                SUM(cantidad_producto) AS total_vendido
                FROM 
                tb_detalles_compras
                INNER JOIN 
                tb_detalleProducto USING (id_detalle_producto)
                INNER JOIN 
                tb_productos USING (id_producto)
                GROUP BY 
                id_producto
                ORDER BY 
                total_vendido DESC
                LIMIT 4;';
        return Database::getRows($sql);
    }

    public function porcentajeProductosCategoria()
    {
        $sql = 'SELECT categoria_producto, ROUND((COUNT(id_producto) * 100.0 / (SELECT COUNT(id_producto) FROM tb_productos)), 2) porcentaje
        FROM tb_productos
        INNER JOIN tb_categorias_productos USING(id_categoria_producto)
        GROUP BY categoria_producto ORDER BY porcentaje DESC';
        return Database::getRows($sql);
    }

    public function clientesConMasCompras()
    {
        $sql = "SELECT 
	            CONCAT(nombre_cliente, ' ', apellido_cliente) as nombre,
                COUNT(co.id_compra) AS total_compras
                FROM 
                tb_clientes c
                INNER JOIN 
                tb_compras co ON c.id_cliente = co.id_cliente
                GROUP BY 
                c.id_cliente, c.nombre_cliente, c.apellido_cliente
                ORDER BY 
                total_compras DESC
                LIMIT 7;";
        return Database::getRows($sql);
    }

    public function cantidadProductosCategoria()
    {
        $sql = 'SELECT categoria_producto, COUNT(id_producto) cantidad_producto
                FROM tb_productos
                INNER JOIN tb_categorias_productos USING(id_categoria_producto)
                GROUP BY categoria_producto ORDER BY cantidad_producto DESC LIMIT 5';
        return Database::getRows($sql);
    }

    public function productosConMejorRating()
    {
        $sql = "SELECT 
                p.nombre_producto, 
                ROUND(AVG(v.calificacion_producto), 1) AS promedio_calificacion
                FROM 
                tb_productos p
                INNER JOIN 
                tb_detalleProducto dp ON p.id_producto = dp.id_producto
                INNER JOIN 
                tb_detalles_compras dc ON dp.id_detalle_producto = dc.id_detalle_producto
                INNER JOIN 
                tb_valoraciones v ON dc.id_detalle_compra = v.id_detalle_compra
                WHERE 
                v.calificacion_producto IS NOT NULL
                GROUP BY 
                p.nombre_producto
                ORDER BY 
                promedio_calificacion DESC
                LIMIT 5;";
        return Database::getRows($sql);
    }

    
    public function commentsProduct()
    {
        $sql = "SELECT id_valoracion, nombre_producto, comentario_producto, calificacion_producto, foto_cliente, nombre_cliente, apellido_cliente, fecha_valoracion from tb_valoraciones
                INNER JOIN tb_detalles_compras USING(id_detalle_compra)
                INNER JOIN tb_compras USING(id_compra)
                INNER JOIN tb_detalleProducto USING(id_detalle_producto) 
                INNER JOIN tb_productos USING(id_producto)
                INNER JOIN tb_clientes USING(id_cliente)
        where id_producto = ? AND estado_comentario = 'Habilitado'";
        $params = array($this->id);
        return Database::getRows($sql, $params);
    }

    /*
    *   Métodos para generar reportes.
    */
    public function productosCategoria()
    {
        $sql = 'SELECT categoria_producto, nombre_producto, descuento_producto, precio_producto, descuento_producto, estado_producto, talla, color, existencias_producto from tb_detalleProducto
                INNER JOIN tb_tallas USING(id_talla)
                INNER JOIN tb_colores USING(id_color)
                INNER JOIN tb_productos USING(id_producto)
                INNER JOIN tb_categorias_productos USING(id_categoria_producto)
                WHERE id_categoria_producto = ?
                ORDER BY nombre_producto';
        $params = array($this->categoria);
        return Database::getRows($sql, $params);
    }
}

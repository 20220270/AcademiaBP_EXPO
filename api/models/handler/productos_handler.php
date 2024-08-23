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
        $params = array($this->imagen, $this->nombre, $this->descripcion, $this->precio, $this->estado, $this->descuento, $this->categoria, $this->id);
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
        talla, color FROM tb_detalleProducto
                INNER JOIN tb_productos USING(id_producto)
                INNER JOIN tb_categorias_productos USING(id_categoria_producto)
                INNER JOIN tb_tallas USING(id_talla)
                INNER JOIN tb_colores USING(id_color)
                WHERE id_categoria_producto = ?  AND id_producto = ? AND estado_producto = "En venta" AND existencias_producto > 0
                ORDER BY nombre_producto';
        $params = array($this->categoria, $this->id);
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
                COUNT(id_compra) AS total_compras
                FROM 
                tb_detalles_compras
                INNER JOIN 
                tb_compras USING(id_compra)
                INNER JOIN 
                tb_clientes USING(id_cliente)
                GROUP BY 
                id_cliente, nombre_cliente, apellido_cliente
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
                nombre_producto, 
                ROUND(AVG(calificacion_producto), 1) AS promedio_calificacion
                FROM tb_valoraciones
                INNER JOIN tb_detalles_compras USING (id_detalle_compra)
                INNER JOIN tb_detalleProducto USING(id_detalle_producto) 
                INNER JOIN tb_productos USING(id_producto)
                WHERE 
                calificacion_producto IS NOT NULL
                GROUP BY 
                nombre_producto
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


    //Reportes predictivos
    //Se explica el funcionamiento de la consulta
    public function reportPredictionsProducts()
    {
        // Consulta SQL para predecir las ventas anuales de los productos
        $sql = 'WITH ventas_mensuales AS ( -- Subconsulta: Calcula las ventas mensuales de cada producto para el año en curso
            SELECT
                id_producto,  -- ID del producto
                MONTH(fecha_registro) AS mes,  -- Mes de la venta
                SUM(cantidad_producto) AS ventas_mes  -- Suma de la cantidad de productos vendidos en ese mes
            FROM 
                tb_detalles_compras  -- Tabla que almacena los detalles de las compras
            INNER JOIN 
                tb_detalleProducto USING (id_detalle_producto)  -- Se une con la tabla de detalles del producto
            INNER JOIN 
                tb_productos USING (id_producto)  -- Se une con la tabla de productos
            WHERE
                YEAR(fecha_registro) = YEAR(CURDATE())  -- Filtra solo las ventas del año actual
            GROUP BY
                id_producto, mes  -- Agrupa por producto y mes
        ),

        -- Subconsulta: Calcula la tendencia de ventas basada en las ventas mensuales
        tendencia_ventas AS (
            SELECT
                id_producto,  -- ID del producto
                AVG(ventas_mes) AS promedio_mensual,  -- Promedio de ventas mensuales
                COUNT(mes) AS meses_activos,  -- Número de meses en los que hubo ventas
                SUM(ventas_mes) AS total_ventas  -- Total de ventas hasta la fecha
            FROM
                ventas_mensuales  -- Utiliza los resultados de la subconsulta anterior
            GROUP BY
                id_producto  -- Agrupa por producto
        ),

        -- Subconsulta: Predice las ventas totales para el año en curso
        prediccion_ventas AS (
            SELECT
                id_producto,  -- ID del producto
                ROUND(total_ventas + (promedio_mensual * (12 - meses_activos)), 0) AS proyeccion_ventas
                -- Calcula la proyección de ventas sumando las ventas actuales con la estimación
                -- basada en el promedio mensual y los meses restantes del año.
            FROM
                tendencia_ventas  -- Utiliza los resultados de la subconsulta anterior
        )

        -- Consulta principal: Selecciona los productos con las mayores proyecciones de ventas
        SELECT
            p.imagen_producto,  -- Imagen del producto
            p.nombre_producto,  -- Nombre del producto
            pv.proyeccion_ventas  -- Proyección de ventas para el año
        FROM
            prediccion_ventas pv  -- Utiliza la subconsulta de predicción de ventas
        JOIN
            tb_productos p ON p.id_producto = pv.id_producto  -- Se une con la tabla de productos para obtener los detalles
        ORDER BY
            pv.proyeccion_ventas DESC  -- Ordena por proyección de ventas en orden descendente
        LIMIT 7;  -- Limita el resultado a los 7 productos con mayor proyección de ventas
    ';

        return Database::getRows($sql);
    }


    public function reportPredictionsProductsRating()
    {
        // Consulta SQL para predecir la calificación promedio final de los productos al final del año
        $sql = 'WITH calificaciones_actuales AS ( -- Subconsulta: Calcula las calificaciones actuales de cada producto en el año en curso
            SELECT 
                id_producto,  -- ID del producto
                COUNT(*) AS num_calificaciones,  -- Número total de calificaciones recibidas
                SUM(calificacion_producto) AS total_calificacion,  -- Suma de todas las calificaciones recibidas
                ROUND(AVG(calificacion_producto), 1) AS promedio_actual  -- Promedio actual de calificaciones, redondeado a un decimal
            FROM 
                tb_valoraciones  -- Tabla que almacena las valoraciones de los productos
            JOIN 
                tb_detalles_compras USING (id_detalle_compra)  -- Se une con la tabla de detalles de compras
            INNER JOIN 
                tb_detalleProducto USING (id_detalle_producto)  -- Se une con la tabla de detalles del producto
            INNER JOIN 
                tb_productos USING (id_producto)  -- Se une con la tabla de productos
            WHERE 
                YEAR(fecha_valoracion) = YEAR(CURDATE())  -- Filtra solo las calificaciones del año actual
            GROUP BY 
                id_producto  -- Agrupa por producto
        ),

        -- Subconsulta: Predice el promedio final de calificaciones al final del año
        prediccion_calificaciones AS (
            SELECT 
                id_producto,  -- ID del producto
                imagen_producto,  -- Imagen del producto
                nombre_producto,  -- Nombre del producto
                promedio_actual,  -- Promedio actual de calificaciones
                ROUND(
                    (total_calificacion + (365 - DAYOFYEAR(CURDATE())) * promedio_actual) / 
                    -- Suma total de calificaciones hasta la fecha más las calificaciones estimadas para los días restantes del año
                    (num_calificaciones + (365 - DAYOFYEAR(CURDATE()))), 1) AS promedio_final
                    -- Se divide por el número total de calificaciones actuales más las calificaciones estimadas
                -- Calcula el promedio final proyectado para el año, redondeado a un decimal
            FROM 
                calificaciones_actuales  -- Utiliza los resultados de la subconsulta anterior
            JOIN 
                tb_productos USING (id_producto)  -- Se une con la tabla de productos para obtener los detalles
        )

        -- Consulta principal: Selecciona los productos con las mayores proyecciones de calificaciones
        SELECT 
            id_producto,  -- ID del producto
            imagen_producto,  -- Imagen del producto
            nombre_producto,  -- Nombre del producto
            promedio_actual,  -- Promedio actual de calificaciones
            promedio_final  -- Promedio final proyectado para el año
        FROM 
            prediccion_calificaciones  -- Utiliza la subconsulta de predicción de calificaciones
        ORDER BY 
            promedio_final DESC  -- Ordena por promedio final en orden descendente
        LIMIT 7;  -- Limita el resultado a los 7 productos con mejor proyección de calificación
    ';

        return Database::getRows($sql);
    }
}

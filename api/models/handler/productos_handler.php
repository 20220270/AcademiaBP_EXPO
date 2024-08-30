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
                LIMIT 5;";
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
        where id_producto = ? AND estado_comentario = 'Habilitado'
        ORDER BY fecha_valoracion";
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
    // Consulta SQL para predecir las ventas anuales de los productos basándose en datos históricos
    $sql = 'WITH ventas_totales AS (-- CTE para calcular las ventas totales de cada producto
    SELECT
        dp.id_producto,  -- Identificador del producto
        SUM(dc.cantidad_producto) AS total_ventas  -- Suma total de ventas de cada producto
        FROM
        tb_detalles_compras dc
        INNER JOIN tb_compras c USING(id_compra)  -- Unir con la tabla de compras
        INNER JOIN tb_detalleProducto dp USING(id_detalle_producto)  -- Unir con la tabla de detalle de producto
    GROUP BY
        dp.id_producto  -- Agrupar por el identificador del producto
    ),

-- CTE para calcular las ventas anuales de cada producto en los últimos 5 años
    ventas_anuales AS (
    SELECT
        dp.id_producto,  -- Identificador del producto
        YEAR(c.fecha_registro) AS año,  -- Año de la venta
        SUM(dc.cantidad_producto) AS ventas_anuales  -- Suma de ventas anuales de cada producto
    FROM
        tb_detalles_compras dc
        INNER JOIN tb_compras c USING(id_compra)  -- Unir con la tabla de compras
        INNER JOIN tb_detalleProducto dp USING(id_detalle_producto)  -- Unir con la tabla de detalle de producto
    WHERE
        YEAR(c.fecha_registro) >= YEAR(CURDATE()) - 5  -- Considerar solo los últimos 5 años
    GROUP BY
        dp.id_producto, año  -- Agrupar por identificador de producto y año
    ),

-- CTE para identificar la tendencia de ventas, el número de años activos y las ventas máximas por año
    tendencia_ventas AS (
    SELECT
        id_producto,  -- Identificador del producto
        SUM(ventas_anuales) AS total_ventas,  -- Suma total de ventas en los últimos 5 años
        COUNT(DISTINCT año) AS años_activos,  -- Contar el número de años en los que hubo ventas
        MAX(ventas_anuales) AS ventas_maximas  -- Máximo de ventas en un año para este producto
    FROM
        ventas_anuales
    GROUP BY
        id_producto  -- Agrupar por identificador de producto
    ),

-- CTE para proyectar las ventas para el próximo año basado en la tendencia de ventas y el ajuste por años activos
    proyeccion_ventas AS (
    SELECT
        id_producto,  -- Identificador del producto
        ROUND(ventas_maximas * (1 + (5 - años_activos) / 5), 0) AS proyeccion_proximo_año  -- Proyección ajustada de ventas para el próximo año
        -- A medida que los años_activos aumentan, el factor de crecimiento disminuye
    FROM
        tendencia_ventas
    )

-- Consulta final para obtener los datos relevantes
    SELECT
    p.imagen_producto,  -- Imagen del producto
    p.nombre_producto,  -- Nombre del producto
    vt.total_ventas AS ventas_totales,  -- Total de ventas históricas
    pv.proyeccion_proximo_año  -- Proyección de ventas para el próximo año
    FROM
    ventas_totales vt
    JOIN
    proyeccion_ventas pv ON vt.id_producto = pv.id_producto  -- Unir con la tabla de proyecciones de ventas
    JOIN
    tb_productos p ON p.id_producto = vt.id_producto  -- Unir con la tabla de productos
    ORDER BY
    vt.total_ventas DESC  -- Ordenar por ventas totales en orden descendente
    LIMIT 7;  -- Limitar la consulta a los 7 productos más vendidos';

    return Database::getRows($sql);
}



    public function reportPredictionsProductsRating()
    {
        // Consulta SQL para predecir la calificación promedio final de los productos al final del año
        $sql = 'WITH valoraciones_anuales AS ( -- Subconsulta: Calcula el promedio de valoraciones por producto y año
        SELECT
            id_producto,  -- ID del producto
            YEAR(tb_compras.fecha_registro) AS año,  -- Año de la valoración
            AVG(calificacion_producto) AS promedio_anual  -- Promedio de valoraciones del año
        FROM 
            tb_valoraciones  -- Tabla que almacena los detalles de las compras
            INNER JOIN 
            tb_detalles_compras USING (id_detalle_compra)
            INNER JOIN 
            tb_compras USING (id_compra)
        INNER JOIN 
            tb_detalleProducto USING (id_detalle_producto)  -- Se une con la tabla de detalles del producto
        INNER JOIN 
            tb_productos USING (id_producto)  -- Se une con la tabla de productos
        WHERE
            calificacion_producto IS NOT NULL  -- Considera solo registros con valoraciones
        GROUP BY
            id_producto, año  -- Agrupa por producto y año
    ),

    -- Subconsulta: Calcula la tendencia de valoraciones basada en los promedios anuales
    tendencia_valoraciones AS (
        SELECT
            id_producto,  -- ID del producto
            AVG(promedio_anual) AS promedio_historico,  -- Promedio histórico de valoraciones anuales
            COUNT(año) AS años_activos  -- Número de años con valoraciones
        FROM
            valoraciones_anuales  -- Utiliza los resultados de la subconsulta anterior
        GROUP BY
            id_producto  -- Agrupa por producto
    ),

    -- Subconsulta: Predice el promedio de valoraciones para el próximo año
    prediccion_valoraciones AS (
        SELECT
            id_producto,  -- ID del producto
            ROUND(promedio_historico, 2) AS promedio_actual,  -- Promedio de valoraciones del año actual
            ROUND(promedio_historico * (1 + (12 - años_activos) / 12), 2) AS proyeccion_proximo_año  -- Calcula la proyección de valoraciones del próximo año
        FROM
            tendencia_valoraciones  -- Utiliza los resultados de la subconsulta anterior
    )

    -- Consulta principal: Selecciona los productos con las mayores proyecciones de valoraciones
    SELECT
        p.imagen_producto,  -- Imagen del producto
        p.nombre_producto,  -- Nombre del producto
        pv.promedio_actual,  -- Promedio de valoraciones del año actual
        pv.proyeccion_proximo_año,  -- Proyección de valoraciones para el próximo año
        -- Conversión de la proyección a una escala del 1 al 5
        CASE
            WHEN pv.proyeccion_proximo_año <= 2.0 THEN 1
            WHEN pv.proyeccion_proximo_año <= 4.0 THEN 2
            WHEN pv.proyeccion_proximo_año <= 6.0 THEN 3
            WHEN pv.proyeccion_proximo_año <= 8.0 THEN 4
            ELSE 5
        END AS escala_proyeccion
    FROM
        prediccion_valoraciones pv  -- Utiliza la subconsulta de predicción de valoraciones
    JOIN
        tb_productos p ON p.id_producto = pv.id_producto  -- Se une con la tabla de productos para obtener los detalles
    ORDER BY
        pv.proyeccion_proximo_año DESC  -- Ordena por proyección de valoraciones en orden descendente
    LIMIT 7;
    ';

        return Database::getRows($sql);
    }
}

<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class ComprasHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $idcompra = null;
    protected $iddetalle = null;
    protected $nombrecliente = null;
    protected $imagenproducto = null;
    protected $estadocompra = null;
    protected $direccion = null;
    protected $producto = null;
    protected $precioproducto = null;
    protected $cantidad = null;
    protected $personalizacion = null;
    protected $fecha = null;
    protected $idmetodopago = null;
    protected $informacionmetodo = null;

    // Constante para establecer la ruta de las imágenes a mostrar.
    const RUTA_IMAGEN = '../../images/productos/';

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = "SELECT id_compra, CONCAT(nombre_cliente, ' ', apellido_cliente) AS nombre_completo, estado_compra, direccion_compra, p.fecha_registro FROM tb_compras p
                INNER JOIN tb_clientes USING(id_cliente)
                WHERE nombre_cliente LIKE ? OR apellido_cliente LIKE ? OR estado_compra LIKE ? OR p.fecha_registro LIKE ?
                ORDER BY id_compra";
        $params = array($value, $value, $value, $value);
        return Database::getRows($sql, $params);
    }

    public function readAll()
    {
        $sql = "SELECT id_compra, CONCAT(nombre_cliente, ' ', apellido_cliente) AS nombre_completo, estado_compra, direccion_compra, p.fecha_registro, nombre_metodo FROM tb_compras p
        INNER JOIN tb_clientes USING(id_cliente)
        LEFT JOIN tb_metodos_pago USING (id_metodo_pago)
                ORDER BY id_compra";
        return Database::getRows($sql);
    }

    public function readAll2()
    {
        $sql = "SELECT id_compra, CONCAT(nombre_cliente, ' ', apellido_cliente) AS nombre_completo, estado_compra, direccion_compra, p.fecha_registro, nombre_metodo FROM tb_compras p
        INNER JOIN tb_clientes USING(id_cliente)
        LEFT JOIN tb_metodos_pago USING (id_metodo_pago)
                ORDER BY p.fecha_registro";
        return Database::getRows($sql);
    }

    public function readAll3()
    {
        $sql = "SELECT id_compra, CONCAT(nombre_cliente, ' ', apellido_cliente) AS nombre_completo, estado_compra, direccion_compra, p.fecha_registro, nombre_metodo FROM tb_compras p
        INNER JOIN tb_clientes USING(id_cliente)
        LEFT JOIN tb_metodos_pago USING (id_metodo_pago)
                WHERE p.fecha_registro = ?";
        $params = array($this->fecha);
        return Database::getRows($sql, $params);
    }

    public function readOne()
    {
        $sql = "SELECT id_compra, CONCAT(nombre_cliente, ' ', apellido_cliente) AS nombre_completo, estado_compra, direccion_compra, p.fecha_registro, nombre_metodo FROM tb_compras p
        INNER JOIN tb_clientes USING(id_cliente)
        LEFT JOIN tb_metodos_pago USING (id_metodo_pago)
                WHERE id_compra = ?";
        $params = array($this->idcompra);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_compras
                SET estado_compra = ?
                WHERE id_compra = ?';
        $params = array($this->estadocompra, $this->idcompra);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_compras
                WHERE id_compra = ?';
        $params = array($this->idcompra);
        return Database::executeRow($sql, $params);
    }


    //Funcion para el sitio privado: Leer los detalles de cada compra
    public function readDetails()
    {
        $sql = 'SELECT id_detalle_compra, nombre_producto, imagen_producto, tb_productos.precio_producto, cantidad_producto, 
        (tb_productos.precio_producto * cantidad_producto) Subtotal,
        ROUND((tb_productos.precio_producto * cantidad_producto) - (tb_productos.precio_producto * cantidad_producto * tb_productos.descuento_producto / 100), 2) AS SubtotalConDescuento,
        tb_productos.descuento_producto,
        personalizacion
        FROM tb_detalles_compras
        INNER JOIN tb_compras USING(id_compra)
        INNER JOIN tb_detalleproducto USING(id_detalle_producto)
        INNER JOIN tb_productos USING(id_producto) WHERE id_compra = ?';
        $params = array($this->idcompra);
        return Database::getRows($sql, $params);
    }




    public function readFilename()
    {
        $sql = 'SELECT imagen_producto
                 FROM tb_detalles_compras
                         INNER JOIN tb_detalleproducto USING(id_detalle_producto)
                INNER JOIN tb_productos USING(id_producto)
                WHERE id_detalle_compra = ?';
        $params = array($this->iddetalle);
        return Database::getRow($sql, $params);
    }


    /** */
    public function getOrder()
    {
        $this->estadocompra = 'Pendiente';
        $sql = 'SELECT id_compra
                FROM tb_compras
                WHERE estado_compra = ? AND id_cliente = ?';
        $params = array($this->estadocompra, $_SESSION['idCliente']);
        if ($data = Database::getRow($sql, $params)) {
            $_SESSION['idCompra'] = $data['id_compra'];
            return true;
        } else {
            return false;
        }
    }

    // Método para iniciar un pedido en proceso.
    public function startOrder()
    {
        if ($this->getOrder()) {
            return true;
        } else {
            $sql = 'INSERT INTO tb_compras(direccion_compra, id_cliente, estado_compra)
                    VALUES((SELECT direccion_cliente FROM tb_clientes WHERE id_cliente = ?), ?, ?)'; //Se manda la direccion dependiendo el ID del cliente
            $params = array($_SESSION['idCliente'], $_SESSION['idCliente'], $this->estadocompra);
            // Se obtiene el ultimo valor insertado de la llave primaria en la tabla pedido.
            if ($_SESSION['idCompra'] = Database::getLastRow($sql, $params)) {
                return true;
            } else {
                return false;
            }
        }
    }

    // Método para agregar un producto al carrito de compras.
    public function createDetail()
    {
        // Se realiza una subconsulta para obtener el precio del producto.
        $sql = 'INSERT INTO tb_detalles_compras(id_detalle_producto, cantidad_producto, personalizacion, id_compra)
                VALUES(?, ?, ?, ?)';
        $params = array($this->iddetalle, $this->cantidad, $this->personalizacion, $_SESSION['idCompra']);

        return Database::executeRow($sql, $params);
    }

    // Método para obtener los productos que se encuentran en el carrito de compras.
    public function readDetail()
    {
        $sql = 'SELECT 
        id_detalle_compra, 
        imagen_producto,
        nombre_producto, 
        talla,
        color,
        tb_productos.precio_producto, 
        cantidad_producto, 
        (tb_productos.precio_producto * cantidad_producto) AS Subtotal,
        tb_productos.descuento_producto,
        ROUND((tb_productos.precio_producto * cantidad_producto) - (tb_productos.precio_producto * cantidad_producto * tb_productos.descuento_producto / 100), 2) AS subtotal_con_descuento,
        personalizacion
    FROM 
        tb_detalles_compras
    INNER JOIN 
        tb_compras USING(id_compra)
                INNER JOIN tb_detalleproducto USING(id_detalle_producto)
    INNER JOIN 
        tb_productos USING(id_producto)
        INNER JOIN 
        tb_colores USING(id_color)
        INNER JOIN 
        tb_tallas USING(id_talla)
                WHERE id_compra = ?';
        $params = array($_SESSION['idCompra']);
        return Database::getRows($sql, $params);
    }

    //Método para consultar los métodos de pago
    public function readMetodosPago()
    {
        $sql = "SELECT id_metodo_pago, nombre_metodo, imagen_metodo FROM tb_metodos_pago ORDER BY id_metodo_pago";
        return Database::getRows($sql);
    }

    // Método para finalizar un pedido por parte del cliente.
    public function finishOrder()
    {
        $this->estadocompra = 'Finalizada';
        $sql = 'UPDATE tb_compras
                SET estado_compra= ?, id_metodo_pago = ?, informacion_metodo_pago = ?
                WHERE id_compra= ?';
        $params = array($this->estadocompra, $this->idmetodopago, $this->informacionmetodo, $_SESSION['idCompra']);
        return Database::executeRow($sql, $params);
    }

    // Método para actualizar la cantidad de un producto agregado al carrito de compras.
    public function updateDetail()
    {
        $sql = 'UPDATE tb_detalles_compras
                SET cantidad_producto = ?
                WHERE id_detalle_compra = ? AND id_compra = ?';
        $params = array($this->cantidad, $this->iddetalle, $_SESSION['idCompra']);
        return Database::executeRow($sql, $params);
    }

    // Método para eliminar un producto que se encuentra en el carrito de compras.
    public function deleteDetail()
    {
        $sql = 'DELETE FROM tb_detalles_compras
                WHERE id_detalle_compra = ? AND id_compra = ?';
        $params = array($this->iddetalle, $_SESSION['idCompra']);
        return Database::executeRow($sql, $params);
    }


    public function searchOrders()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = ' SELECT id_detalle_compra, 
         id_compra, 
         nombre_producto, 
         imagen_producto, 
         tb_productos.precio_producto, 
         cantidad_producto, 
         nombre_metodo,
         imagen_metodo,
         tb_productos.descuento_producto, 
         (tb_productos.precio_producto * cantidad_producto) AS Subtotal, 
         ROUND((tb_productos.precio_producto * cantidad_producto) - (tb_productos.precio_producto * cantidad_producto * tb_productos.descuento_producto / 100), 2) AS SubtotalConDescuento,
         tb_compras.fecha_registro, 
         estado_compra
     FROM 
         tb_detalles_compras
     INNER JOIN 
         tb_compras USING(id_compra)
         LEFT JOIN tb_metodos_pago USING (id_metodo_pago)
    INNER JOIN tb_detalleproducto USING(id_detalle_producto)
     INNER JOIN 
         tb_productos USING(id_producto) 
                WHERE id_cliente = ? AND (nombre_producto LIKE ? OR tb_compras.fecha_registro LIKE ? OR id_compra LIKE ? or id_detalle_compra LIKE ?)
                ORDER BY id_producto';
        $params = array($_SESSION['idCliente'], $value, $value, $value, $value);
        return Database::getRows($sql, $params);
    }

    //Funcion para el sitio publico: Leer los detalles de cada compra
    public function myOrders()
    {
        $sql = 'SELECT 
         id_detalle_compra, 
         id_compra,  
         nombre_producto, 
         imagen_producto, 
         tb_productos.precio_producto, 
         cantidad_producto,
         nombre_metodo,
         imagen_metodo,
         tb_productos.descuento_producto, 
         (tb_productos.precio_producto * cantidad_producto) AS Subtotal, 
         ROUND((tb_productos.precio_producto * cantidad_producto) - (tb_productos.precio_producto * cantidad_producto * tb_productos.descuento_producto / 100), 2) AS SubtotalConDescuento,
         tb_compras.fecha_registro, 
         estado_compra
        FROM 
         tb_detalles_compras
        INNER JOIN 
        tb_compras USING(id_compra)
        LEFT JOIN tb_metodos_pago USING (id_metodo_pago)
		INNER JOIN tb_detalleproducto USING(id_detalle_producto)
        INNER JOIN 
         tb_productos USING(id_producto)
         WHERE id_cliente = ?
         ORDER BY id_compra';
        $params = array($_SESSION['idCliente']);
        return Database::getRows($sql, $params);
    }

    //Funcion para el sitio publico: Generar un documento con los datos del cliente y la compra realizada
    public function myOrdersReport()
    {
        $sql = "SELECT CONCAT(nombre_cliente, ' ', apellido_cliente) as Cliente,
                correo_cliente,
                telefono_cliente,
                id_detalle_compra, 
                id_compra,
                tb_compras.fecha_registro, 
                nombre_producto, 
                tb_productos.precio_producto, 
                cantidad_producto,
                nombre_metodo,
                imagen_metodo, 
                tb_productos.descuento_producto, 
                (tb_productos.precio_producto * cantidad_producto) AS Subtotal, 
                ROUND((tb_productos.precio_producto * cantidad_producto) - (tb_productos.precio_producto * cantidad_producto * tb_productos.descuento_producto / 100), 2) AS SubtotalConDescuento
                FROM 
                tb_detalles_compras
                INNER JOIN 
                tb_compras USING(id_compra)
                LEFT JOIN tb_metodos_pago USING (id_metodo_pago)
                INNER JOIN 
                tb_clientes USING(id_cliente)
                INNER JOIN 
                tb_detalleproducto USING(id_detalle_producto)
                INNER JOIN 
                tb_productos USING(id_producto)  WHERE id_cliente = ? AND id_compra = ?
                ORDER BY id_compra";
        $params = array($_SESSION['idCliente'], $this->idcompra);
        return Database::getRows($sql, $params);
    }


    //Gráficos de predicción

    public function ventasPredictGraph()
    {
        $sql = "SELECT 
    YEAR(fecha_registro) AS año,
    SUM(cantidad_producto * precio_producto) AS total_ventas_anual
FROM 
    tb_detalles_compras
JOIN 
    tb_compras USING (id_compra)
WHERE 
    MONTH(fecha_registro) <= MONTH(CURDATE()) 
    AND DAY(fecha_registro) <= DAY(CURDATE())
    AND (estado_compra = 'Finalizada' OR estado_compra = 'Entregada')
GROUP BY 
    YEAR(fecha_registro)
ORDER BY 
    año;
";

        return Database::getRows($sql);
    }

//Función para mostrar las ventas registradas de la base de datos
    public function ventasPredictGraph2()
    {
        $sql = "WITH meses AS (
    SELECT DISTINCT YEAR(fecha_registro) AS año, MONTH(fecha_registro) AS mes
    FROM tb_compras
    UNION ALL
    SELECT DISTINCT YEAR(CURDATE()) AS año, mes.mes
    FROM (
        SELECT 1 AS mes UNION ALL
        SELECT 2 UNION ALL
        SELECT 3 UNION ALL
        SELECT 4 UNION ALL
        SELECT 5 UNION ALL
        SELECT 6 UNION ALL
        SELECT 7 UNION ALL
        SELECT 8 UNION ALL
        SELECT 9 UNION ALL
        SELECT 10 UNION ALL
        SELECT 11 UNION ALL
        SELECT 12
    ) AS mes
)

SELECT 
    meses.año,
    meses.mes,
    IFNULL(SUM(CASE WHEN estado_compra = 'Finalizada' OR estado_compra = 'Entregada' THEN cantidad_producto * precio_producto ELSE 0 END), 0) AS total_ventas_mensual
FROM 
    meses
LEFT JOIN 
    tb_compras ON YEAR(tb_compras.fecha_registro) = meses.año AND MONTH(tb_compras.fecha_registro) = meses.mes
LEFT JOIN 
    tb_detalles_compras ON tb_compras.id_compra = tb_detalles_compras.id_compra
GROUP BY 
    meses.año, meses.mes
ORDER BY 
    meses.año, meses.mes;
";

        return Database::getRows($sql);
    }

//Función para mostrar las pérdidas registradas de todos los años
    public function ventasPredictGraph3()
    {
        $sql = "WITH meses AS (
    SELECT DISTINCT YEAR(fecha_registro) AS año, MONTH(fecha_registro) AS mes
    FROM tb_compras
    UNION ALL
    SELECT DISTINCT YEAR(CURDATE()) AS año, mes.mes
    FROM (
        SELECT 1 AS mes UNION ALL
        SELECT 2 UNION ALL
        SELECT 3 UNION ALL
        SELECT 4 UNION ALL
        SELECT 5 UNION ALL
        SELECT 6 UNION ALL
        SELECT 7 UNION ALL
        SELECT 8 UNION ALL
        SELECT 9 UNION ALL
        SELECT 10 UNION ALL
        SELECT 11 UNION ALL
        SELECT 12
    ) AS mes)

    SELECT 
    meses.año,
    meses.mes,
    IFNULL(SUM(CASE WHEN estado_compra = 'Anulada' THEN cantidad_producto * precio_producto ELSE 0 END), 0) AS total_ventas_anuladas_mensual
    FROM 
    meses
    LEFT JOIN 
    tb_compras ON YEAR(tb_compras.fecha_registro) = meses.año AND MONTH(tb_compras.fecha_registro) = meses.mes
    LEFT JOIN 
    tb_detalles_compras ON tb_compras.id_compra = tb_detalles_compras.id_compra
    GROUP BY 
    meses.año, meses.mes
    ORDER BY 
    meses.año, meses.mes;";

        return Database::getRows($sql);
    }

    //Función para la proyección de ventas
    public function ventasPredictGraph4()
    {
        $sql = "WITH meses AS ( -- Generar una lista de meses y años basada en las fechas de registro en tb_compras,
        -- asegurando que todos los meses de todos los años (incluso los futuros) estén presentes
        
    SELECT DISTINCT YEAR(fecha_registro) AS año, MONTH(fecha_registro) AS mes
    FROM tb_compras
    UNION ALL
    -- Agregar todos los meses del año actual para asegurarse de que todos los meses se incluyan
    SELECT DISTINCT YEAR(CURDATE()) AS año, mes.mes
    FROM (
        SELECT 1 AS mes UNION ALL
        SELECT 2 UNION ALL
        SELECT 3 UNION ALL
        SELECT 4 UNION ALL
        SELECT 5 UNION ALL
        SELECT 6 UNION ALL
        SELECT 7 UNION ALL
        SELECT 8 UNION ALL
        SELECT 9 UNION ALL
        SELECT 10 UNION ALL
        SELECT 11 UNION ALL
        SELECT 12
    ) AS mes),

-- Calcular las ventas mensuales para cada mes y año, considerando solo las compras finalizadas o entregadas
    ventas_mensuales AS (
    SELECT 
        meses.año,
        meses.mes,
        -- Sumar las ventas mensuales basadas en el estado de la compra
        IFNULL(SUM(CASE WHEN estado_compra IN ('Finalizada', 'Entregada') THEN cantidad_producto * precio_producto ELSE 0 END), 0) AS total_ventas_mensual
    FROM 
        meses
    -- Vincular las ventas con los meses y años correspondientes
    LEFT JOIN 
        tb_compras ON YEAR(tb_compras.fecha_registro) = meses.año AND MONTH(tb_compras.fecha_registro) = meses.mes
    LEFT JOIN 
        tb_detalles_compras ON tb_compras.id_compra = tb_detalles_compras.id_compra
    GROUP BY 
        meses.año, meses.mes),

-- Calcular el promedio de ventas para cada mes específico (enero, febrero, etc.)
    promedio_mensual_por_mes AS (
    SELECT 
        mes,
        -- Calcular el promedio de ventas mensuales por mes
        AVG(total_ventas_mensual) AS promedio_ventas_mensual
    FROM 
        ventas_mensuales
    GROUP BY 
        mes)

-- Seleccionar el promedio de ventas para cada mes y proyectarlo para el próximo año
    SELECT 
    mes,
    -- Redondear el promedio de ventas para una mejor presentación
    ROUND(promedio_ventas_mensual, 2) AS proyeccion_ventas_mensual
    FROM 
    promedio_mensual_por_mes
    ORDER BY 
    mes;";

        return Database::getRows($sql);
    }


    //Función para la proyección de pérdidas
    public function ventasPredictGraph5()
    {
        $sql = "WITH meses AS ( -- Paso 1: Generar la lista de meses para todos los años y para el próximo año
    -- Seleccionar todos los años y meses únicos basados en los registros existentes en tb_compras
    SELECT DISTINCT YEAR(fecha_registro) AS año, MONTH(fecha_registro) AS mes
    FROM tb_compras
    UNION ALL
    -- Añadir todos los meses del año actual
    SELECT YEAR(CURDATE()) AS año, mes.mes
    FROM (
        SELECT 1 AS mes UNION ALL
        SELECT 2 UNION ALL
        SELECT 3 UNION ALL
        SELECT 4 UNION ALL
        SELECT 5 UNION ALL
        SELECT 6 UNION ALL
        SELECT 7 UNION ALL
        SELECT 8 UNION ALL
        SELECT 9 UNION ALL
        SELECT 10 UNION ALL
        SELECT 11 UNION ALL
        SELECT 12
    ) AS mes
    UNION ALL
    -- Añadir todos los meses del próximo año
    SELECT YEAR(CURDATE()) + 1 AS año, mes.mes
    FROM (
        SELECT 1 AS mes UNION ALL
        SELECT 2 UNION ALL
        SELECT 3 UNION ALL
        SELECT 4 UNION ALL
        SELECT 5 UNION ALL
        SELECT 6 UNION ALL
        SELECT 7 UNION ALL
        SELECT 8 UNION ALL
        SELECT 9 UNION ALL
        SELECT 10 UNION ALL
        SELECT 11 UNION ALL
        SELECT 12
    ) AS mes
),

-- Paso 2: Calcular las ventas anuladas mensuales para todos los meses
ventas_anuladas_mensuales AS (
    SELECT 
        meses.año,  -- Año del mes
        meses.mes,  -- Mes del año
        IFNULL(SUM(CASE WHEN estado_compra = 'Anulada' THEN cantidad_producto * precio_producto ELSE 0 END), 0) AS total_ventas_anuladas_mensual
        -- Calcular el total de ventas anuladas para el mes actual. Si no hay registros, se devuelve 0.
    FROM 
        meses
    LEFT JOIN 
        tb_compras ON YEAR(tb_compras.fecha_registro) = meses.año AND MONTH(tb_compras.fecha_registro) = meses.mes
    LEFT JOIN 
        tb_detalles_compras ON tb_compras.id_compra = tb_detalles_compras.id_compra
    GROUP BY 
        meses.año, meses.mes
    -- Agrupar por año y mes para calcular el total de ventas anuladas para cada combinación de año y mes
),

-- Paso 3: Calcular el promedio mensual de las ventas anuladas basado en datos históricos
promedio_mensual AS (
    SELECT 
        mes,  -- Mes del año
        AVG(total_ventas_anuladas_mensual) AS promedio_ventas_anuladas_mensual
        -- Calcular el promedio de ventas anuladas mensuales
    FROM 
        ventas_anuladas_mensuales
    WHERE 
        año < YEAR(CURDATE()) OR (año = YEAR(CURDATE()) AND mes <= MONTH(CURDATE()))
        -- Filtrar para incluir datos hasta el mes actual del año en curso
    GROUP BY 
        mes
    -- Agrupar por mes para obtener el promedio mensual
)

-- Paso 4: Proyectar el promedio mensual para cada mes del próximo año
SELECT 
    YEAR(CURDATE()) + 1 AS año,  -- El próximo año para la proyección
    meses.mes,  -- Mes del año para la proyección
    ROUND(IFNULL(promedio_mensual.promedio_ventas_anuladas_mensual, 0), 2) AS proyeccion_ventas_anuladas_mensual
    -- Redondear la proyección a dos decimales, usando 0 si no hay datos históricos
FROM 
    (SELECT 1 AS mes UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL 
     SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL 
     SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL 
     SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12) AS meses
LEFT JOIN 
    promedio_mensual ON meses.mes = promedio_mensual.mes
    -- Unir con el promedio mensual para obtener la proyección para cada mes
ORDER BY 
    meses.mes;
    -- Ordenar los resultados por mes

";

        return Database::getRows($sql);
    }
}

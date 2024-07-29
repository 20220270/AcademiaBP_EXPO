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
    protected $fecha = null;

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
        $sql = "SELECT id_compra, CONCAT(nombre_cliente, ' ', apellido_cliente) AS nombre_completo, estado_compra, direccion_compra, p.fecha_registro FROM tb_compras p
        INNER JOIN tb_clientes USING(id_cliente)
                ORDER BY id_compra";
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = "SELECT id_compra, CONCAT(nombre_cliente, ' ', apellido_cliente) AS nombre_completo, estado_compra, direccion_compra, p.fecha_registro FROM tb_compras p
        INNER JOIN tb_clientes USING(id_cliente)
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
        tb_productos.descuento_producto
        FROM tb_detalles_compras
        INNER JOIN tb_compras USING(id_compra)
        INNER JOIN tb_detalleProducto USING(id_detalle_producto)
        INNER JOIN tb_productos USING(id_producto) WHERE id_compra = ?';
        $params = array($this->idcompra);
        return Database::getRows($sql, $params);
    }




    public function readFilename()
    {
        $sql = 'SELECT imagen_producto
                 FROM tb_detalles_compras
                         INNER JOIN tb_detalleProducto USING(id_detalle_producto)
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
        $sql = 'INSERT INTO tb_detalles_compras(id_detalle_producto, cantidad_producto, id_compra)
                VALUES(?, ?, ?)';
        $params = array($this->iddetalle, $this->cantidad, $_SESSION['idCompra']);

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
        tb_detalles_compras.precio_producto, 
        cantidad_producto, 
        (tb_productos.precio_producto * cantidad_producto) AS Subtotal,
        tb_productos.descuento_producto,
        ROUND((tb_productos.precio_producto * cantidad_producto) - (tb_productos.precio_producto * cantidad_producto * tb_productos.descuento_producto / 100), 2) AS subtotal_con_descuento
    FROM 
        tb_detalles_compras
    INNER JOIN 
        tb_compras USING(id_compra)
                INNER JOIN tb_detalleProducto USING(id_detalle_producto)
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

    // Método para finalizar un pedido por parte del cliente.
    public function finishOrder()
    {
        $this->estadocompra = 'Finalizada';
        $sql = 'UPDATE tb_compras
                SET estado_compra= ?
                WHERE id_compra= ?';
        $params = array($this->estadocompra, $_SESSION['idCompra']);
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
         tb_productos.descuento_producto, 
         (tb_productos.precio_producto * cantidad_producto) AS Subtotal, 
         ROUND((tb_productos.precio_producto * cantidad_producto) - (tb_productos.precio_producto * cantidad_producto * tb_productos.descuento_producto / 100), 2) AS SubtotalConDescuento,
         tb_compras.fecha_registro, 
         estado_compra
     FROM 
         tb_detalles_compras
     INNER JOIN 
         tb_compras USING(id_compra)
                 INNER JOIN tb_detalleProducto USING(id_detalle_producto)
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
         tb_productos.descuento_producto, 
         (tb_productos.precio_producto * cantidad_producto) AS Subtotal, 
         ROUND((tb_productos.precio_producto * cantidad_producto) - (tb_productos.precio_producto * cantidad_producto * tb_productos.descuento_producto / 100), 2) AS SubtotalConDescuento,
         tb_compras.fecha_registro, 
         estado_compra
        FROM 
         tb_detalles_compras
        INNER JOIN 
        tb_compras USING(id_compra)
                INNER JOIN tb_detalleProducto USING(id_detalle_producto)
        INNER JOIN 
         tb_productos USING(id_producto)  WHERE id_cliente = ?
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
                tb_productos.descuento_producto, 
                (tb_productos.precio_producto * cantidad_producto) AS Subtotal, 
                ROUND((tb_productos.precio_producto * cantidad_producto) - (tb_productos.precio_producto * cantidad_producto * tb_productos.descuento_producto / 100), 2) AS SubtotalConDescuento
                FROM 
                tb_detalles_compras
                INNER JOIN 
                tb_compras USING(id_compra)
                INNER JOIN 
                tb_clientes USING(id_cliente)
                INNER JOIN 
                tb_detalleProducto USING(id_detalle_producto)
                INNER JOIN 
                tb_productos USING(id_producto)  WHERE id_cliente = ? AND id_compra = ?
                ORDER BY id_compra";
        $params = array($_SESSION['idCliente'], $this->idcompra);
        return Database::getRows($sql, $params);
    }

    public function predictGraph()
    {
        $sql = "WITH GananciasMensuales AS (
                SELECT 
                    MONTH(o.fecha_registro) AS mes,
                    SUM(d.cantidad_producto * d.precio_producto) AS ganancias_mensuales
                FROM 
                    tb_detalles_compras d
                JOIN 
                    tb_compras o ON d.id_compra = o.id_compra
                WHERE 
                    YEAR(o.fecha_registro) = YEAR(CURDATE())
                GROUP BY 
                    MONTH(o.fecha_registro)
            )
            SELECT 
                mes,
                ROUND(ganancias_mensuales, 2) AS ganancias_mensuales,
                COUNT(*) OVER () AS meses_registrados,
                ROUND(SUM(ganancias_mensuales) OVER (), 2) AS ganancias_actuales,
                ROUND(AVG(ganancias_mensuales) OVER (), 2) AS media_mensual,
                ROUND(SUM(ganancias_mensuales) OVER () + (AVG(ganancias_mensuales) OVER () * (12 - COUNT(*) OVER ())), 2) AS ganancias_totales_proyectadas
            FROM 
                GananciasMensuales;
        ";

        return Database::getRows($sql);
    }




    public function perdidasPredictGraph()
    {
        $sql = "WITH PerdidasMensuales AS (
            SELECT 
                MONTH(o.fecha_registro) AS mes,
                SUM(d.cantidad_producto * d.precio_producto) AS perdidas_mensuales
            FROM 
                tb_detalles_compras d
            JOIN 
                tb_compras o ON d.id_compra = o.id_compra
            WHERE 
                YEAR(o.fecha_registro) = YEAR(CURDATE()) 
                AND o.estado_compra = 'Anulada'
            GROUP BY 
                MONTH(o.fecha_registro)
        )
        SELECT 
            mes,
            ROUND(perdidas_mensuales, 2) AS perdidas_mensuales,
            COUNT(*) OVER () AS meses_registrados,
            ROUND(SUM(perdidas_mensuales) OVER (), 2) AS perdidas_actuales,
            ROUND(AVG(perdidas_mensuales) OVER (), 2) AS media_mensual,
            ROUND(SUM(perdidas_mensuales) OVER () + (AVG(perdidas_mensuales) OVER () * (12 - COUNT(*) OVER ())), 2) AS perdidas_totales_proyectadas
        FROM 
            PerdidasMensuales;
    ";

        return Database::getRows($sql);
    }
}

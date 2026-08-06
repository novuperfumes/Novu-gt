-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `correo` VARCHAR(191) NOT NULL,
    `contrasenia` VARCHAR(191) NOT NULL,
    `rol` VARCHAR(191) NOT NULL DEFAULT 'CLIENTE',
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NULL,
    `genero` VARCHAR(191) NULL,
    `sellos` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Usuario_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GiftCard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `monto` DECIMAL(10, 2) NOT NULL,
    `activa` BOOLEAN NOT NULL DEFAULT true,
    `es_bienvenida` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `GiftCard_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Perfume` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NULL,
    `genero` VARCHAR(191) NULL,
    `imagen` VARCHAR(191) NOT NULL,
    `galeria` JSON NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PresentacionPerfume` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_perfume` INTEGER NOT NULL,
    `tamanio` VARCHAR(191) NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `stock` INTEGER NOT NULL DEFAULT 0,
    `costo` DECIMAL(10, 2) NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarritoMaestro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `CarritoMaestro_id_usuario_key`(`id_usuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarritoDetalle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_carrito_maestro` INTEGER NOT NULL,
    `id_presentacion` INTEGER NULL,
    `id_decant` INTEGER NULL,
    `tipo_decant` VARCHAR(191) NULL,
    `cantidad` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrdenCompra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `total` DECIMAL(10, 2) NOT NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'PENDIENTE',
    `metodo_de_pago` VARCHAR(191) NOT NULL,
    `tipo_entrega` VARCHAR(191) NOT NULL,
    `id_sucursal` INTEGER NULL,
    `id_codigo_promocion` INTEGER NULL,
    `nombre_recibe` VARCHAR(191) NOT NULL,
    `telefono_contacto` VARCHAR(191) NOT NULL,
    `direccion_entrega` VARCHAR(191) NOT NULL,
    `departamento_entrega` VARCHAR(191) NOT NULL,
    `municipio_entrega` VARCHAR(191) NOT NULL,
    `referencias_entrega` VARCHAR(191) NULL,
    `codigo_postal_entrega` VARCHAR(191) NULL,
    `costo_envio` DECIMAL(10, 2) NULL DEFAULT 0,
    `id_gift_card` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrdenDetalle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_orden` INTEGER NOT NULL,
    `id_presentacion` INTEGER NULL,
    `id_decant` INTEGER NULL,
    `tipo_decant` VARCHAR(191) NULL,
    `cantidad` INTEGER NOT NULL,
    `precio_unitario` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Direccion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `departamento` VARCHAR(191) NOT NULL,
    `municipio` VARCHAR(191) NOT NULL,
    `referencias` VARCHAR(191) NULL,
    `codigo_postal` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sucursal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_sucursal` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `departamento` VARCHAR(191) NOT NULL,
    `municipio` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CodigoPromocion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `tipo_descuento` VARCHAR(191) NOT NULL,
    `descuento` DECIMAL(10, 2) NOT NULL,
    `fecha_inicio` DATETIME(3) NOT NULL,
    `fecha_fin` DATETIME(3) NOT NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'ACTIVO',

    UNIQUE INDEX `CodigoPromocion_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsoPromocion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `id_codigo_promocion` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `UsoPromocion_id_usuario_id_codigo_promocion_key`(`id_usuario`, `id_codigo_promocion`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MensajeContacto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `asunto` VARCHAR(191) NOT NULL,
    `mensaje` VARCHAR(191) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `leido` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistorialSellos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `id_orden` INTEGER NULL,
    `tipo_operacion` VARCHAR(191) NOT NULL,
    `cantidad_sellos` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReseniaPerfume` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `id_perfume` INTEGER NOT NULL,
    `calificacion` INTEGER NOT NULL,
    `comentario` VARCHAR(191) NOT NULL,
    `compra_label` VARCHAR(191) NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ReseniaPerfume_id_usuario_id_perfume_key`(`id_usuario`, `id_perfume`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Favorito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `id_perfume` INTEGER NOT NULL,
    `fecha_agregado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IngresoInventario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_presentacion` INTEGER NOT NULL,
    `fecha_ingreso` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cantidad` INTEGER NOT NULL,
    `costo_compra` DECIMAL(10, 2) NOT NULL,
    `tipo_traida` VARCHAR(191) NOT NULL,
    `costo_traida` DECIMAL(10, 2) NOT NULL,
    `costo_total` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Decant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_perfume` INTEGER NOT NULL,
    `ml_origen` INTEGER NOT NULL,
    `costo_original` DECIMAL(10, 2) NOT NULL,
    `precio_original` DECIMAL(10, 2) NOT NULL,
    `costo_5ml` DECIMAL(10, 2) NOT NULL,
    `precio_5ml` DECIMAL(10, 2) NOT NULL,
    `stock_5ml` INTEGER NOT NULL DEFAULT 0,
    `costo_10ml` DECIMAL(10, 2) NOT NULL,
    `precio_10ml` DECIMAL(10, 2) NOT NULL,
    `stock_10ml` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Decant_id_perfume_key`(`id_perfume`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RegistroVentaAdmin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_orden_detalle` INTEGER NULL,
    `fecha_venta` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tipo` VARCHAR(191) NULL,
    `perfume` VARCHAR(191) NOT NULL,
    `genero` VARCHAR(191) NULL,
    `costo_compra` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `costo_traida` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `tipo_traida` VARCHAR(191) NULL,
    `costo_total` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `costo_perfume` DECIMAL(10, 2) NULL,
    `costo` DECIMAL(10, 2) NULL,
    `pago` VARCHAR(191) NULL,
    `total_cliente` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `total_recibido` DECIMAL(10, 2) NULL,
    `recibido_en_cuenta` DECIMAL(10, 2) NULL,
    `entregado` BOOLEAN NOT NULL DEFAULT false,
    `envio_ce` VARCHAR(191) NULL,
    `total` DECIMAL(10, 2) NULL,

    UNIQUE INDEX `RegistroVentaAdmin_id_orden_detalle_key`(`id_orden_detalle`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RegistroVentaDecantAdmin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_orden_detalle` INTEGER NULL,
    `fecha_venta` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tipo` VARCHAR(191) NULL,
    `genero` VARCHAR(191) NULL,
    `ml_origen` INTEGER NULL,
    `perfume` VARCHAR(191) NOT NULL,
    `costo_original` DECIMAL(10, 2) NULL,
    `costo_5ml` DECIMAL(10, 2) NULL,
    `costo_10ml` DECIMAL(10, 2) NULL,
    `precio_original` DECIMAL(10, 2) NULL,
    `precio_5ml` DECIMAL(10, 2) NULL,
    `precio_10ml` DECIMAL(10, 2) NULL,
    `tamano_vendido` VARCHAR(191) NULL,
    `pago` VARCHAR(191) NULL,
    `total_cliente` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `total_recibido` DECIMAL(10, 2) NULL,
    `recibido_en_cuenta` DECIMAL(10, 2) NULL,
    `entregado` BOOLEAN NOT NULL DEFAULT false,
    `envio_ce` VARCHAR(191) NULL,
    `total` DECIMAL(10, 2) NULL,

    UNIQUE INDEX `RegistroVentaDecantAdmin_id_orden_detalle_key`(`id_orden_detalle`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrdenWhatsApp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `nombre_cliente` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NULL,
    `nit` VARCHAR(191) NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    `carrito_json` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'PENDIENTE',
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `OrdenWhatsApp_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaniaDescuento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `activa` BOOLEAN NOT NULL DEFAULT false,
    `tipo` VARCHAR(191) NOT NULL,
    `descuento` DECIMAL(5, 2) NOT NULL,
    `categorias` VARCHAR(191) NULL,
    `perfume_ids` VARCHAR(191) NULL,
    `imagen` VARCHAR(191) NULL,
    `fecha_inicio` DATETIME(3) NULL,
    `fecha_fin` DATETIME(3) NULL,
    `creado_en` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GiftCard` ADD CONSTRAINT `GiftCard_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PresentacionPerfume` ADD CONSTRAINT `PresentacionPerfume_id_perfume_fkey` FOREIGN KEY (`id_perfume`) REFERENCES `Perfume`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarritoMaestro` ADD CONSTRAINT `CarritoMaestro_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarritoDetalle` ADD CONSTRAINT `CarritoDetalle_id_carrito_maestro_fkey` FOREIGN KEY (`id_carrito_maestro`) REFERENCES `CarritoMaestro`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarritoDetalle` ADD CONSTRAINT `CarritoDetalle_id_decant_fkey` FOREIGN KEY (`id_decant`) REFERENCES `Decant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarritoDetalle` ADD CONSTRAINT `CarritoDetalle_id_presentacion_fkey` FOREIGN KEY (`id_presentacion`) REFERENCES `PresentacionPerfume`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenCompra` ADD CONSTRAINT `OrdenCompra_id_codigo_promocion_fkey` FOREIGN KEY (`id_codigo_promocion`) REFERENCES `CodigoPromocion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenCompra` ADD CONSTRAINT `OrdenCompra_id_gift_card_fkey` FOREIGN KEY (`id_gift_card`) REFERENCES `GiftCard`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenCompra` ADD CONSTRAINT `OrdenCompra_id_sucursal_fkey` FOREIGN KEY (`id_sucursal`) REFERENCES `Sucursal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenCompra` ADD CONSTRAINT `OrdenCompra_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenDetalle` ADD CONSTRAINT `OrdenDetalle_id_decant_fkey` FOREIGN KEY (`id_decant`) REFERENCES `Decant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenDetalle` ADD CONSTRAINT `OrdenDetalle_id_orden_fkey` FOREIGN KEY (`id_orden`) REFERENCES `OrdenCompra`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenDetalle` ADD CONSTRAINT `OrdenDetalle_id_presentacion_fkey` FOREIGN KEY (`id_presentacion`) REFERENCES `PresentacionPerfume`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Direccion` ADD CONSTRAINT `Direccion_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsoPromocion` ADD CONSTRAINT `UsoPromocion_id_codigo_promocion_fkey` FOREIGN KEY (`id_codigo_promocion`) REFERENCES `CodigoPromocion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsoPromocion` ADD CONSTRAINT `UsoPromocion_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistorialSellos` ADD CONSTRAINT `HistorialSellos_id_orden_fkey` FOREIGN KEY (`id_orden`) REFERENCES `OrdenCompra`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistorialSellos` ADD CONSTRAINT `HistorialSellos_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReseniaPerfume` ADD CONSTRAINT `ReseniaPerfume_id_perfume_fkey` FOREIGN KEY (`id_perfume`) REFERENCES `Perfume`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReseniaPerfume` ADD CONSTRAINT `ReseniaPerfume_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorito` ADD CONSTRAINT `Favorito_id_perfume_fkey` FOREIGN KEY (`id_perfume`) REFERENCES `Perfume`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorito` ADD CONSTRAINT `Favorito_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IngresoInventario` ADD CONSTRAINT `IngresoInventario_id_presentacion_fkey` FOREIGN KEY (`id_presentacion`) REFERENCES `PresentacionPerfume`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Decant` ADD CONSTRAINT `Decant_id_perfume_fkey` FOREIGN KEY (`id_perfume`) REFERENCES `Perfume`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RegistroVentaAdmin` ADD CONSTRAINT `RegistroVentaAdmin_id_orden_detalle_fkey` FOREIGN KEY (`id_orden_detalle`) REFERENCES `OrdenDetalle`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RegistroVentaDecantAdmin` ADD CONSTRAINT `RegistroVentaDecantAdmin_id_orden_detalle_fkey` FOREIGN KEY (`id_orden_detalle`) REFERENCES `OrdenDetalle`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

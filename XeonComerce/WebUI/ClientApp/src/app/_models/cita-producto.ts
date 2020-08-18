import { Producto } from "./producto";

export class CitaProducto {
    id: number;
    horaInicio: any;
    horaFinal: any;
    estado: string;
    tipo: string;
    idEmpleado: number;
    idFactura?: number;
    idCliente: number;
    idSucursal: string;
    idComercio: string;
    productos: Producto[];
}

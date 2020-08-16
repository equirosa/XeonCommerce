export class Cita {
    id: number;
    horaInicio: Date;
    horaFinal: Date;
    estado: string;
    tipo: string;
    idEmpleado: number;
    idFactura?: number;
    idCliente: number;
    idSucursal: string; // Podria enviarse un objeto sucursal
}

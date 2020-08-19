import { Vista } from "./vista";
import { Especialidad } from './especialidad';

export class VistaRol {
    id: number;
    idComercio: string;
    nombre: string;
    descripcion: string;
    vistas: Vista[];
    especialidades: Especialidad[];
}

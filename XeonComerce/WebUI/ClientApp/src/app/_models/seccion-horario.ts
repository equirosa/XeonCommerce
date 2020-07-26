import { NumberValueAccessor } from "@angular/forms";

export class SeccionHorario {
    id?: number;
    idEmpleado?: number;
    horaInicio?: Date;
    horaFinal?: Date;
    diaSemana?: number;
    descripcion?: string;
    estado?: string;

    constructor(){}

}

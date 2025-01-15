const validarCedulaEcuatoriana = (cedula) => {
    if (!/^\d{10}$/.test(cedula)) return false;

    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    const verificador = parseInt(cedula.charAt(9), 10);

    let suma = 0;
    for (let i = 0; i < 9; i++) {
        let valor = parseInt(cedula.charAt(i), 10) * coeficientes[i];
        suma += valor > 9 ? valor - 9 : valor;
    }

    const digitoVerificador = suma % 10 ? 10 - (suma % 10) : 0;

    return digitoVerificador === verificador;
};

export default validarCedulaEcuatoriana;
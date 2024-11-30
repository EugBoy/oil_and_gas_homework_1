// Выполнил студент группы КТ-22-04
// Лущеко Евгений Сергеевич
// Вариант 68

function getAdiabata(p, t, x) {
    const T = t + 273.15;
    
    x = x.map(elem => (elem / 100));
    
    const Ki = [
        0.4619255, 0.5279209, 0.583749,
        0.6341423, 0.6406937, 0.6798307,
        0.7175118, 0.4479153, 0.4557489,
        0.3589888
    ];
    
    const Kij = [
        [1, 1, 1.007619, 0.997596, 1, 1.002529, 0.982962, 1.003631, 0.995933,1],
        [1, 1, 0.986893, 1, 1, 1, 1, 1.007961, 1.008511, 1],
        [1.007619, 0.986893, 1, 1, 1, 1, 1, 1, 1, 1],
        [0.997596, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1.002529, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0.982962, 1, 1, 1, 1, 1, 1, 1, 0.910183, 1],
        [1.00363, 1, 1, 1, 1, 1, 1, 1, 0.982361, 0.982361],
        [0.995933, 1.00851, 1, 1, 1, 1, 0.910183, 0.982361, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 0.982361, 1, 1]
    ];

    let K1 = 0;
    x.forEach((el, index) => K1 += el * Math.pow(Ki[index], 5/2));
    
    let K2 = 0;
    for (let i = 0; i < x.length; i++) {
        for (let j = i + 1; j < Ki.length; j++) {
            const res = x[i] * x[j] * Math.pow(Ki[i] * Ki[j], 5/2) * Math.pow(Math.pow(Kij[i][j], 2) - 1, 2);
            K2 += res;
        }
    }
    
    const Kx = Math.pow(Math.pow(K1, 2) + 2 * Math.abs(K2), 1/5);
    const R = 8.31451;
    const Lt = 1;
    const Pom = Math.pow(10, -3) * Math.pow(Kx, -3) * R * Lt;
    
    const Mi = [
        16.043, 30.070, 44.097, 
        58.123, 58.123, 72.150, 
        86.177, 28.0135, 44.01, 
        4.0026
    ];
    
    let M = 0;
    x.forEach((el, index) => M += el * Mi[index]);
    
    const an = [
        0.1538326, 1.341953, -2.998583, -0.04831228, 0.3757965, -1.589575,
        -0.05358847, 0.88659463, -0.71023704, -1.471722,
        1.32185035, -0.78665925, 0.00000000229129, 0.1576724, -0.4363864, -0.04408159, -0.003433888, 0.03205905, 0.02487355, 0.07332279,
        -0.001600573, 0.6424706, -0.4162601, -0.06689957, 0.2791795, -0.6966051, -0.002860589, -0.008098836, 3.150547, 0.007224479,
        -0.7057529, 0.5349792, -0.07931491, -1.418465, 
        -0.00000000000005923765, 0.1058402, 0.03431729, -0.007022847, 0.02495587,
        0.04296818, 0.7465453, -0.2919613, 7.294616, -9.936757, -0.005399808,
        -0.2432567, 0.04987016, 0.003733797, 1.874951, 0.002168144,
         -0.6587164, 0.000205518, 0.009776195, -0.02048708, 0.01557322,
        0.006862415, -0.001226752, 0.002850908
    ];

    const bn = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 2, 2,
        2, 2, 2, 2, 2, 2, 2, 3, 3, 3,
        3, 3, 3, 3, 3, 3, 3, 4, 4, 4,
        4, 4, 4, 4, 5, 5, 5, 5, 5, 6,
        6, 7, 7, 8, 8, 8, 9, 9
    ];
    
    const cn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
        1, 1, 1, 1, 0, 1, 1, 1, 1, 0,
        1, 0, 1, 1, 1, 1, 1, 1
    ];

    const kn = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 3, 2, 2, 2, 4, 4, 0, 0,
        2, 2, 2, 4, 4, 4, 4, 0, 1, 1,
        2, 2, 3, 3, 4, 4, 4, 0, 0, 2,
        2, 2, 4, 4, 0, 2, 2, 4, 4, 0,
        2, 0, 2, 1, 2, 2, 2, 2
    ];

    const un = [
        0, 0.5, 1, 3.5, -0.5, 4.5, 0.5, 7.5, 9.5, 6,
        12, 12.5, -6, 2, 3, 2, 2, 11, -0.5, 0.5,
        0, 4, 6, 21, 23, 22, -1, -0.5, 7, -1,
        6, 4, 1, 9, -13, 21, 8, -0.5, 0, 2,
        7, 9, 22, 23, 1, 9, 3, 8, 23, 1.5,
        5, -0.5, 4, 7, 3, 0, 1, 0
    ];

    const gn = [
        0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 1, 0,
        0, 1, 1, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 1, 0, 1, 0, 0
    ];

    const qn = [
        0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 1, 0, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 1, 0, 1, 0,
        0, 1, 0, 0, 0, 0, 0, 1
    ];

    const fn = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0
    ];

    const sn = [
        0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0
    ];

    const wn = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0
    ];

    const Qi = [
        0, 0, 0, 
        0, 0, 0, 
        0, 0, 0.69, 
        0
    ];

    let Q = 0;
    x.forEach((el, index) => Q += el * Qi[index]);
    
    let Gij = [
        [1, 1, 1, 1, 1, 1, 1, 1, 0.807653, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0.370296, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1.066638, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0.835058, 1],
        [0.807653, 0.370296, 1, 1, 1, 1, 1, 0.835058, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    
    const Gi = [
        0, 0.079300, 0.141239,
        0.281835, 0.256692, 0.366911, 
        0.289731, 0.027815, 0.189065, 
        0
    ];
    
    let G_1 = 0;
    x.forEach((el, index) => G_1 += el * Gi[index]);
    let G_2 = 0;
    for (let i = 0; i < x.length - 1; i++) {
        for (let j = i + 1; j < x.length; j++) {
            let res = x[i] * x[j] * (Gij[i][j] - 1) * (Gi[i] + Gi[j]);
            G_2 += res;
        }
    }
    let G = G_1 + G_2;

    let Fi = [
        0, 0, 0, 
        0, 0, 0, 
        0, 0, 0, 
        0
    ];

    let F = 0;
    x.forEach((el, index) => F += Math.pow(el, 2) * Fi[index]);

    let Ei = [
        151.3183, 244.1667, 298.1183,
        337.6389, 324.0689, 370.6823,
        402.636293, 99.73778, 241.9606,
        2.610111
    ];

    const Eij = [
        [1, 1, 0.994635, 0.989844, 1.019531, 0.999268, 1.107274, 0.971641, 0.960644, 1], 
        [1, 1, 1.022561, 1.013061, 1, 1.005320, 1, 0.970121, 0.925053, 1], 
        [0.994635, 1.02256, 1, 1.004901, 1, 1, 1, 0.945939, 0.960237, 1],
        [0.989844, 1.01306, 1.0049, 1, 1, 1, 1, 0.973384, 0.897362, 1],
        [1.01953, 1, 1, 1, 1, 1, 1, 0.946914, 0.906849, 1],
        [0.999268, 1.00532, 1, 1, 1, 1, 1, 0.945521, 0.859764, 1],
        [1.107274, 1, 1, 1, 1, 1, 1, 1, 0.855134, 1],
        [0.97164, 0.97012, 0.945939, 0.973384, 0.946914, 0.94552, 1, 1, 1.022741, 1],
        [0.960644, 0.925053, 0.960237, 0.897362, 0.906849, 0.859764, 0.855134, 1.02274, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    const Vij = [
        [1, 1, 0.990877, 0.992291, 1, 1.003671, 1.302576, 0.886106, 0.963827, 1],
        [1, 1, 1.065173, 1.25, 1.250001, 1.250001, 1, 0.816431, 0.969871, 1],
        [1, 1, 1, 1, 1, 1, 1, 0.915502, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 0.993556, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1.066638, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0.835058, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    let V_1 = 0;
    x.forEach((el, index) => V_1 += el * Math.pow(Ei[index], 5 / 2));
    let V_2 = 0;
    for (let i = 0; i < x.length; i++) {
        for (let j = i + 1; j < x.length; j++) {
            let res = x[i] * x[j] * Math.pow((Ei[i] + Ei[j]), 5 / 2) * (Math.pow(Vij[i][j], 5) - 1);
            V_2 += res;
        }
    }
    let V = Math.pow((Math.pow(V_1, 2) + 2 * V_2), 1 / 5);

    const Si = Array(10).fill(0);
    const Wi = Array(10).fill(0);

    const Sigm = 10 ** 3 * p * Math.pow(Kx, 3) / (R * T);

    const Dn = Array(58).fill(0);
    const Un = Array(58).fill(0);
    const Cn = Array(58).fill(0);
    const Bn = Array(58).fill(0);

    let A0 = 0;
    let A1 = 0;
    let A2 = 0;
    let A3 = 0;

    const cpori = [
        4.2298777, 6.650212996, 10.16269447,
        15.39871823, 13.93543436, 13.8710479,
        16.46835612, 3.501192166, 4.378271525,
        2.50
    ];

    let cpor = 0;
    x.forEach((el, index) => cpor += el * cpori[index]);

    for (let n = 0; n < 58; n++) {
        Cn[n] = Math.pow((G + 1 - gn[n]), gn[n]) * Math.pow((Q ** 2 + 1 - qn[n]), qn[n]) * Math.pow((F + 1 - fn[n]), fn[n]) * Math.pow(V, un[n]);
        let B = 0;
        for (let i = 0; i < x.length; i++) {
            for (let j = 0; j < x.length; j++) {
                let Eijn = Eij[i][j] * Math.pow((Ei[i] * Ei[j]), 0.5);
                let Gijn = (Gij[i][j] * (Gi[i] + Gi[j])) / 2;
                let Bnij = Math.pow((Gijn + 1 - gn[n]), gn[n]) * Math.pow((Qi[i] * Qi[j] + 1 - qn[n]), qn[n]) * (Math.pow((Fi[i] * Fi[j]), 0.5) + 1 - fn[n]) * Math.pow((Si[i] * Si[j] + 1 - sn[n]), sn[n]) * Math.pow((Wi[i] * Wi[j] + 1 - wn[n]), wn[n]);
                let res = x[i] * x[j] * Bnij * Math.pow(Eijn, un[n]) * Math.pow((Ki[i] * Ki[j]), (3 / 2));
                B += res;
            }
        }
        Bn[n] = B;
        if (n >= 1 && n <= 12) {
            Dn[n] = Bn[n] * Math.pow(Kx, -3);
            Un[n] = 0;
        } else if (n >= 13 && n <= 18) {
            Dn[n] = Bn[n] * Math.pow(Kx, -3) - Cn[n];
            Un[n] = Cn[n];
        } else {
            Dn[n] = 0;
            Un[n] = Cn[n];
        }
        
        let firstPartA1 = an[n] * Math.pow(Sigm, bn[n]) * Math.pow(T, -un[n]);
        let secondPartA1 = (bn[n]+1) * bn[n] * Dn[n];
        let thirdPartA1 = (bn[n] - cn[n] * kn[n] * Math.pow(Sigm, kn[n])) *
        (bn[n] - cn[n] * kn[n] * Math.pow(Sigm, kn[n]) + 1) - 
        cn[n] * Math.pow(kn[n], 2) * Math.pow(Sigm, kn[n]);
        let fourthPartA1 = Un[n] * Math.exp(-cn[n] * Math.pow(Sigm, kn[n]))
        let res0 = firstPartA1 * 
        (bn[n] * Dn[n] + (bn[n] - cn[n] * kn[n] * Math.pow(Sigm, kn[n])) * fourthPartA1);
        
        
        let res1 = firstPartA1 * (secondPartA1 + thirdPartA1 * fourthPartA1);
        let res2 = firstPartA1 * (1 - un[n]) * 
        (bn[n]*Dn[n] + (bn[n] - cn[n] * kn[n] * Math.pow(Sigm, kn[n])) * fourthPartA1);
        let res3 = firstPartA1 * un[n] * (1 - un[n]) *
        (Dn[n] + fourthPartA1);
        A0 += res0;
        A1 += res1;
        A2 += res2;
        A3 += res3;
    }
    let Z = 1 + A0;
    let k = (1 + A1 + (Math.pow(1 + A2, 2) / (cpor - 1 + A3))) / Z;
    console.log(Z)
    return k;
}

const p = 16;
const t = 9;
const data = [
    89.8903, 6.0521, 2.4603, 
    0.2377, 0.1678, 0.0785, 
    0.0813, 0.3643, 0.6660, 0.0017];
const result = getAdiabata(p, t, data);
console.log("Адиабата: " + result);

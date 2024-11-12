/*
Estás atrapado en una pesadilla en la que Freddy Krueger te persigue 😭. El sueño está representado por un laberinto de celdas, donde cada celda tiene un valor numérico que indica el nivel de peligro de esa parte del sueño.

Debes encontrar el camino más seguro (es decir, el que tenga el menor valor total de peligro) desde la esquina superior izquierda hasta la esquina inferior derecha de la matriz.

En este desafío, solo puedes moverte hacia la derecha o hacia abajo (no puedes retroceder ni moverte en diagonal) y debes calcular el nivel total de peligro del camino más seguro.

La pesadilla está representada por una matriz dream de tamaño n x m donde cada celda es un número positivo que representa el nivel de peligro de esa celda en el sueño.

Y tienes que devolver el valor total de peligro del camino más seguro de la esquina superior izquierda (posición [0][0]) a la esquina inferior derecha (posición [n-1][m-1]).
*/

function findSafestPath(dream: Array<Array<number>>) {
    const height = dream.length
    const width = dream[0].length
    
    const dp = Array.from({ length: height }, () => new Array(width).fill(Infinity));

    // Inicializamos la celda superior izquierda
    dp[0][0] = dream[0][0];

    // Llenamos la primera fila
    for (let j = 1; j < width; j++) {
        dp[0][j] = dp[0][j - 1] + dream[0][j];
    }

    // Llenamos la primera columna
    for (let i = 1; i < height; i++) {
        dp[i][0] = dp[i - 1][0] + dream[i][0];
    }

    // Calculamos los valores restantes de dp
    for (let i = 1; i < height; i++) {
        for (let j = 1; j < width; j++) {
            dp[i][j] = Math.min(
                dp[i - 1][j], dp[i][j - 1]
            ) + dream[i][j];
        }
    }

    // El valor en la esquina inferior derecha es la solución
    return dp[height - 1][width - 1];
}

const dream = [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
]
  
const bestPath = findSafestPath(dream) // Devuelve 7
console.log(bestPath)
// El mejor camino es:
// [0, 0] -> 1
// [0, 1] -> 3
// [0, 2] -> 1
// [1, 2] -> 1
// [2, 2] -> 1

// 1 -> 3 -> 1 -> 1 -> 1 = 7

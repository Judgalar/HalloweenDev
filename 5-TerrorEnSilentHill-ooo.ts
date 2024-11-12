/*
Estás atrapado en Silent Hill, en una habitación cuadrada de tamaño n x n y el temido Pyramid Head (▲) está en algún lugar de la habitación, moviéndose hacia ti (T).

Tú no puedes moverte, y Pyramid Head se mueve una celda por turno, en cualquiera de las cuatro direcciones cardinales (arriba, abajo, izquierda, derecha), pero siempre elige el camino más corto hacia tu posición. Tu objetivo es determinar si Pyramid Head puede alcanzarte.

La habitación está representada por una matriz n x n:

T: tu posición (donde te encuentras atrapado).
▲: la posición inicial de Pyramid Head.
.: espacios vacíos donde Pyramid Head puede moverse.
#: paredes que Pyramid Head no puede atravesar.
Escribe una función que determine si Pyramid Head podrá alcanzarte. Si Pyramid Head puede alcanzarte, devuelve el número de pasos con lo que lo puede lograr, si no puede alcanzarte entonces devuelve -1.
*/

function escapePyramidHead(room: Array<Array<string>>) {
    const length = room.length
    const player = 'T'
    const pyramidHead = '▲'
    const wall = '#'

    const findIndex = (matriz: Array<Array<string>>, target: string) => {
        const row = matriz.findIndex(f => f.includes(target));
        const col = matriz[row].indexOf(target);
        return [row, col];
    }

    const initialPyramidHeadPos = findIndex(room, pyramidHead)
    const initialPlayerPos = findIndex(room, player)

    let dp: Array<Array<string|number>> = room.map(fila => fila.slice())
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (room[i][j] === '▲') {
                dp[i][j] = 0
            } else if (room[i][j] === '#') {
                dp[i][j] = '#'
            } else if (!(room[i][j] === '#')) {
                dp[i][j] = -1
            }
        }
    }

    // Direcciones posibles de movimiento: arriba, abajo, izquierda, derecha
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1]
    ];

    // Cola para BFS, comenzamos con la posición del pyramidHead
    const queue: Array<[number, number]> = [[initialPyramidHeadPos[0], initialPyramidHeadPos[1]]]

    while (queue.length > 0) {
        const [x, y] = queue.shift()!;

        // Recorremos las celdas adyacentes
        for (const [dx, dy] of directions) {
            const nx = x + dx
            const ny = y + dy

            // Verificamos si la nueva celda está dentro de los límites y si no es una pared
            if (nx >= 0 && ny >= 0 && nx < length && ny < length && room[nx][ny] !== wall) {
                // Si la celda aún tiene valor -1, significa que no ha sido visitada
                if (dp[nx][ny] === -1) {
                    dp[nx][ny] = (dp[x][y] as number) + 1; // Asignamos la distancia
                    queue.push([nx, ny]); // Añadimos a la cola para seguir propagando
                }
            }
        }
    }

    return dp[initialPlayerPos[0]][initialPlayerPos[1]]
}

const room = [
    ['.', '.', '#', '.', '▲'],
    ['#', '.', '#', '.', '#'],
    ['.', '.', '.', '.', '.'],
    ['#', '#', '#', '.', '#'],
    ['T', '.', '.', '.', '.'],
]

console.log(escapePyramidHead(room)) // -> 8

const room2 = [
    ['T', '.', '#', '.'],
    ['.', '.', '.', '.'],
    ['▲', '.', '.', '#'],
    ['.', '#', '#', '#'],
]

console.log(escapePyramidHead(room2)) // -> 2

const room3 = [
    ['#', '#', '#'],
    ['▲', '.', '#'],
    ['.', '#', 'T'],
]

console.log(escapePyramidHead(room3)) // -> -1

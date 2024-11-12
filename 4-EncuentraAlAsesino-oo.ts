/*
Una persona ha sido asesinada en la noche de Halloween 🔪. Usando un hechizo 🧙‍♀️, hemos conseguido escuchar su último susurro pero es muy debíl y no nos permite identificar quién pudo ser el asesino.

La información que nos proporciona:

whisper: cadena de texto que representa lo que la víctima intentó decir antes de morir

suspects: lista de cadenas que representa los nombres de todos los sospechosos.

Hay que tener que el susurro whisper tiene algunas reglas:

Cada ~ representa una letra incierta en el susurro.
Cada posición del susurro es una posición del nombre del asesino.
La longitud del whisper no siempre representa la longitud completa del nombre, ya que la víctima pudo haber muerto antes de terminar de decirlo.
Pero si el último carácter del susurro es una $, entonces el nombre del asesino terminaba ahí.
¡Tu objetivo es descubrir quién pudo ser el asesino! Debes devolver:

Si solo un nombre encaja con el patrón del susurro, retorna ese nombre.
Si hay varios nombres que encajan, retorna todos los nombres separados por comas.
Si ningún nombre encaja, retorna una cadena vacía ("").
Las mayúsculas y minúsculas de las letras no importan.
*/

function findTheKiller(whisper: string, suspects: Array<string>) {
    const killerLength = whisper.endsWith('$') ? whisper.length-1 : undefined
    const killerHasLength = whisper.endsWith('$') ? true : false
    let result: Array<string> = []
    for(const name of suspects) {
        if (killerHasLength && name.length != killerLength)
            continue
        if((name.length < whisper.length && killerHasLength == false) || (killerHasLength == true && name.length < killerLength!))
            continue
        for(let i = 0; i < whisper.length; i++) {
            if ((whisper[i] == '~') || (whisper[i] == '$') || (whisper[i].toUpperCase() == name[i].toUpperCase()))
                if(i == whisper.length-1)
                    result.push(name)
                else continue
            else break;
        }
    }
    if (result.length == 1)
        return result[0]
    else if (result.length > 0) {
        return result.toString()
    }
    else
        return ''
}

const whisper = 'd~~~~~a';
const suspects = ['Dracula', 'Freddy Krueger', 'Jason Voorhees', 'Michael Myers'];

console.log(findTheKiller(whisper, suspects)); // -> 'Dracula'

const whisper2 = '~r~dd~';
const suspects2 = ['Freddy', 'Freddier', 'Fredderic']

console.log(findTheKiller(whisper2, suspects2)); // -> 'Freddy,Freddier,Fredderic'

const whisper3 = '~r~dd$';
const suspects3 = ['Freddy', 'Freddier', 'Fredderic']

console.log(findTheKiller(whisper3, suspects3)); // -> ''

const whisper4 = 'mi~~def';
const suspects4 = ['Midudev', 'Midu', 'Madeval']

console.log(findTheKiller(whisper4, suspects4)); // -> ''
console.log(findTheKiller('~~~~~~$', ['Pennywise', 'Leatherface', 'Agatha']))

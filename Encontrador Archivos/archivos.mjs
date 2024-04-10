import fs from 'node:fs/promises';
import path from 'node:path';
import pc from 'picocolors';

const folder = process.argv[2] ?? '.';

async function ls(folder) {
    try {
        let files = await fs.readdir(folder);
        const filePromises = files.map(async file => {
            const filePath = path.join(folder, file);
            try {
                const stats = await fs.stat(filePath); // Añadido el await aquí
                return {
                    file,
                    size: stats.size
                };
            } catch (error) {
                console.error('No hay archivos');
                return null; // Para evitar problemas al filtrar después
            }
        });
        const fileSize = await Promise.all(filePromises);
        return fileSize
    } catch (error) {
        console.error('No hay carpetas');
    }
}

ls(folder).then(fileStats => {
    if (fileStats) {
        if ( folder == ".") {
            console.log(
                pc.blue(`En la carpeta actual hay: ${fileStats.length} elementos`), fileStats);
        }
        else {
            console.log(
                pc.yellow(`En la carpeta ${folder} hay: ${fileStats.length} elementos`), fileStats);
        }       
    } else {
        console.log(
            pc.red('No se pudo obtener la información de la carpeta.')
            );
    }
});
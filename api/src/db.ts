import mysql from 'mysql2/promise';

// Criação do pool de conexões
const pool = mysql.createPool({
    host: 'mysql',  // Nome do serviço no Docker Compose
    user: 'root',  // Usuário configurado no Docker Compose
    password: '123456',  // Senha configurada no Docker Compose
    database: 'banco',  // Nome do banco configurado no Docker Compose
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Tipos para resultados de consultas
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';

type QueryResult<T> = T extends RowDataPacket[] ? T : RowDataPacket[] | OkPacket | ResultSetHeader;

// Função genérica para realizar consultas
export const query = async <T extends RowDataPacket[]>(
    sql: string,
    params?: any[]
): Promise<T> => {
    const [rows] = await pool.query<T>(sql, params);
    return rows;
};

// Função opcional para encerrar o pool (caso necessário)
export const closeConnection = async (): Promise<void> => {
    await pool.end();
};

export default pool;

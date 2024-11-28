"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeConnection = exports.query = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
// Criação do pool de conexões
const pool = promise_1.default.createPool({
    host: 'mysql', // Nome do serviço no Docker Compose
    user: 'root', // Usuário configurado no Docker Compose
    password: '123456', // Senha configurada no Docker Compose
    database: 'banco', // Nome do banco configurado no Docker Compose
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
// Função genérica para realizar consultas
const query = (sql, params) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield pool.query(sql, params);
    return rows;
});
exports.query = query;
// Função opcional para encerrar o pool (caso necessário)
const closeConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    yield pool.end();
});
exports.closeConnection = closeConnection;
exports.default = pool;

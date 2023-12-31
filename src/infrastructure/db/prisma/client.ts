import { spawnSync } from "child_process";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

if (Bun.env.NODE_ENV === "test") {
	// executar o comando de criação de tabela
	spawnSync("npx", ["prisma", "migrate", "deploy"], { stdio: "inherit" });

	// adicionar uma cor no console
	console.log("\x1b[32m%s\x1b[0m", "Tabelas criadas com sucesso");
}

import { PrismaClient } from "@prisma/client";
import { spawnSync } from "child_process";

export const prisma = new PrismaClient();

if (Bun.env.NODE_ENV === "test") {
	// executar o comando de criação de tabela
	spawnSync("npx", ["prisma", "migrate", "deploy"], { stdio: "inherit" });

	console.log("Tabelas criadas");
}

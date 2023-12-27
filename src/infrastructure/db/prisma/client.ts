import { spawnSync } from "child_process";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

if (Bun.env.NODE_ENV === "test") {
	// executar o comando de criação de tabela
	spawnSync("bunx", ["prisma", "migrate", "deploy"], { stdio: "inherit" });
}

import * as express from "express";
const app: express.Express = express.default(); //https://qiita.com/kozzzz/items/59816861e6a2eb80cb34
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CROS対応（というか完全無防備：本番環境ではだめ絶対）
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.listen(4000, () => {
  console.log("🚀Start on  localhost:4000");
});

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const allUsers = await prisma.user.findMany();
  return allUsers;
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

//prismaを用いてユーザーを全て返す
app.get("/prisma-users", async (_, res: express.Response) => {
  const allUsers = await main();
  res.send(JSON.stringify(allUsers));
});

// ----- サンプル実装 ------- //

type User = {
  id: number;
  name: string;
  email: string;
};

const users: User[] = [
  { id: 1, name: "User10000000000000", email: "user1@test.local" },
  { id: 2, name: "User2", email: "user2@test.local" },
  { id: 3, name: "User3", email: "user3@test.local" },
];

//一覧取得
app.get("/users", async (_: express.Request, res: express.Response) => {
  res.send(JSON.stringify(users));
});

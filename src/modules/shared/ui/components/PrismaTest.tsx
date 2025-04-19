import prisma from "@/lib/prisma";

export default async function PrismaTest() {
  const users = await prisma.user.findMany();

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.id}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
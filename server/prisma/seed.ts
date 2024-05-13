import prisma from "./prismaClient";

async function main() {
  // Put your Google SSO login emails here. These will be set as admin accounts in the databse.
  const adminEmails = ["ayee0007@student.monash.edu"];

  adminEmails.forEach(async (email) => {
    await prisma.admin.upsert({
      where: { email },
      update: {},
      create: {
        email,
      },
    });
  });
  console.log("Inserted admin user emails");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

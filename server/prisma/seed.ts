import { Product } from "@prisma/client";
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

  // Add initial product catalog
  await prisma.product.create({
    data: {
      name: "Product One",
      description: "Product one description",
      imageUrl:
        "https://images.drive.com.au/driveau/image/upload/c_fill,f_auto,g_auto,h_1080,q_auto:eco,w_1920/v1/cms/uploads/jmnrqauksfaore9gv7bn",
      ProductOption: {
        create: {
          name: "Option 1",
          price: 120,
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Product Two",
      description: "Product two description",
      imageUrl:
        "https://images.drive.com.au/driveau/image/upload/c_fill,f_auto,g_auto,h_1080,q_auto:eco,w_1920/v1/cms/uploads/jmnrqauksfaore9gv7bn",
      ProductOption: {
        createMany: {
          data: [
            { name: "Option One", price: 70 },
            { name: "Option Two", price: 90 },
          ],
        },
      },
    },
  });
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

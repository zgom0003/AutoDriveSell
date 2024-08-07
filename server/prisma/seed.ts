import { Product } from "@prisma/client";
import prisma from "./prismaClient";

async function main() {
  // Put your Google SSO login emails here. These will be set as admin accounts in the databse.
  const adminEmails = ["ayee0007@student.monash.edu"];

  adminEmails.forEach(async (email) => {
    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        isAdmin: true,
      },
    });
  });
  console.log("Inserted admin user emails");

  // Add initial product catalog
  await prisma.product.create({
    data: {
      name: "Product One",
      description: "Product one description",
      images: {
        create: {
          imageUrl:
            "https://images.drive.com.au/driveau/image/upload/c_fill,f_auto,g_auto,h_1080,q_auto:eco,w_1920/v1/cms/uploads/jmnrqauksfaore9gv7bn",
        },
      },
      productOptions: {
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
      images: {
        createMany: {
          data: [
            {
              imageUrl:
                "https://images.drive.com.au/driveau/image/upload/c_fill,f_auto,g_auto,h_1080,q_auto:eco,w_1920/v1/cms/uploads/jmnrqauksfaore9gv7bn",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1617650728468-8581e439c864?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1617531653520-4893f7bbf978?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
          ],
        },
      },

      productOptions: {
        createMany: {
          data: [
            { name: "Option One", price: 70 },
            { name: "Option Two", price: 90 },
          ],
        },
      },
    },
  });
  console.log("Inserted sample products");
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

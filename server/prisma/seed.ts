import { Product } from "@prisma/client";
import prisma from "./prismaClient";

async function main() {
  // Put your Google SSO login emails here. These will be set as admin accounts in the databse.
  const adminEmails = ["ayee0007@student.monash.edu", "maja0001@student.monash.edu"];

  adminEmails.forEach(async (email) => {
    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        isAdmin: true,
        customer: { create: { firstName: "", lastName: "", address: "" } },
      },
    });
  });
  console.log("Inserted admin user emails");

  // Add initial product catalog
  await prisma.product.create({
    data: {
      name: 'Lidar Sensor Kit',
      description: 'High-resolution Lidar sensor for real-time 3D mapping',
      vehicletype: 'Electric Car',
      technology: 'Lidar',
      application: 'Environment Mapping',
      installation: 'Front Bumper Mount',
      productOptions: {
        create: [
          { name: 'Standard', price: 500 },
          { name: 'Pro', price: 800 },
        ],
      },
      images: {
        create: {
          imageUrl:
            "https://images.unsplash.com/photo-1617531653520-4893f7bbf978?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'AI Driving Computer',
      description: 'High-performance computer for autonomous navigation',
      vehicletype: 'Autonomous Bus',
      technology: 'Edge AI',
      application: 'Autonomous Control',
      installation: 'Dashboard',
      productOptions: {
        create: [{ name: 'Xtreme AI', price: 1500 }],
      },
      images: {
        createMany: {
          data: [
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

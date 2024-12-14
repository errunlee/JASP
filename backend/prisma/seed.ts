import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

// Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // Parse BCRYPT_SALT_ROUNDS or provide a default value
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);

  // Hash password once for reuse
  const hashedPassword = await bcrypt.hash("password123", saltRounds);

  // Seed Checkpoints
  console.log("Seeding checkpoints...");
  await prisma.checkpoint.createMany({
    data: [
      {
        name: "Lokanthali",
        longitude: 85.359929,
        latitude: 27.675253,
      },
      {
        name: "Madhyapur Thimi",
        longitude: 85.380945,
        latitude: 27.67656,
      },
      {
        name: "Gathaghar",
        longitude: 85.373718,
        latitude: 27.675935,
      },
    ],
    skipDuplicates: true, // Avoid inserting duplicates
  });
  // Seed Users
  console.log("Seeding users...");
//   await prisma.user.createMany({
//     data: [
//       {
//         username: "admin",
//         email: "admin@gmail.com",
//         password: hashedPassword,
//         roles: ["ADMIN", "REGULAR_USER"],
//         checkpointId: 1
//       },
//       {
//         username: "scrap",
//         email: "scrap@gmail.com",
//         password: hashedPassword,
//         roles: ["SCRAP_DEALER", "REGULAR_USER"],
//       },
//       {
//         username: "gadi",
//         email: "gadi@gmail.com",
//         password: hashedPassword,
//         roles: ["VEHICLE_MANAGER", "REGULAR_USER"],
//       },
//     ],
//     skipDuplicates: true, // Avoid inserting duplicates
//   });


  // Seed Posts (requires creating individually to handle `authorId` relationship)
//   console.log("Seeding posts...");
//   const posts = [
//     {
//       authorId: 1,
//       title: "The Importance of Sustainable Living",
//       description:
//         "Sustainable living is essential for the well-being of our planet and future generations.",
//       content:
//         "# The Importance of Sustainable Living\n\nAs human activities continue to exert immense pressure on the planet, sustainable living has emerged as a necessity rather than a choice. But what does it mean to live sustainably?\n\n## Understanding Sustainability\nSustainability involves meeting our needs without compromising the ability of future generations to meet theirs. This requires balancing economic, social, and environmental factors.\n\n## Why is it Important?\n1. **Climate Change Mitigation**: Carbon emissions from unsustainable practices are heating the planet. Reducing waste, using renewable energy, and consuming responsibly can help reverse the trend.\n2. **Preservation of Resources**: Finite natural resources like water and fossil fuels need to be used judiciously to avoid depletion.\n3. **Healthy Ecosystems**: Adopting eco-friendly habits helps protect biodiversity, which is crucial for ecosystem balance.\n\n## How to Start Living Sustainably?\n- **Reduce, Reuse, Recycle**: Minimize waste by recycling and opting for reusable items.\n- **Support Local and Ethical Products**: Reduce the carbon footprint by buying locally sourced goods.\n- **Conserve Energy**: Switch to energy-efficient appliances and turn off unused electronics.\n\nTogether, small changes in our daily habits can create a significant impact on the planet’s future.",
//       tags: ["Sustainability", "Climate Change", "Eco-Friendly"],
//       image: "uploads/dummy1.jpeg",
//     },
//     {
//       authorId: 1,
//       title: "How Trees Fight Climate Change",
//       description: "Discover the powerful role of trees in combating global climate change.",
//       content:
//         '# How Trees Fight Climate Change\n\nThe fight against climate change often feels overwhelming, but nature has provided us with a simple, effective weapon: trees.\n\n## The Role of Trees in Climate Action\nTrees are often called the "lungs of the Earth," and for a good reason. Here\'s why:\n\n1. **Carbon Sequestration**: Trees absorb carbon dioxide (CO2) from the atmosphere during photosynthesis, storing it as biomass. On average, a mature tree can absorb approximately 22 kg of CO2 annually.\n2. **Cooling Effect**: Tree canopies reduce urban heat by providing shade and releasing water vapor. This mitigates the “heat island” effect found in cities.\n3. **Biodiversity Support**: Forests house 80% of terrestrial animals and plants, providing crucial habitats. Biodiversity is vital for resilient ecosystems.\n\n## Threats to Trees\nDespite their importance, deforestation continues unabated, driven by:\n- Agriculture\n- Logging\n- Urbanization\n\n## What Can We Do?\n- **Plant More Trees**: Engage in afforestation drives.\n- **Protect Forests**: Support policies that prevent illegal logging.\n- **Adopt Reforestation Practices**: Encourage replanting in degraded areas.\n\nPlanting and protecting trees is one of the easiest and most impactful ways to mitigate climate change. Let’s take action before it’s too late.',
//       tags: ["Climate Change", "Trees", "Deforestation", "Reforestation"],
//       image: "uploads/dummy2.jpeg",
//     },
//     {
//       authorId: 1,
//       title: "The Perils of Plastic Pollution",
//       description: "Explore the devastating impact of plastic pollution on ecosystems and how to tackle it.",
//       content:
//         "# The Perils of Plastic Pollution\n\nPlastic has become an integral part of our lives, but its overuse comes with devastating consequences.\n\n## The Problem with Plastic\n1. **Non-Biodegradable**: Most plastics take hundreds of years to decompose, polluting the environment indefinitely.\n2. **Threat to Marine Life**: Over 8 million tons of plastic end up in the ocean every year, killing marine animals and disrupting ecosystems.\n3. **Microplastics**: Tiny fragments of plastic enter the food chain, posing health risks to humans and wildlife.\n\n## Alarming Statistics\n- By 2050, there will be more plastic in the ocean than fish by weight.\n- 1 million plastic bottles are purchased every minute worldwide.\n\n## Solutions to Plastic Pollution\n- **Switch to Alternatives**: Use biodegradable or reusable materials like glass and bamboo.\n- **Ban Single-Use Plastics**: Advocate for local bans on straws, bags, and other single-use items.\n- **Participate in Cleanups**: Engage in local beach and park cleanups to remove existing waste.\n\nTackling plastic pollution requires both individual actions and systemic changes. Let’s strive for a cleaner, greener planet.",
//       tags: ["Plastic Pollution", "Marine Life", "Sustainable Practices"],
//       image: "uploads/dummy3.jpeg",
//     },
//   ];

//   for (const post of posts) {
//     await prisma.post.create({ data: post });
//   }

//   console.log("Seeding complete!");
// }
}
// Execute main function
main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const { seedRoles, seedPermissions, seedRolePermissions } = require("./prisma/seedDetails");

const runSeeding = async () => {
    console.log('Seeding roles...');
    await seedRoles();
    console.log('Seeding permissions...');
    await seedPermissions();
    console.log('Seeding role permissions...');
    await seedRolePermissions();
    console.log('Seeding completed!');
    process.exit(0);  // Exit the process after seeding is done
  };
  
  runSeeding().catch(error => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });
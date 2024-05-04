const express = require("express");
const { seedRoles, seedPermissions, seedRolePermissions } = require("../../prisma/seed");
const router = express.Router();


router.post('/seed', async (req, res) => {
    try {

      await seedRoles();
      await seedPermissions();
      await seedRolePermissions();
  
      res.json({ message: 'Seed data inserted successfully' });
    } catch (error) {
      console.error('Error seeding data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;

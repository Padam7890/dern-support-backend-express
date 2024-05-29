const express = require("express");
const { seedRoles, seedPermissions, seedRolePermissions, usertoAdmin } = require("../../prisma/seed");
const sendmails = require("../controllers/repair/repairMail.controller");
const getdashboardDetails = require("../controllers/dashboard/dashboard");
const router = express.Router();


router.get('/dashboard', getdashboardDetails);

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

  router.post('/makeAdmin/:id', usertoAdmin )

  router.post('/sendRepair/mail',  sendmails);

  module.exports = router;

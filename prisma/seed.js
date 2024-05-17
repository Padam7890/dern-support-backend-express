const { prisma } = require("../src/configs/prisma");

const seedRoles = async () => {
  try {
    const rolesData = [
      {
        name: "admin",
      },
      {
        name: "user",
      },
      {
        name: "customer",
      },
    ];
    const role = await prisma.role.findMany({});
    if (role.length > 0) {
      return;
    } else {
      await prisma.role.createMany({
        data: rolesData,
      });
      console.log("roles seeded successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

const seedPermissions = async () => {
  try {
    const permissonData = [
      {
        permission: "Read",
        slug: "read",
      },
      {
        permission: "Create",
        slug: "create",
      },
      {
        permission: "Update",
        slug: "update",
      },
      {
        permission: "Delete",
        slug: "delete",
      },
    ];
    // check if available or not in db
    const permission = await prisma.permission.findMany({});
    if (permission.length > 0) {
      return;
    } else {
      await prisma.permission.createMany({
        data: permissonData,
      });
      console.log("permissions seeded successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

const seedRolePermissions = async () => {
  try {
    const rolepermissiondata = [
      {
        roleId: 1,
        permissionId: 1,
      },
      {
        roleId: 1,
        permissionId: 2,
      },
      {
        roleId: 1,
        permissionId: 3,
      },
      {
        roleId: 1,
        permissionId: 4,
      },

      {
        roleId: 2,
        permissionId: 1,
      },
      {
        roleId: 2,
        permissionId: 2,
      },
      {
        roleId: 2,
        permissionId: 3,
      },
    ];

    const rolepermission = await prisma.rolePermission.findMany({});
    if (rolepermission.length > 0) {
      return;
    } else {
      await prisma.rolePermission.createMany({
        data: rolepermissiondata,
      });
    }

    console.log("role permissions seeded successfully");
  } catch (error) {
    console.log(error);
  }
};

const usertoAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { roles: true },
    });

    if (!user) return res.status(404).json({ message: "User not found", statusCode: 404 });

    const isAdmin = user.roles.some(role => role.name === "admin");
    const isUser = user.roles.some(role => role.name === "user");

    if (isAdmin) return res.status(400).json({ error: "User is already an admin" });

    const [adminRole, userRole, customerRole] = await Promise.all([
      prisma.role.findFirst({ where: { name: "admin" } }),
      prisma.role.findFirst({ where: { name: "user" } }),
      prisma.role.findFirst({ where: { name: "customer" } }),
    ]);

    if (!adminRole) return res.status(404).json({ message: "Admin role not found", statusCode: 404 });

    const updateRoles = async (disconnectId, connectId) => {
      await prisma.user.update({
        where: { id: userId },
        data: {
          roles: {
            disconnect: { id: disconnectId },
            connect: { id: connectId },
          },
        },
      });
    };

    if (isUser) {
      await updateRoles(userRole.id, adminRole.id);
      return res.json({ message: "User is now an admin", statusCode: 200 });
    } else {
      await updateRoles(customerRole.id, userRole.id);
      return res.json({ message: "Customer is now a User!!! Run Again to make Admin", statusCode: 200 });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", statusCode: 500 });
  }
};


module.exports = {
  seedRoles,
  seedPermissions,
  seedRolePermissions,
  usertoAdmin,
};

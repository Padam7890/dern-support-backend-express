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

const usertoAdmin = async (request, response) => {
  try {
    const { id } = request.params;

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        roles: true,
      },
    });
    if (!user) {
      return response.status(404).json({
        message: "User not found",
        statusCode: 404,
      });
    }
    // Check if the user is already an admin
    const isAdmin = user.roles.some((role) => role.name === "admin");
    const isUser = user.roles.some((role) => role.name === "user");

    if (isAdmin) {
      return response.status(400).json({ error: "User is already an admin" });
    }

    const adminRole = await prisma.role.findFirst({ where: { name: "admin" } });

    const userRole = await prisma.role.findFirst({ where: { name: "user" } });

    if (!adminRole) {
      return response
        .status(404)
        .json({
            message: "Admin role not found",
            statusCode: 404,
        });
    }

    if (isUser) {
      //delete user's role
      await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
          roles: {
            disconnect: {
              id: userRole.id,
            },
            connect: {
              id: adminRole.id,
            },
          },
        },
      });
    }

    return response.json({
      message: "User is now an admin",
      statusCode: 200,
    });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({
        message: "Internal server error",
        statusCode: 500,
      });
  }
};

module.exports = {
  seedRoles,
  seedPermissions,
  seedRolePermissions,
  usertoAdmin,
};

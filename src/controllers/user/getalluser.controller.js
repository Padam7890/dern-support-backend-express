const searchByQueries = require("../../helpers/searchquer");
const user = require("../../models/user.model");

const getallusers = async (req, res) => {
  try {
    const { skip, pageSize, page, searchQuery } = searchByQueries(req);

    const totalUsers = await user.count();

    const allusers = await user.findMany({
      skip,
      take: pageSize,
      where: {
        OR: [{ name: { contains: searchQuery } }],
      },
      include: {
        roles: {
          include: {
            permissions: {
              include: {
                Permission: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json({
      message: "All Users",
      data: allusers,
      total: totalUsers,
      page: page,
      pageSize: pageSize,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = getallusers;

const dashboardCount = async (model) => {
  try {

    const previousWeekQuatations = await model.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          lte: new Date(Date.now()),
        },
      },
    });
    const twoWeekAgoQuatations = await model.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          lte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });
    let checkPercentage;

    if (twoWeekAgoQuatations === 0) {
      checkPercentage = 100;
    } else {
      checkPercentage =
        ((previousWeekQuatations - twoWeekAgoQuatations) / twoWeekAgoQuatations) *
        100;
    }

    return checkPercentage;

  } catch (error) {
    console.log(error);
    throw new Error(error);

  }

};

module.exports =dashboardCount;
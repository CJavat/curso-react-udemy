const Follow = require("../models/follow.model");

const followUserIds = async (identityUserId) => {
  try {
    // Sacar info de seguimiento.
    let following = await Follow.find({ user: identityUserId })
      .select({ followed: 1, _id: 0 })
      .exec();

    let followers = await Follow.find({ followed: identityUserId })
      .select({ user: 1, _id: 0 })
      .exec();

    // Procesar array de identificadores.
    let followingClean = [];
    let followersClean = [];

    following.forEach((follow) => {
      followingClean.push(follow.followed);
    });

    followers.forEach((follow) => {
      followersClean.push(follow.user);
    });

    return {
      followingClean,
      followersClean,
    };
  } catch (error) {
    return {};
  }
};

const followThisUser = async (identityUserId, profileUserId) => {};

module.exports = {
  followUserIds,
  followThisUser,
};

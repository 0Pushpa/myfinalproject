import DataStat from "../models/DataStat.js";
import Group from "../models/Group.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import prettyBytes from "pretty-bytes";

export const getDataStat = async (req, res) => {
  // https://www.mongodb.com/community/forums/t/using-group-to-group-data-by-a-field-and-then-sort-by-field-within-nested-array/7410/2
  const data_stat = await DataStat.aggregate([
    {
      $match: {
        // match the docs anyhow you want
        // this $match stage will match all docs
        // from sessions
        afterCompression: { $gte: 0 },
        beforeCompression: { $gte: 0 },
      },
    },
    {
      $lookup: {
        from: "groups",
        localField: "GroupID",
        foreignField: "_id",
        as: "groupdetails",
      },
    },
    {
      $group: {
        // group by $GroupId
        _id: "$GroupID",
        numberOfGroups: {
          $sum: 1,
        },

        datastats: {
          $push: {
            _id: "$_id",
            GroupDetail: "$groupdetails",
            afterCompression: "$afterCompression",
            beforeCompression: "$beforeCompression",
          },
        },
      },
    },
    {
      // this is needed to sort items in $sessions array
      $unwind: "$datastats",
    },
    //   {
    //     $sort: {
    //       // specify $sessions sort params here
    //       'sessions.aftercompression': 1,
    //     }
    //   },
    {
      // this $group stage is needed, because we did
      // $unwind before
      $group: {
        _id: "$_id",
        numberOfGroups: {
          $first: "$numberOfGroups",
        },
        datastats: {
          $push: "$datastats",
        },
      },
    },
  ]);
  var dataforstat = [];
  data_stat.forEach(async (group) => {
    // let group_id = group._id
    // const groupdata = Group.findOne({
    //   _id: group_id,
    // });
    // if (!groupdata) {
    //   console.log("not found");
    //   throw new NotFoundError(`No group with id ${group_id}`);
    // }

    var before = 0;
    var after = 0;
    var group_detail;

    group.datastats.forEach((data) => {
      group_detail = data?.GroupDetail[0]?.name;
      before = before + data?.beforeCompression;
      after = after + data?.afterCompression;
    });
    // console.log(group_detail)

    let data = {
      group_id: group._id,
      group_name: group_detail,
      beforeCompression: prettyBytes(before),
      afterCompression: prettyBytes(after),
      compressed_size: prettyBytes(before - after),
      compressed_percentage: ((before - after) / before) * 100,
    };
    dataforstat.push(data);
  });

  res.status(StatusCodes.OK).json({ dataforstat, count: dataforstat.length });
};

export const addDataStat = async (req, res) => {
  const data = {
    // GroupID:"61bff16a93aa9ec6578cb018",
    GroupID: req.body.group_id,
    beforeCompression: req.body.before,
    afterCompression: req.body.after,
  };
  // var name =[];
  // data.forEach(group => {
  //     var name = name + group._id;
  //     group.forEach(data => {

  //     });
  // });
  const data_stats = await DataStat.create(data);
  res.status(StatusCodes.OK).json({ data_stats });
};

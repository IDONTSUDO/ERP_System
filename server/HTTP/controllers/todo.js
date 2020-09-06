const TODO = require("../database/User/UserTodo");
const COMMENTS = require("../database/Agent/Comments");
const WORKER = require("../database/Company/Company");
const TODOAGENT = require("../database/Agent/AgentTasks");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const dateFormat = require("dateformat");
const moment = require("moment");
exports.TodoById = async (req, res, next, id) => {
  await TODO.findById(id).exec((err, todo) => {
    if (err || !todo) {
      return res.status(400).json({
        error: "дело не найдено"
      });
    }

    req.todo = todo;
    next();
  });
};

exports.ComentById = async (req, res, next, id) => {
  await COMMENTS.findById(id).exec((err, coment) => {
    if (err || !coment) {
      return res.status(400).json({
        error: "коментарий не найден"
      });
    }

    req.coment = coment;
    next();
  });
};

exports.SOSotodo = (req, res) => {};
exports.myTodoItsDayS = async (req, res, next) => {
  console.log("ITS WORK")
  let time = moment()
    .locale("ru")
    .format("LL");

  TODO.find({
    $and: [{ time: { $eq: `${time}` } }, { tags: `${req.worker._id}` }]
  })
  .exec((err, todos) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json({ todos });
  });
};
exports.myTodoItsDayQuality = async (req, res, next) => {
  let time = moment()
    .locale("ru")
    .format("LL");

  TODO.count({
    $and: [{ time: { $eq: `${time}` } }, { tags: `${req.worker._id}` }]
  })
  .exec((err, todos) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json(todos);
  });
};

exports.MyTodoMouth = async (req, res) => {
  let { mounthTodo, user, yearTodo } = req.body;
  TODO.find({ $or: [{ tags: user, mounth: mounthTodo, year: yearTodo }] }).exec(
    (err, todo) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      } else {
        res.json(todo);
      }
    }
  );
};
exports.MyTodoYear = async (req, res) => {
  let { year, user, mounthTodo } = req.body;
  TODO.find({ tags: user, mounth: mounthTodo, year: year }).exec(
    (err, todo) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      } else {
        res.json(todo);
      }
    }
  );
};
exports.myTODOSSS = async (req, res) => {
  console.log(2000);
  console.log(req.worker._id);
  TODO.find({ tags: `${req.worker._id}` })
  .exec((err, todos) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    res.json({ todos });
  });
};
exports.MyComandTodo = async (req, res) => {
  let time = moment()
    .locale("ru")
    .format("LL");
  TODO.find({
    JobArray: { $elemMatch: { user: `${req.body.userId}`, date: `${time}` } }
  }).exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    res.json(posts);
  });
};
exports.MyComandTodoQuality = async (req, res) => {
  let time = moment()
    .locale("ru")
    .format("LL");
  TODO.count({
    JobArray: {
      $elemMatch: { user: `${req.body.userId + "IAMWORKED"}`, date: `${time}` }
    }
  })
  .exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    res.json(posts);
  });
};
exports.MyTodoAwesome = async (req, res) => {
  TODO.find({ tags: req.worker._id }).exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json(posts);
  });
};
exports.NewTodoUserAwesome = async (req, res) => {
  const todo = new TODO(req.body);
  todo.postedBy = req.worker;

  todo.save().then(result => {
    res.status(200).json(result);
  });
};
exports.NewTodoUserAwesomeNews = async (req, res, next) => {
  let users = req.body.worker_by;
  const todo = new TODO(req.body);
  todo.postedBy = req.worker;

  if (req.body.status === "Выполнено") {
    todo.expireAt = Date.now();
  }
  todo.save().then(result => {
    req.body.link + result._id;
    req.newsLink = "/job/" + result._id;
    req.newsUser = users;
    next();
  });
};
exports.TodoChange = async (req, res, next) => {
  var todo = req.todo;
  todo = _.extend(todo, req.body.payload || req.body);

  todo.updated = Date.now();

  if (todo.status === "Выполнено") {
    let cloneJobArray = _.cloneDeep(todo.JobArray);
    let cloneagentByTodo = _.cloneDeep(todo.agentByTodo);

    let {
      status,
      name_posted,
      timeComand,
      tags,
      names_workers_list,
      posted_by,
      comand,
      importance,
      title,
      description,
      time,
      created,
      year,
      mounth
    } = todo;

    let todosAgent = {
      status,
      name_posted,
      timeComand,
      tags,
      names_workers_list,
      posted_by,
      comand,
      importance,
      title,
      description,
      time,
      created,
      year,
      mounth
    };
    todosAgent.agentByTodo = cloneagentByTodo;
    todosAgent.JobArray = cloneJobArray;
    const todoagents = new TODOAGENT(todosAgent);

    todoagents.save().then(result => {
      todo.expireAt = Date.now();

      todo.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: err
          });
        }

        res.json(result);

        return next();
      });
    });
  } else {
    await todo.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }

      res.json(result);
    });
  }
};
exports.NewUserNews = async (req, res) => {
  WORKER.findByIdAndUpdate(
    req.body.workerId,
    { $push: { news: req.body.todoId } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    } else {
      res.json(result);
    }
  });
};
exports.GetTodo = async (req, res) => {
  return await res.json(req.todo);
};
exports.NewComents = async (req, res) => {
  const comments = new COMMENTS(req.body);
  comments.save().then(result => {
    res.status(200).json({
      comments: result
    });
  });
};
exports.FindComments = async (req, res) => {
  COMMENTS.find({ todoId: req.body.todoId }).exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json(posts);
  });
};

exports.DeleteComent = async (req, res) => {
  let coment = req.coment;
  coment.remove((err, coment) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json({
      message: "Coment deleted successfully"
    });
  });
};
exports.GetcomandTodo = async (req, res) => {
  let userId = req.body.userId;
  TODO.find({ JobArray: { $elemMatch: { user: userId } } })
    .select(
      "comand _id title importance JobArray status posted_by diff name_posted"
    )
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }
      res.json({ result });
    });
};
exports.AssignedTask = async (req, res) => {
  let userId = req.body.userId;
  const currentPage = req.query.page || 1;

  const perPage = 100;
  var totalItems;

  const company = TODO.find({ posted_by: userId })

    .countDocuments()
    .then(count => {
      totalItems = count;
      return TODO.find({ posted_by: userId })
        .skip((currentPage - 1) * perPage)
        .select("names_workers_list")
        .limit(perPage);
    })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => console.log(err));
};
exports.AssiggnedTaskUserBy = async (req, res) => {
  let { userBy, userId } = req.body.payload;

  TODO.find({
    $and: [{ posted_by: userId }, { names_workers_list: userBy }]
  }).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        err: err
      });
    }
    res.json(result);
  });
};
exports.DeletedTodo = async (req, res) => {
  let todo = req.todo;
  todo.remove((err, result) => {
    if (err) {
      return res.status(400).json({
        err: err
      });
    }
    res.json({ message: "User delete!" });
  });
};

let Todo = require("../database/UserTodo.js");
let AgentComent = require("../database/Comments.js");
let TodoAgents = require("../database/AgentTasks.js");
let AgentStatistic = require("../database/Statistics/AgentStatistic");
let ActiveUserWeek = require("../database/Statistics/ActiveUserWeekDay");
let Agent = require("../database/ContrAgent");
exports.newCommentAtAgent = async (req, res, next) => {
  let {
    taskId,
    value,
    rate,
    agentID,
    workerId,
    newTodo,
    task,
    user
  } = req.body;

  Todo.findById(taskId).then(data => {
    let agentTodos = [];
    req.agent = task.agentByTodo[0]._id;
    console.log(task.agentByTodo[0]._id);
    agentTodos.push(task.agentByTodo[0].name, task.agentByTodo[0]._id);
    let agentTodo = new TodoAgents(task);
    agentTodo.agentByTodo = agentTodos;
    agentTodo.rate = rate;
    agentTodo.description = newTodo.description;
    agentTodo.user = user;
    agentTodo.save().then((err, result) => {
      data.remove();
      res.status(200).json("OK");
      return next();
    });
  });
};

exports.newTodoByAgent = async req => {
  let { newTodo } = req.body;
  let agent = req.agent;
  Agent.findById(agent).then(data => {
    let todos = new Todo(newTodo);
    todos.agentByTodo = [data];
    todos.status = "system";
    todos.title = data.name;
    todos.save();
  });
};
exports.agentUpdateStatistic = async req => {
  let { agentID, task } = req.body;
  let mounth = task.mounth;

  let agentIdByFind = agentID;
  if (mounth === "01") {
    AgentStatistic.findOneAndUpdate(
      { agentBy: agentIdByFind },
      { $inc: { 1: +1 } }
    );
  } else if (mounth === "02") {
    AgentStatistic.findOneAndUpdate(
      { agentBy: agentIdByFind },
      { $inc: { 2: +1 } }
    );
  } else if (mounth === "03") {
    AgentStatistic.findOneAndUpdate(
      { agentBy: agentIdByFind },
      { $inc: { 3: +1 } }
    );
  } else if (mounth === "04") {
    AgentStatistic.findOneAndUpdate(
      { agentBy: agentIdByFind },
      { $inc: { 4: +1 } }
    );
  } else if (mounth === "05") {
    AgentStatistic.findOneAndUpdate(
      { agentBy: agentIdByFind },
      { $inc: { 5: +1 } }
    );
  } else if (mounth === "06") {
    AgentStatistic.findOneAndUpdate(
      { agentBy: agentIdByFind },
      { $inc: { 6: +1 } }
    );
  } else if (mounth === "07") {
    AgentStatistic.findOneAndUpdate(
      { agentBy: agentIdByFind },
      { $inc: { 7: +1 } }
    );
  } else if (mounth === "08") {
    AgentStatistic.findOneAndUpdate(
      { agentBy: agentIdByFind },
      { $inc: { 8: +1 } }
    );
  } else if (mounth === "09") {
    AgentStatistic.findOneAndUpdate(
      { agentBy: agentIdByFind },
      { $inc: { 9: +1 } }
    );
  } else if (mounth === "10") {
    AgentStatistic.findOneAndUpdate(
      { agentBy: agentIdByFind },
      { $inc: { 10: +1 } }
    );
  } else if (mounth === "11") {
    AgentStatistic.findOneAndUpdate(
      { agentBy: agentIdByFind },
      { $inc: { 11: +1 } }
    );
  } else if (mounth === "12") {
    AgentStatistic.findOneAndUpdate(
      { agentBy: agentIdByFind },
      { $inc: { 12: +1 } }
    );
  }
};
exports.userActive = async (req, res) => {
  let { userId } = req.body;
  TodoAgents.find({
    $or: [{ tags: userId }, { JobArray: { $elemMatch: { user: userId } } }]
  })
    .sort({ _id: -1 })
    .limit(20)
    .then(data => {
      return res.status(200).json(data);
    });
};
exports.userActiveMouthAndYear = async (req, res) => {
  let { userId, Year, Mounth } = req.body;
  TodoAgents.find({ tags: userId, year: Year, mounth: Mounth }).then(data => {
    return res.status(200).json(data);
  });
};
exports.activeHelper = async (req, res) => {
  let { WeekNum, year, userId } = req.body;

  ActiveUserWeek.find({ year: year, week: WeekNum, userId: userId })
    .select(" _id week year ")
    .then(data => {
      if (data[0] != undefined) {
        return res.status(200).json(data[0]);
      } else {
        // TODO
      }
    });
};
exports.userActiveAtAgentGet = async (req,res) =>{
  let {manageId,agentId} = req.body
  TodoAgents.find({
    $and: [{ agentByTodo: agentId }, { tags: manageId }]
  }).sort({_id:-1})
  .then(data => {
    console.log(data)
    return res.status(200).json(data);
  });
}
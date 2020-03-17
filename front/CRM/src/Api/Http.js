import { isAuthenticated } from "./Auth.js";
const token = isAuthenticated().token;
var myHeaders = new Headers({
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`
});

export const manage_list = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/manage/list`, {
    method: "GET",
    headers: myHeaders
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const list = page => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/all/worker/list/?page=${page}`,
    {
      method: "GET",
      headers: myHeaders
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const DeleteUser = userId => {
  return fetch(`${process.env.REACT_APP_API_URL}/delete/worker/${userId}`, {
    method: "DELETE",
    headers: myHeaders
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const NewPeopel = user => {
  return fetch(`${process.env.REACT_APP_API_URL}/new/worker/`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(user)
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};

export const NewTodo = (todo, user) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/new/todo/awesome/${user._id}`,
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(todo)
    }
  )
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const read = userId => {
  return fetch(`${process.env.REACT_APP_API_URL}/worker/get/${userId}`, {
    method: "GET",
    headers: myHeaders
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};
export const update = (userId, user) => {
  console.log(user);
  return fetch(`${process.env.REACT_APP_API_URL}/edit/worker/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: user
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};
export const updateUser = (user, next) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("jwt")) {
      let auth = JSON.parse(localStorage.getItem("jwt"));

      auth.direct = user;
      console.log(auth.direct);
      console.log(auth.token);
      let newData = new Object();

      newData.direct = auth.direct.direct;

      newData.token = auth.token;

      // newData.add()

      // console.log("new data",newData)
      // console.log(auth)

      // auth = user

      localStorage.setItem("jwt", JSON.stringify(newData));
      next();
      return console.log("NNO      ERRORs");
    }
    return console.log("updateUser()error");
  }
};
export const readMyTodo = userId => {
  return fetch(`${process.env.REACT_APP_API_URL}/my/todo/soso/${userId}`, {
    method: "GET",
    headers: myHeaders
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const soloJob = todoId => {
  return fetch(`${process.env.REACT_APP_API_URL}/todo/${todoId}`, {
    method: "GET",
    headers: myHeaders
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};
export const readComentList = todoId => {
  return fetch(`${process.env.REACT_APP_API_URL}/get/todo/coments/`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ todoId })
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const NewComent = comment => {
  return fetch(`${process.env.REACT_APP_API_URL}/comment/todo/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: comment
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const DeleteComment = comment => {
  return fetch(`${process.env.REACT_APP_API_URL}/delete/comment/${comment}`, {
    method: "POST",
    headers: myHeaders
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const OneNewsDelete = newsId => {
 
  return fetch(`${process.env.REACT_APP_API_URL}/news/delete/${newsId}`,{
    method: "DELETE",
    headers: myHeaders,
  }).then(response => {
    return response.json();
  })
  .catch(error => {
    console.log(error);
  });
};
export const NewNews = payload => {
  return fetch(`${process.env.REACT_APP_API_URL}/new/news`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(payload)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const listNews = id => {
  return fetch(`${process.env.REACT_APP_API_URL}/worker/news`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ id })
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const SetStatusJob = (payload, todoId) => {
  console.log(payload);
  return fetch(`${process.env.REACT_APP_API_URL}/todo/change/${todoId}`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ payload })
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const TodayWorkHTTP = userId => {
  return fetch(`${process.env.REACT_APP_API_URL}/today/todo/${userId}`, {
    method: "GET",
    headers: myHeaders
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const TodoChangeExperienseAtHTTP = (expireAt, todoId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/todo/change/${todoId}`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ expireAt: expireAt })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};
export const NewContrAgent = (NewAgent, user) => {
  return fetch(`${process.env.REACT_APP_API_URL}/new/agent/${user}`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(NewAgent)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};
export const ContrAgentList = page => {
  return fetch(`${process.env.REACT_APP_API_URL}/agent/list/?page=${page}`, {
    method: "GET",
    headers: myHeaders
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};
export const GetAgentProfile = agentId => {
  return fetch(`${process.env.REACT_APP_API_URL}/agent/${agentId}`, {
    method: "GET",
    headers: myHeaders
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};
export const AddManageForAgent = (tags, agentId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/new/manage/agent/${agentId}`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(tags)
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const MyAgentList = workerId => {
  return fetch(`${process.env.REACT_APP_API_URL}/agent/manage/`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ workerId })
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const MyHistoryActive = userId => {
  return fetch(`${process.env.REACT_APP_API_URL}/my/history/active/`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ userId })
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const MyHistoryBeginer = userId => {
  return fetch(`${process.env.REACT_APP_API_URL}/my/history/beginer/`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ userId })
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const MyHistoryComplete = (userId, page) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/my/history/complete/?page=${page}`,
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ userId })
    }
  )
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const OneHistoryGet = HistoryById => {
  return fetch(`${process.env.REACT_APP_API_URL}/history/${HistoryById}`, {
    method: "GET",
    headers: myHeaders
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const ChangeHistory = (DealId, status) => {
  return fetch(`${process.env.REACT_APP_API_URL}/change/history/${DealId}`, {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({ status })
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const ChangeHistoryItem = (DealId, payload) => {
  return fetch(`${process.env.REACT_APP_API_URL}/change/history/${DealId}`, {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(payload)
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const SearchContrAgent = item => {
  return fetch(`${process.env.REACT_APP_API_URL}/agent/search`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ item })
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const listStatisticCompany = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/get/qauality/user/statistic`, {
    method: "GET",
    headers: myHeaders
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const NewDealHistory = payload => {
  return fetch(`${process.env.REACT_APP_API_URL}/new/history/`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(payload)
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const AllAgentHistory = agentId => {
  return fetch(`${process.env.REACT_APP_API_URL}/all/agent/history/`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ agentId: agentId })
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const UpdateNews = NewsArray => {
  for (let news of NewsArray) {
    fetch(`${process.env.REACT_APP_API_URL}/worker/read/${news}`, {
      method: "POST",
      headers: myHeaders
    }).catch(err => console.log(err));
  }
};
export const TodoUpTime = (ID, UpTime) => {
  return fetch(`${process.env.REACT_APP_API_URL}/todo/change/${ID}`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ time: UpTime })
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const TodoChangeComandList = (todoId, payload) => {
  return fetch(`${process.env.REACT_APP_API_URL}/todo/change/${todoId}`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ payload })
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const ChangeAgentProfile = (AgentId, payload) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/change/agent/profile/${AgentId}`,
    {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({ payload })
    }
  )
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const ChangeAgent = (AgentId, status) => {
  return fetch(`${process.env.REACT_APP_API_URL}/change/agent/${AgentId}`, {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({ status: status })
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const MyTodoGetComandWorked = userId => {
  return fetch(`${process.env.REACT_APP_API_URL}/get/comand/todo/`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ userId })
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const MytodoComandItsDay = userId => {
  return fetch(`${process.env.REACT_APP_API_URL}/get/comand/todo/time/`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ userId })
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const MyTodoComandQuality = userId => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/get/comand/todo/time/quality/`,
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ userId })
    }
  )
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const MyTodoTodyQuality = userId => {
  return fetch(`${process.env.REACT_APP_API_URL}/today/todo/qulity/${userId}`, {
    method: "GET",
    headers: myHeaders
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const MyNewsQuality = userId => {
  return fetch(`${process.env.REACT_APP_API_URL}/news/quality/`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ userId })
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const NewNewsJob = payload => {
  console.log(payload);
  return fetch(`${process.env.REACT_APP_API_URL}/new/news/job`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(payload)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const UserSecurityList = userId => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/security`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ userId })
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const PricedAtManage = AgentId => {
  return fetch(`${process.env.REACT_APP_API_URL}/agent/user/price`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ AgentId })
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const NewPricedAtAgent = (userBy, agentId, percent) => {
  return fetch(`${process.env.REACT_APP_API_URL}/new/agent/price/at/manage`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ userBy, agentId, percent })
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const DeleteManageAtAgent = payload => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/manage/delete/price/at/manage`,
    {
      method: "DELETE",
      headers: myHeaders,
      body: JSON.stringify({ payload })
    }
  )
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const MyDevice = userBy => {
  return fetch(`${process.env.REACT_APP_API_URL}/my/device/`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ userBy })
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const GetIpData = ip => {
  return fetch(`${process.env.REACT_APP_API_URL}/get/ip/data`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ ip })
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const DeleteDevice = device => {
  return fetch(`${process.env.REACT_APP_API_URL}/delete/device/`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ _id: device })
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const NewNewsToComment = payload => {
  console.log(JSON.stringify({ payload }));
  return fetch(`${process.env.REACT_APP_API_URL}/new/news/coments`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ payload })
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const NewNewToSetStatusJob = payload => {
  return fetch(`${process.env.REACT_APP_API_URL}/new/news/set/status `, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ payload })
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const SaveSnipet = payload => {
  return fetch(`${process.env.REACT_APP_API_URL}/save/email/snipets`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ payload })
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => {
      return err;
    });
};
export const MailImger = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/images/email/all`, {
    method: "GET",
    headers: myHeaders
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => console.log(err));
};
export const UploadEmailImg = file => {
  const formData = new FormData();
  formData.append("email", file);
  console.log(formData);
  return fetch(`${process.env.REACT_APP_API_URL}/photos/upload`, {
    method: "POST",
    headers: {
      ContentType: "multipart/form-data",
      Authorization: `Bearer ${token}`
    },
    body: formData
  })
    .then(response => {
      console.log(response);
      return response.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const DeleteImg = id => {
  return fetch(`${process.env.REACT_APP_API_URL}/images/del/${id}`, {
    method: "DELETE",
    headers: myHeaders
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const NewSubscribeEveryDay = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/new/statistic/everyday`, {
    method: "POST",
    headers: myHeaders
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const NewAssignTodoToday = statisticId => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/update/days/statistics/todo/assign`,
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ statisticId })
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const AllStatistic = userId => {
  return fetch(`${process.env.REACT_APP_API_URL}/all/statistics`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ userId })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      // console.log(err)
      return err;
    });
};
export const NewTodoCompleteStatistic = statisticId => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/update/days/statistics/todo/complete`,
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ statisticId })
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const NewComentStatistic = statisticId => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/update/days/statistics/comment/result`,
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ statisticId })
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const MyAssignedTodo = userId => {
  return fetch(`${process.env.REACT_APP_API_URL}/get/assigned/todo`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ userId })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const AssignedTodoUserBy = payload => {
  return fetch(`${process.env.REACT_APP_API_URL}/assigned/task/userby`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ payload })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const UpdateDaysTodoComplete = payload => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/update/days/statistics/todo/complete`,
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ payload })
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const DeleteTodo = TodoId => {
  return fetch(`${process.env.REACT_APP_API_URL}/delete/todo/${TodoId}`, {
    method: "DELETE",
    headers: myHeaders
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const SearchAgentEmail = item => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/search/managing/director/to/email`,
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ item })
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const GetTodoByAgent = agentId => {
  return fetch(`${process.env.REACT_APP_API_URL}/agent/todo/${agentId}`, {
    method: "GET",
    headers: myHeaders
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const GetAgentTodoStatistic = agentId => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/agent/todo/quality${agentId}`,
    {
      method: "GET",
      headers: myHeaders
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const GetAgentYearStatistic = (agentId, Year) => {
  return fetch(`${process.env.REACT_APP_API_URL}/year/agent/todo/statistics`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ agentId, Year })
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const GetAgentMountAndYear = (agentId, Year, Mounth) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/year/on/mounth/todo/agent/todo`,
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ agentId, Year, Mounth })
    }
  )
    .then(responce => {
      return responce.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const GetTask = taskId => {
  return fetch(`${process.env.REACT_APP_API_URL}/agent/task/${taskId}`, {
    method: "GET",
    headers: myHeaders
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const NewSpecialication = data => {
  return fetch(`${process.env.REACT_APP_API_URL}/new/spec/agent`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ data })
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const AllSpecList = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/all/spec/agent`, {
    method: "GET",
    headers: myHeaders
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const deleteSpecialisations = id => {
  return fetch(`${process.env.REACT_APP_API_URL}/delete/spec/${id}`, {
    method: "DELETE",
    headers: myHeaders
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const SnipetDelete = id => {
  return fetch(`${process.env.REACT_APP_API_URL}/snipets/delete/${id}`, {
    method: "DELETE",
    headers: myHeaders
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const GetSnipets = id => {
  return fetch(`${process.env.REACT_APP_API_URL}/get/email/snipet`, {
    method: "GET",
    headers: myHeaders
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const GetDisign = id => {
  return fetch(`${process.env.REACT_APP_API_URL}/get/disign/${id}`, {
    method: "GET",
    headers: myHeaders
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const SeacrhSpecAgnets = spec => {
  return fetch(`${process.env.REACT_APP_API_URL}/get/spec/agents`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(spec)
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const SearchGeoAgents = geoList => {
  return fetch(`${process.env.REACT_APP_API_URL}/get/geo/search`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(geoList)
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const ItegrationContrAgent = userBy => {
  return fetch(`${process.env.REACT_APP_API_URL}/integration/on`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(userBy)
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const integrationList = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/integration/list`, {
    method: "GET",
    headers: myHeaders
  })
    .then(responce => {
      return responce.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const agentStaticAtMail = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/agnet/static/at/mail`, {
    method: "GET",
    headers: myHeaders
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const agentStaticAtJob = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/agnet/static/at/job`, {
    method: "GET",
    headers: myHeaders
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const agentStaticAtAll = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/agnet/static/at/all`, {
    method: "GET",
    headers: myHeaders
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const agentStaticAtTech = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/agnet/static/at/tech/agent`, {
    method: "GET",
    headers: myHeaders
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const agentStatiAtManager = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/agent/static/at/manger`, {
    method: "GET",
    headers: myHeaders
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const SimpelEmailing = (settings, html) => {
  return fetch(`${process.env.REACT_APP_API_URL}/simpel/email`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(settings)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const EmailingLists = settings => {
  return fetch(`${process.env.REACT_APP_API_URL}/emailing/lists`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(settings)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const GetTechList = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/get/tech/list`, {
    method: "GET",
    headers: myHeaders
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const NewTechCollect = name => {
  return fetch(`${process.env.REACT_APP_API_URL}/new/tech/collection`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(name)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const SaveTech = (name, techColId) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/save/tech/by/collection/${techColId}`,
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(name)
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const GetNode = id => {
  return fetch(`${process.env.REACT_APP_API_URL}/get/node/${id}`, {
    method: "GET",
    headers: myHeaders
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const NewNode = (name, id) => {
  return fetch(`${process.env.REACT_APP_API_URL}/save/tech/by/node/${id}`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(name)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const MyTodoMount = (mounthTodo, user, yearTodo) => {
  let obj = {
    mounthTodo,
    user,
    yearTodo
  };
  return fetch(`${process.env.REACT_APP_API_URL}/my/todo/mounth`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(obj)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const NewComentSpecTodo = result => {
  return fetch(`${process.env.REACT_APP_API_URL}/new/comment/at/agent/spec`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(result)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const SaveCarAgent = name => {
  return fetch(`${process.env.REACT_APP_API_URL}/save/tech/at/agent`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ name })
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const SaveNodeAtCar = (nodeid, name) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/save/node/at/agent/tech/${nodeid}`,
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ name })
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const SaveDetalAtNode = (nodeid, name) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/save/node/at/tech/node/${nodeid}`,
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ name })
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const DeleteAtTech = id => {
  return fetch(`${process.env.REACT_APP_API_URL}/del/tech/${id}`, {
    method: "DELETE",
    headers: myHeaders
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const DeleteAtNode = id => {
  return fetch(`${process.env.REACT_APP_API_URL}/del/node/${id}`, {
    method: "DELETE",
    headers: myHeaders
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const DeleteDetalAtNode = id => {
  return fetch(`${process.env.REACT_APP_API_URL}/del/node/prop/${id}`, {
    method: "DELETE",
    headers: myHeaders
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export const UserTodoYear = data => {
  return fetch(`${process.env.REACT_APP_API_URL}/my/todo/year`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const NewAgentAddManager = data => {
  return fetch(`${process.env.REACT_APP_API_URL}/agent/new/at/manager/`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const NewAgentAddRegulatoryPosition = data => {
  console.log(JSON.stringify(data))
  return fetch(
    `${process.env.REACT_APP_API_URL}/regulatory/position/add/agent`,
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data)
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export const AgentAtHuman = agentId => {
  return fetch(`${process.env.REACT_APP_API_URL}/get/agent/human${agentId}`, {
    method: "GET",
    headers: myHeaders
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const AgentNewHuman = (data, agentId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/agent/new/human${agentId}`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const AgentEditHuman = (data, humanId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/agent/edit/human${humanId}`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const userActive = userId => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/active/`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ userId })
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const UserActiveMounthAndYear = data => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/active/`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
export const ContrAgentDontManage = page => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/agent/dont/manage/?page=${page}`,
    {
      method: "GET",
      headers: myHeaders
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};
export const GetWeekObjectId = (body) =>{
  return fetch(
    `${process.env.REACT_APP_API_URL}/active/helper/get/week`,
    {
      method: "POST",
      headers: myHeaders,
      body:JSON.stringify(body)
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
}
export const GetEnterpriseManageAtAgentStatistic = () =>{
  return fetch(
    `${process.env.REACT_APP_API_URL}/agent/at/manager/statistic`,
    {
      method: "GET",
      headers: myHeaders
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
}
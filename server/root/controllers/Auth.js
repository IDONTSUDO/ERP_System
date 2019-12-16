// изначально приложение должно было быть неемного другим.
// И это рудимент прошлого.Который можно исправить, но зачем? Работает не трожь.
const Direct = require('../database/Company')
//пользовательская статистика
const UserStatistic = require('../database/UserStatistic')
//девайсы с которых зашел юзер
const UserDevice = require('../database/Devises')
//для создания записей  юзер агентами, и айпи входа в систему
const UserSecurity = require('../database/Security')
const UserNews = require('../database/News')

const jwt = require("jsonwebtoken")
require("dotenv").config()


exports.signup = async (req, res, next) => {
    const directExists = await Direct.findOne({ email: req.body.email })
    if (directExists) return res.status(403).json({
        error: "Email is taken"
    })

    const direct = await new Direct(req.body)
    await direct.save().exec(result => {
        res.status(200).json({
            "result": "complete-user-registr"
        })

    })
    // TODO: обратотчик для стистики пользователя
}
exports.signin = (req, res, next) => {
    const { email, password } = req.body
    Direct.findOne({ email }, (err, direct) => {
        if (err || !direct) {
            return res.status(401).json({
                error: "Пользователь с таким адресом электронной почты не существует"
            })
        }

        if (!direct.authenticate(password)) {
            return res.status(403).json({
                error: "E-mail или пароль не совпадают"
            })
        }
        const token = jwt.sign({ _id: direct._id,name:direct.name }, process.env.JWT_SECRET)

        res.cookie("t", token, { expire: new Date() + 9999 })
        const {
            _id,
            name,
            email,
            role,
            todo_avesome,
            todo_middle,
            todo_not_very_important,
            todo_avesome_text,
            todo_middle_text,
            todo_not_very_important_text,
            todo_avesome_shadow,
            todo_middle_shadow,
            todo_not_very_important_shadow,
            logged_in,
            device } = direct
        req.userId = _id
        
        res.json({
            token, direct: {
                _id, name, email, role,device, todo_avesome,
                todo_middle, todo_not_very_important,
                todo_avesome_text, todo_middle_text, 
                todo_not_very_important_text, todo_avesome_shadow,
                todo_middle_shadow,todo_not_very_important_shadow
            }
        })
        /* эта штука четко отслеживает момент первой авторизации юзера, 
        дело в том что мы не должны присылать уведомление в случае когда юзер авторизуется первый раз */
        if (logged_in == true) {
            return next()
        } else {
            direct.logged_in = true

            direct.save().then((err, result) => { return })
        }
    })
}
exports.MySecurity = async (req, res) => {
 
    let userId = req.body.userId
   
    const currentPage = req.query.page || 1

    const perPage = 24
    var totalItems
   
    const security = UserSecurity.find({ UserBy: userId })

        .countDocuments()
        .then(count => {
            totalItems = count;
            return UserSecurity.find()
                .skip((currentPage - 1) * perPage)
                .limit(perPage)

        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => console.log(err))
}
exports.securityWrite = async (req, res, next) => {
    let userId = req.userId
    let securityData = req.header('User-Agent')
    const security = new UserSecurity()
    security.user_security_data = securityData
    security.UserBy = userId.toString()
    security.user_ip = req.ip
    security.save()
}

exports.securityFind = async (req, res, next) => {
    let userId = req.userId
    let worker_by = { user: userId }

    let securityData = req.header('User-Agent')



    UserSecurity.findOne({ UserBy: userId.toString() }, { user_security_data: securityData }).then((result) => {
        if (result === null) {
            let userIdstring = userId.toString()

            let worker_by = [{ user: userIdstring }]
            let eventNews = "warning"
            let description = "Оповещение безопаности"
            const news = new UserNews()
            news.worker_by = worker_by
            news.description = description
            news.eventNews = eventNews
            news.save().then(result => {
                return next()
            })
        }
        else {

        }
    })
        .catch(err => console.log(err))
}

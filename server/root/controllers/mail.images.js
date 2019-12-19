const EmailImg = require('../database/Images')

exports.MailPaginationGetImage = async (req, res) => {
    const currentPage = req.query.page || 1

    const perPage = 24
    var totalItems

    const img = EmailImg.find()

        .countDocuments()
        .then(count => {
            totalItems = count;
            return EmailImg.find()
                .skip((currentPage - 1) * perPage)
                .limit(perPage)

        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => console.log(err))
}
exports.MailDeleteCollection = async (req, res) => {
    let searcId = req.body

    EmailImg.remove({ id: searcId }).exec().then(function (result) {
        return res.status(200).json({ result })
    }).catch(function (error) {
        return res.status(400).json({ error })
    })
} 
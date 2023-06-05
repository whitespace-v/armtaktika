const axios = require('axios')
class CDEKController {
    async post(req, res){
        try{
            const {action} = req.body
            switch (action){
                case 'auth':
                    await axios.post('https://api.edu.cdek.ru/v2/oauth/token?parameters', {
                        grant_type: 'client_credentials',
                        client_id: 'gBQxSW004tw77OcWbJp4SEnDFrOkE7Do',
                        client_secret: 'nUTisEZcoXkVj9H9uJWXu0mDfWiLwOaq'
                    }).then(r => res.json({token: r}))
            }
        } catch (e) {
            return res.json(e)
        }
    }

}

module.exports = new CDEKController()
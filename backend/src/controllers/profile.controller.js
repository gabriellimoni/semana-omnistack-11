const connection = require('../database/connection')

module.exports = {
    async get(req, res) {
        const ong_id = req.headers.authorization

        if (!ong_id) {
            return res.status(403).json({ error: 'Operation not permitted' })
        }

        const incidents = await connection('incidents')
                                .where('ong_id', ong_id)
                                .select('*')
        
        return res.json(incidents)
    }
}
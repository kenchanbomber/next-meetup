import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const data = req.body;

        // connect with DB
        const client = await MongoClient.connect('mongodb+srv://KengoHirata:PTcTGPswWlpH8jLv@cluster0.lusd3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
        const collection = client.db().collection('meetups');
        const result = await collection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({message: 'Meetup inserted!'});
    }
};

export default handler;
import { connectDatabase, insertDocument } from '@/helpers/db-util';

async function handler(req, res) {

  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    let client;

    try {
      client = await connectDatabase()
    } catch (e) {
      return res.status(500).json({message: e.message})
    }

    try {
      await insertDocument(client, 'newsletter', { email: userEmail });
    } catch (e) {
      return res.status(500).json({message: e.message})
    }
    

    res.status(201).json({ message: 'Success' });
    client.close();
  }
}

export default handler;

import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "@/helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;
  try {
    client = await connectDatabase();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email ||
      !name ||
      !text ||
      !email.includes("@") ||
      name.trim() === "" ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;

    try {
      result = await insertDocument(client, "comments", newComment);
      res.status(200).json(result);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  if (req.method === "GET") {
    try {
      const doc = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({ comments: doc });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }

    client.close();
  }
}
export default handler;

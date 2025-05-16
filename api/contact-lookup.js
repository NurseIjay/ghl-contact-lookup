const axios = require("axios");

module.exports = async (req, res) => {
  const { contactId } = req.query;

  if (!contactId) {
    return res.status(400).json({ error: "Missing contactId" });
  }

  try {
    console.log("Requesting contact by ID:", contactId);

    const response = await axios.get(`https://rest.gohighlevel.com/v1/contacts/${contactId}`, {
      headers: {
        Authorization: `Bearer ${process.env.GHL_API_KEY}`
      }
    });

    const contact = response.data.contact;

    if (!contact) {
      console.log("Contact not found.");
      return res.status(404).json({ error: "Contact not found" });
    }

    const { name, email, phone } = contact;

    console.log("Contact found:", { name, email, phone });

    return res.status(200).json({ name, email, phone });

  } catch (error) {
    console.error("Server error:", error?.response?.data || error.message);
    return res.status(500).json({
      error: "Failed to fetch contact info",
      details: error?.response?.data || error.message
    });
  }
};

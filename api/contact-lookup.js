const axios = require("axios");

module.exports = async (req, res) => {
  const { contactId } = req.query;

  if (!contactId) {
    return res.status(400).json({ error: "Missing contactId" });
  }

  try {
    const response = await axios.get(`https://rest.gohighlevel.com/v1/contacts/${contactId}`, {
      headers: {
        Authorization: `Bearer ${process.env.GHL_API_KEY}`
      }
    });

    const contact = response.data.contact;

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    const fullName = `${contact.firstName || ''} ${contact.lastName || ''}`.trim();

    return res.status(200).json({
      name: fullName,
      email: contact.email,
      phone: contact.phone
    });

  } catch (error) {
    console.error("Server error:", error?.response?.data || error.message);
    return res.status(500).json({
      error: "Failed to fetch contact info",
      details: error?.response?.data || error.message
    });
  }
};

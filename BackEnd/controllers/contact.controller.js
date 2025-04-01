const asyncHandler = require("express-async-handler");
const Contact = require("../models/contact.model");

// [GET] /api/contacts
module.exports.index = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({}).populate("user");
  res.json(contacts);
});

// [POST] /api/contacts
module.exports.create = asyncHandler(async (req, res) => {
  const { user, name, description } = req.body;
  const contact = new Contact({ user, name, description });
  await contact.save();
  res.status(201).json(contact);
});

// [DELETE] /api/contacts/:id
module.exports.delete = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await Contact.findByIdAndDelete(id);
  res.status(204).end();
});
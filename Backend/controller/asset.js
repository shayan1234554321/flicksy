import * as yup from "yup";

const uploadAsset = async (req, res) => {
  const { file } = req;

  try {
    res.status(200).send({ url: "/assets/" + file.filename });
  } catch (validationError) {
    if (validationError instanceof yup.ValidationError) {
      res.status(400).json({ error: validationError.message });
    } else {
      res.status(500).send("Error getting user");
    }
  }
};

const controller = {
  uploadAsset,
};

export default controller;

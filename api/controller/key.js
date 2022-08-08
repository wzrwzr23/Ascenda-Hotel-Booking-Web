import Key from './../models/key.js'

export const createKey = async (req, res, next) => {
    const newKey = new Key(req.body);
    try {
      const savedKey = await newKey.save();
      res.status(200).json(savedKey);
    } catch (err) {
      next(err);
    }
};

export const updateKey = async (req, res, next) => {
    try {
      const updatedKey = await Key.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedKey);
    } catch (err) {
      next(err);
    }
  };
  export const deleteKey = async (req, res, next) => {
    try {
      await Key.findByIdAndDelete(req.params.id);
      res.status(200).json("Key has been deleted.");
    } catch (err) {
      next(err);
    }
  };
  export const getKey = async (req, res, next) => {
    try {
      const key = await Key.findById(req.params.id);
      res.status(200).json(key);
    } catch (err) {
      next(err);
    }
  };

  export const getKeys = async (req, res, next) => {
    //const { min, max, ...others } = req.query;
    try {
      const key = await Key.find();
      res.status(200).json(key);
    } catch (err) {
        next(err);
    }
  };

  export const getKeysByKey = async (req, res, next) => {
    //const { min, max, ...others } = req.query;
    const {key} = req.params.id
    console.log(key);
    try {
      const keys = await Key.find({
        key : key
      });
      res.status(200).json(keys);
    } catch (err) {
      next(err);
    }
  };
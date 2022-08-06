import Keys from './../models/Kkeys.js'

export const createKeys = async (req, res, next) => {
    const newKey = new Keys(req.body);
    try {
      const savedKey = await newKey.save();
      res.status(200).json(savedKey);
    } catch (err) {
      next(err);
    }
};

export const updateKeys = async (req, res, next) => {
    try {
      const updatedKey = await Keys.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedKey);
    } catch (err) {
      next(err);
    }
  };
  export const deleteKeys = async (req, res, next) => {
    try {
      await Keys.findByIdAndDelete(req.params.id);
      res.status(200).json("Key has been deleted.");
    } catch (err) {
      next(err);
    }
  };
  export const getKkeys = async (req, res, next) => {
    try {
      const key = await Keys.findById(req.params.id);
      res.status(200).json(key);
    } catch (err) {
      next(err);
    }
  };
  export const getKeys = async (req, res, next) => {
    //const { min, max, ...others } = req.query;
    // const {key} = req.query
    try {
        const keys = await Keys.find();
        res.status(200).json(keys);
    } catch (err) {
        next(err);
    }
};
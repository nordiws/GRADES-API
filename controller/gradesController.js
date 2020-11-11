import { db } from '../models/dbModel.js';
const Grades = db.grade;

const getAllGrades = async (_req, res) => {
  try {
    const allGrades = await Grades.find({});
    res.send(allGrades);
  } catch (err) {
    res.status(400).send('Error trying to reach Database' + err);
  }
};

const getGrade = async (req, res) => {
  try {
    const grade = await Grades.findById(req.params.id);
    if (!grade) {
      res.status(404).send('Grade does not exist');
      return;
    }
    res.send(grade);
  } catch (err) {
    res.status(400).send('Error trying to reach Database' + err);
  }
};

const createGrade = async (req, res) => {
  try {
    const grade = new Grades(req.body);
    await grade.save();
    res.send(grade);
  } catch (err) {
    res.status(400).send('Error trying to reach Database' + err);
  }
};

const updateGrade = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedGrade = await Grades.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!updatedGrade) {
      res.status(404).send('Grade does not exist');
      return;
    }
    res.send(updatedGrade);
  } catch (err) {
    res.status(400).send('Error trying to reach Database' + err);
  }
};

const deleteGrade = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGrade = await Grades.findByIdAndDelete(id);
    if (!deletedGrade) {
      res.status(404).send('Grade does not exist');
      return;
    }
    res.send(deletedGrade);
  } catch (err) {
    res.status(400).send('Error trying to reach Database' + err);
  }
};

const deleteAllGrades = async (_req, res) => {
  try {
    const deletedGrades = await Grades.deleteMany();
    res.send(deletedGrades);
  } catch (err) {
    res.status(400).send('Error trying to reach Database' + err);
  }
};

const findByName = async (req, res) => {
  try {
    const nameSearch = new RegExp(req.params.name, 'i');
    const grade = await Grades.find({ name: { $regex: nameSearch } });
    if (Object.keys(grade).length === 0) {
      res.status(404).send('Name does not exist');
      return;
    }
    res.send(grade);
  } catch (err) {
    res.status(400).send('Error trying to reach Database' + err);
  }
};

export default {
  getAllGrades,
  getGrade,
  createGrade,
  updateGrade,
  deleteGrade,
  deleteAllGrades,
  findByName,
};

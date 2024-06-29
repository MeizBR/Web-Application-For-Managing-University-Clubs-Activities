// import the express module
const express = require('express')

require('dotenv').config()

const host = process.env.MONGODB_HOST
const database = process.env.MONGODB_DATABASE
const user = process.env.MONGODB_USER
const password = process.env.MONGODB_PASSWORD

// import the mongoose module
const mongoose = require('mongoose')

// define an express app
const app = express()
app.use(express.json())

// import the cors module
const cors = require("cors")
app.use(cors())

// connect VS Code to database
// mongoose.connect(`mongodb://${user}:${password}@${host}:27017/${database}`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// connect to MongoDB Atlas
mongoose.connect(`mongodb+srv://${user}:${password}@${host}/${database}?retryWrites=true&w=majority&appName=Cluster0`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

/* import the models */
// from Models

// import Student model
const StudentModel = require("./models/Student")

// import Formateur model
const FormateurModel = require("./models/Formateur")

// import Formation model
const FormationModel = require("./models/Formation")

// import InscriptionFormation model
const InscriptionFormationModel = require("./models/InscriptionFormation")

// import Workshop model
const WorkshopModel = require("./models/Workshop")

// import InscriptionWorkshop model
const InscriptionWorkshopModel = require("./models/InscriptionWorkshop")

// import Feedback model
const FeedbackModel = require("./models/Feedback")

// import Feedback Workshop Model
const FeedbackWorkshopModel = require("./models/FeedbackWorkshop")

// import Session Model
const SessionModel = require("./models/Session")

// import Admin Model
const AdminModel = require("./models/Admin")

/* import the models */



/* define the endpoints */

// display admins
app.get('/api/admins', async (req, res) => {
  const admins = await AdminModel.find()
  res.json(admins)
})

// display students
app.get('/api/students', async (req, res) => {
    const students = await StudentModel.find()
    res.json(students)
})

// display formateurs
app.get("/api/formateurs", async (req, res) => {
  const formateurs = await FormateurModel.find()
  res.json(formateurs)
})

// display formations
app.get("/api/formations", async (req, res) => {
  const formations = await FormationModel.find()
  res.json(formations)
})

// display workshops
app.get("/api/workshops", async (req, res) => {
  const workshops = await WorkshopModel.find()
  res.json(workshops)

})



// display sessions
app.get('/api/sessions', async(req, res) => {
  const sessions = await SessionModel.find()
  res.json(sessions)
})

// show formations inscriptions details
app.get('/api/inscriptionformations', async (req, res) => {
    const inscriptionformations = await InscriptionFormationModel.find()
    res.json(inscriptionformations)
})

// submit a formation inscription
app.post("/api/submitAnInscriptionFormation", async (req, res) => {
    try {
        const inscription = req.body
        const { formationName, formationId, studentCode } = inscription
    
        // Check if a document with the same student code and formationName already exists
        const existingInscription = await InscriptionFormationModel.findOne({ studentCode, formationName, formationId })
    
        // generates a 400 error status code in that case
        if (existingInscription) {
          res.status(400).json({ error: 'Inscription already exists' })
        } else {

          // Check if formationId is provided exists
          if (!formationId) {
            return res.status(400).json({ message: 'Formation ID is required' });
          }

          // Parse formationId as ObjectId
          const formationIdObj = new mongoose.Types.ObjectId(formationId);

          // Update inscriptions count for the formation in the formations collection in database
          await FormationModel.findOneAndUpdate(
            { _id: formationIdObj },
            { $inc: { inscriptionsCount: 1 } }
          );

          // save the inscription to the collection
          const newInscription = new InscriptionFormationModel(inscription)
          await newInscription.save()
    
          res.json(inscription)
        }
      } catch(error) {
        console.error(error)
        res.status(500).json({ error: 'Server error' })
      }
})

// show workshops inscriptions details
app.get('/api/inscriptionworkshops', async (req, res) => {
    const inscriptionworkshops = await InscriptionWorkshopModel.find()
    res.json(inscriptionworkshops)
})

// submit a workshop inscription
app.post("/api/submitAnInscriptionWorkshop", async (req, res) => {
    try {
        const inscription = req.body
        const { studentCode, workshopName, workshopId } = inscription
    
        // Check if a document with the same student code already exists
        const existingInscription = await InscriptionWorkshopModel.findOne({ studentCode, workshopName, workshopId })
    
        // generates a 400 error status code in that case
        if (existingInscription) {
          res.status(400).json({ error: 'Inscription already exists' })
        } else {


          // Check if workshopId is provided
          if (!workshopId) {
            return res.status(400).json({ message: 'Formation ID is required' });
          }

          // Parse workshopId as ObjectId
          const workshopIdObj = new mongoose.Types.ObjectId(workshopId);

          // Update inscriptions count for the formation in the database
          await WorkshopModel.findOneAndUpdate(
            { _id: workshopIdObj },
            { $inc: { inscriptionsCount: 1 } }
          );

          // save the inscription to the collection
          const newInscription = new InscriptionWorkshopModel(inscription)
          await newInscription.save()
    
          res.json(inscription)

        }
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server error' })
      }
})

// display feedbacks
app.get("/api/feedbacks", async (req, res) => {
    const feedbacks = await FeedbackModel.find()
    res.json(feedbacks)
})

// display workshops feedbacks
app.get("/api/feedbacksWorkshops", async (req, res) => {
  const feedbacksWorkshops = await FeedbackWorkshopModel.find()
  res.json(feedbacksWorkshops)
})

// submit a formation feedback
app.post("/api/submitAFeedback", async (req, res) => {

    const feedback = req.body;
    const newFeedback = new FeedbackModel(feedback);
    
    const { studentCode, studentEmail } = feedback;
    const existingFeedback = await FeedbackModel.findOne({ studentCode, studentEmail });

    // prevent the same student from submitting more than 1 feedback at a day
    if (existingFeedback) {
      const now = new Date();

      const lastSubmitted = new Date(existingFeedback.createdAt);

      const timeDiff = now.getTime() - lastSubmitted.getTime();

      const daysDiff = timeDiff / (1000 * 3600 * 24);
  
      if (daysDiff < 1) {
        res.status(400).json({ message: "You must wait 24 hours before submitting another feedback" });
        return;
      }else {
        await newFeedback.save();
        res.json(feedback);
      }
    } else {
      await newFeedback.save();
      res.json(feedback);
    }
})

// submit a workshop feedback
app.post("/api/submitAWorkshopFeedback", async (req, res) => {

    const feedbackWorkshopRequest = req.body;
    const newFeedback = new FeedbackWorkshopModel(feedbackWorkshopRequest);

    const { studentCode, studentEmail } = feedbackWorkshopRequest;
    const existingFeedback = await FeedbackWorkshopModel.findOne({ studentCode, studentEmail });

    // prevent the same student from submitting more than 1 feedback at a day
    if (existingFeedback) {
      const now = new Date();

      const lastSubmitted = new Date(existingFeedback.createdAt);

      const timeDiff = now.getTime() - lastSubmitted.getTime();

      const daysDiff = timeDiff / (1000 * 3600 * 24);
  
      if (daysDiff < 1) {
        res.status(404).json({ message: "You must wait 24 hours before submitting another feedback" });
        return;
      } else {
        await newFeedback.save();
        res.json(feedbackWorkshopRequest);
      }
    } else {
      await newFeedback.save();
      res.json(feedbackWorkshopRequest);
    }
})

/* define the endpoints */



/* go to each formation page dynamically */

app.get('/api/formations/:id', (req, res) => {
  const id = req.params.id;
  FormationModel.findById(id)
    .then((formation) => {
      res.json(formation);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

/* go to each formation page dynamically */



/* go to each workshop page dynamically */

app.get('/api/workshops/:id', (req, res) => {
  const id = req.params.id;
  WorkshopModel.findById(id)
    .then((workshop) => {
      res.json(workshop);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

/* go to each workshop page dynamically */



// get the feedbacks based on the studentEmail
app.get("/api/feedbacks/:studentEmail", async (req, res) => {
  const studentEmail = req.params.studentEmail;

  const feedbacks = await FeedbackModel.find({ studentEmail });

  res.json(feedbacks);
})

// number of visitors
let numVisitors = 0;
app.get('/api/visitors', (req, res) => {
    numVisitors++;
    res.json({ count: numVisitors });
});

/* organisation page */

// filter the formations based on their dates
app.get("/api/formationsFiltredByDate", async (req, res) => {
    const { startDate } = req.query;
    await  FormationModel.find({ startDateFormation : startDate })
      .then(formations => {
        res.json(formations);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Server Error');
      });
})

// filter the workshops based on their dates
app.get("/api/workshopsFiltredByDate", async (req, res) => {
  const { startDate } = req.query;
  await  WorkshopModel.find({ workshopDate : startDate })
    .then(workshops => {
      res.json(workshops);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Server Error');
    });
})

/* organisation page */
// Route to get the list of students enrolled for each formationName and formationId
app.get('/api/getEnrolledStudentsPerFormation', async (req, res) => {
  try {
    // Query the MongoDB collection to retrieve all documents
    const inscriptionFormations = await InscriptionFormationModel.find();

    // Group the documents by formationName and formationId
    const groupedInscriptions = inscriptionFormations.reduce((acc, inscription) => {
      const key =`${inscription.formationName}-${inscription.formationId}` ;
      if (!acc[key]) {
        acc[key] = {
          formationName: inscription.formationName,
          formationId: inscription.formationId,
          students: []
        };
      }
      acc[key].students.push({
        studentFirstName: inscription.studentFirstName,
        studentLastName: inscription.studentLastName,
        studentEmail: inscription.studentEmail,
        studentSection: inscription.studentSection,
        studentCode: inscription.studentCode
      });
      return acc;
    }, {});

    // Convert the groupedInscriptions object to an array of values
    const groupedInscriptionsArray = Object.values(groupedInscriptions);

    res.status(200).json(groupedInscriptionsArray);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Route to get the list of students enrolled for each formationName and formationId
app.get('/api/getEnrolledStudentsPerWorkshop', async (req, res) => {
  try {
    // Query the MongoDB collection to retrieve all documents
    const inscriptionWorkshops = await InscriptionWorkshopModel.find();

    // Group the documents by formationName and formationId
    const groupedInscriptions = inscriptionWorkshops.reduce((acc, inscription) => {
      const key =`${inscription.workshopName}-${inscription.workshopId}` ;
      if (!acc[key]) {
        acc[key] = {
          workshopName: inscription.workshopName,
          workshopId: inscription.workshopId,
          students: []
        };
      }
      acc[key].students.push({
        studentFirstName: inscription.studentFirstName,
        studentLastName: inscription.studentLastName,
        studentEmail: inscription.studentEmail,
        studentSection: inscription.studentSection,
        studentCode: inscription.studentCode
      });
      return acc;
    }, {});

    // Convert the groupedInscriptions object to an array of values
    const groupedInscriptionsArray = Object.values(groupedInscriptions);

    res.status(200).json(groupedInscriptionsArray);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// login page
app.post('/api/login', async (req, res) => {
  const { firstName, lastName, code } = req.body;
  const student = await StudentModel.findOne({ studentFirstName: firstName, studentLastName: lastName, studentCode: code });

  if (student) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
})

// login page
app.post('/api/adminLogin', async (req, res) => {
  const { fullName, password } = req.body;
  const admin = await AdminModel.findOne({ adminName: fullName, password: password });

  if (admin) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
})

// add student by the admin
app.post("/api/addStudent", async (req, res) => {
    const student = req.body;
    const { studentCode, studentEmail } = student;
    const existingStudent = await StudentModel.findOne({ studentCode, studentEmail });

    if(existingStudent) {
      res.status(400).json({ error: 'Student already exists' })
    } else {
      const newStudent = new StudentModel(student);
      await newStudent.save(newStudent);
      res.json(student);
    }
})

// delete student by the admin
app.delete('/api/students/:id', async (req, res) => {
  try {
    const deletedStudent = await StudentModel.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while deleting the student' });
  }
});

// update the student by the admin
app.put('/api/students/:id', async (req, res) => {
  const studentId = req.params.id;
  const updatedStudent = req.body;

  try {
    const student = await StudentModel.findByIdAndUpdate(studentId, updatedStudent, { new: true });

    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while updating the student' });
  }
});

// display events based on a calendar
app.get('/api/sessions/:date', async (req, res) => {
  const { date } = req.params;
  // Assuming you have a SessionModel connected to the MongoDB collection
  const sessions = await SessionModel.find({ EventDate: date });

  if (sessions.length > 0) {
    res.status(200).json(sessions);
  } else {
    res.status(404).json({ message: 'No sessions found for the selected date' });
  }
});


// add training by the admin
app.post("/api/addTraining", async (req, res) => {
    const training = req.body;
    const newTraining = new FormationModel(training);
    await newTraining.save(newTraining);
    res.json(training);
})


// update the training by the admin
app.put('/api/formations/:id', async (req, res) => {
  const trainingId = req.params.id;
  const updatedTraining = req.body;

  try {
    const training = await FormationModel.findByIdAndUpdate(trainingId, updatedTraining, { new: true });

    if (training) {
      res.status(200).json(training);
    } else {
      res.status(404).json({ message: 'Training not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while updating the training' });
  }
});

// delete training by the admin
app.delete('/api/formations/:id', async (req, res) => {
  try {
    const deletedTraining = await FormationModel.findByIdAndDelete(req.params.id);

    if (!deletedTraining) {
      return res.status(404).json({ message: 'Training not found' });
    }

    res.json({ message: 'Training deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while deleting the training' });
  }
});


// define the port that the express server is running on and display a descriptive message
app.listen(5000, () => {console.log("app is running on port 5000")})
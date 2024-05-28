import { React, useState, useEffect } from 'react';
import Axios from "axios";

export const AdminTrainings = () => {


    const [formations, setFormation] = useState([]);

    useEffect(() => {
        Axios
          .get("http://localhost:5000/api/formations")
          .then((res) => setFormation(res.data))
          .catch((err) => console.log(err));
      });

    const [formationName, setFormationName] = useState("")
    const [startDateFormation, setFormationStartDate] = useState("")
    const [sessionsNumber, setFormationSessionsNumber] = useState("")
    const [price, setFormationPrice] = useState("")
    const [formationCapacity, setFormationCapacity] = useState("")
    const [formateurFirstName, setFormateurFirstName] = useState("")
    const [formateurLastName, setFormateurLastName] = useState("")
    const [formationImage, setFormationImage] = useState("")

    const [currentTraining, setCurrentTraining] = useState(null);

    const addTraining = (e) => {
        e.preventDefault();
        if(
            formationName.trim() !== '' &&
            startDateFormation.trim() !== '' &&
            sessionsNumber.trim() !== '' &&
            price !== '' &&
            !isNaN(price) &&
            formationCapacity.trim() !== '' &&
            !isNaN(formationCapacity) &&
            formateurFirstName.trim() !== '' &&
            formateurLastName.trim() !== ''
        ) {
            Axios.post("http://localhost:5000/api/addTraining", {
                    formationName : formationName,
                    startDateFormation : startDateFormation,
                    sessionsNumber : sessionsNumber,
                    price : price,
                    formationCapacity: formationCapacity,
                    formateurFirstName : formateurFirstName,
                    formateurLastName : formateurLastName,
                    formationImage : formationImage,
                    formationMoreDetails : formationName,
                    inscriptionsCount : 0
                })
                .then(res => {
                    console.log(res.data);
                    window.alert("Training Created Successfully");
                    setFormationName("");
                    setFormationStartDate("");
                    setFormationSessionsNumber("");
                    setFormationPrice("");
                    setFormationCapacity("");
                    setFormateurFirstName("");
                    setFormateurLastName("");
                    document.getElementById("add-student-form").reset();
                })
                .catch((err) => {
                      console.log(err);
                      alert("An error occurred. Please try again later.");
                });
        }
    }

    const updateTraining = (training) => {
        setCurrentTraining(training);
      };

    const handleTrainingUpdate = async (event) => {
        event.preventDefault();
      
        try {
          const response = await Axios.put(`http://localhost:5000/api/formations/${currentTraining._id}`, currentTraining);
      
          if (response.status === 200) {
            // Update the student information in the state
            setFormation(formations.map((training) => (training._id === currentTraining._id ? currentTraining : training)));
            setCurrentTraining(null); // Clear the current student
            alert("Training updated successfully");
          }
        } catch (err) {
          console.error(err);
          alert("An error occurred while updating the training");
        }
    }


    const deleteTraining = async (id) => {
        try {
          const response = await Axios.delete(`http://localhost:5000/api/formations/${id}`);
      
          // If the request is successful, remove the student from the state
          if (response.status === 200) {
            setFormation(formations.filter((formation) => formation._id !== id));
            window.alert("Training Removed Successfully");
          }
        } catch (err) {
          console.error(err);
          alert('An error occurred while deleting the training. Please try again later.');
        }
      };


  return (
    <div>
    <form id='add-student-form'>
            <h4 className='text-dark'>Add a Training</h4>
            <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">@ Training</span>
                <input id='taken-from' type="text" class="form-control" placeholder="Training Name" aria-label="Username" aria-describedby="addon-wrapping" required onChange={e => setFormationName(e.target.value)} />
            </div>
            <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">@ Training</span>
                <input type="text" class="form-control" placeholder="Training Start Date : dd/mm/yyyy" aria-label="Username" aria-describedby="addon-wrapping" required onChange={e => setFormationStartDate(e.target.value)} />
            </div>
            <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">@ Training</span>
                <input type="number" class="form-control" placeholder="Sessions Number" aria-label="Username" aria-describedby="addon-wrapping" required onChange={e => setFormationSessionsNumber(e.target.value)} />
            </div>
            <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">@ Training</span>
                <input type="number" class="form-control" placeholder="Price" aria-label="Username" aria-describedby="addon-wrapping" required onChange={e => setFormationPrice(e.target.value)} />
            </div>
            <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">@ Training</span>
                <input type="number" class="form-control" placeholder="Training Capacity" aria-label="Username" aria-describedby="addon-wrapping" required onChange={e => setFormationCapacity(e.target.value)} />
            </div>
            <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">@ Training</span>
                <input type="text" class="form-control" placeholder="Trainer First Name" aria-label="Username" aria-describedby="addon-wrapping" required onChange={e => setFormateurFirstName(e.target.value)} />
            </div>
            <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">@ Training</span>
                <input type="text" class="form-control" placeholder="Trainer Last Name" aria-label="Username" aria-describedby="addon-wrapping" required onChange={e => setFormateurLastName(e.target.value)} />
            </div>
            <div onChange={e => setFormationImage(e.target.value)} class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">@ Training</span>
              <select>
                <option value="google.png">Google Developers Club Enetcom</option>
                <option value="ieee.jpg">IEEE Student Branch Club Enetcom</option>
                <option value="junior.jpg">Junior Enterprise Club Enetcom</option>
                <option value="mtc.jpg">Microsoft Tech Club Enetcom</option>
                <option value="nateg.jpg">North American Tunisian Engineers Group Club Enetcom</option>
                <option value="orbeats.jpg">Orbeats Radio Club Enetcom</option>
                <option value="robotics.jpg">Robotics Club Enetcom</option>
              </select>
            </div>
            <button class="btn btn-primary mt-1" type="submit" onClick={addTraining}>Add Training</button>
        </form>

        <h3>Trainings List</h3>

        <div className="row">
        {formations.map(formation => {
            return(
                <div className="col-3" key={formation._id}>
                <div className="card" style={{width:"97%", margin:"5px"}}>
                <img src={"../../images/" + formation.formationImage} class="card-img-top" />
                <div className='card-body'>
                    <ul class="list-group list-group-flush">
                        <li className="list-group-item">Name : {formation.formationName}</li>
                        <li className="list-group-item">Date : {formation.startDateFormation}</li>
                        <li className="list-group-item">Sessions : {formation.sessionsNumber}</li>
                        <li className="list-group-item">Price : {formation.price}</li>
                        <li className="list-group-item"> Capacity : {formation.formationCapacity}</li>
                        <li className="list-group-item">Trainer : {formation.formateurFirstName} {formation.formateurLastName}</li>
                    </ul>
                </div>
                    <div class="card-footer">
                        <button className="btn btn-primary mt-1" onClick={() => updateTraining(formation)}>Update Training</button>
                        <button class="btn btn-primary mt-1" type="submit" onClick={() => deleteTraining(formation._id)}>Delete Training</button>
                    </div>
                </div>
                </div>
            )
        })}
        </div>



        {currentTraining && (
    <div>
      <h2>Update Training</h2>
      <form onSubmit={handleTrainingUpdate}>
        <label style={{border:"2px solid steelblue", padding:"10px", width:"70%", marginBottom:"10px", marginLeft:"150px"}}>
          Training Name:
          <input style={{width:"100%"}} type="text" value={currentTraining.formationName} onChange={(event) => setCurrentTraining({ ...currentTraining, formationName: event.target.value })} />
        </label>
        <br />
        <label style={{border:"2px solid steelblue", padding:"10px", width:"70%", marginBottom:"10px", marginLeft:"150px"}}>
          Date:
          <input style={{width:"100%"}} type="text" value={currentTraining.startDateFormation} onChange={(event) => setCurrentTraining({ ...currentTraining, startDateFormation: event.target.value })} />
        </label>
        <br />
        <label style={{border:"2px solid steelblue", padding:"10px", width:"70%", marginBottom:"10px", marginLeft:"150px"}}>
          Sessions Number:
          <input style={{width:"100%"}} type="number" value={currentTraining.sessionsNumber} onChange={(event) => setCurrentTraining({ ...currentTraining, sessionsNumber: event.target.value })} />
        </label>
        <br />
        <label style={{border:"2px solid steelblue", padding:"10px", width:"70%", marginBottom:"10px", marginLeft:"150px"}}>
          Price:
          <input style={{width:"100%"}} type="text" value={currentTraining.price} onChange={(event) => setCurrentTraining({ ...currentTraining, price: event.target.value })} />
        </label>
        <br />
        <label style={{border:"2px solid steelblue", padding:"10px", width:"70%", marginBottom:"10px", marginLeft:"150px"}}>
          Capacity:
          <input style={{width:"100%"}} type="text" value={currentTraining.formationCapacity} onChange={(event) => setCurrentTraining({ ...currentTraining, formationCapacity: event.target.value })} />
        </label>
        <br />
        <label style={{border:"2px solid steelblue", padding:"10px", width:"70%", marginBottom:"10px", marginLeft:"150px"}}>
          Trainer First Name:
          <input style={{width:"100%"}} type="text" value={currentTraining.formateurFirstName} onChange={(event) => setCurrentTraining({ ...currentTraining, formateurFirstName: event.target.value })} />
        </label>
        <br />
        <label style={{border:"2px solid steelblue", padding:"10px", width:"70%", marginBottom:"10px", marginLeft:"150px"}}>
          Price:
          <input style={{width:"100%"}} type="text" value={currentTraining.formateurLastName} onChange={(event) => setCurrentTraining({ ...currentTraining, formateurLastName: event.target.value })} />
        </label>
        <br />
        <button class="btn btn-primary mt-1 mb-5" style={{marginLeft:"150px"}} type="submit">Update</button>
      </form>
    </div>
  )}


        </div>

  )
}

import React, { useContext, useEffect, useState } from 'react';
import { Form,  useParams } from 'react-router-dom';
import { AuthContext } from '../../Authentication/AuthProvider';
import Swal from 'sweetalert2';

const AdmissionFrom = () => {
    const params = useParams();
    const [university, setUniversity] = useState([]);

    useEffect(() => {
        fetch(`https://admit-hub-server.vercel.app/admissiondata/${params.id}`)
            .then(res => res.json())
            .then(data => setUniversity(data));
    },)

    const {user} = useContext(AuthContext);
    const handleSubmit = () => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photoUrl = form.photoUrl.value;
        const subject = form.subject.value;
        const candidateEmail = form.candidateEmail.value;
        const phoneNumber = form.phoneNumber.value;
        const birth = form.birth.value;
        const address = form.address.value;
        const collegeName = university.college_name;
        const collegeImage = university.college_image;
        const email = user.email;

        const collegeInfo = {name: name , photo: photoUrl , subject: subject , candidateEmail : candidateEmail , phoneNumber: phoneNumber , birth: birth , address: address , email: email , collegeName: collegeName , collegeImage: collegeImage}
        console.log(collegeInfo)
        fetch("https://admit-hub-server.vercel.app/collegeAdmission",{
            method: "PATCH",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(collegeInfo) 
        })
        .then(res=> res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                
                Swal.fire({
                    icon: 'success',
                    title: 'Admission Successful',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
    return (
        <Form onSubmit={handleSubmit} className="flex flex-col text-center justify-center items-center">
       <div className="form-control shadow-2xl p-14 flex flex-col gap-5 my-20 rounded-3xl">
           <h2 className="-mt-14 mb-10 text-2xl purple-primary p-2 rounded-b-lg">{university.college_name} AD From</h2>
           <div className='flex flex-col gap-10 mx-auto'>
           <div className="flex gap-10 ">
               <div >
                   <label className="label">
                       <span className="label-text">Candidate Name</span>
                   </label>
                   <input type="text" placeholder="name" name="name" className="input input-bordered" required/>
               </div>
               <div>
                   <label className="label">
                       <span className="label-text">Candidate Photo</span>
                   </label>
                   <input type="text" placeholder="photo" name="photoUrl" className="input input-bordered" required/>
               </div>
           </div>
           <div className="flex gap-10">
               <div >
                   <label className="label">
                       <span className="label-text">Subject</span>
                   </label>
                   <input type="text" placeholder="Subject" name="subject" className="input input-bordered" required/>
               </div>
               <div>
                   <label className="label">
                       <span className="label-text">Candidate email</span>
                   </label>
                   <input type="text" placeholder="Candidate Email" defaultValue={user?.email} name="candidateEmail" className="input input-bordered" required/>
               </div>
           </div>
           <div className="flex gap-10">
               <div >
                   <label className="label">
                       <span className="label-text">Candidate Phone number</span>
                   </label>
                   <input type="tel" placeholder="Phone number" name="phoneNumber" className="input input-bordered" required />
               </div>
               <div >
                   <label className="label">
                       <span className="label-text w-ful">Date of Birth</span>
                   </label>
                   <input type="date" placeholder="data of birth" name="birth" className="input input-bordered" required />
               </div>
           </div>
           <div className="flex gap-10">
               
               <div>
                   <label className="label">
                       <span className="label-text">Candidate Address</span>
                   </label>
                   <input type="text" placeholder="Address" name="address" className="input input-bordered"  required/>
               </div>
               <div>
                   <label className="label">
                       <span className="label-text">Login Email</span>
                   </label>
                   <input type="text" placeholder={user.email} name="email" className="input input-bordered" readOnly/>
               </div>
               
           </div>
           
           <div className="form-control mt-6">
               <input className=" purple-primary btn-block p-3 rounded-lg" type="submit" value="Submit" />
           </div>
           </div>
       </div>
   </Form>
    );
};

export default AdmissionFrom;
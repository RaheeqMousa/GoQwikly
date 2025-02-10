import React, { useState, useEffect, useContext } from 'react'
import { Button, Form, Image as BootstrapImage } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import defaultPic from './defaultPicture.jpg';
import { UserContext } from '../../../component/user/context/UserContext'

export default function Image() {

    const { user } = useContext(UserContext);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [preview, setPreview] = useState(defaultPic);

    useEffect(() => {
        console.log("Fetched user:", user);
        if (user && user.image && user.image.secure_url) {
            setPreview(user.image.secure_url);  // Set the preview image to user's image
        }
    }, [user]);

    const updateImage = async (data) => {
        const formData = new FormData();
        formData.append('image', data.image[0]);

        formData.forEach((value) => {
            console.log(value + ': image');
        })

        // if(!data.image[0]){
        //     alert('Please select an image');
        //     return;
        // }

        try {
            const res = await axios.put("https://ecommerce-node4.onrender.com/user/update-image",
                formData,
                {
                    headers: {
                        'Authorization': `Tariq__${localStorage.getItem('userToken')}`,
                    }
                }

            );

            if (res.status == 200) {
                console.log(res.status);
                toast.success("image updated successfully")
            }

        } catch (er) {
            console.error(er);
            alert('Error while updating image');
        }
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);

            // Revoke previous preview URL to avoid memory leaks
            if (preview !== '/unknown-person.jpg') {
                URL.revokeObjectURL(preview);
            }

            setPreview(imageUrl);
        }
    };

    return (
        <>
            <Form className='d-flex flex-column gap-2' encType='multipart/form-data' onSubmit={handleSubmit(updateImage)}>

                <div className='d-flex justify-content-center'>
                    <BootstrapImage src={preview} width={200} height={200} className='border shadow-sm rounded-circle' alt="Profile Preview" />
                </div>

                <Form.Group controlId='updateImage'>
                    <Form.Label>
                        <Form.Control type="file" {...register('image', { required: "image is required" })} onChange={handleImageChange}></Form.Control>
                        {errors.image && <div className='text-danger'>{errors.image?.message}</div>}
                    </Form.Label>
                    <div className='d-flex justify-content-center'>
                        <Button variant="primary" type="submit" className='w-50'>
                            Update
                        </Button>
                    </div>
                </Form.Group>


            </Form>
        </>

    )
}
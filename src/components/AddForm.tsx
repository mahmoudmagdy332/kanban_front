import React, { useEffect, useState } from 'react'
import TextInput from './TextInput';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { form } from '../types/type';
import useAddMemberHook from '../utils/hooks/useAddMemberHook';
import { useDispatch } from 'react-redux';
import { addMember, editMember, setMember, useAboutUsSliceSelector } from '../utils/slicers/MemberSlice';

const AddForm = () => {
    const dispatch=useDispatch();
    const {member}=useAboutUsSliceSelector((state)=>state.MemberReducer)

    const [isopen,setIsOpen]=useState(false);
    
    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
      } = useForm<form>();
      useEffect(()=>{
        if(member){
          setIsOpen(true);
          reset(member);
        }
          
      },[member])
      const {makeRequest, isLoading,data, error,success}=useAddMemberHook();
      useEffect(()=>{
        if(success){
          setIsOpen(!isopen);
          if(member){
            dispatch(editMember(data))
          }else{
            dispatch(addMember(data))
          }
          
        }
      },[success,data,member])
      const onSubmit: SubmitHandler<form> = (data) => {
          makeRequest(data)
      };
      const openForm=()=>{
        setIsOpen(true);
        dispatch(setMember(null))
        reset({
          title:'',
          name:'',
          email:'',
          mobile:'',
          age:'',
        })
      }
  return (
    <div>
        <button onClick={openForm} className="py-2 px-3 rounded-md hover:bg-white transition-all ease-in-out hover:text-black bg-black text-white text-nowrap  text-lg">Add Member</button>
           
          <div className={`${isopen?'flex':'hidden'} absolute w-screen h-screen left-0 top-0 `}>
            <div className='absolute z-10 w-screen h-screen bg-black opacity-20' onClick={()=>setIsOpen(false)}></div>
            <form onSubmit={handleSubmit(onSubmit)} className="h flex flex-col gap-4 m-8 absolute z-20 w-80 bg-white rounded-lg p-4 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
              <div className='flex justify-center '> 
              <p className='font-semibold mb-2'>Form</p>
              </div>
              <Controller
                  
                  name="id"
                  defaultValue={member?.id}
                  control={control}
                  render={() => (
                    <input  className='hidden'/>
                  )}
                />
          <Controller
                  rules={{
                    required: "title Name is required",
                    minLength: {
                      value: 10,
                      message: "Title must be at least 3 characters",
                    },
                  }}
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextInput {...field} error={errors?.title?.message} name="Title"/>
                  )}
                />
             <Controller
                  rules={{
                    required: " Name is required",
                  }}
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextInput {...field} error={errors?.name?.message} name="Name"/>
                  )}
                />
                 <Controller
                  rules={{
                    required: " Age is required",
                    min: {
                      value: 18,
                      message: "Age must be at least 18",
                    },
                    max: {
                      value: 65,
                      message: "Age must be 65 or younger",
                    },
                  }}
                  name="age"
                  control={control}
                  render={({ field }) => (
                    <TextInput {...field} error={errors?.age?.message} name="Age"/>
                  )}
                />
         <Controller
                  rules={{
                    required: " Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  }}
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextInput {...field} error={errors?.email?.message} name="Email"/>
                  )}
                />
                
                <Controller
                  rules={{
                    required: " Mobile is required",
                    pattern: {
                      value: /^\+?[1-9]\d{1,14}$/,
                      message: "Enter country code and valid mobile number  "
                    }
                  }}
                  name="mobile"
                  control={control}
                  render={({ field }) => (
                    <TextInput {...field} error={errors?.mobile?.message} name="Phone"/>
                  )}
                />
             {error&&<div className='text-red-700 text-sm '>{error}</div>}
             {success&&<div className='text-green-500 text-sm '>Create Member Success</div>}
          <button type='submit' disabled={isLoading?true:false} className={`bg-black text-white p-2 rounded-md mt-4 hover:bg-white hover:text-black border  hover:border-black transition-all ease-in-out`}>
           {isLoading?'Loading...':'Submit'}
            
          </button>
        </form>
          </div>
         
    </div>
  )
}

export default AddForm
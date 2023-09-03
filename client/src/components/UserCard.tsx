import React from 'react'

const UserCard = () => {
    return (
        <div className='flex items-center my-2 gap-4'>
            <img className='h-12 w-12 object-cover rounded-full' src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />

            <p>
                <h3>Abdus Samad</h3>
                <h3 className='text-xs max-w-[100px] break-words'>samad.abdus3535@gmail.com</h3>
            </p>
            <button className='px-4 rounded-full bg-gray-700 text-white text-sm py-2' >Following</button>
        </div>
    )
}

export default UserCard
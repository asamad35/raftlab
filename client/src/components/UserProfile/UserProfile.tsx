import Right from "../Home/Right"
import UserProfileLeft from "./UserProfileLeft"
import UserProfileMid from "./UserProfileMid"

const UserProfile = () => {


    return (
        <div className="grid grid-cols-12 h-screen">
            <UserProfileLeft className="col-span-3  flex flex-col justify-start items-center px-6 pt-6 " />
            <UserProfileMid className="col-span-6 border-x-2 border-gray-300 flex flex-col justify-start items-center pt-6 overflow-y-scroll" />
            <Right className="col-span-3 flex flex-col justify-start items-center pt-6 overflow-scroll" />
        </div>
    )
}

export default UserProfile
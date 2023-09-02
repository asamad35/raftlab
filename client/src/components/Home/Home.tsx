import Left from "./Left"
import Mid from "./Mid"
import Right from "./Right"
const Home = () => {


    return (
        <div className="grid grid-cols-12 h-screen">
            <Left className="col-span-3  flex flex-col justify-start items-start px-10 pt-6 " />
            <Mid className="col-span-6 border-x-2 border-gray-300 flex justify-center items-start pt-6" />
            <Right className="col-span-3 flex justify-center items-start pt-6" />
        </div>
    )
}

export default Home
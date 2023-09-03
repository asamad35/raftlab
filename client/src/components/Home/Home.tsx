import Left from "./Left"
import Mid from "./Mid"
import Right from "./Right"
const Home = () => {


    return (
        <div className="grid grid-cols-12 h-screen">
            <Left className="col-span-3  flex flex-col justify-start items-start px-10 pt-6 " />
            <Mid className="col-span-6 border-x-2 border-gray-300 flex flex-col justify-start items-center pt-6 overflow-y-scroll" />
            <Right className="col-span-3 flex flex-col justify-start items-center pt-6 overflow-scroll" />
        </div>
    )
}

export default Home
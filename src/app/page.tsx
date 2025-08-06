import { destinations } from "@/data";
import { AirlineForm } from "@/components/home/AirlineForm";


const Home = () => <AirlineForm {...{ destinations }} />;

export default Home;

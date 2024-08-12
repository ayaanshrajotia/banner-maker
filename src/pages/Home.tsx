import Banner from "../components/Banner";
import Menubar from "../components/Menubar";

export default function Home() {
    return (
        <div className="h-screen w-screen home-bg relative overflow-hidden">
            <h1 className="text-3xl font-bold pt-6 pl-6">Banner Maker</h1>
            <Banner />
            <Menubar />
        </div>
    );
}

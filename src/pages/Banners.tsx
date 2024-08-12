import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBannersApi } from "../features/banner/bannerSlice";
import { AppDispatch, RootState } from "../app/store";
import SingleBanner from "../components/SingleBanner";

type BannerType = {
    id: number;
    title: string;
    description: string;
    linkTitle: string;
    link: string;
    color: string;
    showBanner: boolean;
    expirationTime: string;
};

export default function Banners() {
    const dispatch = useDispatch<AppDispatch>();
    const { banners } = useSelector((state: RootState) => state.banner);

    useEffect(() => {
        dispatch(getBannersApi());
    }, []);

    console.log(banners);

    return (
        <div className="min-h-screen min-w-screen home-bg relative overflow-hidden">
            <h1 className="text-3xl font-bold pt-6 pl-6">Banner Maker</h1>
            <div className="relative">
                {banners?.map((banner: BannerType) => (
                    <SingleBanner
                        key={banner?.id}
                        title={banner?.title}
                        description={banner?.description}
                        linkTitle={banner?.linkTitle}
                        link={banner?.link}
                        color={banner?.color}
                        showBanner={banner?.showBanner}
                        datetime={banner?.expirationTime}
                    />
                ))}
            </div>
        </div>
    );
}

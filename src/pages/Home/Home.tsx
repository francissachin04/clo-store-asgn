import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { useUrlFilters } from "../../hooks/useUrlFilters";
import { loadStoreItems } from "../../store/slices/storeSlice";
import SearchInput from "../../components/SearchInput";
import FilterPanel from "../../components/FilterPanel";
import ContentsList from "../../components/ContentsList";
import SortDropdown from "../../components/SortDropdown";


const Home: React.FC = () => {
    const dispatch = useAppDispatch();

    useUrlFilters();

    useEffect(() => {
        dispatch(loadStoreItems());
    }, [dispatch]);

    return (
        <div className="w-full min-h-screen bg-[#1A1A1F] text-white">
            {/* Header */}
            <header className="flex items-center justify-between mb-8 bg-black">
                <div className="flex items-center p-4 h-16">
                    <img
                        src="https://storagefiles.clo-set.com/public/connect/common/connect-desktop-header-bi.svg"
                        alt="CLO Logo"
                        className="h-6 w-auto"
                    />
                </div>
            </header>

            <div className="px-6 mb-8">
                <div className="mb-5 p-6 rounded-lg">
                    <SearchInput />
                </div>

                {/* Filter Panel */}
                <div className="mb-8 p-6 rounded-lg bg-black">
                    <FilterPanel />
                </div>

                <div className="w-full flex justify-end">
                    <SortDropdown />
                </div>

                {/* Contents List */}
                <div className="p-6">
                    <ContentsList />
                </div>
            </div>
        </div>
    );
};

export default Home;
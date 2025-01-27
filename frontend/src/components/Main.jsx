import { useEffect, useState } from "react";
import { fetchAllTariffs, addTariff } from "../requests";

import TariffCard from "./ui/TariffCard";
import AddTariff from "./forms/AddTariff";

export default function Main() {
    const [data, setData] = useState([]);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        fetchAllTariffs(setData); // Заменяем fetchAllData на fetchAllTariffs
    }, []);

    return (
        <>
            <div className="main-block-menu">
                {!shown && (
                    <button
                        className="filed-button"
                        onClick={() => {
                            setShown(true);
                            window.scrollTo(0, 0);
                        }}
                    >
                        Добавить тариф
                    </button>
                )}
            </div>
            <main className="main-block">
                {shown && (
                    <div className="main-block-form">
                        <AddTariff setShown={setShown} requestFunction={addTariff} />
                    </div>
                )}

                <div className="main-block-list">
                    {data.map((element, index) => {
                        return (
                            <TariffCard key={index} data={element} allData={data} />
                        );
                    })}
                </div>
            </main>
        </>
    );
}
